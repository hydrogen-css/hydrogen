// Hydrogen: Validate output
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { log_info } = require('../../../logs/logs');

// Validation dependencies
const { log_error } = require('../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_output(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'output';
    var valid = true;
    // Validate self ===========================================================
    // Exists
    if (settings.output == null) {
      log_error(
        'Missing setting',
        validation_step,
        settings.path,
        "The output setting doesn't exist and is required."
      );
      valid = false;
    } else {
      // Type
      if (typeof settings.output != 'string') {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The output setting must be a string.'
        );
        valid = false;
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
  validate_output,
};
