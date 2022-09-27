// Hydrogen: Validate media
'use strict';

// Hydrogen type imports
// Hydrogen data imports
let state_data = require('../../../../../../data/state-model');
// Hydrogen function imports
const { log_info } = require('../../../../../logs/logs');
const { log_error } = require('../../../log-error');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

function validate_media(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.foundations.media';
    var valid = true;
    if (settings.styles.foundations.media != null) {
      // Validate self =========================================================
      // Type
      if (Array.isArray(settings.styles.foundations.media) === false) {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The media setting must be an array of media objects.'
        );
        valid = false;
      } else {
        // Validate children ===================================================
        if (settings.styles.foundations.media.length != 0) {
          settings.styles.foundations.media.forEach(function (
            query,
            query_index
          ) {
            // Validate keys ---------------------------------------------------
            // Exists
            if (query.key == null) {
              log_error(
                'Missing setting',
                validation_step,
                settings.path,
                'A media object is missing a key value.'
              );
              valid = false;
            } else {
              // Type
              if (typeof query.key != 'string') {
                log_error(
                  'Invalid setting type',
                  validation_step,
                  settings.path,
                  'Media keys must be a string.'
                );
                valid = false;
              } else {
                // Detect spaces
                if (/\s/g.test(query.key) === true) {
                  log_error(
                    'Key contains whitespace',
                    validation_step,
                    settings.path,
                    'Media keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                    query.key
                  );
                  valid = false;
                }
                // Detect periods
                if (query.key.includes('.') === true) {
                  log_error(
                    'Key contains period',
                    validation_step,
                    settings.path,
                    'Media keys cannot contain periods. Use hyphen or underscore characters instead.',
                    query.key
                  );
                  valid = false;
                }
                // Reserved words
                state_data.forEach(function (state) {
                  if (query.key === state) {
                    log_error(
                      'Reserved keyword',
                      validation_step,
                      settings.path,
                      'A media key is using a reserved word (' +
                        query.key +
                        ').',
                      query.key + ': ' + query.query
                    );
                    valid = false;
                  }
                });
                if (
                  query.key === 'dark' ||
                  query.key === 'id' ||
                  query.key === 'class' ||
                  query.key === 'children'
                ) {
                  log_error(
                    'Reserved keyword',
                    validation_step,
                    settings.path,
                    'A media key is using a reserved word (' + query.key + ').',
                    query.key + ': ' + query.query
                  );
                  valid = false;
                }
                // Duplicates
                var sanitized_media_array =
                  settings.styles.foundations.media.slice();
                sanitized_media_array.splice(query_index, 1);
                sanitized_media_array.forEach(function (
                  sanitized_query,
                  sanitized_query_index
                ) {
                  if (query.key === sanitized_query.key) {
                    log_error(
                      'Duplicate keys',
                      validation_step,
                      settings.path,
                      'A media key is identical to one or more other media keys. Media keys must be unique.',
                      query.key + ': ' + query.query
                    );
                    valid = false;
                  }
                });
                // Ends with other key
                sanitized_media_array.forEach(function (
                  sanitized_query,
                  sanitized_query_index
                ) {
                  if (typeof sanitized_query.key === 'string') {
                    if (sanitized_query.key.endsWith(query.key)) {
                      log_error(
                        'Invalid media query key',
                        validation_step,
                        settings.path,
                        "Due to the nature of wildcard attribute selectors, media keys cannot end in the same string as another media key. A media key ends with another media key's value and must be changed.",
                        query.key + ': ' + query.query
                      );
                      valid = false;
                    }
                  }
                });
              }
            }
            // Validate queries ------------------------------------------------
            // Exists
            if (query.query == null) {
              log_error(
                'Missing setting',
                validation_step,
                settings.path,
                'A media object is missing a query value.'
              );
              valid = false;
            } else {
              // Type
              if (typeof query.query != 'string') {
                log_error(
                  'Invalid setting type',
                  validation_step,
                  settings.path,
                  'Media query values must be a string.'
                );
                valid = false;
              } else {
                // Duplicates
                sanitized_media_array.forEach(function (
                  sanitized_query,
                  sanitized_query_index
                ) {
                  if (query.query === sanitized_query.query) {
                    log_error(
                      'Duplicate queries',
                      validation_step,
                      settings.path,
                      'A media query is identical to one or more other media queries. Media queries must be unique.',
                      query.key + ': ' + query.query
                    );
                    valid = false;
                  }
                });
              }
            }
          });
        }
      }
    }
    // Check validity ==========================================================
    if (valid === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // Catch any errors ========================================================
    log_info(
      'error',
      'Unknown error',
      validation_step,
      null,
      null,
      null,
      [settings.path],
      error
    );
    return false;
  }
}

module.exports = {
  validate_media,
};
