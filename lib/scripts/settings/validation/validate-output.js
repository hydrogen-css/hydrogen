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
 * Validates the user's output settings
 * @param {Settings} settings
 * @returns {boolean}
 */
function validate_output(settings) {
  try {
    if (!settings.output || typeof settings.output != 'string') {
      throw new Error(
        'The "output" option in your configuration should be a string that contains the path to the output directory Hydrogen will put its CSS file in.'
      );
    } else {
      return true;
    }
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Validating output settings',
      error: error,
    });
    throw error;
  }
}

module.exports = {
  validate_output,
};
