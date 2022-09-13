// Hydrogen: Validate build
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { log_info } = require('../../../logs/logs');

// Validation dependencies
const { log_error } = require('../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_build(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'build';
    var valid = true;
    if (settings.build != null) {
      // Validate self =========================================================
      // Type
      if (typeof settings.build != 'object') {
        console.log('The output setting is not an object.');
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The build setting must be an object.'
        );
        valid = false;
      } else {
        // Validate base query key
        if (settings.build.base_query_key != null) {
          // Type
          if (typeof settings.build.base_query_key != 'string') {
            log_error(
              'Invalid setting type',
              validation_step + '.base_query_key',
              settings.path,
              'The base_query_key setting must be a string.'
            );
            valid = false;
          }
        }
        // Validate dark mode
        if (settings.build.dark_mode != null) {
          // Type
          if (typeof settings.build.dark_mode != 'string') {
            log_error(
              'Invalid setting type',
              validation_step + '.dark_mode',
              settings.path,
              'The dark_mode setting must be a string.'
            );
            valid = false;
          }
          // Specific values
          if (
            settings.build.dark_mode != 'preference' &&
            settings.build.dark_mode != 'toggle'
          ) {
            log_error(
              'Invalid setting option',
              validation_step + '.dark_mode',
              settings.path,
              "The dark_mode setting must be set to either 'preference' or 'toggle'."
            );
            valid = false;
          }
        }
        // Validate logs
        if (settings.build.logs != null) {
          // Type
          if (typeof settings.build.logs != 'boolean') {
            log_error(
              'Invalid setting type',
              validation_step + '.logs',
              settings.path,
              'The logs setting must be a boolean.'
            );
            valid = false;
          }
        }
        // Validate minification
        if (settings.build.minification != null) {
          // Type
          if (typeof settings.build.minification != 'boolean') {
            log_error(
              'Invalid setting type',
              validation_step + '.minification',
              settings.path,
              'The minification setting must be a boolean.'
            );
            valid = false;
          }
        }
        // Validate prefixing
        if (settings.build.prefixing != null) {
          // Type
          if (typeof settings.build.prefixing != 'boolean') {
            log_error(
              'Invalid setting type',
              validation_step + '.prefixing',
              settings.path,
              'The prefixing setting must be a boolean.'
            );
            valid = false;
          }
        }
        // Validate quiet
        if (settings.build.quiet != null) {
          // Type
          if (typeof settings.build.quiet != 'boolean') {
            log_error(
              'Invalid setting type',
              validation_step + '.quiet',
              settings.path,
              'The quiet setting must be a boolean.'
            );
            valid = false;
          }
        }
        // Validate reset styles
        if (settings.build.reset_styles != null) {
          // Type
          if (typeof settings.build.reset_styles != 'boolean') {
            log_error(
              'Invalid setting type',
              validation_step + '.reset_styles',
              settings.path,
              'The reset styles setting must be a boolean.'
            );
            valid = false;
          }
        }
        // Validate CSS validation
        if (settings.build.validation != null) {
          // Type
          if (typeof settings.build.validation != 'boolean') {
            log_error(
              'Invalid setting type',
              validation_step + '.validation',
              settings.path,
              'The validation setting must be a boolean.'
            );
            valid = false;
          }
        }
        // Validate variable file export
        if (settings.build.var_export != null) {
          // Type
          if (typeof settings.build.var_export != 'boolean') {
            console.log('The build.var_export setting is not a boolean.');
            log_error(
              'Invalid setting type',
              validation_step + '.var_export',
              settings.path,
              'The var_export setting must be a boolean.'
            );
            valid = false;
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
  validate_build,
};
