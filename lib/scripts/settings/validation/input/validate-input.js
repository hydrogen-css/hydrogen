// Hydrogen: Validate input
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { log_info } = require('../../../logs');

// Validation dependencies
const { log_error } = require('../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_input(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'input';
    var valid = true;
    // Validate self ===========================================================
    // Exists
    if (settings.input == null) {
      log_error(
        'Missing setting',
        validation_step,
        settings.path,
        "The input setting doesn't exist and is required."
      );
      valid = false;
    } else {
      // Type
      if (Array.isArray(settings.input) === false) {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The input setting must be an array of path strings.'
        );
        valid = false;
      } else {
        // Length
        if (settings.input.length === 0) {
          log_error(
            'Empty settings array',
            validation_step,
            settings.path,
            'The input setting array is empty.'
          );
          valid = false;
        } else {
          for (let path of settings.input) {
            // Type
            if (typeof path != 'string') {
              log_error(
                'Invalid setting type',
                validation_step,
                settings.path,
                'File paths passed to the input setting must be a string.'
              );
              valid = false;
            }
          }
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
  validate_input,
};
