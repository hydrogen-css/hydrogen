// Hydrogen: Load settings
'use strict';

// Hydrogen type imports
let Settings = require('../../data/settings-model-definition');
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
let settings_data = require('../../data/settings-model');
// Hydrogen function imports
const { date_time } = require('../logs/log-date-time');
const { log_message } = require('../logs/log-message');
const { get_input_path, get_output_path } = require('../generate-paths');
const {
  validate_settings,
} = require('../settings/validation/settings-validation');
const { clean_logs } = require('../clean-logs');
const { base_modifiers } = require('../parse-color');
// Vendor imports
var fs = require('fs');
var path = require('path');

/**
 * Calculates consistent line heights based on a vertical rhythm unit for a font size
 * @param {integer} size
 * @param {float} base_line_height
 * @returns {float} returns a calculated line height based on the font size and vertical rhythm
 */
function calculate_line_height(size, base_line_height) {
  try {
    let line_height_multiple = 0;
    let line_height_counter = 1;
    let line_height;
    do {
      line_height_multiple = base_line_height * line_height_counter;
      if (line_height_multiple < size) {
        line_height_counter = line_height_counter + 1;
      } else {
        line_height = line_height_multiple / size;
        return line_height;
      }
    } while (line_height_multiple < size);
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Line height calculation',
      message: error,
    });
    return false;
  }
}

/**
 * Loads the user's settings and modifies the object based on command line arguments
 * @param {["process path", "file path", "arguments"]} args node location, process location, args...
 * @returns {Settings | false} a modified settings object
 */
