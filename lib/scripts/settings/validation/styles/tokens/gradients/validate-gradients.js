// Hydrogen: Validate settings.styles.tokens.gradients
'use strict';

// Vendor dependencies

// Hydrogen dependencies
const { log_info } = require('../../../../../logs/logs');

// Validation dependencies
const { log_error } = require('../../../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_gradients(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.tokens.gradients';
    var valid = true;
    if (settings.styles.tokens.gradients != null) {
      // Create working variables ==============================================
      var gradients = settings.styles.tokens.gradients;
      // Validate self =========================================================
      // Type
      if (Array.isArray(gradients) === false) {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The gradients setting must be an array containing gradient objects.'
        );
        valid = false;
      } else {
        // Validate children ===================================================
        if (gradients.length != 0) {
          gradients.forEach(function (
            gradient_setting,
            gradient_setting_index
          ) {
            // Validate self ---------------------------------------------------
            // Type
            if (typeof gradient_setting != 'object') {
              log_error(
                'Invalid setting type',
                validation_step,
                settings.path,
                'Gradient definitions must be an object containing a key, gradient, and a fallback color.'
              );
              valid = false;
            } else {
              // Validate key --------------------------------------------------
              // Exists
              if (gradient_setting.key == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A gradient object is missing a key value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof gradient_setting.key != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Gradient keys must be a string.'
                  );
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(gradient_setting.key) === true) {
                    log_error(
                      'Key contains whitespace',
                      validation_step,
                      settings.path,
                      'Gradient keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                      gradient_setting.key
                    );
                    valid = false;
                  }
                  // Detect periods
                  if (gradient_setting.key.includes('.') === true) {
                    log_error(
                      'Key contains period',
                      validation_step,
                      settings.path,
                      'Gradient keys cannot contain periods. Use hyphen or underscore characters instead.',
                      gradient_setting.key
                    );
                    valid = false;
                  }
                  // Not a color key
                  if (settings.styles.tokens.colors != null) {
                    settings.styles.tokens.colors.forEach(function (
                      color_setting,
                      color_setting_index
                    ) {
                      if (gradient_setting.key === color_setting.key) {
                        log_error(
                          'Duplicate keys',
                          validation_step,
                          settings.path,
                          'A gradient key is identical to one or more color keys. Color, color modifier, and gradient keys must be unique.',
                          gradient_setting.key
                        );
                        valid = false;
                      }
                      if (color_setting.modifiers != null) {
                        if (color_setting.modifiers.length != 0) {
                          color_setting.modifiers.forEach(function (
                            modifier_setting,
                            modifier_setting_index
                          ) {
                            if (gradient_setting.key === modifier_setting.key) {
                              log_error(
                                'Duplicate keys',
                                validation_step,
                                settings.path,
                                'A gradient key is identical to one or more color modifier keys. Color, color modifier, and gradient keys must be unique.',
                                gradient_setting.key
                              );
                              valid = false;
                            }
                          });
                        }
                      }
                    });
                  }
                  // Duplicates
                  var sanitized_gradients = gradients.slice();
                  sanitized_gradients.splice(gradient_setting_index, 1);
                  sanitized_gradients.forEach(function (
                    sanitized_gradient_setting,
                    sanitized_gradient_setting_index
                  ) {
                    if (
                      gradient_setting.key === sanitized_gradient_setting.key
                    ) {
                      log_error(
                        'Duplicate keys',
                        validation_step,
                        settings.path,
                        'A gradient key is identical to one or more other gradient keys. Gradient keys must be unique.',
                        gradient_setting.key
                      );
                      valid = false;
                    }
                  });
                }
              }
              // Validate gradient ---------------------------------------------
              // Exists
              if (gradient_setting.gradient == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A gradient object is missing a gradient value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof gradient_setting.gradient != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Gradient gradient values must be a string.'
                  );
                  valid = false;
                }
              }
              // Validate fallback ---------------------------------------------
              // Exists
              if (gradient_setting.fallback == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A gradient object is missing a fallback value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof gradient_setting.fallback != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Gradient fallback values must be a string.'
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
  validate_gradients,
};
