// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('./data/config-data').ParsedConfig} ParsedConfig
 * @typedef {import('./data/media-array-data').MediaArray} MediaArray
 * @typedef {import('./data/media-array-data').QueryData} QueryData
 */

// Helper functions
const { log_message } = require('./scripts/console-logging/log-message');
const { log_result } = require('./scripts/console-logging/log-result');
const { run_hydrogen_full } = require('./scripts/run-hydrogen');

/**
 * Runs a single instance of Hydrogen's build script.
 * @returns {{config: ParsedConfig, media_array: QueryData[], css: string}}
 */
function hydrogen_build() {
  try {
    const timer_start_total_build = process.hrtime.bigint();
    let results = run_hydrogen_full();
    let code = log_result(timer_start_total_build, results, 'build');
    if (code) {
      process.exitCode = 0;
    } else {
      process.exitCode = 1;
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
