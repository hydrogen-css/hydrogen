// Hydrogen: Validate styles.foundations
'use strict';

// Hydrogen type imports
let Settings = require('../../../../../data/settings-model-definition');
/**
 * @typedef {import('../../../../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../../../../logs/log-message');
const { validate_media } = require('./media/validate-media');
const { validate_typography } = require('./typography/validate-typography');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

// Set convenience values for error logging
let step = 'Settings validation: foundations';

/**
 * Validates the user's styles.foundations configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_foundations(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    // Validate self
    // Exists
    if (settings.styles.foundations == null) {
      log_message({
        type: 'error',
        step: step,
        files: path,
        message: "The foundations setting doesn't exist and is required.",
      });
      valid = false;
    } else {
      // Type
      if (typeof settings.styles.foundations != 'object') {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The foundations setting must be an object containing a typography array.',
        });
        valid = false;
      } else {
        // Validate media
        if (validate_media(settings, path) === false) {
          valid = false;
        }
        // Validate typography
        if (validate_typography(settings, path) === false) {
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
  validate_foundations,
};
