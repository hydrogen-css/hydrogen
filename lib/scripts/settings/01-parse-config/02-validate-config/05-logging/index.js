// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../../../data/settings-model-definition').Logging} Logging
 * @typedef {import('../../../../../data/settings-model-definition').Errors} Errors
 * @typedef {import('../../../../../data/settings-model-definition').Warnings} Warnings
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
    if (settings.logging.generate_logs && typeof settings.logging.logs != 'boolean') {
      errors = errors.concat(
        new Error(
          'The "generate_logs" option in the "logging" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (settings.logging.show_timers && typeof settings.logging.show_timers != 'boolean') {
      errors = errors.concat(
        new Error(
          'The "show_timers" option in the "logging" section of your configuration must either be "true" or "false".'
        )
      );
    }
    if (
      settings.logging.verbose_console_output &&
      typeof settings.logging.verbose_console_output != 'boolean'
    ) {
      errors = errors.concat(
        new Error(
          'The "verbose_console_output" option in the "logging" section of your configuration must either be "true" or "false".'
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
      step: 'Validating logging configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_logging,
};
