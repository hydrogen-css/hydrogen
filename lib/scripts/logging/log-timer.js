// Hydrogen logs: Timers
'use strict';

// Hydrogen type imports
let Settings = require('../../data/settings-model-definition');
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { headers } = require('./log-labels');
// Vendor imports
var colors = require('colors');

/**
 * Logs the time, in ms, it took to complete a build step
 * @param {{settings: Settings, step: string, times: {start: number, end: number}}} options
 * @returns {boolean} a log of how long the build step took to complete
 */
function log_timer(options) {
  try {
    // Start by checking if timer output has been silenced
    let enabled = true;
    if (options.settings.logging.show_timers === false) {
      enabled = false;
    }
    // If the timers are enabled, run the log
    if (enabled) {
      // Create the readable time format
      let ms = (options.times.end - options.times.start) / BigInt(1000000);
      ms = Number(ms);
      let time_value = ms.toString().cyan;
      let constructed_value = '';
      if (time_value.length === 11) {
        constructed_value = '000'.dim + time_value;
      }
      if (time_value.length === 12) {
        constructed_value = '00'.dim + time_value;
      }
      if (time_value.length === 13) {
        constructed_value = '0'.dim + time_value;
      }
      if (time_value.length >= 14) {
        constructed_value = time_value;
      }
      let time_message = ' - '.dim + constructed_value + 'ms'.cyan;
      let step_message = ' ('.dim + options.step.dim + ')'.dim;
      console.log('\n' + headers['timer'] + time_message + step_message);
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
