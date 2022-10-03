// Hydrogen: Build Hydrogen
'use strict';

// Vendor dependencies
var colors = require('colors');
var fs = require('fs');
var path = require('path');
const validator = require('csstree-validator');

// Hydrogen dependencies
const { parse_settings } = require('./settings/settings-parser');
const { log_message } = require('../scripts/logs/log-message');
const { log_timer } = require('../scripts/logs/log-timer');
const { parse_properties } = require('../scripts/properties/parse-properties');
var {
  validate_settings,
} = require('./settings/validation/settings-validation');
var { clean_logs } = require('./logs/log-clean');
var { parse_input_data_for_attributes } = require('./parse-attributes');
var { generate_core_css } = require('./generate-core-css');
var { generate_user_media_array } = require('./generate-media-query-array');
var { process_hydrogen } = require('./process-css');

/**
 * Builds Hydrogen
 * @param {"build" | "watch"} command The command invoking Hydrogen
 * @param {["process path", "file path", "arguments"]} args node location, process location, args...
 * @returns {boolean} A compiled Hydrogen CSS file
 */
function h2_compile_hydrogen(command, args) {
  try {
    // Initiate the total build timer
    const timer_start_total_build = process.hrtime.bigint();
    // Log that Hydrogen is parsing settings
    log_message({
      type: 'system',
      step: 'Parsing settings...',
    });
    // Initiate the settings parser timer
    const parse_settings_timer_start = process.hrtime.bigint();
    // Load the user's settings
    const settings = parse_settings(args);
    // Build the media query array from the user's settings
    let user_media_array = generate_user_media_array(settings);
    // End the settings parser timer and log the time
    const parse_settings_timer_end = process.hrtime.bigint();
    log_timer({
      settings: settings,
      step: 'Settings parser',
      times: {
        start: parse_settings_timer_start,
        end: parse_settings_timer_end,
      },
    });
    // Log that Hydrogen is validating settings
    log_message({
      type: 'system',
      step: 'Validating settings...',
    });
    // Initiate the settings parser timer
    const validate_settings_timer_start = process.hrtime.bigint();
    // Validate the loaded settings
    const validation = validate_settings(settings);
    // Check to see if the settings validation passed, and if it did, continue
    if (validation === true) {
      // End the settings validation timer and log the time
      const validate_settings_timer_end = process.hrtime.bigint();
      log_timer({
        settings: settings,
        step: 'Settings validation',
        times: {
          start: validate_settings_timer_start,
          end: validate_settings_timer_end,
        },
      });
      // Check to see if the clean argument was passed, and if it was, clean the log directory
      if (settings.runtime.logging.clean === true) {
        clean_logs(settings);
      }
      // If logging is enabled, ensure both the log directory and the specific runtime directory exist
      if (settings.build.logs === true) {
        if (!fs.existsSync(settings.runtime.output.string + '/hydrogen-logs')) {
          fs.mkdirSync(settings.runtime.output.string + '/hydrogen-logs');
        }
        if (!fs.existsSync(settings.runtime.logging.directory)) {
          fs.mkdirSync(settings.runtime.logging.directory);
        }
      }
      // Log that Hydrogen is building the core CSS
      log_message({
        type: 'system',
        step: 'Building core CSS...',
      });
      // Initiate the input parser timer
      const timer_start_core_css = process.hrtime.bigint();
      // Create the Hydrogen variable and prefix it with the core CSS
      let hydrogen = generate_core_css(settings);
      // End the input parser timer and log the time
      const timer_end_core_css = process.hrtime.bigint();
      log_timer({
        settings: settings,
        step: 'Core CSS generation',
        times: {
          start: timer_start_core_css,
          end: timer_end_core_css,
        },
      });
      // Log that Hydrogen is parsing attributes
      log_message({
        type: 'system',
        step: 'Parsing attributes...',
      });
      // Initiate the input parser timer
      const timer_start_input_parsing = process.hrtime.bigint();
      // Parse the project markup for both a single data-h2 attribute and all data-h2-property attributes
      let parsed_attribute_data = parse_input_data_for_attributes(settings);
      if (parsed_attribute_data) {
        // Check for at least 1 data-h2 attribute, otherwise log an error
        if (parsed_attribute_data.hydrogen != true) {
          log_message({
            type: 'warning',
            message:
              'Hydrogen couldn\'t find a "data-h2" attribute in your markup. This attribute is required for Hydrogen styles to work on your project.',
            step: 'Parsing input for attributes',
            files: settings.runtime.input.array,
          });
        }
        // End the input parser timer and log the time
        const timer_end_input_parsing = process.hrtime.bigint();
        log_timer({
          settings: settings,
          step: 'Attribute parsing',
          times: {
            start: timer_start_input_parsing,
            end: timer_end_input_parsing,
          },
        });
        // Log that Hydrogen is exporting variables
        log_message({
          type: 'system',
          step: 'Building attribute CSS...',
        });
        // Start the CSS construction timer
        const timer_start_css_construction = process.hrtime.bigint();
        // Loop through each property in the prop model
        parsed_attribute_data.properties.forEach(function (prop_data) {
          // Loop through keys available to this property
          prop_data.keys.forEach(function (prop_key) {
            // Set the property name for later use
            let property = prop_key.name;
            // Ensure we're not checking empty attributes
            if (prop_key.instances.length > 0) {
              // Loop through available instances for processing
              prop_key.instances.forEach(function (prop_instance) {
                // Check to ensure values were found
                if (prop_instance.values.length > 0) {
                  // Loop through the values passed to the instance and build the CSS
                  prop_instance.values.forEach(function (value) {
                    // Set a flag for value validity
                    let value_validity = true;
                    // If a state string was found, add a colon
                    let state_string = '';
                    if (value.modifiers.state != '') {
                      state_string = state_string + ':' + value.modifiers.state;
                    }
                    // Check to see if the :children modifier was called
                    if (value.modifiers.children.length === 0) {
                      // No children were called, so assemble the selectors without them
                      value.selectors = value.selectors.concat(
                        '[data-h2-' +
                          property +
                          '*="' +
                          value.query +
                          '"]' +
                          value.modifiers.id +
                          value.modifiers.class +
                          state_string
                      );
                    } else {
                      // Children were found, so include them in the selector assembly\
                      value.modifiers.children.forEach(function (child) {
                        value.selectors = value.selectors.concat(
                          '[data-h2-' +
                            property +
                            '*="' +
                            value.query +
                            '"]' +
                            value.modifiers.id +
                            value.modifiers.class +
                            state_string +
                            ' ' +
                            child +
                            ':not([data-h2-' +
                            property +
                            '])'
                        );
                      });
                    }
                    // Create a variable to store constructed CSS
                    let value_css = [];
                    // Check to ensure options were found
                    if (value.options && value.options.length > 0) {
                      // Parse the property for CSS
                      value_css = parse_properties(
                        settings,
                        prop_data,
                        prop_key,
                        prop_instance,
                        value
                      );
                      // Check to see that the compiled CSS returned properly
                      if (value_css === false) {
                        // It didn't, so set the value as invalid
                        value_validity = false;
                      }
                    } else {
                      // No options were passed, error
                      value_validity = false;
                    }
                    if (value_css && value_css.length != 0) {
                      // Ensure the value is valid before proceeding
                      if (value_validity === true) {
                        // Check to see if the user has enabled CSS validation
                        if (settings.build.validation) {
                          // Validate the constructed CSS
                          let validation_string = '';
                          value_css.forEach(function (css_string) {
                            validation_string = validation_string + css_string;
                          });
                          let validation = validator.validateString(
                            validation_string,
                            ''
                          );
                          for (const [filename, errors] of validation) {
                            if (errors && errors.length != 0) {
                              errors.forEach(function (error) {
                                let target_css =
                                  error.property + ': ' + error.css + ';';
                                log_message({
                                  type: 'error',
                                  message:
                                    'This query contains a value that is resulting in invalid CSS.',
                                  step: 'CSS validation',
                                  attribute: prop_instance.attribute,
                                  query: value.query,
                                  css: validation_string,
                                  files: prop_instance.files,
                                });
                              });
                            }
                          }
                        }
                        // Add to media css string, and only assemble the Hydrogen file at the end, with the correct order for queries by looping through them
                        user_media_array.forEach(function (user_media) {
                          if (value.modifiers.media === user_media.key) {
                            // Matching media query
                            if (
                              value.modifiers.mode === '' &&
                              user_media.mode === 'light'
                            ) {
                              // Light mode
                              if (
                                value.modifiers.state === '' &&
                                user_media.state === 'default'
                              ) {
                                // No state
                                value_css.forEach(function (css_string) {
                                  user_media.queryString =
                                    user_media.queryString +
                                    '\n[data-h2] ' +
                                    css_string;
                                });
                              } else if (
                                value.modifiers.state === user_media.state
                              ) {
                                // Matching state
                                value_css.forEach(function (css_string) {
                                  user_media.queryString =
                                    user_media.queryString +
                                    '\n[data-h2] ' +
                                    css_string;
                                });
                              }
                            } else if (
                              value.modifiers.mode === 'dark' &&
                              user_media.mode === 'dark'
                            ) {
                              // Dark mode
                              // Set dark mode prefix based on user settings
                              let dark_mode_prefix = '\n[data-h2] ';
                              if (settings.build.dark_mode === 'toggle') {
                                dark_mode_prefix = '\n[data-h2="dark"] ';
                              }
                              // Assemble dark mode media arrays
                              if (
                                value.modifiers.state === '' &&
                                user_media.state === 'default'
                              ) {
                                // No state
                                value_css.forEach(function (css_string) {
                                  user_media.queryString =
                                    user_media.queryString +
                                    dark_mode_prefix +
                                    css_string;
                                });
                              } else if (
                                value.modifiers.state === user_media.state
                              ) {
                                // Matching state
                                value_css.forEach(function (css_string) {
                                  user_media.queryString =
                                    user_media.queryString +
                                    dark_mode_prefix +
                                    css_string;
                                });
                              }
                            }
                          }
                        });
                      }
                    }
                  });
                }
              });
            }
          });
        });
        // Add each query string to the Hydrogen string and close the media query bracket if necessary
        user_media_array.forEach(function (query) {
          if (query.bracket == true) {
            hydrogen =
              hydrogen +
              '\n/* ' +
              query.key +
              ' - ' +
              query.state +
              ' - ' +
              query.pseudo +
              ' */\n' +
              query.queryString +
              '\n}';
          } else {
            hydrogen =
              hydrogen +
              '\n/* ' +
              query.key +
              ' - ' +
              query.state +
              ' - ' +
              query.pseudo +
              ' */' +
              query.queryString;
          }
        });
        // If the user has enabled logging, create a log file containing the media output
        if (settings.build.logs === true) {
          fs.writeFileSync(
            path.join(
              settings.runtime.logging.directory + '/media-queries.json'
            ),
            JSON.stringify(user_media_array, null, ' ')
          );
        }
        // Check to see if a raw Hydrogen file exists yet and delete it if it does
        if (
          fs.existsSync(
            path.join(settings.runtime.output.string + '/hydrogen.raw.css')
          ) == true
        ) {
          fs.unlinkSync(
            path.join(settings.runtime.output.string + '/hydrogen.raw.css')
          );
        }
        // Write a new raw Hydrogen file
        fs.writeFileSync(
          path.join(settings.runtime.output.string + '/hydrogen.raw.css'),
          hydrogen
        );
        // If the user has enabled logging, create a log file containing the raw CSS
        if (settings.build.logs === true) {
          fs.writeFileSync(
            path.join(settings.runtime.logging.directory + '/hydrogen.raw.css'),
            hydrogen
          );
        }
        // End the CSS construction timer
        const timer_end_css_construction = process.hrtime.bigint();
        log_timer({
          settings: settings,
          step: 'CSS construction',
          times: {
            start: timer_start_css_construction,
            end: timer_end_css_construction,
          },
        });
        // Process the raw CSS with Autoprefixer and CSSnano
        process_hydrogen(settings, command, timer_start_total_build);
      }
    } else {
      // Validation failed
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Building Hydrogen',
    });
    return false;
  }
}

module.exports = {
  h2_compile_hydrogen,
};
