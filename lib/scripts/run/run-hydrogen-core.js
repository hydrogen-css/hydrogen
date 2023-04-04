// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../data/media-array-data').MediaArray} MediaArray
 * @typedef {import('../../data/media-array-data').QueryData} QueryData
 */

// Data imports

// Local functions
const { build_core } = require('../build-core');

// Helper functions
const { log_message } = require('../logging/log-message');

// Vendor imports

// Script ==========================================================================================

/**
 * Runs Hydrogen's core scripts, and requires processed settings and media data.
 *
 * @param {ParsedConfig} config
 * @param {MediaArray} media_array
 * @param {number} timer
 * @returns {{config: ParsedConfig, media_array: MediaArray}}
 */
function run_hydrogen_core(config, media_array, timer) {
  try {
    // Run Hydrogen
    let results = build_core(config, media_array, timer);
    if (
      config.logging.verbose_console_output === true &&
      config.processing.export_variable_file === true
    ) {
      log_message({
        type: 'success',
        step: 'Running Hydrogen',
        errors: config.logging.errors.count,
        warnings: config.logging.warnings.count,
      });
    }
    // Return the results
    return results;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: "Running Hydrogen's core",
        error: error,
      };
    }
  }
}

module.exports = {
  run_hydrogen_core,
};
