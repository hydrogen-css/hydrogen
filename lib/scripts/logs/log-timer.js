// Hydrogen logs: Timers
'use strict';

// Hydrogen type imports
let Settings = require('../../data/settings-model-definition');
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { flourish, headers } = require('./log-labels');
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
      if (ms === 0) {
        ms = '< 0';
      }
      // Build the build step message
      let step_message = '\n' + flourish + 'Build step: '.cyan + options.step;
      // Build the time message
      let time_message = '\n' + flourish + 'Time taken: '.cyan + ms + 'ms';
      // Build and log the final message
      console.log(headers['timer'] + step_message + time_message);
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
