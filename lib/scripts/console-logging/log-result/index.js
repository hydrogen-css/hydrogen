// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/config-data').Config} Config
 * @typedef {import('../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../data/media-array-data').MediaArray} MediaArray
 * @typedef {import('../../../data/media-array-data').QueryData} QueryData
 */

// Data imports

// Local functions

// Helper functions
const { log_message } = require('../log-message');

// Vendor imports

// Script ==========================================================================================

/**
 * Logs the build result and handles logic for build vs. watch, as well as combinations of errors and warnings
 * @param {bigint} timer The start time of the build
 * @param {{config: ParsedConfig, media_array: QueryData[]}} results The output data from Hydrogen's build
 * @param {"build" | "watch"} command The type of command being run
 * @returns {boolean} Returns success/failure and logs a console message
 */
function log_result(timer, results, command) {
  try {
    let step_string = '';
    if (command === 'build') {
      step_string = 'CSS file written';
    } else if (command === 'watch') {
      step_string = 'Watching for changes...';
    }
    let error_string = 'errors';
    let warning_string = 'warnings';
    if (results.config.logging.errors.count === 1) {
      error_string = 'error';
    }
    if (results.config.logging.warnings.count === 1) {
      warning_string = 'warning';
    }
    if (results.config.logging.errors.count > 0 && results.config.logging.warnings.count > 0) {
      log_message({
        type: 'system',
        step: step_string,
        times: {
          start: timer,
          end: process.hrtime.bigint(),
        },
        message:
          'The Hydrogen build completed with ' +
          results.config.logging.errors.count.toString() +
          ' ' +
          error_string +
          ' and ' +
          results.config.logging.warnings.count.toString() +
          ' ' +
          warning_string +
          '.',
        success: 'false',
        buffers: {
          bottom: true,
        },
      });
      return false;
    } else if (results.config.logging.errors.count > 0) {
      log_message({
        type: 'system',
        step: step_string,
        times: {
          start: timer,
          end: process.hrtime.bigint(),
        },
        message:
          'The Hydrogen build completed with ' +
          results.config.logging.errors.count.toString() +
          ' ' +
          error_string +
          '.',
        success: 'false',
        buffers: {
          bottom: true,
        },
      });
      return false;
    } else if (results.config.logging.warnings.count > 0) {
      log_message({
        type: 'system',
        step: step_string,
        times: {
          start: timer,
          end: process.hrtime.bigint(),
        },
        message:
          'The Hydrogen build completed with ' +
          results.config.logging.warnings.count.toString() +
          ' ' +
          warning_string +
          '.',
        success: 'warning',
        buffers: {
          bottom: true,
        },
      });
      return true;
    } else {
      log_message({
        type: 'system',
        step: step_string,
        times: {
          start: timer,
          end: process.hrtime.bigint(),
        },
        message: 'The Hydrogen build completed successfully.',
        success: 'true',
        buffers: {
          bottom: true,
        },
      });
      return true;
    }
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
        step: 'Logging final results',
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
  log_result,
};
