// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/config-data').Config} Config
 * @typedef {import('../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../data/media-array-data').MediaArray} MediaArray
 * @typedef {import('../../data/media-array-data').QueryData} QueryData
 */

// Data imports
const package_data = require('../../../package.json');

// Local functions
const { parse_config } = require('../settings/01-parse-config');
const { build_media_array } = require('../settings/02-build-media-array');
const { run_hydrogen_core } = require('./run-hydrogen-core');

// Helper functions
const { log_message } = require('../logging/log-message');

// Vendor imports

// Script ==========================================================================================

/**
 * Runs Hydrogen in full, including locating, validating, and parsing configuration.
 *
 * @returns {{config: ParsedConfig, media_array: MediaArray}}
 */
function run_hydrogen_full() {
  try {
    // Log that the script has started
    log_message({
      type: 'system',
      step: 'Starting the build...',
      message: 'Hydrogen v' + package_data.version,
    });
    // Initiate the total build timer
    const timer_start_total_build = process.hrtime.bigint();
    // Store the settings and media data
    /** @type {ParsedConfig} */
    let config = parse_config(process.argv);
    /** @type {QueryData[]} */
    let media_array = build_media_array(config);
    // Run Hydrogen's core
    let results = run_hydrogen_core(config, media_array, timer_start_total_build);
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
        step: 'Running Hydrogen in full',
        error: error,
      };
    }
  }
}

module.exports = {
  run_hydrogen_full,
};
