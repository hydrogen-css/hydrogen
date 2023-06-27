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
 * @returns {{config: ParsedConfig, media_array: QueryData[]}} an assembled Hydrogen CSS file
 */
function hydrogen_build() {
  try {
    const timer_start_total_build = process.hrtime.bigint();
    let results = run_hydrogen_full();
    if (results.config.logging.errors.count > 0) {
      log_message({
        type: 'system',
        step: 'CSS file written',
        times: {
          start: timer_start_total_build,
          end: process.hrtime.bigint(),
        },
        message:
          'The Hydrogen build completed with ' +
          results.config.logging.errors.count.toString() +
          ' errors.',
        success: 'false',
        buffers: {
          bottom: true,
        },
      });
      process.exitCode = 1;
    } else {
      log_message({
        type: 'system',
        step: 'CSS file written',
        times: {
          start: timer_start_total_build,
          end: process.hrtime.bigint(),
        },
        message: 'The Hydrogen build completed successfully.',
        success: 'true',
        buffers: {
          bottom: true,
        },
      });
      process.exitCode = 0;
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
      process.exitCode = 1;
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
      process.exitCode = 1;
      throw error;
    }
  }
}

module.exports = {
  hydrogen_build,
};
