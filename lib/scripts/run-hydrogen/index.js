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
const { log_timer } = require('../console-logging/log-timer');

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
 * @returns {{config: ParsedConfig, media_array: MediaArray}}
 */
function build_core(config, media_array, timer) {
  try {
    // Simplify the options
    let timer_start_total_build = timer;
    // Log that Hydrogen is building the core CSS
    if (config.logging.verbose_console_output === true) {
      log_message({
        type: 'system',
        step: 'Building core CSS...',
      });
    }
    // Initiate the input parser timer
    const timer_start_core_css = process.hrtime.bigint();
    // Process Hydrogen variables
    let variable_data = parse_variables(config);
    // Build the core CSS
    let core_css = build_core_css(config, variable_data);
    // End the input parser timer and log the time
    const timer_end_core_css = process.hrtime.bigint();
    log_timer({
      settings: config,
      step: 'Building core CSS',
      times: {
        start: timer_start_core_css,
        end: timer_end_core_css,
      },
    });
    // Log that Hydrogen is parsing attributes
    if (config.logging.verbose_console_output === true) {
      log_message({
        type: 'system',
        step: 'Parsing files for attributes...',
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
    // End the input parser timer and log the time
    const timer_end_input_parsing = process.hrtime.bigint();
    log_timer({
      settings: config,
      step: 'Parsing files',
      times: {
        start: timer_start_input_parsing,
        end: timer_end_input_parsing,
      },
    });
    // Log that Hydrogen is exporting variables
    if (config.logging.verbose_console_output === true) {
      log_message({
        type: 'system',
        step: 'Building CSS...',
      });
    }
    // Start the CSS construction timer
    const timer_start_css_construction = process.hrtime.bigint();
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
    // Check to see if a raw Hydrogen file exists yet and delete it if it does
    if (fs.existsSync(path.join(config.output.parsed.string + '/hydrogen.raw.css')) == true) {
      fs.unlinkSync(path.join(config.output.parsed.string + '/hydrogen.raw.css'));
    }
    // Write a new raw Hydrogen file
    fs.writeFileSync(path.join(config.output.parsed.string + '/hydrogen.raw.css'), css);
    // If the user has enabled logging, create a log file containing the raw CSS
    if (config.logging.generate_logs) {
      fs.writeFileSync(path.join(config.logging.directory + '/hydrogen.raw.css'), css);
    }
    // End the CSS construction timer
    const timer_end_css_construction = process.hrtime.bigint();
    log_timer({
      settings: config,
      step: 'Building CSS',
      times: {
        start: timer_start_css_construction,
        end: timer_end_css_construction,
      },
    });
    // Process the raw CSS with Autoprefixer and CSSnano
    let processed_css = process_hydrogen(config);
    // Generate a CSS variable file if the user has enabled them
    if (
      config.logging.verbose_console_output === true &&
      config.processing.export_variable_file === true
    ) {
      // Log that Hydrogen is exporting variables
      log_message({
        type: 'system',
        step: 'Exporting variables...',
      });
      // Export the variables
      write_variable_file(config);
    }
    // Log that final CSS export has started
    if (config.logging.verbose_console_output === true) {
      log_message({
        type: 'system',
        step: 'Exporting CSS...',
      });
    }
    // Write the final CSS file
    fs.writeFileSync(path.join(config.output.parsed.string + '/hydrogen.css'), processed_css.css);
    if (processed_css.map) {
      fs.writeFileSync(
        path.join(config.output.parsed.string + '/hydrogen.css.map'),
        processed_css.map.toString()
      );
    }
    // Delete the unprocessed CSS
    if (fs.existsSync(path.join(config.output.parsed.string + '/hydrogen.raw.css')) == true) {
      fs.unlinkSync(path.join(config.output.parsed.string + '/hydrogen.raw.css'));
    }
    // End total build timer
    const timer_end_total_build = process.hrtime.bigint();
    log_timer({
      settings: config,
      step: 'Total build',
      times: {
        start: timer_start_total_build,
        end: timer_end_total_build,
      },
    });
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
 * @returns {{config: ParsedConfig, media_array: MediaArray}}
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
 * @returns {{config: ParsedConfig, media_array: MediaArray}}
 */
function run_hydrogen_full() {
  try {
    // Log that the script has started
    log_message({
      type: 'system',
      step: 'Starting the build...',
      message: 'Hydrogen v' + package_data.version,
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