function parse_settings(args) {
  try {
    /** @type {Config} */
    let settings;
    // Create variables for both the user's settings file path and its directory
    let settings_path = '';
    let settings_directory = '';
    // Grab arguments passed to the command
    const argv = require('yargs/yargs')(args.slice(2)).argv;
    // Locate the configuration file by checking arguments, the process directory, and the process' parent directory in that order
    if (argv.config) {
      // The user passed a config path, so check for it and parse it to JSON
      // prettier-ignore
      if (fs.existsSync(path.resolve(process.cwd(), argv.config, 'hydrogen.config.json')) === true) {
        settings = JSON.parse(
          fs.readFileSync(
            path.resolve(process.cwd(), argv.config, 'hydrogen.config.json')
          )
        );
        // Set the path and directory values
        settings_path = path.resolve(
          process.cwd(),
          argv.config,
          'hydrogen.config.json'
        );
        settings_directory = path.resolve(process.cwd(), argv.config);
      } else {
        // Log that Hydrogen couldn't find a settings file in the directory it was passed
        log_message({
          type: 'error',
          message:
            "Hydrogen couldn't find a configuration file in the directory you passed as a command line argument.",
          step: 'Loading settings',
          files: [
            path.resolve(process.cwd(), argv.config, 'hydrogen.config.json'),
          ],
        });
        return false;
      }
    } else {
      // Since an argument wasn't passed, check the process' location, and if that fails, check the parent directory
      if (
        // Check current working directory
        fs.existsSync(path.resolve(process.cwd(), 'hydrogen.config.json')) ===
        true
      ) {
        settings = JSON.parse(
          fs.readFileSync(path.resolve(process.cwd(), 'hydrogen.config.json'))
        );
        // Set the path and directory values
        settings_path = path.resolve(process.cwd(), 'hydrogen.config.json');
        settings_directory = path.resolve(process.cwd());
      } else if (
        // Check parent directory
        fs.existsSync(
          path.resolve(process.cwd(), '..', 'hydrogen.config.json')
        ) === true
      ) {
        settings = JSON.parse(
          fs.readFileSync(
            path.resolve(process.cwd(), '..', 'hydrogen.config.json')
          )
        );
        // Set the path and directory values
        settings_path = path.resolve(
          process.cwd(),
          '..',
          'hydrogen.config.json'
        );
        settings_directory = path.resolve(process.cwd(), '..');
      } else {
        // No settings file was found at all, so error out
        log_message({
          type: 'error',
          message:
            "Hydrogen couldn't find a configuration file in your current directory or its parent. Please run npx h2-init to create one.",
          step: 'Loading settings',
          files: [
            path.resolve(process.cwd(), 'hydrogen.config.json'),
            path.resolve(process.cwd(), '..', 'hydrogen.config.json'),
          ],
        });
        return false;
      }
    }
    // Validate that their settings are valid
    let validation = validate_settings(settings, [settings_path]);
    if (validation) {
      // Set the configuration paths
      settings.config = {
        directory: settings_directory,
        path: settings_path,
      };
      // Build data - build data has been broken out and moved around to make more sense
      // Modes
      let default_modes = settings_data.modes;
      if (settings.modes) {
        if (settings.modes.dark) {
          if (settings.modes.dark.automatic) {
            default_modes.dark.automatic = settings.modes.dark.automatic;
          }
          if (settings.modes.dark.method) {
            default_modes.dark.method = settings.modes.dark.method;
          }
        }
      }
      // Processing
      let default_processing = settings_data.processing;
      if (settings.processing) {
        if (settings.processing.reset_styles) {
          default_processing.reset_styles = settings.processing.reset_styles;
        }
        if (settings.processing.validation) {
          default_processing.validation = settings.processing.validation;
        }
        if (settings.processing.prefixing) {
          default_processing.prefixing = settings.processing.prefixing;
        }
        if (settings.processing.minification) {
          default_processing.minification = settings.processing.minification;
        }
        if (settings.processing.var_export) {
          default_processing.var_export = settings.processing.var_export;
        }
      }
      // Logs
      let default_logging = settings_data.logging;
      if (settings.logging) {
        if (settings.logging.logs) {
          default_logging.logs = settings.logging.logs;
        }
        if (settings.logging.timers) {
          default_logging.timers = settings.logging.timers;
        }
      }
      // Now apply the defaults (or modified defaults) to the settings object
      settings.modes = default_modes;
      settings.processing = default_processing;
      settings.logging = default_logging;
      // Media data - media is its own independent object, and the base query is stored there now
      let default_media = settings_data.media;
      if (settings.media) {
        if (settings.media.base_key) {
          default_media.base_key = settings.media.base_key;
        }
        if (settings.media.queries && settings.media.queries.length > 0) {
          default_media.queries = [
            {
              key: default_media.base_key,
              query: 'base',
            },
          ].concat(settings.media.queries);
        } else {
          default_media.queries = [
            {
              key: default_media.base_key,
              query: 'base',
            },
          ].concat(default_media.queries);
        }
      }
      settings.media = default_media;
      // Now that we've assembled the settings object, check to see if any command line arguments were passed to override them
      // Check for bulk environment arguments
      // Dev
      if (argv.dev === true) {
        settings.logging.logs = false;
        settings.logging.timers = false;
        settings.processing.validation = true;
        settings.processing.prefixing = true;
        settings.processing.minification = false;
      }
      // Prod
      if (argv.prod === true) {
        settings.logging.logs = false;
        settings.logging.timers = false;
        settings.processing.validation = true;
        settings.processing.prefixing = true;
        settings.processing.minification = true;
      }
      // Check for individual setting overrides
      // Logs
      if (argv.logs === true) {
        settings.logging.logs = true;
      } else if (argv.logs === false || argv.logs === 'false') {
        settings.logging.logs = false;
      }
      // Timers
      if (argv.timers === true) {
        settings.logging.timers = true;
      } else if (argv.timers === false || argv.timers === 'false') {
        settings.logging.timers = false;
      }
      // Validation
      if (argv.validate === true) {
        settings.processing.validation = true;
      } else if (argv.validate === false || argv.validate === 'false') {
        settings.processing.validation = false;
      }
      // Prefixing
      if (argv.prefix === true) {
        settings.processing.prefixing = true;
      } else if (argv.prefix === false || argv.prefix === 'false') {
        settings.processing.prefixing = false;
      }
      // Minification
      if (argv.minify === true) {
        settings.processing.minification = true;
      } else if (argv.minify === false || argv.minify === 'false') {
        settings.processing.minification = false;
      }
      // Create usable data for the input
      let input_array = get_input_path(settings, 'array');
      let input_string = get_input_path(settings, 'string');
      let input_glob = get_input_path(settings, 'glob');
      // Create usable data for the output
      let output_array = get_output_path(settings, 'array');
      let output_string = get_output_path(settings, 'string');
      let output_glob = get_output_path(settings, 'glob');
      // Overwrite the input and output data with the newly constructed information
      settings.input = {
        raw: settings.input,
        parsed: {
          array: input_array,
          string: input_string,
          glob: input_glob,
        },
      };
      settings.output = {
        raw: settings.output,
        parsed: {
          array: output_array,
          string: output_string,
          glob: output_glob,
        },
      };
      // Set the clean status, as well as generate this run's log metadata
      let clean_status = false;
      if (argv.clean === true) {
        clean_status = true;
      }
      let log_date = date_time();
      let log_directory = output_string + '/hydrogen-logs/' + log_date;
      // Add the clean status and metadata
      settings.logging.clean = clean_status;
      settings.logging.time = log_date;
      settings.logging.directory = log_directory;
      // Configured themes start as arrays, but this parser moves them to an object using their configured key string as their key value
      let themes = {};
      if (settings.themes && settings.themes.length > 0) {
        settings.themes.forEach(function (theme) {
          // Check for and assemble typography
          if (theme.typography && theme.typography.length > 0) {
            theme.typography.forEach(function (type_setting) {
              // Grab the matching query
              settings.media.queries.forEach(function (query) {
                if (type_setting.query_key === query.key) {
                  type_setting.query = query.query;
                }
              });
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
              // prettier-ignore
              type_setting.h6 = {
                size: 'calc((1 * ' + type_setting.type_scale + ' ) * 1rem)',
                line_height: calculate_line_height(h6_size, type_setting.line_height),
              }
              // Heading 5 font size and line height
              let h5_size = h6_size * type_setting.type_scale;
              // prettier-ignore
              type_setting.h5 = {
                size: 'calc(var(--h2-font-size-h6) * ' + type_setting.type_scale + ' )',
                line_height: calculate_line_height(h5_size, type_setting.line_height),
              }
              // Heading 4 font size and line height
              let h4_size = h5_size * type_setting.type_scale;
              // prettier-ignore
              type_setting.h4 = {
                size: 'calc(var(--h2-font-size-h5) * ' + type_setting.type_scale + ' )',
                line_height: calculate_line_height(h4_size, type_setting.line_height)
              }
              // Heading 3 font size and line height
              let h3_size = h4_size * type_setting.type_scale;
              // prettier-ignore
              type_setting.h3 = {
                size: 'calc(var(--h2-font-size-h4) * ' + type_setting.type_scale + ' )',
                line_height: calculate_line_height(h3_size, type_setting.line_height),
              }
              // Heading 2 font size and line height
              let h2_size = h3_size * type_setting.type_scale;
              // prettier-ignore
              type_setting.h2 = {
                size: 'calc(var(--h2-font-size-h3) * ' + type_setting.type_scale + ' )',
                line_height: calculate_line_height( h2_size, type_setting.line_height),
              }
              // Heading 1 font size and line height
              let h1_size = h2_size * type_setting.type_scale;
              // prettier-ignore
              type_setting.h1 = {
                size: 'calc(var(--h2-font-size-h2) * ' + type_setting.type_scale + ' )',
                line_height: calculate_line_height(h1_size, type_setting.line_height),
              }
              // Display font size and line height
              let display_size = h1_size * type_setting.type_scale;
              // prettier-ignore
              type_setting.display = {
                size: 'calc(var(--h2-font-size-h1) * ' + type_setting.type_scale + ' )',
                line_height: calculate_line_height(display_size, type_setting.line_height),
              }
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
                  base_modifiers.forEach(function (base_modifier) {
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
                  base_modifiers.forEach(function (base_modifier) {
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
      settings.themes = themes;
      // Check to see if the clean argument was passed, and if it was, clean the log directory
      if (settings.logging.clean) {
        clean_logs(settings);
      }
      // If logging is enabled, ensure both the log directory and the specific runtime directory exist
      if (settings.logging.logs) {
        // prettier-ignore
        if (!fs.existsSync(settings.output.parsed.string + '/hydrogen-logs')) {
          fs.mkdirSync(settings.output.parsed.string + '/hydrogen-logs');
        }
        if (!fs.existsSync(settings.logging.directory)) {
          fs.mkdirSync(settings.logging.directory);
        }
        // Create a log file containing the parsed settings
        fs.writeFileSync(
          // prettier-ignore
          path.join( settings.logging.directory + '/parsed-settings.json' ),
          JSON.stringify(settings, null, ' ')
        );
      }
      // Return the modified settings object
      return settings;
    } else {
      // Settings validation failed, so throw an error
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Loading settings',
      files: [
        path.resolve(process.cwd(), 'hydrogen.config.json'),
        path.resolve(process.cwd(), '..', 'hydrogen.config.json'),
      ],
    });
    return false;
  }
}

module.exports = {
  parse_settings,
};
