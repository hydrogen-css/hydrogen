// Hydrogen: Validate settings.styles.tokens.colors
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
let step = 'Settings validation: colors';

/**
 * Validates the user's color configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings
 * @returns {boolean} True if valid
 */
function validate_colors(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.tokens.colors) {
      // Create working variables
      var colors = settings.styles.tokens.colors;
      // Validate self
      // Type
      if (Array.isArray(colors) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The colors setting must be an array containing color objects.',
        });
        valid = false;
      } else {
        // Validate children
        if (colors.length != 0) {
          colors.forEach(function (color_setting, color_setting_index) {
            // Validate self
            // Type
            if (typeof color_setting != 'object') {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message:
                  'Color definitions must be an object containing a key, color, and an optional array of modifiers.',
              });
              valid = false;
            } else {
              // Validate key
              // Exists
              if (color_setting.key == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A color object is missing a key value.',
                });
                valid = false;
              } else {
                // Type
                if (typeof color_setting.key != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Color keys must be a string.',
                  });
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(color_setting.key) === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Color keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                    });
                    valid = false;
                  }
                  // Detect periods
                  if (color_setting.key.includes('.') === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Color keys cannot contain periods. Use hyphen or underscore characters instead.',
                    });
                    valid = false;
                  }
                  // Reserved words
                  if (
                    color_setting.key == 'light' ||
                    color_setting.key == 'lighter' ||
                    color_setting.key == 'lightest' ||
                    color_setting.key == 'dark' ||
                    color_setting.key == 'darker' ||
                    color_setting.key == 'darkest'
                  ) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'A color key is using a reserved word (' +
                        color_setting.key +
                        ').',
                    });
                    valid = false;
                  }
                  // Only numbers
                  if (/^\d+$/.test(color_setting.key) === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'A color key is using only numbers. Color keys require at least 1 letter.',
                    });
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_colors = colors.slice();
                  sanitized_colors.splice(color_setting_index, 1);
                  sanitized_colors.forEach(function (
                    sanitized_color_setting,
                    sanitized_color_setting_index
                  ) {
                    if (color_setting.key === sanitized_color_setting.key) {
                      log_message({
                        type: 'error',
                        step: step,
                        files: path,
                        message:
                          'A color key is identical to one or more other color keys. Color keys must be unique.',
                      });
                      valid = false;
                    }
                  });
                }
              }
              // Validate color
              // Exists
              if (color_setting.color == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A color object is missing a color value.',
                });
                valid = false;
              } else {
                // Type
                if (typeof color_setting.color != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Color color values must be a string.',
                  });
                  valid = false;
                }
              }
              // Validate modifiers
              if (color_setting.modifiers) {
                // Validate self
                // Type
                if (Array.isArray(color_setting.modifiers) === false) {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message:
                      'The modifiers setting must be an array containing modifier objects.',
                  });
                  valid = false;
                } else {
                  // Validate children
                  if (color_setting.modifiers.length != 0) {
                    color_setting.modifiers.forEach(function (
                      modifier_setting,
                      modifier_setting_index
                    ) {
                      // Validate self
                      // Type
                      if (typeof modifier_setting != 'object') {
                        log_message({
                          type: 'error',
                          step: step,
                          files: path,
                          message:
                            'Modifiers must be an object containing a key and a color.',
                        });
                        valid = false;
                      } else {
                        // Validate key
                        // Exists
                        if (modifier_setting.key == null) {
                          log_message({
                            type: 'error',
                            step: step,
                            files: path,
                            message:
                              'A modifier object is missing a key value.',
                          });
                          valid = false;
                        } else {
                          // Type
                          if (typeof modifier_setting.key != 'string') {
                            log_message({
                              type: 'error',
                              step: step,
                              files: path,
                              message: 'Modifier keys must be a string.',
                            });
                            valid = false;
                          } else {
                            // Detect spaces
                            if (/\s/g.test(modifier_setting.key) === true) {
                              log_message({
                                type: 'error',
                                step: step,
                                files: path,
                                message:
                                  'Modifier keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                              });
                              valid = false;
                            }
                            // Detect periods
                            if (modifier_setting.key.includes('.') === true) {
                              log_message({
                                type: 'error',
                                step: step,
                                files: path,
                                message:
                                  'Modifier keys cannot contain periods. Use hyphen or underscore characters instead.',
                              });
                              valid = false;
                            }
                            // Doesn't match parent key
                            if (modifier_setting.key === color_setting.key) {
                              log_message({
                                type: 'error',
                                step: step,
                                files: path,
                                message:
                                  "A modifier object contains a key that is identical to its parent color object's key value. Modifier keys must be unique from their parent color and from each other.",
                              });
                              valid = false;
                            }
                            // Only numbers
                            if (/^\d+$/.test(modifier_setting.key) === true) {
                              log_message({
                                type: 'error',
                                step: step,
                                files: path,
                                message:
                                  'A modifier key is using only numbers. Modifier keys require at least 1 letter.',
                              });
                              valid = false;
                            }
                            // Duplicates
                            var sanitized_modifiers =
                              color_setting.modifiers.slice();
                            sanitized_modifiers.splice(
                              modifier_setting_index,
                              1
                            );
                            sanitized_modifiers.forEach(function (
                              sanitized_modifier_setting,
                              sanitized_modifier_setting_index
                            ) {
                              if (
                                modifier_setting.key ===
                                sanitized_modifier_setting.key
                              ) {
                                log_message({
                                  type: 'error',
                                  step: step,
                                  files: path,
                                  message:
                                    'A modifier object contains a key that is identical to another modifier defined in its parent color object. Modifier keys must be unique.',
                                });
                                valid = false;
                              }
                            });
                          }
                        }
                        // Validate color
                        // Exists
                        if (modifier_setting.color == null) {
                          log_message({
                            type: 'error',
                            step: step,
                            files: path,
                            message:
                              'A modifier object is missing a color value.',
                          });
                          valid = false;
                        } else {
                          // Type
                          if (typeof modifier_setting.color != 'string') {
                            log_message({
                              type: 'error',
                              step: step,
                              files: path,
                              message: 'Modifier colors must be a string.',
                            });
                            valid = false;
                          }
                        }
                      }
                    });
                  }
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
  validate_colors,
};
