// Hydrogen: Clean logs
'use strict';

// Vendor dependencies
var colors = require('colors');
var fs = require('fs');
var path = require('path');

// Hydrogen dependencies
var { log_info } = require('./logs');
var { getUserOutput } = require('./generate-paths');

/**
 * Deletes the log directory
 * @param {object} settings the user's settings
 * @returns deleted logs directory
 */
function clean_logs(settings) {
  try {
    // Check if the logs directory exists and delete it ========================
    if (
      fs.existsSync(
        path.resolve(getUserOutput(settings, 'string') + '/hydrogen-logs')
      ) === true
    ) {
      fs.rmSync(
        path.resolve(getUserOutput(settings, 'string') + '/hydrogen-logs'),
        {
          recursive: true,
          force: true,
        }
      );
      // Log success ===========================================================
      log_info(
        'success',
        'Log cleaning',
        'Clean command',
        null,
        null,
        null,
        [path.resolve(getUserOutput(settings, 'string') + '/hydrogen-logs')],
        "Hydrogen's log files were successfully removed from your output directory."
      );
    }
  } catch (error) {
    // Catch any errors ========================================================
    console.log(error);
    return false;
  }
}

module.exports = {
  clean_logs,
};
