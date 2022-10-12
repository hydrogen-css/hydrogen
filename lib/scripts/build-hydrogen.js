// Hydrogen: Build Hydrogen
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { parse_settings } = require('./settings/settings-parser');
const { log_message } = require('../scripts/logs/log-message');
const { log_timer } = require('../scripts/logs/log-timer');
const { parse_properties } = require('../scripts/properties/parse-properties');
const { parse_input_data_for_attributes } = require('./parse-attributes');
const { generate_core_css } = require('./generate-core-css');
const { generate_user_media_array } = require('./generate-media-query-array');
const { process_hydrogen } = require('./process-css');
// Vendor imports
var colors = require('colors');
var fs = require('fs');
var path = require('path');
const validator = require('csstree-validator');

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
    // Ensure the settings were parsed successfully
    if (settings) {
      // Build the media query array from the user's settings
      let user_media_array = generate_user_media_array(settings);
      // Ensure the media array was returned correctly
      if (user_media_array) {
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
        // Log that Hydrogen is building the core CSS
        log_message({
          type: 'system',
          step: 'Building core CSS...',
        });
        // Initiate the input parser timer
        const timer_start_core_css = process.hrtime.bigint();
        // Create the Hydrogen variable and prefix it with the core CSS
        let hydrogen = generate_core_css(settings);
        // Ensure the core CSS returned before continuing
        if (hydrogen) {
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
          // Ensure the input was parsed properly
          if (parsed_attribute_data) {
            // Check for at least 1 data-h2 attribute, otherwise log an error
            if (parsed_attribute_data.hydrogen != true) {
              log_message({
                type: 'warning',
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
              step: 'Attribute parser',
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
                          state_string =
                            state_string + ':' + value.modifiers.state;
                        }
                        // If selectors were found, compile them into a string
                        let selector_list = '';
                        if (value.modifiers.selectors.length > 0) {
                          value.modifiers.selectors.forEach(function (
                            selector_item
                          ) {
                            selector_list = selector_list + selector_item;
                          });
                        } else {
                          // No selectors were found, so check to see if the deprecated class/id modifiers are in use
                          selector_list =
                            value.modifiers.id + value.modifiers.class;
                        }
                        // Check to see if the :children modifier was called
                        if (value.modifiers.children.length === 0) {
                          // No children were called, so assemble the selectors without them
                          // prettier-ignore
                          value.selectors = value.selectors.concat(
                            '[data-h2-' + property + '*="' + value.query + '"]' + selector_list + state_string
                          );
                        } else {
                          // Children were found, so include them in the selector assembly
                          value.modifiers.children.forEach(function (child) {
                            // prettier-ignore
                            value.selectors = value.selectors.concat(
                              '[data-h2-' + property + '*="' + value.query + '"]' + selector_list + state_string + ' ' + child + ':not([data-h2-' + property + '])'
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
                            if (settings.processing.validation) {
                              // Validate the constructed CSS
                              let validation_string = '';
                              value_css.forEach(function (css_string) {
                                validation_string =
                                  validation_string + css_string;
                              });
                              let validation = validator.validateString(
                                validation_string,
                                ''
                              );
                              for (const [filename, errors] of validation) {
                                if (errors && errors.length != 0) {
                                  errors.forEach(function (error) {
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
                                // Check for a matching default or dark mode value
                                if (
                                  value.modifiers.mode === 'default' &&
                                  user_media.mode === 'light'
                                ) {
                                  // Check to see if the value matches the theme
                                  if (
                                    user_media.theme === value.modifiers.theme
                                  ) {
                                    // Create the selector prefix
                                    let selector_prefix = '';
                                    if (user_media.theme === 'default') {
                                      // prettier-ignore
                                      selector_prefix = '\n[data-h2] '
                                    } else {
                                      // prettier-ignore
                                      selector_prefix = '\n[data-h2*="' + user_media.theme + '"] '
                                    }
                                    // Check for default state values, otherwise check for a matching state
                                    if (
                                      value.modifiers.state === '' &&
                                      user_media.state === 'default'
                                    ) {
                                      value_css.forEach(function (css_string) {
                                        // prettier-ignore
                                        user_media.query_string = user_media.query_string + selector_prefix + css_string;
                                      });
                                    } else if (
                                      value.modifiers.state === user_media.state
                                    ) {
                                      value_css.forEach(function (css_string) {
                                        // prettier-ignore
                                        user_media.query_string = user_media.query_string + selector_prefix + css_string;
                                      });
                                    }
                                  }
                                } else if (
                                  value.modifiers.mode === 'dark' &&
                                  user_media.mode === 'dark'
                                ) {
                                  // Check to see if the value matches the theme
                                  if (
                                    user_media.theme === value.modifiers.theme
                                  ) {
                                    // Create the selector prefix
                                    let selector_prefix = '';
                                    if (user_media.theme === 'default') {
                                      if (
                                        settings.modes.dark.method === 'toggle'
                                      ) {
                                        // prettier-ignore
                                        selector_prefix = '\n[data-h2*="dark"] '
                                      } else {
                                        // prettier-ignore
                                        selector_prefix = '\n[data-h2] '
                                      }
                                    } else {
                                      if (
                                        settings.modes.dark.method === 'toggle'
                                      ) {
                                        // prettier-ignore
                                        selector_prefix = '\n[data-h2*="' + user_media.theme + '"][data-h2*="dark"] '
                                      } else {
                                        // prettier-ignore
                                        selector_prefix = '\n[data-h2*="' + user_media.theme + '"] '
                                      }
                                    }
                                    // Check for default state values, otherwise check for a matching state
                                    if (
                                      value.modifiers.state === '' &&
                                      user_media.state === 'default'
                                    ) {
                                      value_css.forEach(function (css_string) {
                                        // prettier-ignore
                                        user_media.query_string = user_media.query_string + selector_prefix + css_string;
                                      });
                                    } else if (
                                      value.modifiers.state === user_media.state
                                    ) {
                                      value_css.forEach(function (css_string) {
                                        // prettier-ignore
                                        user_media.query_string = user_media.query_string + selector_prefix + css_string;
                                      });
                                    }
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
              // prettier-ignore
              hydrogen = hydrogen + '\n/* ' + query.key + ' - ' + query.mode + ' - ' + query.state + ' - ' + query.theme + ' */\n' + query.query_string + query.closing_string;
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
              hydrogen
            );
            // If the user has enabled logging, create a log file containing the raw CSS
            if (settings.logging.logs) {
              fs.writeFileSync(
                path.join(settings.logging.directory + '/hydrogen.raw.css'),
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
          // Core CSS generation failed, so throw an error
          return false;
        }
      } else {
        // The media array failed, so throw an error
        return false;
      }
    } else {
      // Parsing settings failed, so throw an error
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
