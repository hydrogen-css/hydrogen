// Hydrogen: Validate settings.styles.tokens.shadows
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
let step = 'Settings validation';

/**
 * Validates the user's shadow configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_shadows(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.tokens.shadows) {
      // Create working variables
      var shadows = settings.styles.tokens.shadows;
      // Validate self
      // Type
      if (Array.isArray(shadows) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The shadows setting must be an array containing shadow objects.',
          setting: 'settings.styles.tokens.shadows',
        });
        valid = false;
      } else {
        // Validate children
        if (shadows.length != 0) {
          shadows.forEach(function (shadow_setting, shadow_setting_index) {
            // Validate self
            // Type
            if (typeof shadow_setting != 'object') {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message:
                  'Shadow definitions must be an object containing a key and shadow.',
                setting: 'settings.styles.tokens.shadows',
              });
              valid = false;
            } else {
              // Validate key
              // Exists
              if (shadow_setting.key == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A shadow object is missing a key value.',
                  setting: 'settings.styles.tokens.shadows',
                });
                valid = false;
              } else {
                // Type
                if (typeof shadow_setting.key != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Shadow keys must be a string.',
                    setting: 'settings.styles.tokens.shadows',
                  });
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(shadow_setting.key) === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Shadow keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                      setting: shadow_setting.key,
                    });
                    valid = false;
                  }
                  // Detect periods
                  if (shadow_setting.key.includes('.') === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Shadow keys cannot contain periods. Use hyphen or underscore characters instead.',
                      setting: shadow_setting.key,
                    });
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_shadows = shadows.slice();
                  sanitized_shadows.splice(shadow_setting_index, 1);
                  sanitized_shadows.forEach(function (
                    sanitized_shadow_setting
                  ) {
                    if (shadow_setting.key === sanitized_shadow_setting.key) {
                      log_message({
                        type: 'error',
                        step: step,
                        files: path,
                        message:
                          'A shadow key is identical to one or more other shadow keys. Shadow keys must be unique.',
                        setting: shadow_setting.key,
                      });
                      valid = false;
                    }
                  });
                }
              }
              // Validate shadow
              // Exists
              if (shadow_setting.shadow == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A shadow object is missing a shadow value.',
                  setting: 'settings.styles.tokens.shadows',
                });
                valid = false;
              } else {
                // Type
                if (typeof shadow_setting.shadow != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Shadow shadow values must be a string.',
                    setting: shadow_setting.shadow,
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
      setting: 'settings.styles.tokens.shadows',
    });
    return false;
  }
}

module.exports = {
  validate_shadows,
};
