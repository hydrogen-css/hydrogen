// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').Processing} Processing
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Validates the user's processing settings.
 *
 * @param {Config} settings
 * @returns {true}
 */
function validate_processing(settings) {
  try {
    let errors = [];
    if (settings.processing.minify_css && typeof settings.processing.minify_css != 'boolean') {
      errors = errors.concat(
        new Error(
          'The "minify_css" option in the "processing" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (
      settings.processing.browser_prefix_css &&
      typeof settings.processing.browser_prefix_css != 'boolean'
    ) {
      errors = errors.concat(
        new Error(
          'The "browser_prefix_css" option in the "processing" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (
      settings.processing.include_reset_css &&
      typeof settings.processing.include_reset_css != 'boolean'
    ) {
      errors = errors.concat(
        new Error(
          'The "include_reset_css" option in the "processing" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (
      settings.processing.export_variable_file &&
      typeof settings.processing.export_variable_file != 'boolean'
    ) {
      errors = errors.concat(
        new Error(
          'The "export_variable_file" option in the "processing" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (errors.length === 0) {
      return true;
    } else {
      throw errors;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    throw {
      step: 'Validating processing configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_processing,
};
