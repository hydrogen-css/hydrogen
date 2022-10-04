// Hydrogen: Validate settings.styles.tokens.transitions.functions
'use strict';

// Hydrogen type imports
let Settings = require('../../../../../../../data/settings-model-definition');
/**
 * @typedef {import('../../../../../../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../../../../../../logs/log-message');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

// Set convenience values for error logging
let step = 'Settings validation';

/**
 * Validates the user's transition function configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_functions(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.tokens.transitions.functions) {
      // Create working variables
      var validation_step = 'styles.tokens.transitions.functions';
      var functions = settings.styles.tokens.transitions.functions;
      // Validate self
      // Type
      if (Array.isArray(functions) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The transition functions setting must be an array containing function objects.',
          setting: 'settings.styles.tokens.transitions.functions',
        });
        valid = false;
      } else {
        // Validate children
        if (functions.length != 0) {
          functions.forEach(function (
            function_setting,
            function_setting_index
          ) {
            // Validate self
            // Type
            if (typeof function_setting != 'object') {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message:
                  'Transition function definitions must be an object containing a key and function.',
                setting: 'settings.styles.tokens.transitions.functions',
              });
              valid = false;
            } else {
              // Validate key
              // Exists
              if (function_setting.key == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message:
                    'A transition function object is missing a key value.',
                  setting: 'settings.styles.tokens.transitions.functions',
                });
                valid = false;
              } else {
                // Type
                if (typeof function_setting.key != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Transition function keys must be a string.',
                    setting: 'settings.styles.tokens.transitions.functions',
                  });
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(function_setting.key) === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Function keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                      setting: function_setting.key,
                    });
                    valid = false;
                  }
                  // Detect periods
                  if (function_setting.key.includes('.') === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Function keys cannot contain periods. Use hyphen or underscore characters instead.',
                      setting: function_setting.key,
                    });
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_functions = functions.slice();
                  sanitized_functions.splice(function_setting_index, 1);
                  sanitized_functions.forEach(function (
                    sanitized_function_setting
                  ) {
                    if (
                      function_setting.key === sanitized_function_setting.key
                    ) {
                      log_message({
                        type: 'error',
                        step: step,
                        files: path,
                        message:
                          'A transition function key is identical to one or more other function keys. Function keys must be unique.',
                        setting: function_setting.key,
                      });
                      valid = false;
                    }
                  });
                }
              }
              // Validate function
              // Exists
              if (function_setting.function == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message:
                    'A transition function object is missing a function value.',
                  setting: 'settings.styles.tokens.transitions.functions',
                });
                valid = false;
              } else {
                // Type
                if (typeof function_setting.function != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message:
                      'Transition function function values must be a string.',
                    setting: 'settings.styles.tokens.transitions.functions',
                  });
                  valid = false;
                }
              }
            }
          });
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
      setting: 'settings.styles.tokens.transitions.functions',
    });
    return false;
  }
}

module.exports = {
  validate_functions,
};
