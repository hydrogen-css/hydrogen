// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('../../data/modifiers-model-definition').Modifiers} Modifiers
 * @typedef {import('../../data/modifiers-model-definition').Modifier} Modifier
 */

// Data imports
let { get_settings_data } = require('../../data/settings-model');
let { get_modifier_data } = require('../../data/modifiers-model');

// Logging
const { log_message } = require('../logging/log-message');
const { log_timer } = require('../logging/log-timer');

// Functions
const { load_user_settings } = require('./load-user-settings');
const { validate_user_settings } = require('./validation/validate-user-settings');
const { parse_input } = require('../helpers/parse-input');
const { parse_output } = require('../helpers/parse-output');
const { generate_date_time } = require('../helpers/generate-date-time');
const { calculate_line_height } = require('../helpers/calculate-line-height');
const { delete_logs } = require('../helpers/delete-logs');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script
/**
 * Loads the user's settings and modifies the object based on command line arguments
 * @param {string[]} args node location, process location, args...
 * @returns {Settings}
 */
function parse_user_settings(args) {
  try {
    // Grab arguments passed to the command
    /** @type {object} */
    const argv = require('yargs/yargs')(args.slice(2)).argv;
    // Create instances of the settings and modifier data
    let settings_data = get_settings_data();
    let modifier_data = get_modifier_data();
    // Get the user's configuration
    let user_configuration = load_user_settings(argv);
    // Log that Hydrogen is parsing settings
    if (argv.h2_verbose) {
      if (argv.h2_verbose === true || argv.h2_verbose === 'true') {
        console.log('argv is true for some reason');
        log_message({
          type: 'system',
          step: 'Validating settings...',
        });
      }
    } else if (
      (user_configuration.logging &&
        user_configuration.logging.verbose_console_output &&
        user_configuration.logging.verbose_console_output === true) ||
      !user_configuration.logging ||
      (user_configuration.logging && user_configuration.logging.verbose_console_output == undefined)
    ) {
      log_message({
        type: 'system',
        step: 'Validating settings...',
      });
    }
    // Validate the user's settings
    let validated_user_configuration = validate_user_settings(argv, user_configuration);
    // let validated_user_configuration = user_configuration;
    // Initiate the settings parser timer
    const parse_settings_timer_start = process.hrtime.bigint();
    // Log that Hydrogen is parsing settings
    if (argv.h2_verbose) {
      if (argv.h2_verbose === true || argv.h2_verbose === 'true') {
        log_message({
          type: 'system',
          step: 'Parsing settings...',
        });
      }
    } else if (
      (user_configuration.logging &&
        user_configuration.logging.verbose_console_output &&
        user_configuration.logging.verbose_console_output === true) ||
      !user_configuration.logging ||
      (user_configuration.logging && user_configuration.logging.verbose_console_output == undefined)
    ) {
      log_message({
        type: 'system',
        step: 'Parsing settings...',
      });
    }
    // Grab the default modes and then overwrite them based on the user config
    let modes_config = settings_data.modes;
    if (validated_user_configuration.modes) {
      if (validated_user_configuration.modes.method) {
        modes_config.method = validated_user_configuration.modes.method;
      }
      if (validated_user_configuration.modes.dark) {
        if (validated_user_configuration.modes.dark.auto_apply_styles != undefined) {
          modes_config.dark.auto_apply_styles =
            validated_user_configuration.modes.dark.auto_apply_styles;
        }
      }
    }
    validated_user_configuration.modes = modes_config;
    // Grab the default processing settings and then overwrite them based on the user config
    let processing_config = settings_data.processing;
    if (validated_user_configuration.processing) {
      if (validated_user_configuration.processing.include_reset_css != undefined) {
        processing_config.include_reset_css =
          validated_user_configuration.processing.include_reset_css;
      }
      if (validated_user_configuration.processing.browser_prefix_css != undefined) {
        processing_config.browser_prefix_css =
          validated_user_configuration.processing.browser_prefix_css;
      }
      if (validated_user_configuration.processing.minify_css != undefined) {
        processing_config.minify_css = validated_user_configuration.processing.minify_css;
      }
      if (validated_user_configuration.processing.export_variable_file != undefined) {
        processing_config.export_variable_file =
          validated_user_configuration.processing.export_variable_file;
      }
    }
    validated_user_configuration.processing = processing_config;
    // Grab the default log settings and then overwrite them based on the user config
    let logging_config = settings_data.logging;
    if (validated_user_configuration.logging) {
      if (validated_user_configuration.logging.generate_logs != undefined) {
        logging_config.generate_logs = validated_user_configuration.logging.generate_logs;
      }
      if (validated_user_configuration.logging.show_timers != undefined) {
        logging_config.show_timers = validated_user_configuration.logging.show_timers;
      }
      if (validated_user_configuration.logging.verbose_console_output != undefined) {
        logging_config.verbose_console_output =
          validated_user_configuration.logging.verbose_console_output;
      }
    }
    validated_user_configuration.logging = logging_config;
    // Media data - media is its own independent object, and the base query is stored there now
    let media_config = settings_data.media;
    if (validated_user_configuration.media) {
      if (validated_user_configuration.media.base_key) {
        media_config.base_key = validated_user_configuration.media.base_key;
      }
      if (
        validated_user_configuration.media.queries &&
        validated_user_configuration.media.queries.length > 0
      ) {
        media_config.queries = [
          {
            key: media_config.base_key,
            query: 'base',
          },
        ].concat(validated_user_configuration.media.queries);
      } else {
        media_config.queries = [
          {
            key: media_config.base_key,
            query: 'base',
          },
        ].concat(media_config.queries);
      }
    }
    validated_user_configuration.media = media_config;
    // Create usable data for the input
    let input_data = parse_input({ settings: validated_user_configuration });
    let input_array = input_data.array;
    let input_string = input_data.string;
    let input_glob = input_data.glob;
    // Create usable data for the output
    let output_data = parse_output({ settings: validated_user_configuration });
    let output_array = output_data.array;
    let output_string = output_data.string;
    let output_glob = output_data.glob;
    // Overwrite the input and output data with the newly constructed information
    validated_user_configuration.input = {
      raw: validated_user_configuration.input,
      parsed: {
        array: input_array,
        string: input_string,
        glob: input_glob,
      },
    };
    validated_user_configuration.output = {
      raw: validated_user_configuration.output,
      parsed: {
        array: output_array,
        string: output_string,
        glob: output_glob,
      },
    };
    // Generate and store the appropriate routes for log outputs
    let log_date = generate_date_time({
      settings: validated_user_configuration,
    });
    let log_directory = output_string + '/hydrogen-logs/' + log_date;
    validated_user_configuration.logging.time = log_date;
    validated_user_configuration.logging.directory = log_directory;
    // Configured themes start as arrays, but this parser moves them to an object using their configured key string as their key value
    let themes = {};
    if (validated_user_configuration.themes && validated_user_configuration.themes.length > 0) {
      validated_user_configuration.themes.forEach(function (theme) {
        // Check for and assemble typography
        if (theme.typography && theme.typography.length > 0) {
          theme.typography.forEach(function (type_setting) {
            // Grab the matching query
            validated_user_configuration.media.queries.forEach(function (query) {
              if (type_setting.query_key === query.key) {
                type_setting.query = query.query;
              }
            });
            let numeric_line_height = settings_data.processing.default_line_height;
            if (type_setting.line_heights && type_setting.line_heights.copy) {
              numeric_line_height = parseFloat(type_setting.line_heights.copy);
            } else if (type_setting.line_height) {
              numeric_line_height = parseFloat(type_setting.line_height);
            }
            // Caption font size and line height
            let caption_size = 1 / type_setting.type_scale;
            let caption_line_height = 'calc(var(--h2-base-line-height) * 1rem)';
            if (type_setting.line_heights && type_setting.line_heights.caption) {
              if (type_setting.line_heights.caption != 'auto') {
                caption_line_height = parseFloat(type_setting.line_heights.caption);
              }
            }
            type_setting.caption = {
              size: 'calc((' + caption_size + ') * 1rem)',
              line_height: caption_line_height,
            };
            // Copy font size and line height
            let copy_size = 1;
            let copy_line_height = 'var(--h2-base-line-height)';
            if (type_setting.line_heights && type_setting.line_heights.copy) {
              if (type_setting.line_heights.copy != 'auto') {
                copy_line_height = parseFloat(type_setting.line_heights.copy);
              }
            }
            type_setting.copy = {
              size: copy_size + 'rem',
              line_height: copy_line_height,
            };
            // Heading 6 font size and line height
            let h6_size = 1 * type_setting.type_scale;
            let h6_line_height = calculate_line_height({
              settings: validated_user_configuration,
              font_size: h6_size,
              base_line_height: numeric_line_height,
            });
            if (type_setting.line_heights && type_setting.line_heights.h6) {
              if (type_setting.line_heights.h6 != 'auto') {
                h6_line_height = parseFloat(type_setting.line_heights.h6);
              }
            }
            type_setting.h6 = {
              size: 'calc((1 * ' + type_setting.type_scale + ') * 1rem)',
              line_height: h6_line_height,
            };
            // Heading 5 font size and line height
            let h5_size = h6_size * type_setting.type_scale;
            let h5_line_height = calculate_line_height({
              settings: validated_user_configuration,
              font_size: h5_size,
              base_line_height: numeric_line_height,
            });
            if (type_setting.line_heights && type_setting.line_heights.h5) {
              if (type_setting.line_heights.h5 != 'auto') {
                h5_line_height = parseFloat(type_setting.line_heights.h5);
              }
            }
            type_setting.h5 = {
              size: 'calc(var(--h2-font-size-h6) * ' + type_setting.type_scale + ')',
              line_height: h5_line_height,
            };
            // Heading 4 font size and line height
            let h4_size = h5_size * type_setting.type_scale;
            let h4_line_height = calculate_line_height({
              settings: validated_user_configuration,
              font_size: h4_size,
              base_line_height: numeric_line_height,
            });
            if (type_setting.line_heights && type_setting.line_heights.h4) {
              if (type_setting.line_heights.h4 != 'auto') {
                h4_line_height = parseFloat(type_setting.line_heights.h4);
              }
            }
            type_setting.h4 = {
              size: 'calc(var(--h2-font-size-h5) * ' + type_setting.type_scale + ')',
              line_height: h4_line_height,
            };
            // Heading 3 font size and line height
            let h3_size = h4_size * type_setting.type_scale;
            let h3_line_height = calculate_line_height({
              settings: validated_user_configuration,
              font_size: h3_size,
              base_line_height: numeric_line_height,
            });
            if (type_setting.line_heights && type_setting.line_heights.h3) {
              if (type_setting.line_heights.h3 != 'auto') {
                h3_line_height = parseFloat(type_setting.line_heights.h3);
              }
            }
            type_setting.h3 = {
              size: 'calc(var(--h2-font-size-h4) * ' + type_setting.type_scale + ')',
              line_height: h3_line_height,
            };
            // Heading 2 font size and line height
            let h2_size = h3_size * type_setting.type_scale;
            let h2_line_height = calculate_line_height({
              settings: validated_user_configuration,
              font_size: h2_size,
              base_line_height: numeric_line_height,
            });
            if (type_setting.line_heights && type_setting.line_heights.h2) {
              if (type_setting.line_heights.h2 != 'auto') {
                h2_line_height = parseFloat(type_setting.line_heights.h2);
              }
            }
            type_setting.h2 = {
              size: 'calc(var(--h2-font-size-h3) * ' + type_setting.type_scale + ')',
              line_height: h2_line_height,
            };
            // Heading 1 font size and line height
            let h1_size = h2_size * type_setting.type_scale;
            let h1_line_height = calculate_line_height({
              settings: validated_user_configuration,
              font_size: h1_size,
              base_line_height: numeric_line_height,
            });
            if (type_setting.line_heights && type_setting.line_heights.h1) {
              if (type_setting.line_heights.h1 != 'auto') {
                h1_line_height = parseFloat(type_setting.line_heights.h1);
              }
            }
            type_setting.h1 = {
              size: 'calc(var(--h2-font-size-h2) * ' + type_setting.type_scale + ')',
              line_height: h1_line_height,
            };
            // Display font size and line height
            let display_size = h1_size * type_setting.type_scale;
            let display_line_height = calculate_line_height({
              settings: validated_user_configuration,
              font_size: display_size,
              base_line_height: numeric_line_height,
            });
            if (type_setting.line_heights && type_setting.line_heights.display) {
              if (type_setting.line_heights.display != 'auto') {
                display_line_height = parseFloat(type_setting.line_heights.display);
              }
            }
            type_setting.display = {
              size: 'calc(var(--h2-font-size-h1) * ' + type_setting.type_scale + ')',
              line_height: display_line_height,
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
                  color_setting[mode].modifiers.forEach(function (modifier_setting) {
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
                    color_setting[mode].modifiers = color_setting[mode].modifiers.concat({
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
                color_setting[mode].modifiers.forEach(function (modifier_setting) {
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
                  color_setting[mode].modifiers = color_setting[mode].modifiers.concat({
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
              } else if (
                validated_user_configuration.modes.dark.swap_default_modifiers === true &&
                mode === 'dark'
              ) {
                // This added else/if accounts for automated color modifier generation in instances where there is no dark mode set for a color configuration (it creates one for the color so that the automated modifiers are placed properly)
                color_setting['dark'] = {
                  color: color_setting['default'].color,
                  modifiers: [],
                };
                modifier_data.forEach(function (base_modifier) {
                  color_setting[mode].modifiers = color_setting[mode].modifiers.concat({
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
    validated_user_configuration.themes = themes;
    // Now that we've assembled the settings object, check to see if any command line arguments were passed to override them
    // Check for bulk environment arguments
    // Dev
    if (argv.h2_env_dev === true || argv.h2_env_dev === 'true') {
      validated_user_configuration.logging.generate_logs = false;
      validated_user_configuration.logging.show_timers = false;
      validated_user_configuration.logging.verbose_console_output = true;
      validated_user_configuration.processing.browser_prefix_css = true;
      validated_user_configuration.processing.minify_css = false;
    }
    // Prod
    if (argv.h2_env_prod === true || argv.h2_env_prod === 'true') {
      validated_user_configuration.logging.generate_logs = false;
      validated_user_configuration.logging.show_timers = false;
      validated_user_configuration.logging.verbose_console_output = false;
      validated_user_configuration.processing.browser_prefix_css = true;
      validated_user_configuration.processing.minify_css = true;
    }
    // Check for individual setting overrides
    // Logs
    if (argv.h2_logs === true || argv.h2_logs === 'true') {
      validated_user_configuration.logging.generate_logs = true;
    } else if (argv.h2_logs === false || argv.h2_logs === 'false') {
      validated_user_configuration.logging.generate_logs = false;
    }
    // Timers
    if (argv.h2_timers === true || argv.h2_timers === 'true') {
      validated_user_configuration.logging.show_timers = true;
    } else if (argv.h2_timers === false || argv.h2_timers === 'false') {
      validated_user_configuration.logging.show_timers = false;
    }
    // Verbose output
    if (argv.h2_verbose === true || argv.h2_verbose === 'true') {
      validated_user_configuration.logging.verbose_console_output = true;
    } else if (argv.h2_verbose === false || argv.h2_verbose === 'false') {
      validated_user_configuration.logging.verbose_console_output = false;
    }
    // Prefixing
    if (argv.h2_prefix === true || argv.h2_prefix === 'true') {
      validated_user_configuration.processing.browser_prefix_css = true;
    } else if (argv.h2_prefix === false || argv.h2_prefix === 'false') {
      validated_user_configuration.processing.browser_prefix_css = false;
    }
    // Minification
    if (argv.h2_minify === true || argv.h2_minify === 'true') {
      validated_user_configuration.processing.minify_css = true;
    } else if (argv.h2_minify === false || argv.h2_minify === 'false') {
      validated_user_configuration.processing.minify_css = false;
    }
    // Set the clean status
    if (argv.h2_clean === true || argv.h2_clean === 'true') {
      validated_user_configuration.logging.clean = true;
    } else {
      validated_user_configuration.logging.clean = false;
    }
    // Check to see if the clean argument was passed, and if it was, clean the log directory
    delete_logs({ settings: validated_user_configuration });
    // If logging is enabled, ensure both the log directory and the specific runtime directory exist
    if (validated_user_configuration.logging.generate_logs) {
      if (!fs.existsSync(validated_user_configuration.output.parsed.string + '/hydrogen-logs')) {
        fs.mkdirSync(validated_user_configuration.output.parsed.string + '/hydrogen-logs');
      }
      if (!fs.existsSync(validated_user_configuration.logging.directory)) {
        fs.mkdirSync(validated_user_configuration.logging.directory);
      }
      // Create a log file containing the parsed settings
      fs.writeFileSync(
        // prettier-ignore
        path.join( validated_user_configuration.logging.directory + '/parsed-settings.json' ),
        JSON.stringify(validated_user_configuration, null, ' ')
      );
    }
    // End the settings parser timer and log the time
    const parse_settings_timer_end = process.hrtime.bigint();
    log_timer({
      settings: validated_user_configuration,
      step: 'Parsing settings',
      times: {
        start: parse_settings_timer_start,
        end: parse_settings_timer_end,
      },
    });
    return validated_user_configuration;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing settings',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_user_settings,
};
