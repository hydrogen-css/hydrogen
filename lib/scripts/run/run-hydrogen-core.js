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

// Logging
const { log_message } = require('../logs/log-message');

// Functions
const { build_core } = require('../build-core');

// Vendor imports

// Script
/**
 * Runs Hydrogen's core scripts, and requires processed settings and media data
 * @param {{settings_data: Settings, media_data: MediaObject[], timer: number}} args
 * @returns {boolean}
 */
function run_hydrogen_core(args) {
  try {
    // Run Hydrogen
    build_core({
      settings_data: args.settings_data,
      media_data: args.media_data,
      timer: args.timer,
    });
    if (
      settings_data.logging.verbose === true &&
      settings_data.processing.var_export === true
    ) {
      log_message({
        type: 'success',
        step: 'Running Hydrogen',
        errors: settings_data.logging.errors.count,
        warnings: settings_data.logging.warnings.count,
      });
    }
    return true;
  } catch (error) {
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
