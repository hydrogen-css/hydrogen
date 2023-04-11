// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/config-data').ParsedConfig} ParsedConfig
 */

// Data imports

// Local functions

// Helper functions
const { headers } = require('../log-styles');

// Vendor imports
var colors = require('colors');

// Script ==========================================================================================

/**
 * Logs the time, in ms, it took to complete a build step.
 *
 * @param {object} args
 * @param {ParsedConfig} args.config
 * @param {string} args.step
 * @param {object} args.times
 * @param {number} args.times.start
 * @param {number} args.times.end
 * @returns {boolean}
 */
function log_timer(args) {
  try {
    // Start by checking if timer output has been silenced
    let enabled = true;
    if (args.config.logging.show_timers === false) {
      enabled = false;
    }
    // If the timers are enabled, run the log
    if (enabled) {
      // Create the readable time format
      let ms = (args.times.end - args.times.start) / BigInt(1000000);
      ms = Number(ms);
      let time_value = colors.cyan(ms.toString());
      let constructed_value = '';
      if (time_value.length === 11) {
        constructed_value = colors.dim('000') + time_value;
      }
      if (time_value.length === 12) {
        constructed_value = colors.dim('00') + time_value;
      }
      if (time_value.length === 13) {
        constructed_value = colors.dim('0') + time_value;
      }
      if (time_value.length >= 14) {
        constructed_value = time_value;
      }
      let time_message = colors.dim(' - ') + constructed_value + colors.cyan('ms');
      let step_message = colors.dim(' (') + colors.dim(args.step) + colors.dim(')');
      // Log the timer to the console
      console.log('\n' + headers['timer'] + time_message + step_message);
      // Return
      return true;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    return false;
  }
}

module.exports = {
  log_timer,
};
