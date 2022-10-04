// Hydrogen: Validate settings.styles.tokens.transitions.delays
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
 * Validates the user's transition delay configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_delays(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.tokens.transitions.delays) {
      // Create working variables
      var delays = settings.styles.tokens.transitions.delays;
      // Validate self
      // Type
      if (Array.isArray(delays) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The transition delays setting must be an array containing delay objects.',
          setting: 'settings.styles.tokens.transitions.delays',
        });
        valid = false;
      } else {
        // Validate children
        if (delays.length != 0) {
          delays.forEach(function (delay_setting, delay_setting_index) {
            // Validate self
            // Type
            if (typeof delay_setting != 'object') {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message:
                  'Transition delay definitions must be an object containing a key and delay.',
                setting: 'settings.styles.tokens.transitions.delays',
              });
              valid = false;
            } else {
              // Validate key
              // Exists
              if (delay_setting.key == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A transition delay object is missing a key value.',
                  setting: 'settings.styles.tokens.transitions.delays',
                });
                valid = false;
              } else {
                // Type
                if (typeof delay_setting.key != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Transition delay keys must be a string.',
                    setting: 'settings.styles.tokens.transitions.delays',
                  });
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(delay_setting.key) === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Delay keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                      setting: delay_setting.key,
                    });
                    valid = false;
                  }
                  // Detect periods
                  if (delay_setting.key.includes('.') === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Delay keys cannot contain periods. Use hyphen or underscore characters instead.',
                      setting: delay_setting.key,
                    });
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_delays = delays.slice();
                  sanitized_delays.splice(delay_setting_index, 1);
                  sanitized_delays.forEach(function (sanitized_delay_setting) {
                    if (delay_setting.key === sanitized_delay_setting.key) {
                      log_message({
                        type: 'error',
                        step: step,
                        files: path,
                        message:
                          'A transition delay key is identical to one or more other delay keys. Delay keys must be unique.',
                        setting: delay_setting.key,
                      });
                      valid = false;
                    }
                  });
                }
              }
              // Validate delay
              // Exists
              if (delay_setting.delay == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message:
                    'A transition delay object is missing a delay value.',
                  setting: 'settings.styles.tokens.transitions.delays',
                });
                valid = false;
              } else {
                // Type
                if (typeof delay_setting.delay != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Transition delay delay values must be a string.',
                    setting: delay_setting.delay,
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
      setting: 'settings.styles.tokens.transitions.delays',
    });
    return false;
  }
}

module.exports = {
  validate_delays,
};
