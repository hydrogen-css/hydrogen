// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Processing} Processing
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Grabs the default mode configuration data and overwrites it with configurations provided by the user.
 *
 * @param {Config} defaults Hydrogen's default configuration data
 * @param {Config} config The user's configuration file data
 * @returns {Processing}
 */
function configure_processing(defaults, config) {
  try {
    // Check for processing settings and replace them as necessary
    /** @type {Processing} */
    if (config.processing) {
      if (config.processing.include_reset_css != undefined) {
        defaults.processing.include_reset_css = config.processing.include_reset_css;
      }
      if (config.processing.browser_prefix_css != undefined) {
        defaults.processing.browser_prefix_css = config.processing.browser_prefix_css;
      }
      if (config.processing.minify_css != undefined) {
        defaults.processing.minify_css = config.processing.minify_css;
      }
      if (config.processing.export_variable_file != undefined) {
        defaults.processing.export_variable_file = config.processing.export_variable_file;
      }
    }
    // Return the modified settings
    return defaults.processing;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Configuring processing',
        error: error,
      };
    }
  }
}

module.exports = {
  configure_processing,
};
