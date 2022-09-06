// Hydrogen: Validate settings
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { log_info } = require('../../logs');

// Validation dependencies
const { log_error } = require('./log-error');
const { validate_input } = require('./input/validate-input');
const { validate_output } = require('./output/validate-output');
const { validate_build } = require('./build/validate-build');
const { validate_styles } = require('./styles/validate-styles');

// See lib/scripts/settings/README.md for guidance on validation

function validate_settings(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'Settings file';
    var valid = true;
    // Validate self ===========================================================
    // Exists
    if (settings == null) {
      log_error(
        'Missing setting',
        validation_step,
        settings.path,
        "The settings object doesn't exist and is required."
      );
      valid = false;
    }
    // Type
    if (typeof settings != 'object') {
      log_error(
        'Invalid setting type',
        validation_step,
        settings.path,
        'The settings object is not an object.'
      );
      valid = false;
    }
    // Validate input ==========================================================
    if (validate_input(settings) === false) {
      valid = false;
    }
    // Validate output =========================================================
    if (validate_output(settings) === false) {
      valid = false;
    }
    // Validate build ==========================================================
    if (validate_build(settings) === false) {
      valid = false;
    }
    // Validate styles =========================================================
    if (validate_styles(settings) === false) {
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
  validate_settings,
};
