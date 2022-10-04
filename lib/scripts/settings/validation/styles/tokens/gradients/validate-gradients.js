// Hydrogen: Validate settings.styles.tokens.gradients
'use strict';

// Hydrogen type imports
let Settings = require('../../../../../../data/settings-model-definition');
/**
 * @typedef {import('../../../../../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../../../../../logs/log-message');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

// Set convenience values for error logging
let step = 'Settings validation: media';

/**
 * Validates the user's gradient configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_gradients(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.tokens.gradients != null) {
      // Create working variables
      var gradients = settings.styles.tokens.gradients;
      // Validate self
      // Type
      if (Array.isArray(gradients) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The gradients setting must be an array containing gradient objects.',
        });
        valid = false;
      } else {
        // Validate children
        if (gradients.length != 0) {
          gradients.forEach(function (
            gradient_setting,
            gradient_setting_index
          ) {
            // Validate self
            // Type
            if (typeof gradient_setting != 'object') {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message:
                  'Gradient definitions must be an object containing a key, gradient, and a fallback color.',
              });
              valid = false;
            } else {
              // Validate key
              // Exists
              if (gradient_setting.key == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A gradient object is missing a key value.',
                });
                valid = false;
              } else {
                // Type
                if (typeof gradient_setting.key != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Gradient keys must be a string.',
                  });
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(gradient_setting.key) === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Gradient keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                    });
                    valid = false;
                  }
                  // Detect periods
                  if (gradient_setting.key.includes('.') === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Gradient keys cannot contain periods. Use hyphen or underscore characters instead.',
                    });
                    valid = false;
                  }
                  // Not a color key
                  if (settings.styles.tokens.colors != null) {
                    settings.styles.tokens.colors.forEach(function (
                      color_setting
                    ) {
                      if (gradient_setting.key === color_setting.key) {
                        log_message({
                          type: 'error',
                          step: step,
                          files: path,
                          message:
                            'A gradient key is identical to one or more color keys. Color, color modifier, and gradient keys must be unique.',
                        });
                        valid = false;
                      }
                      if (color_setting.modifiers != null) {
                        if (color_setting.modifiers.length != 0) {
                          color_setting.modifiers.forEach(function (
                            modifier_setting
                          ) {
                            if (gradient_setting.key === modifier_setting.key) {
                              log_message({
                                type: 'error',
                                step: step,
                                files: path,
                                message:
                                  'A gradient key is identical to one or more color modifier keys. Color, color modifier, and gradient keys must be unique.',
                              });
                              valid = false;
                            }
                          });
                        }
                      }
                    });
                  }
                  // Duplicates
                  var sanitized_gradients = gradients.slice();
                  sanitized_gradients.splice(gradient_setting_index, 1);
                  sanitized_gradients.forEach(function (
                    sanitized_gradient_setting
                  ) {
                    if (
                      gradient_setting.key === sanitized_gradient_setting.key
                    ) {
                      log_message({
                        type: 'error',
                        step: step,
                        files: path,
                        message:
                          'A gradient key is identical to one or more other gradient keys. Gradient keys must be unique.',
                      });
                      valid = false;
                    }
                  });
                }
              }
              // Validate gradient
              // Exists
              if (gradient_setting.gradient == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A gradient object is missing a gradient value.',
                });
                valid = false;
              } else {
                // Type
                if (typeof gradient_setting.gradient != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Gradient gradient values must be a string.',
                  });
                  valid = false;
                }
              }
              // Validate fallback
              // Exists
              if (gradient_setting.fallback == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A gradient object is missing a fallback value.',
                });
                valid = false;
              } else {
                // Type
                if (typeof gradient_setting.fallback != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Gradient fallback values must be a string.',
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
    });
    return false;
  }
}

module.exports = {
  validate_gradients,
};
