// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/config-data').Config} Config
 * @typedef {import('../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../data/media-array-data').MediaArray} MediaArray
 * @typedef {import('../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../data/css-property-data').PropertyModel} PropertyModel
 */

// Data imports
const { get_webref_data } = require('../../data/css-properties');

// Local functions
const { parse_config } = require('./01-parse-config');
const { build_media_array } = require('./02-build-media-array');
const { parse_variables } = require('./03-parse-variables');
const { build_core_css } = require('./04-build-reset-css');
const { parse_attributes } = require('./05-parse-attributes');
const { build_attribute_css } = require('./06-build-attribute-css');
const { process_hydrogen } = require('./07-process-css');
const { write_variable_file } = require('./08-write-variable-file');

// Helper functions
const { log_message } = require('../console-logging/log-message');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script ==========================================================================================

/**
 * Hydrogen's core script that builds CSS based off of the user's config.
 *
 * @param {ParsedConfig} config
 * @param {MediaArray} media_array
 * @param {number} timer
 * @returns {{config: ParsedConfig, media_array: MediaArray, css: string}}
 */
function build_core(config, media_array, timer) {
  try {
    // Initiate the input parser timer
    const timer_start_core_css = process.hrtime.bigint();
    // Process Hydrogen variables
    let variable_data = parse_variables(config);
    // Build the core CSS
    let core_css = build_core_css(config, variable_data);
    // Log that Hydrogen has built the core CSS
    if (config.logging.verbose_console_output === true) {
      log_message({
        type: 'system',
        step: 'Core CSS assembled',
        times: {
          start: timer_start_core_css,
          end: process.hrtime.bigint(),
        },
      });
    }
    // Initiate the input parser timer
    const timer_start_input_parsing = process.hrtime.bigint();
    // Parse the project markup for both a single data-h2 attribute and all data-h2-property attributes
    let parsed_attribute_object = parse_attributes(config);
    /** @type {PropertyModel} */
    let parsed_attribute_data = parsed_attribute_object.attribute_data;
    let namespace_wrapper = parsed_attribute_object.namespace_wrapper;
    // Check for at least 1 data-h2 attribute, otherwise log an error
    if (namespace_wrapper != true) {
      log_message({
        type: 'warning',
        settings: config,
        message:
          'Hydrogen couldn\'t find a "data-h2" attribute in your markup. This attribute is required for Hydrogen styles to work on your project.',
        step: 'Parsing input for attributes',
        files: config.input.parsed.array,
      });
    }
    // Log that Hydrogen has finished parsing attributes
    if (config.logging.verbose_console_output === true) {
      let label = ' input files';
      if (parsed_attribute_object.file_count === 1) {
        label = ' input file';
      }
      log_message({
        type: 'system',
        step: parsed_attribute_object.file_count + label + ' parsed',
        times: {
          start: timer_start_input_parsing,
          end: process.hrtime.bigint(),
        },
      });
    }
    // Start the CSS construction timer
    const timer_start_css_construction = process.hrtime.bigint();
    // Grab the W3C property reference data
    let webref = get_webref_data();
    // Loop through each property to process attribute instances
    Object.keys(parsed_attribute_data.attributes).forEach((property_key) => {
      // Loop through each attribute
      if (parsed_attribute_data) {
        parsed_attribute_data.attributes[property_key].forEach((attribute_instance) => {
          attribute_instance.queries.forEach((query) => {
            build_attribute_css(
              config,
              media_array,
              parsed_attribute_data,
              webref,
              property_key,
              attribute_instance,
              query
            );
          });
        });
      }
    });
    // Add each query string to the Hydrogen string and close the media query bracket if necessary
    let css = core_css;
    media_array.forEach(function (query) {
      // prettier-ignore
      css = css + '\n/* ' + query.key + ' - ' + query.mode + ' - ' + query.state + ' - ' + query.theme + ' */\n' + query.query_string + query.closing_string;
    });
    // If the user has enabled logging, create a log file containing the media output
    if (config.logging.generate_logs) {
      fs.writeFileSync(
        path.join(config.logging.directory + '/media-queries.json'),
        JSON.stringify(media_array, null, ' ')
      );
    }
    // If the user has enabled logging, create a log file containing the raw CSS
    if (config.logging.generate_logs) {
      fs.writeFileSync(path.join(config.logging.directory + '/hydrogen.raw.css'), css);
    }
    // Log that Hydrogen is exporting variables
    if (config.logging.verbose_console_output === true) {
      log_message({
        type: 'system',
        step: 'Attribute CSS assembled',
        times: {
          start: timer_start_css_construction,
          end: process.hrtime.bigint(),
        },
      });
    }
    // 2.0.4: Process the raw CSS with Lightning CSS
    let processed_css = process_hydrogen(config, css);
    // Generate a CSS variable file if the user has enabled them
    if (
      config.logging.verbose_console_output === true &&
      config.processing.export_variable_file === true
    ) {
      // Start export timer
      let timer_start_variable_export = process.hrtime.bigint();
      // Export the variables
      write_variable_file(config);
      // Log that Hydrogen is exporting variables
      log_message({
        type: 'system',
        step: 'Variable export file created',
        times: {
          start: timer_start_variable_export,
          end: process.hrtime.bigint(),
        },
      });
    }
    // Write the final CSS file
    fs.writeFileSync(path.join(config.output.parsed.string + '/hydrogen.css'), processed_css);
    // Log that debug logs were created if debug is set
    if (config.logging.verbose_console_output === true && config.logging.generate_logs) {
      log_message({
        type: 'info',
        step: 'Log generation',
        message:
          'Hydrogen has generated output logs and retained a pre-processed CSS file for debugging purposes.',
        files: [path.resolve(config.output.parsed.string + '/hydrogen-logs')],
      });
    }
    return {
      config: config,
      media_array: media_array,
      css: processed_css,
    };
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Building the core',
        error: error,
      };
    }
  }
}

/**
 * Runs Hydrogen's core scripts, and requires processed settings and media data.
 *
 * @param {ParsedConfig} config
 * @param {MediaArray} media_array
 * @param {number} timer
 * @returns {{config: ParsedConfig, media_array: MediaArray, css: string}}
 */
function run_hydrogen_core(config, media_array, timer) {
  try {
    // Run Hydrogen
    let results = build_core(config, media_array, timer);
    if (
      config.logging.verbose_console_output === true &&
      config.processing.export_variable_file === true
    ) {
      log_message({
        type: 'success',
        step: 'Running Hydrogen',
        errors: config.logging.errors.count,
        warnings: config.logging.warnings.count,
      });
    }
    // Return the results
    return results;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: "Running Hydrogen's core",
        error: error,
      };
    }
  }
}

/**
 * Runs Hydrogen in full, including locating, validating, and parsing configuration.
 *
 * @returns {{config: ParsedConfig, media_array: MediaArray, css: string}}
 */
function run_hydrogen_full() {
  try {
    // Log that the script has started
    log_message({
      type: 'system',
      step: 'Starting the build...',
    });
    // Initiate the total build timer
    const timer_start_total_build = process.hrtime.bigint();
    // Store the settings and media data
    /** @type {ParsedConfig} */
    let config = parse_config(process.argv);
    /** @type {MediaArray} */
    let media_array = build_media_array(config);
    // Run Hydrogen's core
    let results = run_hydrogen_core(config, media_array, timer_start_total_build);
    // Return the results
    return results;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Running Hydrogen in full',
        error: error,
      };
    }
  }
}

module.exports = {
  build_core,
  run_hydrogen_core,
  run_hydrogen_full,
};
