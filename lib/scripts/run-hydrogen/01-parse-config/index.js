// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/config-data').Config} Config
 * @typedef {import('../../../data/config-data').ParsedConfig} ParsedConfig
 */

// Data imports
let { get_default_config } = require('../../../data/config-data');

// Local functions
const { load_config } = require('./01-load-config');
const { validate_config } = require('./02-validate-config');
const { parse_input_output } = require('./03-parse-input-output');
const { configure_modes } = require('./04-configure-modes');
const { configure_processing } = require('./05-configure-processing');
const { configure_logging } = require('./06-configure-logging');
const { configure_media } = require('./07-configure-media');
const { configure_themes } = require('./08-configure-themes');
const { delete_logs } = require('./09-delete-logs');

// Helper functions
const { log_message } = require('../../console-logging/log-message');
const { log_timer } = require('../../console-logging/log-timer');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script ==========================================================================================

/**
 * Finds a Hydrogen config file and parses it to prepare for attribute parsing and CSS construction.
 *
 * @param {string[]} args node location, process location, args...
 * @returns {ParsedConfig}
 */
function parse_config(args) {
  try {
    // Grab arguments passed to the command
    /** @type {object} */
    const argv = require('yargs/yargs')(args.slice(2)).argv;
    // Create instances of the settings and modifier data
    /** @type {Config} */
    let defaults = get_default_config();
    // Add error and warning storage to the default
    defaults.logging.errors = {
      count: 0,
      storage: [],
    };
    defaults.logging.warnings = {
      count: 0,
      storage: [],
    };
    // Get the user's configuration
    /** @type {Config} */
    let config = load_config(argv);
    // Log that Hydrogen is parsing settings
    if (argv.h2_verbose) {
      if (argv.h2_verbose === true || argv.h2_verbose === 'true') {
        log_message({
          type: 'system',
          step: 'Validating config...',
        });
      }
    } else if (
      (config.logging &&
        config.logging.verbose_console_output &&
        config.logging.verbose_console_output === true) ||
      !config.logging ||
      (config.logging && config.logging.verbose_console_output == undefined)
    ) {
      log_message({
        type: 'system',
        step: 'Validating config...',
      });
    }
    // Validate the user's settings
    /** @type {Config} */
    let validated_config = validate_config(argv, config);
    // let validated_config = config;
    // Initiate the settings parser timer
    const parse_settings_timer_start = process.hrtime.bigint();
    // Log that Hydrogen is parsing settings
    if (argv.h2_verbose) {
      if (argv.h2_verbose === true || argv.h2_verbose === 'true') {
        log_message({
          type: 'system',
          step: 'Parsing config...',
        });
      }
    } else if (
      (config.logging &&
        config.logging.verbose_console_output &&
        config.logging.verbose_console_output === true) ||
      !config.logging ||
      (config.logging && config.logging.verbose_console_output == undefined)
    ) {
      log_message({
        type: 'system',
        step: 'Parsing config...',
      });
    }
    // Grab and parse the input and output values
    let directory_data = parse_input_output(validated_config);
    validated_config.input = directory_data.input;
    validated_config.output = directory_data.output;
    // Grab the default modes and then overwrite them based on the user config
    validated_config.modes = configure_modes(defaults, validated_config);
    // Grab the default processing settings and then overwrite them based on the user config
    validated_config.processing = configure_processing(defaults, validated_config);
    // Grab the default log settings and then overwrite them based on the user config
    validated_config.logging = configure_logging(defaults, validated_config);
    // Media data - media is its own independent object, and the base query is stored there now
    validated_config.media = configure_media(defaults, validated_config);
    // Check for and apply CLI arguments
    // Check for bulk environment arguments
    // Dev
    if (argv.h2_env_dev === true || argv.h2_env_dev === 'true') {
      validated_config.logging.generate_logs = false;
      validated_config.logging.show_timers = false;
      validated_config.logging.verbose_console_output = true;
      validated_config.processing.browser_prefix_css = true;
      validated_config.processing.minify_css = false;
    }
    // Prod
    if (argv.h2_env_prod === true || argv.h2_env_prod === 'true') {
      validated_config.logging.generate_logs = false;
      validated_config.logging.show_timers = false;
      validated_config.logging.verbose_console_output = false;
      validated_config.processing.browser_prefix_css = true;
      validated_config.processing.minify_css = true;
    }
    // Check for individual setting overrides
    // Logs
    if (argv.h2_logs === true || argv.h2_logs === 'true') {
      validated_config.logging.generate_logs = true;
    } else if (argv.h2_logs === false || argv.h2_logs === 'false') {
      validated_config.logging.generate_logs = false;
    }
    // Timers
    if (argv.h2_timers === true || argv.h2_timers === 'true') {
      validated_config.logging.show_timers = true;
    } else if (argv.h2_timers === false || argv.h2_timers === 'false') {
      validated_config.logging.show_timers = false;
    }
    // Verbose output
    if (argv.h2_verbose === true || argv.h2_verbose === 'true') {
      validated_config.logging.verbose_console_output = true;
    } else if (argv.h2_verbose === false || argv.h2_verbose === 'false') {
      validated_config.logging.verbose_console_output = false;
    }
    // Prefixing
    if (argv.h2_prefix === true || argv.h2_prefix === 'true') {
      validated_config.processing.browser_prefix_css = true;
    } else if (argv.h2_prefix === false || argv.h2_prefix === 'false') {
      validated_config.processing.browser_prefix_css = false;
    }
    // Minification
    if (argv.h2_minify === true || argv.h2_minify === 'true') {
      validated_config.processing.minify_css = true;
    } else if (argv.h2_minify === false || argv.h2_minify === 'false') {
      validated_config.processing.minify_css = false;
    }
    // Set the clean status
    if (argv.h2_clean === true || argv.h2_clean === 'true') {
      validated_config.logging.clean = true;
    }
    // Parse and configure themes
    validated_config.themes = configure_themes(defaults, validated_config);
    // Check to see if the clean argument was passed, and if it was, clean the log directory
    delete_logs(validated_config);
    // If logging is enabled, ensure both the log directory and the specific runtime directory exist
    if (validated_config.logging.generate_logs) {
      if (!fs.existsSync(validated_config.output.parsed.string + '/hydrogen-logs')) {
        fs.mkdirSync(validated_config.output.parsed.string + '/hydrogen-logs');
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
    // End the settings parser timer and log the time
    const parse_settings_timer_end = process.hrtime.bigint();
    log_timer({
      settings: validated_config,
      step: 'Parsing config',
      times: {
        start: parse_settings_timer_start,
        end: parse_settings_timer_end,
      },
    });
    return validated_config;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing config',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_config,
};
