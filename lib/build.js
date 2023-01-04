// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('./data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('./data/media-model-definition').MediaObject} MediaObject
 */

// Data imports

// Logging
const { log_message } = require('./scripts/logging/log-message');

// Functions
const { run_hydrogen_full } = require('./scripts/run/run-hydrogen-full');

// Vendor imports

// Script
/**
 * Runs a single instance of Hydrogen's build script
 * @returns {{settings_data: Settings, media_data: MediaObject[]}} an assembled Hydrogen CSS file
 */
function hydrogen_build() {
  try {
    let results = run_hydrogen_full();
    log_message({
      type: 'success',
      step: 'Exporting CSS',
    });
    return results;
  } catch (error) {
    if (error.step) {
      throw error;
    } else {
      throw {
        error: error,
        step: 'Build script',
      };
    }
  }
}

module.exports = {
  hydrogen_build,
};
