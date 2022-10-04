// Hydrogen: Validate settings.styles.tokens.transitions
'use strict';

// Hydrogen type imports
let Settings = require('../../../../../../data/settings-model-definition');
/**
 * @typedef {import('../../../../../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../../../../../logs/log-message');
const { validate_durations } = require('./durations/validate-durations');
const { validate_functions } = require('./functions/validate-functions');
const { validate_delays } = require('./delays/validate-delays');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

// Set convenience values for error logging
let step = 'Settings validation';

/**
 * Validates the user's transition configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_transitions(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.tokens.transitions != null) {
      // Create working variables
      var transitions = settings.styles.tokens.transitions;
      // Validate self
      // Type
      if (typeof transitions != 'object') {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The transitions setting must be an object containing durations, functions, and delays.',
          setting: 'settings.styles.tokens.transitions',
        });
        valid = false;
      } else {
        // Validate durations
        if (validate_durations(settings, path) === false) {
          valid = false;
        }
        // Validate functions
        if (validate_functions(settings, path) === false) {
          valid = false;
        }
        // Validate delays
        if (validate_delays(settings, path) === false) {
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
      setting: 'settings.styles.tokens.transitions',
    });
    return false;
  }
}

module.exports = {
  validate_transitions,
};
