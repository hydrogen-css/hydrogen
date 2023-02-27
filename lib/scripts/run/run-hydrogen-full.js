// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('../../data/media-model-definition').MediaObject} MediaObject
 */

// Data imports
const package_data = require('../../../package.json');

// Logging
const { log_message } = require('../logging/log-message');

// Functions
const { parse_user_settings } = require('../settings/parse-user-settings');
const { parse_media_settings } = require('../settings/parse_media_settings');
const { run_hydrogen_core } = require('./run-hydrogen-core');

// Vendor imports

// Script
/**
 * Runs Hydrogen in full, including locating, validating, and parsing configuration
 * @returns {{settings_data: Settings, media_data: MediaObject[]}}
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
    let settings_data = parse_user_settings(process.argv);
    let media_data = parse_media_settings(settings_data);
    // Run Hydrogen's core
    let results = run_hydrogen_core({
      settings_data: settings_data,
      media_data: media_data,
      timer: timer_start_total_build,
    });
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
