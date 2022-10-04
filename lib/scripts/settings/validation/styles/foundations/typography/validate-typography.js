// Hydrogen: Validate settings.styles.foundations.typography
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
let step = 'Settings validation: typography';

/**
 * Validates the user's typography configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_typography(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    // Validate self
    // Exists
    if (settings.styles.foundations == null) {
      log_message({
        type: 'error',
        step: step,
        files: path,
        message: "The typography setting doesn't exist and is required.",
      });
      valid = false;
    } else {
      // Type
      if (Array.isArray(settings.styles.foundations.typography) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message:
            'The typography setting must be an array containing typography objects.',
        });
        valid = false;
      } else {
        // Length
        if (settings.styles.foundations.typography.length === 0) {
          log_message({
            type: 'error',
            step: step,
            files: path,
            message: 'The typography setting array is empty.',
          });
          valid = false;
        } else {
          // Validate children
          settings.styles.foundations.typography.forEach(function (
            typography_setting,
            typography_setting_index
          ) {
            // Validate query_key
            // Exists
            if (typography_setting.query_key == null) {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message: 'A typography object is missing a query_key value.',
              });
              valid = false;
            } else {
              // Type
              if (typeof typography_setting.query_key != 'string') {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'Typography query_keys must be a string.',
                });
                valid = false;
              } else {
                // Matches media query
                var match_status = false;
                // Add the base query
                let base_query = {
                  key: 'base',
                  query: null,
                };
                if (settings.build && settings.build.base_query_key) {
                  base_query.key = settings.build.base_query_key;
                }
                let media_array =
                  settings.styles.foundations.media.concat(base_query);
                media_array.forEach(function (media_setting) {
                  if (typography_setting.query_key === media_setting.key) {
                    match_status = true;
                  }
                });
                if (match_status === false) {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message:
                      "A typography object has a query_key that doesn't match any defined media keys. Typography query_key values must always match a defined media key.",
                  });
                  valid = false;
                }
                // Duplicates
                var sanitized_typography_array =
                  settings.styles.foundations.typography.slice();
                sanitized_typography_array.splice(typography_setting_index, 1);
                sanitized_typography_array.forEach(function (
                  sanitized_typography_setting,
                  sanitized_typography_setting_index
                ) {
                  if (
                    typography_setting.query_key ===
                    sanitized_typography_setting.query_key
                  ) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'A typography query_key is identical to one or more other typography query_keys. Query_keys must be unique.',
                    });
                    valid = false;
                  }
                });
              }
            }
            // Validate line_height
            // Exists
            if (typography_setting.line_height == null) {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message: 'A typography object is missing a line_height value.',
              });
              valid = false;
            } else {
              // Type
              if (typeof typography_setting.line_height != 'string') {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'Typography line_height values must be a string.',
                });
                valid = false;
              }
            }
            // Validate size
            // Exists
            if (typography_setting.size == null) {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message: 'A typography object is missing a size value.',
              });
              valid = false;
            } else {
              // Type
              if (typeof typography_setting.size != 'string') {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'Typography size values must be a string.',
                });
                valid = false;
              }
            }
            // Validate type_scale
            // Exists
            if (typography_setting.type_scale == null) {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message: 'A typography object is missing a type_scale value.',
              });
              valid = false;
            } else {
              // Type
              if (typeof typography_setting.type_scale != 'string') {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'Typography type_scale values must be a string.',
                });
                valid = false;
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
  validate_typography,
};
