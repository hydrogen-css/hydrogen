// Hydrogen: Validate settings.styles.foundations.media
'use strict';

// Hydrogen type imports
let Settings = require('../../../../../../data/settings-model-definition');
/**
 * @typedef {import('../../../../../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
let state_data = require('../../../../../../data/state-model');
// Hydrogen function imports
const { log_message } = require('../../../../../logs/log-message');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

// Set convenience values for error logging
let step = 'Settings validation: media';

/**
 * Validates the user's media configuration
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings file
 * @returns {boolean} True if valid
 */
function validate_media(settings, path) {
  try {
    // Set the validity to true by default
    let valid = true;
    if (settings.styles.foundations.media) {
      // Validate self
      // Type
      if (Array.isArray(settings.styles.foundations.media) === false) {
        log_message({
          type: 'error',
          step: step,
          files: path,
          message: 'The media setting must be an array of media objects.',
        });
        valid = false;
      } else {
        // Validate children
        if (settings.styles.foundations.media.length != 0) {
          settings.styles.foundations.media.forEach(function (
            query,
            query_index
          ) {
            // Validate keys
            // Exists
            if (query.key == null) {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message: 'A media object is missing a key value.',
              });
              valid = false;
            } else {
              // Type
              if (typeof query.key != 'string') {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'Media keys must be a string.',
                });
                valid = false;
              } else {
                // Detect spaces
                if (/\s/g.test(query.key) === true) {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message:
                      'Media keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                  });
                  valid = false;
                }
                // Detect periods
                if (query.key.includes('.') === true) {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message:
                      'Media keys cannot contain periods. Use hyphen or underscore characters instead.',
                  });
                  valid = false;
                }
                // Reserved words
                state_data.forEach(function (state) {
                  if (query.key === state) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'A media key is using a reserved word (' +
                        query.key +
                        ').',
                    });
                    valid = false;
                  }
                });
                if (
                  query.key === 'dark' ||
                  query.key === 'id' ||
                  query.key === 'class' ||
                  query.key === 'children'
                ) {
                  log_message({
                    type: 'error',
                    step: step,
                    files: path,
                    message:
                      'A media key is using a reserved word (' +
                      query.key +
                      ').',
                  });
                  valid = false;
                }
                // Duplicates
                var sanitized_media_array =
                  settings.styles.foundations.media.slice();
                sanitized_media_array.splice(query_index, 1);
                // Add the base query
                let base_query = {
                  key: 'base',
                  query: null,
                };
                if (settings.build && settings.build.base_query_key) {
                  base_query.key = settings.build.base_query_key;
                }
                sanitized_media_array =
                  sanitized_media_array.concat(base_query);
                sanitized_media_array.forEach(function (sanitized_query) {
                  if (query.key === sanitized_query.key) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'A media key is identical to one or more other media keys. Media keys must be unique.',
                    });
                    valid = false;
                  }
                });
                // Ends with other key
                sanitized_media_array.forEach(function (sanitized_query) {
                  if (typeof sanitized_query.key === 'string') {
                    if (sanitized_query.key.endsWith(query.key)) {
                      log_message({
                        type: 'error',
                        step: step,
                        files: path,
                        message:
                          "Due to the nature of wildcard attribute selectors, media keys cannot end in the same string as another media key. A media key ends with another media key's value and must be changed.",
                      });
                      valid = false;
                    }
                  }
                });
              }
            }
            // Validate queries
            // Exists
            if (query.query == null) {
              log_message({
                type: 'error',
                step: step,
                files: path,
                message: 'A media object is missing a query value.',
              });
              valid = false;
            } else {
              // Type
              if (typeof query.query != 'string') {
                log_message({
                  type: 'error',
                  step: step,
                  files: path,
                  message: 'Media query values must be a string.',
                });
                valid = false;
              } else {
                // Duplicates
                sanitized_media_array.forEach(function (sanitized_query) {
                  if (query.query === sanitized_query.query) {
                    log_message({
                      type: 'error',
                      step: step,
                      files: path,
                      message:
                        'A media query is identical to one or more other media queries. Media queries must be unique.',
                    });
                    valid = false;
                  }
                });
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
  validate_media,
};
