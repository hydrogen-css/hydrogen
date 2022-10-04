// Hydrogen: Validate settings.styles.tokens.radii
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
 * Validates the user's radii configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_radii(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.tokens.radii) {
      // Create working variables
      var radii = settings.styles.tokens.radii;
      // Validate self
      // Type
      if (Array.isArray(radii) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The radii setting must be an array containing radius objects.',
          setting: 'settings.styles.tokens.radii',
        });
        valid = false;
      } else {
        // Validate children
        if (radii.length != 0) {
          radii.forEach(function (radius_setting, radius_setting_index) {
            // Validate self
            // Type
            if (typeof radius_setting != 'object') {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message:
                  'Radii definitions must be an object containing a key and a radius.',
                setting: 'settings.styles.tokens.radii',
              });
              valid = false;
            } else {
              // Validate key
              // Exists
              if (radius_setting.key == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A radius object is missing a key value.',
                  setting: 'settings.styles.tokens.radii',
                });
                valid = false;
              } else {
                // Type
                if (typeof radius_setting.key != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Radius keys must be a string.',
                    setting: radius_setting.key,
                  });
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(radius_setting.key) === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Radius keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                      setting: radius_setting.key,
                    });
                    valid = false;
                  }
                  // Detect periods
                  if (radius_setting.key.includes('.') === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Radius keys cannot contain periods. Use hyphen or underscore characters instead.',
                      setting: radius_setting.key,
                    });
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_radii = radii.slice();
                  sanitized_radii.splice(radius_setting_index, 1);
                  sanitized_radii.forEach(function (
                    sanitized_radius_setting,
                    sanitized_radius_setting_index
                  ) {
                    if (radius_setting.key === sanitized_radius_setting.key) {
                      log_message({
                        type: 'error',
                        step: step,
                        files: path,
                        message:
                          'A radius key is identical to one or more other radius keys. Radius keys must be unique.',
                        setting: radius_setting.key,
                      });
                      valid = false;
                    }
                  });
                }
              }
              // Validate radius
              // Exists
              if (radius_setting.radius == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A radius object is missing a radius value.',
                  setting: 'settings.styles.tokens.radii',
                });
                valid = false;
              } else {
                // Type
                if (typeof radius_setting.radius != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Radius radius values must be a string.',
                    setting: radius_setting.radius,
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
      setting: 'settings.styles.tokens.radii',
    });
    return false;
  }
}

module.exports = {
  validate_radii,
};
