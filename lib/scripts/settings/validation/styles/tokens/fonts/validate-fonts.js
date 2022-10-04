// Hydrogen: Validate settings.styles.tokens.fonts
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
let step = 'Settings validation: fonts';

/**
 * Validates the user's font family configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_fonts(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.tokens.fonts) {
      // Create working variables
      var fonts = settings.styles.tokens.fonts;
      // Validate self
      // Type
      if (Array.isArray(fonts) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The fonts setting must be an array containing font objects.',
        });
        valid = false;
      } else {
        // Validate children
        if (fonts.length != 0) {
          fonts.forEach(function (font_setting, font_setting_index) {
            // Validate self
            // Type
            if (typeof font_setting != 'object') {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message:
                  'Font definitions must be an object containing a key and a family.',
              });
              valid = false;
            } else {
              // Validate key
              // Exists
              if (font_setting.key == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A font object is missing a key value.',
                });
                valid = false;
              } else {
                // Type
                if (typeof font_setting.key != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Font keys must be a string.',
                  });
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(font_setting.key) === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Font keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                    });
                    valid = false;
                  }
                  // Detect periods
                  if (font_setting.key.includes('.') === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Font keys cannot contain periods. Use hyphen or underscore characters instead.',
                    });
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_fonts = fonts.slice();
                  sanitized_fonts.splice(font_setting_index, 1);
                  sanitized_fonts.forEach(function (
                    sanitized_font_setting,
                    sanitized_font_setting_index
                  ) {
                    if (font_setting.key === sanitized_font_setting.key) {
                      log_message({
                        type: 'error',
                        step: step,
                        files: path,
                        message:
                          'A font key is identical to one or more other font keys. Font keys must be unique.',
                      });
                      valid = false;
                    }
                  });
                }
              }
              // Validate family
              // Exists
              if (font_setting.family == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A font object is missing a family value.',
                });
                valid = false;
              } else {
                // Type
                if (typeof font_setting.family != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Font family values must be a string.',
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
  validate_fonts,
};
