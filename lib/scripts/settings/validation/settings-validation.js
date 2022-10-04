// Hydrogen: Validate settings
'use strict';

// Hydrogen type imports
let Settings = require('../../../data/settings-model-definition');
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen function imports
const { log_message } = require('../../logs/log-message');
const { validate_input } = require('./input/validate-input');
const { validate_output } = require('./output/validate-output');
const { validate_build } = require('./build/validate-build');
const { validate_styles } = require('./styles/validate-styles');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

/**
 * Runs the main settings validation
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings
 * @returns {boolean} True if valid
 */
function validate_settings(settings, path) {
  try {
    // Set the validation step string for easy reuse
    let validation_step = 'Settings file';
    // Set the default state to valid
    let valid = true;
    // Validate self
    // Exists
    if (settings == null) {
      log_message({
        type: 'error',
        message: "The settings object doesn't exist and is required.",
        files: path,
        step: validation_step,
      });
      valid = false;
    } else {
      // Type
      if (typeof settings != 'object') {
        log_message({
          type: 'error',
          message: 'The settings object is not an object.',
          step: validation_step,
          files: path,
        });
        valid = false;
      } else {
        // Validate input
        if (validate_input(settings, path) === false) {
          valid = false;
        }
        // Validate output
        if (validate_output(settings, path) === false) {
          valid = false;
        }
        // Validate build
        if (validate_build(settings, path) === false) {
          valid = false;
        }
        // Validate styles
        if (validate_styles(settings, path) === false) {
          valid = false;
        }
        // Check validity
        if (valid === true) {
          return true;
        } else {
          return false;
        }
      }
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: validation_step,
      files: path,
    });
    return false;
  }
}

module.exports = {
  validate_settings,
};
