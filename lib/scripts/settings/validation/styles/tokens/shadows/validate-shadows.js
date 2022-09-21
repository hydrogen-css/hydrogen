// Hydrogen: Validate settings.styles.tokens.shadows
'use strict';

// Vendor dependencies

// Hydrogen dependencies
const { log_info } = require('../../../../../logs/logs');

// Validation dependencies
const { log_error } = require('../../../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_shadows(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.tokens.shadows';
    var valid = true;
    if (settings.styles.tokens.shadows != null) {
      // Create working variables ==============================================
      var shadows = settings.styles.tokens.shadows;
      // Validate self =========================================================
      // Type
      if (Array.isArray(shadows) === false) {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The shadows setting must be an array containing shadow objects.'
        );
        valid = false;
      } else {
        // Validate children ===================================================
        if (shadows.length != 0) {
          shadows.forEach(function (shadow_setting, shadow_setting_index) {
            // Validate self ---------------------------------------------------
            // Type
            if (typeof shadow_setting != 'object') {
              log_error(
                'Invalid setting type',
                validation_step,
                settings.path,
                'Shadow definitions must be an object containing a key and shadow.'
              );
              valid = false;
            } else {
              // Validate key --------------------------------------------------
              // Exists
              if (shadow_setting.key == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A shadow object is missing a key value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof shadow_setting.key != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Shadow keys must be a string.'
                  );
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(shadow_setting.key) === true) {
                    log_error(
                      'Key contains whitespace',
                      validation_step,
                      settings.path,
                      'Shadow keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                      shadow_setting.key
                    );
                    valid = false;
                  }
                  // Detect periods
                  if (shadow_setting.key.includes('.') === true) {
                    log_error(
                      'Key contains period',
                      validation_step,
                      settings.path,
                      'Shadow keys cannot contain periods. Use hyphen or underscore characters instead.',
                      shadow_setting.key
                    );
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_shadows = shadows.slice();
                  sanitized_shadows.splice(shadow_setting_index, 1);
                  sanitized_shadows.forEach(function (
                    sanitized_shadow_setting,
                    sanitized_shadow_setting_index
                  ) {
                    if (shadow_setting.key === sanitized_shadow_setting.key) {
                      log_error(
                        'Duplicate keys',
                        validation_step,
                        settings.path,
                        'A shadow key is identical to one or more other shadow keys. Shadow keys must be unique.',
                        shadow_setting.key
                      );
                      valid = false;
                    }
                  });
                }
              }
              // Validate shadow -----------------------------------------------
              // Exists
              if (shadow_setting.shadow == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A shadow object is missing a shadow value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof shadow_setting.shadow != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Shadow shadow values must be a string.'
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
  validate_shadows,
};
