// Hydrogen: Build script
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { hydrogen_success, hydrogen_full } = require('./scripts/processes');
const { log_message } = require('./scripts/logs/log-message');
// Vendor imports

/**
 * Runs a single instance of Hydrogen's build script
 * @returns {Promise} an assembled Hydrogen CSS file
 */
function hydrogen_build() {
  return new Promise((resolve, reject) => {
    // Create warning and error storage
    hydrogen_full()
      .then((result) => {
        hydrogen_success(result.settings);
        resolve();
      })
      .catch((error) => {
        log_message(error);
      });
  });
}

module.exports = {
  hydrogen_build,
};
