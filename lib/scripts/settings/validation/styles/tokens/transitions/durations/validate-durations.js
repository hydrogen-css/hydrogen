// Hydrogen: Validate settings.styles.tokens.transitions.durations
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
 * Validates the user's transition duration configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_durations(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.tokens.transitions.durations) {
      // Create working variables
      var durations = settings.styles.tokens.transitions.durations;
      // Validate self
      // Type
      if (Array.isArray(durations) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The transition durations setting must be an array containing duration objects.',
          setting: 'settings.styles.tokens.transitions.durations',
        });
        valid = false;
      } else {
        // Validate children
        if (durations.length != 0) {
          durations.forEach(function (
            duration_setting,
            duration_setting_index
          ) {
            // Validate self
            // Type
            if (typeof duration_setting != 'object') {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message:
                  'Transition duration definitions must be an object containing a key and duration.',
                setting: 'settings.styles.tokens.transitions.durations',
              });
              valid = false;
            } else {
              // Validate key
              // Exists
              if (duration_setting.key == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message:
                    'A duration definition in styles.tokens.transitions.durations is missing a key value.',
                  setting: 'settings.styles.tokens.transitions.durations',
                });
                valid = false;
              } else {
                // Type
                if (typeof duration_setting.key != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message:
                      'A transition duration object is missing a key value.',
                    setting: 'settings.styles.tokens.transitions.durations',
                  });
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(duration_setting.key) === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Duration keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                      setting: duration_setting.key,
                    });
                    valid = false;
                  }
                  // Detect periods
                  if (duration_setting.key.includes('.') === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Duration keys cannot contain periods. Use hyphen or underscore characters instead.',
                      setting: duration_setting.key,
                    });
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_durations = durations.slice();
                  sanitized_durations.splice(duration_setting_index, 1);
                  sanitized_durations.forEach(function (
                    sanitized_duration_setting
                  ) {
                    if (
                      duration_setting.key === sanitized_duration_setting.key
                    ) {
                      log_message({
                        type: 'error',
                        step: step,
                        files: path,
                        message:
                          'A transition duration key is identical to one or more other duration keys. Duration keys must be unique.',
                        setting: duration_setting.key,
                      });
                      valid = false;
                    }
                  });
                }
              }
              // Validate duration
              // Exists
              if (duration_setting.duration == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message:
                    'A transition duration object is missing a duration value.',
                  setting: 'settings.styles.tokens.transitions.durations',
                });
                valid = false;
              } else {
                // Type
                if (typeof duration_setting.duration != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message:
                      'Transition duration duration values must be a string.',
                    setting: duration_setting.duration,
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
      setting: 'settings.styles.tokens.transitions.durations',
    });
    return false;
  }
}

module.exports = {
  validate_durations,
};
