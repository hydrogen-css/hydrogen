// Hydrogen: Validate settings.output
'use strict';

// Hydrogen type imports
let Settings = require('../../../../data/settings-model-definition');
/**
 * @typedef {import('../../../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../../../logs/log-message');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

// Set convenience values for error logging
let step = 'Settings validation: output';

/**
 * Validates the user's output configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_output(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    // Validate self
    // Exists
    if (settings.output == null) {
      log_message({
        type: 'error',
        step: step,
        files: path,
        message: "The output setting doesn't exist and is required.",
      });
      valid = false;
    } else {
      // Type
      if (typeof settings.output != 'string') {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message: 'The output setting must be a string.',
        });
        valid = false;
      }
    }
    // Check validity
    if (valid === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      step: step,
      files: path,
      message: error,
    });
    return false;
  }
}

module.exports = {
  validate_output,
};
