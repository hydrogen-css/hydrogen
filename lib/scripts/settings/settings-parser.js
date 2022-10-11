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
    /**
     * Create a settings object to populate
     * @type {Settings}
     */
    let settings;
    // Create variables for both the user's settings file path and its directory
    let settings_path = '';
    let settings_directory = '';
    // Grab arguments passed to the command
    const argv = require('yargs/yargs')(args.slice(2)).argv;
    // Locate the configuration file by checking arguments, the process directory, and the process' parent directory in that order
    if (argv.config) {
      // The user passed a config path, so check for it and parse it to JSON
      if (
        fs.existsSync(
          path.resolve(process.cwd(), argv.config, 'hydrogen.config.json')
        ) === true
      ) {
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
    if (validation === true) {
      // Now that we have the user's settings, load the default build settings from the model to account for omitted optional values
      let default_build_data = settings_data.build;
      // Check to see if the user included the build settings, and if they did, replace the defaults with their choices
      if (settings.build) {
        // Base query key
        if (settings.build.base_query_key) {
          default_build_data.base_query_key = settings.build.base_query_key;
        }
        // This is for dev purposes, but check for an argument being passed that overwrites the settings file
        if (argv.qkey) {
          default_build_data.base_query_key = argv.qkey;
        }
        // Dark mode
        if (settings.build.modes && settings.build.modes.dark) {
          default_build_data.modes.dark = settings.build.modes.dark;
        }
        // Log generation
        if (settings.build.logs) {
          default_build_data.logs = settings.build.logs;
        }
        // Minification
        if (settings.build.minification) {
          default_build_data.minification = settings.build.minification;
        }
        // Prefixing
        if (settings.build.prefixing) {
          default_build_data.prefixing = settings.build.prefixing;
        }
        // Timer logging
        if (settings.build.timers) {
          default_build_data.timers = settings.build.timers;
        }
        // Reset styles
        if (settings.build.reset_styles) {
          default_build_data.reset_styles = settings.build.reset_styles;
        }
        // Validation
        if (settings.build.validation) {
          default_build_data.validation = settings.build.validation;
        }
        // Variable file export
        if (settings.build.var_export) {
          default_build_data.var_export = settings.build.var_export;
        }
      }
      // Now apply the defaults (or modified defaults) to the settings object
      settings.build = default_build_data;
      // Create the base query and add it to the beginning of the media settings
      if (
        settings.styles.foundations.media == null ||
        settings.styles.foundations.media.length === 0
      ) {
        // The user hasn't set any other queries
        settings.styles.foundations.media = [
          {
            key: default_build_data.base_query_key,
            query: 'base',
          },
        ];
      } else {
        // The user has set custom queries
        settings.styles.foundations.media = [
          {
            key: default_build_data.base_query_key,
            query: 'base',
          },
        ].concat(settings.styles.foundations.media);
      }
      // Check to ensure a typography object was set
      if (
        settings.styles.foundations.typography &&
        settings.styles.foundations.typography.length > 0
      ) {
        // Loop through each typography object and grab its query string, generate font sizes, and generate line heights
        settings.styles.foundations.typography.forEach(function (type_setting) {
          // Loop through the media object to find a matching query key
          settings.styles.foundations.media.forEach(function (query) {
            if (query.key === type_setting.query_key) {
              type_setting.query = query.query;
            }
          });
          // Caption font size and line height
          type_setting.caption = {};
          let caption_size = 1 / type_setting.type_scale;
          type_setting.caption.size =
            'calc((1 / ' + type_setting.type_scale + ' ) * 1rem)';
          type_setting.caption.line_height = 'var(--h2-base-line-height)';
          // Copy font size and line height
          type_setting.copy = {};
          let copy_size = 1;
          type_setting.copy.size = '1rem';
          type_setting.copy.line_height = 'var(--h2-base-line-height)';
          // Heading 6 font size and line height
          type_setting.h6 = {};
          let h6_size = 1 * type_setting.type_scale;
          type_setting.h6.size =
            'calc((1 * ' + type_setting.type_scale + ' ) * 1rem)';
          type_setting.h6.line_height = calculate_line_height(
            h6_size,
            type_setting.line_height
          );
          // Heading 5 font size and line height
          type_setting.h5 = {};
          let h5_size = h6_size * type_setting.type_scale;
          type_setting.h5.size =
            'calc(var(--h2-font-size-h6) * ' + type_setting.type_scale + ' )';
          type_setting.h5.line_height = calculate_line_height(
            h5_size,
            type_setting.line_height
          );
          // Heading 4 font size and line height
          type_setting.h4 = {};
          let h4_size = h5_size * type_setting.type_scale;
          type_setting.h4.size =
            'calc(var(--h2-font-size-h5) * ' + type_setting.type_scale + ' )';
          type_setting.h4.line_height = calculate_line_height(
            h4_size,
            type_setting.line_height
          );
          // Heading 3 font size and line height
          type_setting.h3 = {};
          let h3_size = h4_size * type_setting.type_scale;
          type_setting.h3.size =
            'calc(var(--h2-font-size-h4) * ' + type_setting.type_scale + ' )';
          type_setting.h3.line_height = calculate_line_height(
            h3_size,
            type_setting.line_height
          );
          // Heading 2 font size and line height
          type_setting.h2 = {};
          let h2_size = h3_size * type_setting.type_scale;
          type_setting.h2.size =
            'calc(var(--h2-font-size-h3) * ' + type_setting.type_scale + ' )';
          type_setting.h2.line_height = calculate_line_height(
            h2_size,
            type_setting.line_height
          );
          // Heading 1 font size and line height
          type_setting.h1 = {};
          let h1_size = h2_size * type_setting.type_scale;
          type_setting.h1.size =
            'calc(var(--h2-font-size-h2) * ' + type_setting.type_scale + ' )';
          type_setting.h1.line_height = calculate_line_height(
            h1_size,
            type_setting.line_height
          );
          // Display font size and line height
          type_setting.display = {};
          let display_size = h1_size * type_setting.type_scale;
          type_setting.display.size =
            'calc(var(--h2-font-size-h1) * ' + type_setting.type_scale + ' )';
          type_setting.display.line_height = calculate_line_height(
            display_size,
            type_setting.line_height
          );
        });
      }
      // Now that we've assembled the settings object, check to see if any arguments were passed to override those settings
      // Check for bulk environment arguments
      // Dev
      if (argv.dev === true) {
        settings.build.logs = false;
        settings.build.timers = false;
        settings.build.validation = false;
        settings.build.prefixing = true;
        settings.build.minification = false;
      }
      // Prod
      if (argv.prod === true) {
        settings.build.logs = false;
        settings.build.timers = true;
        settings.build.validation = false;
        settings.build.prefixing = true;
        settings.build.minification = true;
      }
      // Check for individual setting overrides
      // Logs
      if (argv.logs === true) {
        settings.build.logs = true;
      } else if (argv.logs === false || argv.logs === 'false') {
        settings.build.logs = false;
      }
      // Timers
      if (argv.timers === true) {
        settings.build.timers = true;
      } else if (argv.timers === false || argv.timers === 'false') {
        settings.build.timers = false;
      }
      // Validation
      if (argv.validate === true) {
        settings.build.validation = true;
      } else if (argv.validate === false || argv.validate === 'false') {
        settings.build.validation = false;
      }
      // Prefixing
      if (argv.prefix === true) {
        settings.build.prefixing = true;
      } else if (argv.prefix === false || argv.prefix === 'false') {
        settings.build.prefixing = false;
      }
      // Minification
      if (argv.minify === true) {
        settings.build.minification = true;
      } else if (argv.minify === false || argv.minify === 'false') {
        settings.build.minification = false;
      }
      // Now that the settings are constructed, build the runtime values
      settings.runtime = {
        themes: {},
        settings: {
          directory: '',
          path: '',
        },
        input: {
          array: [],
          string: '',
          glob: '',
        },
        output: {
          array: [],
          string: '',
          glob: '',
        },
        logging: {
          clean: '',
          time: '',
          directory: '',
        },
      };
      settings.runtime.settings.directory = settings_directory;
      settings.runtime.settings.path = settings_path;
      // Input
      let input_array = get_input_path(settings, 'array');
      let input_string = get_input_path(settings, 'string');
      let input_glob = get_input_path(settings, 'glob');
      // Output
      let output_array = get_output_path(settings, 'array');
      let output_string = get_output_path(settings, 'string');
      let output_glob = get_output_path(settings, 'glob');
      // Logging
      let clean_status = false;
      if (argv.clean === true) {
        clean_status = true;
      }
      let log_date = date_time();
      let log_directory = output_string + '/hydrogen-logs/' + log_date;
      // Build the runtime object
      settings.path = settings_path;
      settings.runtime.input.array = input_array;
      settings.runtime.input.string = input_string;
      settings.runtime.input.glob = input_glob;
      settings.runtime.output.array = output_array;
      settings.runtime.output.string = output_string;
      settings.runtime.output.glob = output_glob;
      settings.runtime.logging.clean = clean_status;
      settings.runtime.logging.time = log_date;
      settings.runtime.logging.directory = log_directory;
      // Check for themes and move them to the runtime
      if (settings.styles.themes && settings.styles.themes.length > 0) {
        settings.styles.themes.forEach(function (theme) {
          if (!theme.key || theme.key === 'default' || theme.key === null) {
            settings.runtime.themes['default'] = theme;
          } else {
            settings.runtime.themes[theme.key] = theme;
          }
          // Check color settings to ensure that the runtime object contains variable export data slots, including modifiers
          if (
            settings.runtime.themes[theme.key].colors &&
            settings.runtime.themes[theme.key].colors.length > 0
          ) {
            settings.runtime.themes[theme.key].colors.forEach(function (
              color_setting
            ) {
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
        });
      } else {
        // This ensures there's always at least a default theme to reference, even if there are no styles defined for it
        settings.runtime.themes['default'] = { key: 'default' };
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
