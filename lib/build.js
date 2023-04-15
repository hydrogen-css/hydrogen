// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('./data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('./data/media-array-data').MediaArray} MediaArray
 * @typedef {import('./data/media-array-data').QueryData} QueryData
 */

// Data imports

// Local functions

// Helper functions
const { log_message } = require('./scripts/console-logging/log-message');
const { run_hydrogen_full } = require('./scripts/run-hydrogen');

// Vendor imports

// Script ==========================================================================================

/**
 * Runs a single instance of Hydrogen's build script
 * @returns {{config: ParsedConfig, media_array: MediaArray}} an assembled Hydrogen CSS file
 */
function hydrogen_build() {
  try {
    let results = run_hydrogen_full();
    if (results.config.logging.errors.count > 0) {
      log_message({
        type: 'failure',
        step: 'Exporting CSS',
        message: 'Hydrogen completed with ' + results.config.logging.errors.count + ' errors',
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
    if (process.env.H2DEBUG) {
      console.log(error);
    }
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
