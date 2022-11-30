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
 * Validates the user's input settings
 * @param {Settings} settings
 * @returns {boolean}
 */
function validate_input(settings) {
  try {
    if (
      !settings.input ||
      !Array.isArray(settings.input) ||
      settings.input.length === 0
    ) {
      throw new Error(
        'The "input" option in your configuration should be an array containing paths to the input directories that Hydrogen should parse.'
      );
    } else {
      return true;
    }
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Validating input settings',
      error: error,
    });
    throw error;
  }
}

module.exports = {
  validate_input,
};
