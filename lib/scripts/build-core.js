// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('../data/media-model-definition').MediaObject} Media
 */
/**
 * @typedef {import('../data/property-model-definition').PropertyModel} PropertyModel
 * @typedef {import('../data/property-model-definition').Properties} Properties
 * @typedef {import('../data/property-model-definition').Attribute} Attribute
 * @typedef {import('../data/property-model-definition').Query} Query
 * @typedef {import('../data/property-model-definition').Modifiers} Modifiers
 */

// Data imports

// Logging
const { log_message } = require('../scripts/logging/log-message');
const { log_timer } = require('../scripts/logging/log-timer');

// Functions
const { parse_variables } = require('./variables/parse-variables');
const { build_core_css } = require('./build-core-css');
const { parse_attributes } = require('./attributes/parse-attributes');
const { build_attribute_css } = require('./properties/build-attribute-css');
const { process_hydrogen } = require('./process-css');
const { write_variable_file } = require('./variables/write-variable-file');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Scripts
/**
 * Hydrogen's core script that builds CSS based off of the user's config
 * @param {{settings_data: Settings, media_data: Media[], timer: number}} args
 * @returns {Settings}
 */
function build_core(args) {
  try {
    // Simplify the options
    let settings = args.settings_data;
    let user_media_array = args.media_data;
    let timer_start_total_build = args.timer;
    // Log that Hydrogen is building the core CSS
    if (settings.logging.verbose === true) {
      log_message({
        type: 'system',
        step: 'Building core CSS...',
      });
    }
    // Initiate the input parser timer
    const timer_start_core_css = process.hrtime.bigint();
    // Process Hydrogen variables
    let variable_data = parse_variables(settings);
    // Build the core CSS
    let core_css = build_core_css(settings, variable_data);
    // End the input parser timer and log the time
    const timer_end_core_css = process.hrtime.bigint();
    log_timer({
      settings: settings,
      step: 'Building core CSS',
      times: {
        start: timer_start_core_css,
        end: timer_end_core_css,
      },
    });
    // Log that Hydrogen is parsing attributes
    if (settings.logging.verbose === true) {
      log_message({
        type: 'system',
        step: 'Parsing files for attributes...',
      });
    }
    // Initiate the input parser timer
    const timer_start_input_parsing = process.hrtime.bigint();
    // Parse the project markup for both a single data-h2 attribute and all data-h2-property attributes
    let parsed_attribute_data = parse_attributes(settings);
    // Check for at least 1 data-h2 attribute, otherwise log an error
    if (settings.processing.wrapper != true) {
      log_message({
        type: 'warning',
        settings: settings,
        message:
          'Hydrogen couldn\'t find a "data-h2" attribute in your markup. This attribute is required for Hydrogen styles to work on your project.',
        step: 'Parsing input for attributes',
        files: settings.input.parsed.array,
      });
    }
    // End the input parser timer and log the time
    const timer_end_input_parsing = process.hrtime.bigint();
    log_timer({
      settings: settings,
      step: 'Parsing files',
      times: {
        start: timer_start_input_parsing,
        end: timer_end_input_parsing,
      },
    });
    // Log that Hydrogen is exporting variables
    if (settings.logging.verbose === true) {
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
        parsed_attribute_data.attributes[property_key].forEach(
          (attribute_instance) => {
            attribute_instance.queries.forEach((query) => {
              build_attribute_css(
                settings,
                user_media_array,
                parsed_attribute_data,
                property_key,
                attribute_instance,
                query
              );
            });
          }
        );
      }
    });
    // Add each query string to the Hydrogen string and close the media query bracket if necessary
    let css = core_css;
    user_media_array.forEach(function (query) {
      // prettier-ignore
      css = css + '\n/* ' + query.key + ' - ' + query.mode + ' - ' + query.state + ' - ' + query.theme + ' */\n' + query.query_string + query.closing_string;
    });
    // If the user has enabled logging, create a log file containing the media output
    if (settings.logging.logs) {
      fs.writeFileSync(
        path.join(settings.logging.directory + '/media-queries.json'),
        JSON.stringify(user_media_array, null, ' ')
      );
    }
    // Check to see if a raw Hydrogen file exists yet and delete it if it does
    if (
      fs.existsSync(
        path.join(settings.output.parsed.string + '/hydrogen.raw.css')
      ) == true
    ) {
      fs.unlinkSync(
        path.join(settings.output.parsed.string + '/hydrogen.raw.css')
      );
    }
    // Write a new raw Hydrogen file
    fs.writeFileSync(
      path.join(settings.output.parsed.string + '/hydrogen.raw.css'),
      css
    );
    // If the user has enabled logging, create a log file containing the raw CSS
    if (settings.logging.logs) {
      fs.writeFileSync(
        path.join(settings.logging.directory + '/hydrogen.raw.css'),
        css
      );
    }
    // End the CSS construction timer
    const timer_end_css_construction = process.hrtime.bigint();
    log_timer({
      settings: settings,
      step: 'Building CSS',
      times: {
        start: timer_start_css_construction,
        end: timer_end_css_construction,
      },
    });
    // Process the raw CSS with Autoprefixer and CSSnano
    let processed_css = process_hydrogen(settings);
    // Generate a CSS variable file if the user has enabled them
    if (settings.processing.export_variable_file === true) {
      // Log that Hydrogen is exporting variables
      log_message({
        type: 'system',
        step: 'Exporting variables...',
      });
      // Export the variables
      write_variable_file(settings);
    }
    // Log that final CSS export has started
    log_message({
      type: 'system',
      step: 'Exporting CSS...',
    });
    // Write the final CSS file
    fs.writeFileSync(
      path.join(settings.output.parsed.string + '/hydrogen.css'),
      processed_css.css
    );
    if (processed_css.map) {
      fs.writeFileSync(
        path.join(settings.output.parsed.string + '/hydrogen.css.map'),
        processed_css.map.toString()
      );
    }
    // Delete the unprocessed CSS
    if (
      fs.existsSync(
        path.join(settings.output.parsed.string + '/hydrogen.raw.css')
      ) == true
    ) {
      fs.unlinkSync(
        path.join(settings.output.parsed.string + '/hydrogen.raw.css')
      );
    }
    // End total build timer
    const timer_end_total_build = process.hrtime.bigint();
    log_timer({
      settings: settings,
      step: 'Total build',
      times: {
        start: timer_start_total_build,
        end: timer_end_total_build,
      },
    });
    // Log that debug logs were created if debug is set
    if (settings.logging.verbose === true && settings.logging.logs) {
      log_message({
        type: 'info',
        step: 'Log generation',
        message:
          'Hydrogen has generated output logs and retained a pre-processed CSS file for debugging purposes.',
        files: [path.resolve(settings.output.parsed.string + '/hydrogen-logs')],
      });
    }
    return {
      settings_data: settings,
      media_data: user_media_array,
    };
  } catch (error) {
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

module.exports = {
  build_core,
};
