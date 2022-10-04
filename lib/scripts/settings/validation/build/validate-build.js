// Hydrogen: Validate settings.build
'use strict';

// Hydrogen type imports
let Settings = require('../../../../data/settings-model-definition');
/**
 * @typedef {import('../../../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../../../logs/log-message');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

// Set convenience values for error logging
let step = 'Settings validation: build';

/**
 * Validates the user's build configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_build(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    // Check to see if build exists
    if (settings.build) {
      // Validate self
      // Type
      if (typeof settings.build != 'object') {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message: 'The build setting must be an object.',
        });
        valid = false;
      } else {
        // Validate base query key
        if (settings.build.base_query_key) {
          // Type
          if (typeof settings.build.base_query_key != 'string') {
            log_message({
              type: 'error',
              step: step,
              files: path,
              message: 'The build.base_query_key setting must be a string.',
            });
            valid = false;
          }
        }
        // Validate dark mode
        if (settings.build.dark_mode) {
          // Type
          if (typeof settings.build.dark_mode != 'string') {
            log_message({
              type: 'error',
              step: step,
              files: path,
              message: 'The build.dark_mode setting must be a string.',
            });
            valid = false;
          }
          // Specific values
          if (
            settings.build.dark_mode != 'preference' &&
            settings.build.dark_mode != 'toggle'
          ) {
            log_message({
              type: 'error',
              step: step,
              files: path,
              message:
                'The build.dark_mode setting must be set to either "preference" or "toggle".',
            });
            valid = false;
          }
        }
        // Validate logs
        if (settings.build.logs) {
          // Type
          if (typeof settings.build.logs != 'boolean') {
            log_message({
              type: 'error',
              step: step,
              files: path,
              message: 'The build.logs setting must be a boolean.',
            });
            valid = false;
          }
        }
        // Validate minification
        if (settings.build.minification) {
          // Type
          if (typeof settings.build.minification != 'boolean') {
            log_message({
              type: 'error',
              step: step,
              files: path,
              message: 'The build.minification setting must be a boolean.',
            });
            valid = false;
          }
        }
        // Validate prefixing
        if (settings.build.prefixing) {
          // Type
          if (typeof settings.build.prefixing != 'boolean') {
            log_message({
              type: 'error',
              step: step,
              files: path,
              message: 'The build.prefixing setting must be a boolean.',
            });
            valid = false;
          }
        }
        // Validate quiet
        if (settings.build.timers) {
          // Type
          if (typeof settings.build.timers != 'boolean') {
            log_message({
              type: 'error',
              step: step,
              files: path,
              message: 'The build.timers setting must be a boolean.',
            });
            valid = false;
          }
        }
        // Validate reset styles
        if (settings.build.reset_styles) {
          // Type
          if (typeof settings.build.reset_styles != 'boolean') {
            log_message({
              type: 'error',
              step: step,
              files: path,
              message: 'The build.reset_styles setting must be a boolean.',
            });
            valid = false;
          }
        }
        // Validate CSS validation
        if (settings.build.validation) {
          // Type
          if (typeof settings.build.validation != 'boolean') {
            log_message({
              type: 'error',
              step: step,
              files: path,
              message: 'The build.validation setting must be a boolean.',
            });
            valid = false;
          }
        }
        // Validate variable file export
        if (settings.build.var_export) {
          // Type
          if (typeof settings.build.var_export != 'boolean') {
            log_message({
              type: 'error',
              step: step,
              files: path,
              message: 'The build.var_export setting must be a boolean.',
            });
            valid = false;
          }
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
  validate_build,
};
