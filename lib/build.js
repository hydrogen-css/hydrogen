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
    if (results.settings_data.logging.errors.count > 0) {
      log_message({
        type: 'failure',
        step: 'Exporting CSS',
        message:
          'Hydrogen completed with ' +
          results.settings_data.logging.errors.count +
          ' errors',
        buffers: {
          bottom: true,
        },
      });
    } else {
      log_message({
        type: 'success',
        step: 'Exporting CSS',
        buffers: {
          bottom: true,
        },
      });
    }
    return results;
  } catch (error) {
    if (error.step) {
      log_message({
        type: 'error',
        step: error.step,
        error: error.error,
        buffers: {
          bottom: true,
        },
      });
      throw error.error;
    } else {
      log_message({
        type: 'error',
        step: 'Hydrogen build',
        error: error,
        buffers: {
          bottom: true,
        },
      });
      throw error;
    }
  }
}

module.exports = {
  hydrogen_build,
};
