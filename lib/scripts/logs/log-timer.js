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
    if (options.settings.build.timers === false) {
      enabled = false;
    }
    // If the timers are enabled, run the log
    if (enabled === true) {
      // Create the readable time format
      let ms = (options.times.end - options.times.start) / BigInt(1000000);
      ms = Number(ms);
      // if (ms === 0) {
      //   ms = '< 0';
      // }
      // Build the build step message
      // let step_message = '\n' + flourish + 'Step     - '.dim + options.step;
      // let step_message = ': ' + options.step.cyan;
      // Build the time message
      // let time_message = '\n' + flourish + 'Timer    - '.dim + ms + 'ms';
      // Build and log the final message
      // console.log(headers['timer'] + step_message + time_message);
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
      let time_message = ' - ' + constructed_value + 'ms'.cyan;
      let step_message = ' ('.dim + options.step.dim + ')'.dim;
      console.log(headers['timer'] + time_message + step_message);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  log_timer,
};
