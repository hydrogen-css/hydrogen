// Hydrogen: Timer log function
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies

// Log headers
var console_flourish = '> '.dim;
var timer_header = '☼ Hydrogen'.magenta + ' - ' + ' Timer '.black.bgCyan;

/**
 * Logs the time, in ms, it took to complete a build step
 * @param {string} step the build step the timer applies to
 * @param {number} start_time the timer's start time
 * @param {number} end_time the timer's end time
 * @returns {boolean} a log of how long the build step took to complete
 */
function log_timer(settings, step, start_time, end_time) {
  try {
    // Check user settings for timers ==========================================
    var enabled = true;
    if (settings.build.quiet === true) {
      enabled = false;
    }
    if (enabled === true) {
      // Build the log =========================================================
      var ms = (end_time - start_time) / BigInt(1000000);
      ms = Number(ms);
      if (ms === 0) {
        ms = '< 0';
      }
      // Log the timer =========================================================
      console.log(
        timer_header +
          '\n' +
          console_flourish +
          'Build step: '.cyan +
          step +
          '\n' +
          console_flourish +
          'Timer: '.cyan +
          ms +
          'ms'
      );
      return true;
    }
  } catch (error) {
    // Catch errors ============================================================
    console.log(error);
    return false;
  }
}

module.exports = {
  log_timer,
};
