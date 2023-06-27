// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Logging} Logging
 * @typedef {import('../../../../data/config-data').ParsedLogging} ParsedLogging
 */

// Data imports

// Local functions

// Helper functions
const { generate_date_time } = require('./01-generate-date-time');

// Vendor imports

// Script ==========================================================================================

/**
 * Grabs the default logging configuration data and overwrites it with configurations provided by the user.
 *
 * Requires:
 * - config.output
 * - config.path
 *
 * @param {Config} defaults Hydrogen's default configuration data
 * @param {Config} config The user's configuration file data
 * @returns {ParsedLogging}
 */
function configure_logging(defaults, config) {
  try {
    // Check for logging settings and replace them as necessary
    /** @type {Logging} */
    if (config.logging) {
      if (config.logging.generate_logs != undefined) {
        defaults.logging.generate_logs = config.logging.generate_logs;
      }
      if (config.logging.verbose_console_output != undefined) {
        defaults.logging.verbose_console_output = config.logging.verbose_console_output;
      }
    }
    // Generate and store the appropriate routes for log outputs
    let log_date = generate_date_time();
    defaults.logging.time = log_date;
    defaults.logging.directory = config.output.parsed.string + '/hydrogen-logs/' + log_date;
    // Set the default clean status
    defaults.logging.clean = false;
    // Return the modified settings
    return defaults.logging;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Configuring logging',
        error: error,
      };
    }
  }
}

module.exports = {
  configure_logging,
};
