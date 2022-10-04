// Hydrogen: Clean log directory
'use strict';

// Hydrogen type imports
let Settings = require('../data/settings-model-definition');
/**
 * @typedef {import('../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('./logs/log-message');
// Vendor imports
var colors = require('colors');
var fs = require('fs');
var path = require('path');

/**
 * Deletes the log directory
 * @param {Settings} settings The user's settings
 * @returns {boolean} True if clean succeeded
 */
function clean_logs(settings) {
  try {
    // Check if the logs directory exists and delete it
    if (
      fs.existsSync(
        path.resolve(settings.runtime.output.string + '/hydrogen-logs')
      ) === true
    ) {
      fs.rmSync(
        path.resolve(settings.runtime.output.string + '/hydrogen-logs'),
        {
          recursive: true,
          force: true,
        }
      );
      // Log success
      log_message({
        type: 'success',
        step: 'Cleaning log directory',
        message:
          "Hydrogen's log files were successfully removed from your output directory.",
      });
      return true;
    }
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Cleaning log directory',
      message: error,
    });
    return false;
  }
}

module.exports = {
  clean_logs,
};
