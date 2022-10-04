// Hydrogen: Validate settings.styles
'use strict';

// Hydrogen type imports
let Settings = require('../../../../data/settings-model-definition');
/**
 * @typedef {import('../../../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../../../logs/log-message');
const { validate_foundations } = require('./foundations/validate-foundations');
const { validate_tokens } = require('./tokens/validate-tokens');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

// Set convenience values for error logging
let step = 'Settings validation: styles';

/**
 * Validates the user's styles configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_styles(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    // Validate self
    // Exists
    if (settings.styles == null) {
      log_message({
        type: 'error',
        step: step,
        files: path,
        message: "The styles setting doesn't exist and is required.",
      });
      valid = false;
    } else {
      // Type
      if (typeof settings.styles != 'object') {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The styles setting must be an object containing a foundations object.',
        });
        valid = false;
      } else {
        // Validate input
        if (validate_foundations(settings, path) === false) {
          valid = false;
        }
        // Validate output
        if (validate_tokens(settings, path) === false) {
          valid = false;
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
  validate_styles,
};
