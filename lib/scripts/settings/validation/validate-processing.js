// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../data/settings-model-definition').Processing} Processing
 */

// Data imports

// Logging

// Functions

// Vendor imports

// Script
/**
 * Validates the user's processing settings
 * @param {Settings} settings
 * @returns {true}
 */
function validate_processing(settings) {
  try {
    let errors = [];
    if (
      settings.processing.minification &&
      typeof settings.processing.minification != 'boolean'
    ) {
      errors = errors.concat(
        new Error(
          'The "minification" option in the "processing" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (
      settings.processing.prefixing &&
      typeof settings.processing.prefixing != 'boolean'
    ) {
      errors = errors.concat(
        new Error(
          'The "prefixing" option in the "processing" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (
      settings.processing.reset_styles &&
      typeof settings.processing.reset_styles != 'boolean'
    ) {
      errors = errors.concat(
        new Error(
          'The "reset_styles" option in the "processing" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (
      settings.processing.var_export &&
      typeof settings.processing.var_export != 'boolean'
    ) {
      errors = errors.concat(
        new Error(
          'The "var_export" option in the "processing" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (
      settings.processing.auto_dark_modifiers &&
      typeof settings.processing.auto_dark_modifiers != 'boolean'
    ) {
      errors = errors.concat(
        new Error(
          'The "auto_dark_modifiers" option in the "processing" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (errors.length === 0) {
      return true;
    } else {
      throw errors;
    }
  } catch (error) {
    throw {
      step: 'Validating processing configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_processing,
};
