// Hydrogen: Validate settings.styles.tokens
'use strict';

// Hydrogen type imports
let Settings = require('../../../../../data/settings-model-definition');
/**
 * @typedef {import('../../../../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../../../../logs/log-message');
const { validate_colors } = require('./colors/validate-colors');
const { validate_containers } = require('./containers/validate-containers');
const { validate_fonts } = require('./fonts/validate-fonts');
const { validate_gradients } = require('./gradients/validate-gradients');
const { validate_radii } = require('./radii/validate-radii');
const { validate_shadows } = require('./shadows/validate-shadows');
const { validate_transitions } = require('./transitions/validate-transitions');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

// Set convenience values for error logging
let step = 'Settings validation: tokens';

/**
 * Validates the user's tokens configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_tokens(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.tokens) {
      // Validate self
      // Type
      if (typeof settings.styles.tokens != 'object') {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message: 'The tokens setting must be an object.',
        });
        valid = false;
      } else {
        // Validate colors
        if (validate_colors(settings, path) === false) {
          valid = false;
        }
        // Validate containers
        if (validate_containers(settings, path) === false) {
          valid = false;
        }
        // Validate fonts
        if (validate_fonts(settings, path) === false) {
          valid = false;
        }
        // Validate gradients
        if (validate_gradients(settings, path) === false) {
          valid = false;
        }
        // Validate radii
        if (validate_radii(settings, path) === false) {
          valid = false;
        }
        // Validate shadows
        if (validate_shadows(settings, path) === false) {
          valid = false;
        }
        // Validate transitions
        if (validate_transitions(settings, path) === false) {
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
  validate_tokens,
};
