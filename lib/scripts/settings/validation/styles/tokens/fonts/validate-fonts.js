// Hydrogen: Validate settings.styles.tokens.fonts
'use strict';

// Vendor dependencies

// Hydrogen dependencies
const { log_info } = require('../../../../../logs/logs');

// Validation dependencies
const { log_error } = require('../../../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_fonts(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.tokens.fonts';
    var valid = true;
    if (settings.styles.tokens.fonts != null) {
      // Create working variables ==============================================
      var fonts = settings.styles.tokens.fonts;
      // Validate self =========================================================
      // Type
      if (Array.isArray(fonts) === false) {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The fonts setting must be an array containing font objects.'
        );
        valid = false;
      } else {
        // Validate children ===================================================
        if (fonts.length != 0) {
          fonts.forEach(function (font_setting, font_setting_index) {
            // Validate self ---------------------------------------------------
            // Type
            if (typeof font_setting != 'object') {
              log_error(
                'Invalid setting type',
                validation_step,
                settings.path,
                'Font definitions must be an object containing a key and a family.'
              );
              valid = false;
            } else {
              // Validate key --------------------------------------------------
              // Exists
              if (font_setting.key == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A font object is missing a key value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof font_setting.key != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Font keys must be a string.'
                  );
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(font_setting.key) === true) {
                    log_error(
                      'Key contains whitespace',
                      validation_step,
                      settings.path,
                      'Font keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                      font_setting.key
                    );
                    valid = false;
                  }
                  // Detect periods
                  if (font_setting.key.includes('.') === true) {
                    log_error(
                      'Key contains period',
                      validation_step,
                      settings.path,
                      'Font keys cannot contain periods. Use hyphen or underscore characters instead.',
                      font_setting.key
                    );
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_fonts = fonts.slice();
                  sanitized_fonts.splice(font_setting_index, 1);
                  sanitized_fonts.forEach(function (
                    sanitized_font_setting,
                    sanitized_font_setting_index
                  ) {
                    if (font_setting.key === sanitized_font_setting.key) {
                      log_error(
                        'Duplicate keys',
                        validation_step,
                        settings.path,
                        'A font key is identical to one or more other font keys. Font keys must be unique.',
                        font_setting.key
                      );
                      valid = false;
                    }
                  });
                }
              }
              // Validate family -----------------------------------------------
              // Exists
              if (font_setting.family == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A font object is missing a family value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof font_setting.family != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Font family values must be a string.'
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
  validate_fonts,
};
