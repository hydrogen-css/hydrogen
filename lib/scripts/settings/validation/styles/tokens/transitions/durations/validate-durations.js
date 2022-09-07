// Hydrogen: Validate settings.styles.tokens.transitions.durations
'use strict';

// Vendor dependencies

// Hydrogen dependencies
const { log_info } = require('../../../../../../logs');

// Validation dependencies
const { log_error } = require('../../../../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_durations(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.tokens.transitions.durations';
    var valid = true;
    if (settings.styles.tokens.transitions.durations != null) {
      // Create working variables ==============================================
      var durations = settings.styles.tokens.transitions.durations;
      // Validate self =========================================================
      // Type
      if (Array.isArray(durations) === false) {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The transition durations setting must be an array containing duration objects.'
        );
        valid = false;
      } else {
        // Validate children ===================================================
        if (durations.length != 0) {
          durations.forEach(function (
            duration_setting,
            duration_setting_index
          ) {
            // Validate self ---------------------------------------------------
            // Type
            if (typeof duration_setting != 'object') {
              log_error(
                'Invalid setting type',
                validation_step,
                settings.path,
                'Transition duration definitions must be an object containing a key and duration.'
              );
              valid = false;
            } else {
              // Validate key --------------------------------------------------
              // Exists
              if (duration_setting.key == null) {
                console.log(
                  'A duration definition in styles.tokens.transitions.durations is missing a key value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof duration_setting.key != 'string') {
                  log_error(
                    'Missing setting',
                    validation_step,
                    settings.path,
                    'A transition duration object is missing a key value.'
                  );
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(duration_setting.key) === true) {
                    log_error(
                      'Key contains whitespace',
                      validation_step,
                      settings.path,
                      'Duration keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                      duration_setting.key
                    );
                    valid = false;
                  }
                  // Detect periods
                  if (duration_setting.key.includes('.') === true) {
                    log_error(
                      'Key contains period',
                      validation_step,
                      settings.path,
                      'Duration keys cannot contain periods. Use hyphen or underscore characters instead.',
                      duration_setting.key
                    );
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_durations = durations.slice();
                  sanitized_durations.splice(duration_setting_index, 1);
                  sanitized_durations.forEach(function (
                    sanitized_duration_setting,
                    sanitized_duration_setting_index
                  ) {
                    if (
                      duration_setting.key === sanitized_duration_setting.key
                    ) {
                      log_error(
                        'Duplicate keys',
                        validation_step,
                        settings.path,
                        'A transition duration key is identical to one or more other duration keys. Duration keys must be unique.',
                        duration_setting.key
                      );
                      valid = false;
                    }
                  });
                }
              }
              // Validate duration ---------------------------------------------
              // Exists
              if (duration_setting.duration == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A transition duration object is missing a duration value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof duration_setting.duration != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Transition duration duration values must be a string.'
                  );
                  valid = false;
                }
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
  validate_durations,
};
