// Hydrogen: Validate styles
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { log_info } = require('../../../logs');

// Validation dependencies
const { log_error } = require('../log-error');
const { validate_foundations } = require('./foundations/validate-foundations');
const { validate_tokens } = require('./tokens/validate-tokens');

// See lib/scripts/settings/README.md for guidance on validation

function validate_styles(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles';
    var valid = true;
    // Validate self ===========================================================
    // Exists
    if (settings.styles == null) {
      log_error(
        'Missing setting',
        validation_step,
        settings.path,
        "The styles setting doesn't exist and is required."
      );
      valid = false;
    } else {
      // Type
      if (typeof settings.styles != 'object') {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The styles setting must be an object containing a foundations object.'
        );
        valid = false;
      } else {
        // Validate input ======================================================
        if (validate_foundations(settings) === false) {
          valid = false;
        }
        // Validate output =====================================================
        if (validate_tokens(settings) === false) {
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
  validate_styles,
};
