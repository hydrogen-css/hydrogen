// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../data/settings-model-definition').Logging} Logging
 * @typedef {import('../../../data/settings-model-definition').Errors} Errors
 * @typedef {import('../../../data/settings-model-definition').Warnings} Warnings
 */

// Data imports

// Logging

// Functions

// Vendor imports

// Script
/**
 * Validates the user's logging settings
 * @param {Settings} settings
 * @returns {true}
 */
function validate_logging(settings) {
  try {
    let errors = [];
    if (settings.logging.logs && typeof settings.logging.logs != 'boolean') {
      errors = errors.concat(
        new Error(
          'The "logs" option in the "logging" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (
      settings.logging.timers &&
      typeof settings.logging.timers != 'boolean'
    ) {
      errors = errors.concat(
        new Error(
          'The "timers" option in the "logging" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (
      settings.logging.verbose &&
      typeof settings.logging.verbose != 'boolean'
    ) {
      errors = errors.concat(
        new Error(
          'The "verbose" option in the "logging" section of your configuration must either be "true" or "false".'
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
      step: 'Validating logging configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_logging,
};
