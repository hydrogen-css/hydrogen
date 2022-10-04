// Hydrogen: Validate settings.styles.tokens.containers
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
let step = 'Settings validation: containers';

/**
 * Validates the user's media configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_containers(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.tokens.containers) {
      // Create working variables
      var containers = settings.styles.tokens.containers;
      // Validate self
      // Type
      if (Array.isArray(containers) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The containers setting must be an array containing container objects.',
        });
        valid = false;
      } else {
        // Validate children
        if (containers.length != 0) {
          containers.forEach(function (
            container_setting,
            container_setting_index
          ) {
            // Validate self
            // Type
            if (typeof container_setting != 'object') {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message:
                  'Container definitions must be an object containing a key and a max_width.',
              });
              valid = false;
            } else {
              // Validate key
              // Exists
              if (container_setting.key == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A container object is missing a key value.',
                });
                valid = false;
              } else {
                // Type
                if (typeof container_setting.key != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Container keys must be a string.',
                  });
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(container_setting.key) === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Container keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                    });
                    valid = false;
                  }
                  // Detect periods
                  if (container_setting.key.includes('.') === true) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'Container keys cannot contain periods. Use hyphen or underscore characters instead.',
                    });
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_containers = containers.slice();
                  sanitized_containers.splice(container_setting_index, 1);
                  sanitized_containers.forEach(function (
                    sanitized_container_setting,
                    sanitized_container_setting_index
                  ) {
                    if (
                      container_setting.key === sanitized_container_setting.key
                    ) {
                      log_message({
                        type: 'error',
                        step: step,
                        files: path,
                        message:
                          'A container key is identical to one or more other container keys. Container keys must be unique.',
                      });
                      valid = false;
                    }
                  });
                }
              }
              // Validate max_width
              // Exists
              if (container_setting.max_width == null) {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'A container object is missing a max_width value.',
                });
                valid = false;
              } else {
                // Type
                if (typeof container_setting.max_width != 'string') {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message: 'Container max_widths must be a string.',
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
  validate_containers,
};
