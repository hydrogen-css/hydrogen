// Hydrogen: Validate settings.styles.tokens.transitions
'use strict';

// Vendor dependencies

// Hydrogen dependencies
const { log_info } = require('../../../../../logs');

// Validation dependencies
const { log_error } = require('../../../log-error');
const { validate_durations } = require('./durations/validate-durations');
const { validate_functions } = require('./functions/validate-functions');
const { validate_delays } = require('./delays/validate-delays');

// See lib/scripts/settings/README.md for guidance on validation

function validate_transitions(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.tokens.transitions';
    var valid = true;
    if (settings.styles.tokens.transitions != null) {
      // Create working variables ==============================================
      var transitions = settings.styles.tokens.transitions;
      // Validate self =========================================================
      // Type
      if (typeof transitions != 'object') {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The transitions setting must be an object containing durations, functions, and delays.'
        );
        valid = false;
      } else {
        // Validate durations ==================================================
        if (validate_durations(settings) === false) {
          valid = false;
        }
        // Validate functions ==================================================
        if (validate_functions(settings) === false) {
          valid = false;
        }
        // Validate delays =====================================================
        if (validate_delays(settings) === false) {
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
  validate_transitions,
};
