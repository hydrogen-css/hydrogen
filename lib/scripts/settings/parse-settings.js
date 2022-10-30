// Hydrogen: Parse settings
'use strict';

// Hydrogen data models
let Settings = require('../../data/settings-model-definition');
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../data/settings-model-definition').TempLogging} TempLogging
 */
let Modifiers = require('../../data/modifiers-model-definition');
/** @typedef {import('../../data/modifiers-model-definition').Modifiers} Modifiers */

// Hydrogen data imports
let settings_data = require('../../data/settings-model');
let modifier_data = require('../../data/modifiers-model');

// Hydrogen core functions
const { load_configuration } = require('./load-configuration');
const { validate_configuration } = require('./validate-configuration');

// Hydrogen helper functions
const { parse_input } = require('../helpers/parse-input');
const { parse_output } = require('../helpers/parse-output');
const { generate_date_time } = require('../helpers/generate-date-time');
const { calculate_line_height } = require('../helpers/calculate-line-height');
const { delete_logs } = require('../helpers/delete-logs');

// Hydrogen log functions
const { log_message } = require('../logs/log-message');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script

/**
 * Loads the user's settings and modifies the object based on command line arguments
 * @param {string[]} args node location, process location, args...
 * @returns {Promise<Settings>}
 */
function parse_settings(args) {
  return new Promise((resolve, reject) => {
    // Grab arguments passed to the command
    /** @type {object} */
    const argv = require('yargs/yargs')(args.slice(2)).argv;
    // Create temporary storage for error and warning information that matches the eventual settings data format
    let temp_logging = {
      /** @type {Logging} */
      logging: {
        errors: {
          count: 0,
        },
        warnings: {
          count: 0,
        },
      },
    };
    // Get the user's configuration
    load_configuration(argv, temp_logging)
      .then((user_config) => validate_configuration(user_config, temp_logging))
      .then((validated_config) => {
        // Grab the default modes and then overwrite them based on the user config
        let modes_config = settings_data.modes;
        if (validated_config.modes) {
          if (validated_config.modes.dark) {
            if (validated_config.modes.dark.automatic != undefined) {
              modes_config.dark.automatic =
                validated_config.modes.dark.automatic;
            }
            if (validated_config.modes.dark.method) {
              modes_config.dark.method = validated_config.modes.dark.method;
            }
          }
        }
        validated_config.modes = modes_config;
        // Grab the default processing settings and then overwrite them based on the user config
        let processing_config = settings_data.processing;
        if (validated_config.processing) {
          if (validated_config.processing.reset_styles != undefined) {
            processing_config.reset_styles =
              validated_config.processing.reset_styles;
          }
          if (validated_config.processing.prefixing != undefined) {
            processing_config.prefixing = validated_config.processing.prefixing;
          }
          if (validated_config.processing.minification != undefined) {
            processing_config.minification =
              validated_config.processing.minification;
          }
          if (validated_config.processing.var_export != undefined) {
            processing_config.var_export =
              validated_config.processing.var_export;
          }
        }
        validated_config.processing = processing_config;
        // Grab the default log settings and then overwrite them based on the user config
        let logging_config = settings_data.logging;
        if (validated_config.logging) {
          if (validated_config.logging.logs != undefined) {
            logging_config.logs = validated_config.logging.logs;
          }
          if (validated_config.logging.timers != undefined) {
            logging_config.timers = validated_config.logging.timers;
          }
        }
        validated_config.logging = logging_config;
        // Migrate the temporary error and warning tracking to the validated config data
        validated_config.logging.errors = temp_logging.logging.errors;
        validated_config.logging.warnings = temp_logging.logging.warnings;
        // Media data - media is its own independent object, and the base query is stored there now
        let media_config = settings_data.media;
        if (validated_config.media) {
          if (validated_config.media.base_key) {
            media_config.base_key = validated_config.media.base_key;
          }
          if (
            validated_config.media.queries &&
            validated_config.media.queries.length > 0
          ) {
            media_config.queries = [
              {
                key: media_config.base_key,
                query: 'base',
              },
            ].concat(validated_config.media.queries);
          } else {
            media_config.queries = [
              {
                key: media_config.base_key,
                query: 'base',
              },
            ].concat(media_config.queries);
          }
        }
        validated_config.media = media_config;
        // Create usable data for the input
        let input_data = parse_input({ settings: validated_config });
        let input_array = input_data.array;
        let input_string = input_data.string;
        let input_glob = input_data.glob;
        // Create usable data for the output
        let output_data = parse_output({ settings: validated_config });
        let output_array = output_data.array;
        let output_string = output_data.string;
        let output_glob = output_data.glob;
        // Overwrite the input and output data with the newly constructed information
        validated_config.input = {
          raw: validated_config.input,
          parsed: {
            array: input_array,
            string: input_string,
            glob: input_glob,
          },
        };
        validated_config.output = {
          raw: validated_config.output,
          parsed: {
            array: output_array,
            string: output_string,
            glob: output_glob,
          },
        };
        // Generate and store the appropriate routes for log outputs
        let log_date = generate_date_time({ settings: validated_config });
        let log_directory = output_string + '/hydrogen-logs/' + log_date;
        validated_config.logging.time = log_date;
        validated_config.logging.directory = log_directory;
        // Configured themes start as arrays, but this parser moves them to an object using their configured key string as their key value
        let themes = {};
        if (validated_config.themes && validated_config.themes.length > 0) {
          validated_config.themes.forEach(function (theme) {
            // Check for and assemble typography
            if (theme.typography && theme.typography.length > 0) {
              theme.typography.forEach(function (type_setting) {
                // Grab the matching query
                validated_config.media.queries.forEach(function (query) {
                  if (type_setting.query_key === query.key) {
                    type_setting.query = query.query;
                  }
                });
                let numeric_line_height = parseFloat(type_setting.line_height);
                // Caption font size and line height
                let caption_size = 1 / type_setting.type_scale;
                // prettier-ignore
                type_setting.caption = {
                  size: 'calc((1 / ' + type_setting.type_scale + ' ) * 1rem)',
                  line_height: 'var(--h2-base-line-height)',
                }
                // Copy font size and line height
                let copy_size = 1;
                type_setting.copy = {
                  size: '1rem',
                  line_height: 'var(--h2-base-line-height)',
                };
                // Heading 6 font size and line height
                let h6_size = 1 * type_setting.type_scale;
                type_setting.h6 = {
                  size: 'calc((1 * ' + type_setting.type_scale + ' ) * 1rem)',
                  line_height: calculate_line_height({
                    settings: validated_config,
                    font_size: h6_size,
                    base_line_height: numeric_line_height,
                  }),
                };
                // Heading 5 font size and line height
                let h5_size = h6_size * type_setting.type_scale;
                type_setting.h5 = {
                  size:
                    'calc(var(--h2-font-size-h6) * ' +
                    type_setting.type_scale +
                    ' )',
                  line_height: calculate_line_height({
                    settings: validated_config,
                    font_size: h5_size,
                    base_line_height: numeric_line_height,
                  }),
                };
                // Heading 4 font size and line height
                let h4_size = h5_size * type_setting.type_scale;
                type_setting.h4 = {
                  size:
                    'calc(var(--h2-font-size-h5) * ' +
                    type_setting.type_scale +
                    ' )',
                  line_height: calculate_line_height({
                    settings: validated_config,
                    font_size: h4_size,
                    base_line_height: numeric_line_height,
                  }),
                };
                // Heading 3 font size and line height
                let h3_size = h4_size * type_setting.type_scale;
                type_setting.h3 = {
                  size:
                    'calc(var(--h2-font-size-h4) * ' +
                    type_setting.type_scale +
                    ' )',
                  line_height: calculate_line_height({
                    settings: validated_config,
                    font_size: h3_size,
                    base_line_height: numeric_line_height,
                  }),
                };
                // Heading 2 font size and line height
                let h2_size = h3_size * type_setting.type_scale;
                type_setting.h2 = {
                  size:
                    'calc(var(--h2-font-size-h3) * ' +
                    type_setting.type_scale +
                    ' )',
                  line_height: calculate_line_height({
                    settings: validated_config,
                    font_size: h2_size,
                    base_line_height: numeric_line_height,
                  }),
                };
                // Heading 1 font size and line height
                let h1_size = h2_size * type_setting.type_scale;
                type_setting.h1 = {
                  size:
                    'calc(var(--h2-font-size-h2) * ' +
                    type_setting.type_scale +
                    ' )',
                  line_height: calculate_line_height({
                    settings: validated_config,
                    font_size: h1_size,
                    base_line_height: numeric_line_height,
                  }),
                };
                // Display font size and line height
                let display_size = h1_size * type_setting.type_scale;
                type_setting.display = {
                  size:
                    'calc(var(--h2-font-size-h1) * ' +
                    type_setting.type_scale +
                    ' )',
                  line_height: calculate_line_height({
                    settings: validated_config,
                    font_size: display_size,
                    base_line_height: numeric_line_height,
                  }),
                };
              });
            }
            // Check color settings to ensure that the runtime object contains variable export data slots, including modifiers
            if (theme.colors && theme.colors.length > 0) {
              theme.colors.forEach(function (color_setting) {
                // Prep the variable data object
                color_setting.var_data = {
                  name: null,
                  value: null,
                };
                let modes = ['default', 'dark'];
                modes.forEach(function (mode) {
                  // Add the base modifiers and their own variable data, but check to see if the user has overwritten them first
                  if (
                    color_setting[mode] &&
                    color_setting[mode].modifiers &&
                    color_setting[mode].modifiers.length > 0
                  ) {
                    modifier_data.forEach(function (base_modifier) {
                      let overwritten = false;
                      color_setting[mode].modifiers.forEach(function (
                        modifier_setting
                      ) {
                        if (modifier_setting.key === base_modifier.key) {
                          overwritten = true;
                          modifier_setting.default = true;
                          modifier_setting.overwritten = true;
                          modifier_setting.var_data = {
                            name: null,
                            value: null,
                          };
                        }
                      });
                      if (overwritten === false) {
                        color_setting[mode].modifiers = color_setting[
                          mode
                        ].modifiers.concat({
                          key: base_modifier.key,
                          default: true,
                          overwritten: false,
                          color: false,
                          var_data: {
                            name: null,
                            value: null,
                          },
                        });
                      }
                    });
                    // Now check for any non base-modifiers and do the same
                    color_setting[mode].modifiers.forEach(function (
                      modifier_setting
                    ) {
                      if (modifier_setting.var_data === undefined) {
                        modifier_setting.default = false;
                        modifier_setting.overwritten = false;
                        modifier_setting.var_data = {
                          name: null,
                          value: null,
                        };
                      }
                    });
                  } else if (color_setting[mode]) {
                    color_setting[mode].modifiers = [];
                    modifier_data.forEach(function (base_modifier) {
                      color_setting[mode].modifiers = color_setting[
                        mode
                      ].modifiers.concat({
                        key: base_modifier.key,
                        default: true,
                        overwritten: false,
                        color: false,
                        var_data: {
                          name: null,
                          value: null,
                        },
                      });
                    });
                  }
                });
              });
            }
            // Add the theme to the new object using its key string as its key value
            if (!theme.key || theme.key === 'default' || theme.key === null) {
              themes['default'] = theme;
            } else {
              themes[theme.key] = theme;
            }
          });
        } else {
          // This ensures there's always at least a default theme to reference, even if there are no styles defined for it
          themes['default'] = { key: 'default' };
        }
        // Overwrite the configured themes with the parsed themes
        validated_config.themes = themes;
        // Now that we've assembled the settings object, check to see if any command line arguments were passed to override them
        // Check for bulk environment arguments
        // Dev
        if (argv.dev === true) {
          validated_config.logging.logs = false;
          validated_config.logging.timers = false;
          validated_config.processing.prefixing = true;
          validated_config.processing.minification = false;
        }
        // Prod
        if (argv.prod === true) {
          validated_config.logging.logs = false;
          validated_config.logging.timers = false;
          validated_config.processing.prefixing = true;
          validated_config.processing.minification = true;
        }
        // Check for individual setting overrides
        // Logs
        if (argv.logs === true) {
          validated_config.logging.logs = true;
        } else if (argv.logs === false || argv.logs === 'false') {
          validated_config.logging.logs = false;
        }
        // Timers
        if (argv.timers === true) {
          validated_config.logging.timers = true;
        } else if (argv.timers === false || argv.timers === 'false') {
          validated_config.logging.timers = false;
        }
        // Prefixing
        if (argv.prefix === true) {
          validated_config.processing.prefixing = true;
        } else if (argv.prefix === false || argv.prefix === 'false') {
          validated_config.processing.prefixing = false;
        }
        // Minification
        if (argv.minify === true) {
          validated_config.processing.minification = true;
        } else if (argv.minify === false || argv.minify === 'false') {
          validated_config.processing.minification = false;
        }
        // Set the clean status
        if (argv.clean === true) {
          validated_config.logging.clean = true;
        } else {
          validated_config.logging.clean = false;
        }
        // Check to see if the clean argument was passed, and if it was, clean the log directory
        delete_logs({ settings: validated_config })
          .then((result) => {
            // If logging is enabled, ensure both the log directory and the specific runtime directory exist
            if (validated_config.logging.logs) {
              if (
                !fs.existsSync(
                  validated_config.output.parsed.string + '/hydrogen-logs'
                )
              ) {
                fs.mkdirSync(
                  validated_config.output.parsed.string + '/hydrogen-logs'
                );
              }
              if (!fs.existsSync(validated_config.logging.directory)) {
                fs.mkdirSync(validated_config.logging.directory);
              }
              // Create a log file containing the parsed settings
              fs.writeFileSync(
                // prettier-ignore
                path.join( validated_config.logging.directory + '/parsed-settings.json' ),
                JSON.stringify(validated_config, null, ' ')
              );
            }
            resolve(validated_config);
          })
          .catch((error) => {
            log_message(error);
          });
      })
      .catch((error) => {
        log_message(error);
      });
  });
}

module.exports = {
  parse_settings,
};
