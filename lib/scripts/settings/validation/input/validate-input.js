// Hydrogen: Validate settings.input
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
let step = 'Settings validation: input';

/**
 * Validates the user's input configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_input(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    // Validate self
    // Exists
    if (settings.input == null) {
      log_message({
        type: 'error',
        step: step,
        files: path,
        message: "The input setting doesn't exist and is required.",
      });
      valid = false;
    } else {
      // Type
      if (Array.isArray(settings.input) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message: 'The input setting must be an array of path strings.',
        });
        valid = false;
      } else {
        // Length
        if (settings.input.length === 0) {
          log_message({
            type: 'error',
            step: step,
            files: path,
            message: 'The input setting array is empty.',
          });
          valid = false;
        } else {
          for (let path of settings.input) {
            // Type
            if (typeof path != 'string') {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message:
                  'File paths passed to the input setting must be a string.',
              });
              valid = false;
            }
          }
        }
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
  validate_input,
};
