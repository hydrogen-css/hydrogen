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
const { log_message } = require('../logging/log-message');

// Functions
const { build_core } = require('../build-core');

// Vendor imports

// Script
/**
 * Runs Hydrogen's core scripts, and requires processed settings and media data
 * @param {{settings_data: Settings, media_data: MediaObject[], timer: number}} args
 * @returns {Settings}
 */
function run_hydrogen_core(args) {
  try {
    // Run Hydrogen
    let results = build_core({
      settings_data: args.settings_data,
      media_data: args.media_data,
      timer: args.timer,
    });
    if (
      args.settings_data.logging.verbose_console_output === true &&
      args.settings_data.processing.export_variable_file === true
    ) {
      log_message({
        type: 'success',
        step: 'Running Hydrogen',
        errors: args.settings_data.logging.errors.count,
        warnings: args.settings_data.logging.warnings.count,
      });
    }
    return results;
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
