// Hydrogen: Validate settings.styles.tokens
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { log_info } = require('../../../../logs/logs');

// Validation dependencies
const { log_error } = require('../../log-error');
const { validate_colors } = require('./colors/validate-colors');
const { validate_containers } = require('./containers/validate-containers');
const { validate_fonts } = require('./fonts/validate-fonts');
const { validate_gradients } = require('./gradients/validate-gradients');
const { validate_radii } = require('./radii/validate-radii');
const { validate_shadows } = require('./shadows/validate-shadows');
const { validate_transitions } = require('./transitions/validate-transitions');

// See lib/scripts/settings/README.md for guidance on validation

function validate_tokens(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.tokens';
    var valid = true;
    if (settings.styles.tokens != null) {
      // Validate self =========================================================
      // Type
      if (typeof settings.styles.tokens != 'object') {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The tokens setting must be an object.'
        );
        valid = false;
      } else {
        // Validate colors =======================================================
        if (validate_colors(settings) === false) {
          valid = false;
        }
        // Validate containers ===================================================
        if (validate_containers(settings) === false) {
          valid = false;
        }
        // Validate fonts ========================================================
        if (validate_fonts(settings) === false) {
          valid = false;
        }
        // Validate gradients ====================================================
        if (validate_gradients(settings) === false) {
          valid = false;
        }
        // Validate radii ========================================================
        if (validate_radii(settings) === false) {
          valid = false;
        }
        // Validate shadows ======================================================
        if (validate_shadows(settings) === false) {
          valid = false;
        }
        // Validate transitions ==================================================
        if (validate_transitions(settings) === false) {
          valid = false;
        }
      }
    }
    // Check validity ==========================================================
    if (valid === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // Catch any errors ========================================================
    log_info(
      'error',
      'Unknown error',
      validation_step,
      null,
      null,
      null,
      [settings.path],
      error
    );
    return false;
  }
}

module.exports = {
  validate_tokens,
};
