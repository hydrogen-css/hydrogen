// Hydrogen: Validate foundations
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { log_info } = require('../../../../logs');

// Validation dependencies
const { log_error } = require('../../log-error');
const { validate_media } = require('./media/validate-media');
const { validate_typography } = require('./typography/validate-typography');

// See lib/scripts/settings/README.md for guidance on validation

function validate_foundations(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.foundations';
    var valid = true;
    // Validate self ===========================================================
    // Exists
    if (settings.styles.foundations == null) {
      log_error(
        'Missing setting',
        validation_step,
        settings.path,
        "The foundations setting doesn't exist and is required."
      );
      valid = false;
    }
    // Type
    if (typeof settings.styles.foundations != 'object') {
      log_error(
        'Invalid setting type',
        validation_step,
        settings.path,
        'The foundations setting must be an object containing a typography array.'
      );
      valid = false;
    }
    // Validate media ==========================================================
    if (validate_media(settings) === false) {
      valid = false;
    }
    // Validate typography =====================================================
    if (validate_typography(settings) === false) {
      valid = false;
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
  validate_foundations,
};
