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
// Vendor imports
var fs = require('fs');
var path = require('path');

/**
 * Loads the user's settings and modifies the object based on command line arguments
 * @param {["process path", "file path", "arguments"]} args node location, process location, args...
 * @returns {Settings} a modified settings object
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
    // Now that we have the user's settings, load the default build settings from the model to account for omitted optional values
    let default_build_data = settings_data.build;
    // Check to see if the user included the build settings, and if they did, replace the defaults with their choices
    if (settings.build) {
      // Base query key
      if (settings.build.base_query_key != null) {
        default_build_data.base_query_key = settings.build.base_query_key;
      }
      // This is for dev purposes, but check for an argument being passed that overwrites the settings file
      if (argv.qkey) {
        default_build_data.base_query_key = argv.qkey;
      }
      // Dark mode
      if (settings.build.dark_mode != null) {
        default_build_data.dark_mode = settings.build.dark_mode;
      }
      // Log generation
      if (settings.build.logs != null) {
        default_build_data.logs = settings.build.logs;
      }
      // Minification
      if (settings.build.minification != null) {
        default_build_data.minification = settings.build.minification;
      }
      // Prefixing
      if (settings.build.prefixing != null) {
        default_build_data.prefixing = settings.build.prefixing;
      }
      // Timer logging
      if (settings.build.timers != null) {
        default_build_data.timers = settings.build.timers;
      }
      // Reset styles
      if (settings.build.reset_styles != null) {
        default_build_data.reset_styles = settings.build.reset_styles;
      }
      // Validation
      if (settings.build.validation != null) {
        default_build_data.validation = settings.build.validation;
      }
      // Variable file export
      if (settings.build.var_export != null) {
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
    // Return the modified settings object
    return settings;
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
