// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 */

// Data imports

// Logging
const { log_message } = require('../../logs/log-message');

// Functions

// Vendor imports

// Script
/**
 * Validates the user's processing settings
 * @param {Settings} settings
 * @returns {boolean}
 */
function validate_processing(settings) {
  try {
    if (
      settings.processing.minification &&
      typeof settings.processing.minification != 'boolean'
    ) {
      throw new Error(
        'The "minification" option in the "processing" section of your configuration must either be "true" or "false".'
      );
    }
    if (
      settings.processing.prefixing &&
      typeof settings.processing.prefixing != 'boolean'
    ) {
      throw new Error(
        'The "prefixing" option in the "processing" section of your configuration must either be "true" or "false".'
      );
    }
    if (
      settings.processing.reset_styles &&
      typeof settings.processing.reset_styles != 'boolean'
    ) {
      throw new Error(
        'The "reset_styles" option in the "processing" section of your configuration must either be "true" or "false".'
      );
    }
    if (
      settings.processing.var_export &&
      typeof settings.processing.var_export != 'boolean'
    ) {
      throw new Error(
        'The "var_export" option in the "processing" section of your configuration must either be "true" or "false".'
      );
    }
    return true;
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Validating processing settings',
      error: error,
    });
    throw error;
  }
}

module.exports = {
  validate_processing,
};
