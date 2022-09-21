// Hydrogen: Validate settings.styles.tokens.radii
'use strict';

// Vendor dependencies

// Hydrogen dependencies
const { log_info } = require('../../../../../logs/logs');

// Validation dependencies
const { log_error } = require('../../../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_radii(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.tokens.radii';
    var valid = true;
    if (settings.styles.tokens.radii != null) {
      // Create working variables ==============================================
      var radii = settings.styles.tokens.radii;
      // Validate self =========================================================
      // Type
      if (Array.isArray(radii) === false) {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The radii setting must be an array containing radius objects.'
        );
        valid = false;
      } else {
        // Validate children ===================================================
        if (radii.length != 0) {
          radii.forEach(function (radius_setting, radius_setting_index) {
            // Validate self ---------------------------------------------------
            // Type
            if (typeof radius_setting != 'object') {
              log_error(
                'Invalid setting type',
                validation_step,
                settings.path,
                'Radii definitions must be an object containing a key and a radius.'
              );
              valid = false;
            } else {
              // Validate key --------------------------------------------------
              // Exists
              if (radius_setting.key == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A radius object is missing a key value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof radius_setting.key != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Radius keys must be a string.'
                  );
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(radius_setting.key) === true) {
                    log_error(
                      'Key contains whitespace',
                      validation_step,
                      settings.path,
                      'Radius keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                      radius_setting.key
                    );
                    valid = false;
                  }
                  // Detect periods
                  if (radius_setting.key.includes('.') === true) {
                    log_error(
                      'Key contains period',
                      validation_step,
                      settings.path,
                      'Radius keys cannot contain periods. Use hyphen or underscore characters instead.',
                      radius_setting.key
                    );
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
                      log_error(
                        'Duplicate keys',
                        validation_step,
                        settings.path,
                        'A radius key is identical to one or more other radius keys. Radius keys must be unique.',
                        radius_setting.key
                      );
                      valid = false;
                    }
                  });
                }
              }
              // Validate radius -----------------------------------------------
              // Exists
              if (radius_setting.radius == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A radius object is missing a radius value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof radius_setting.radius != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Radius radius values must be a string.'
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
  validate_radii,
};
