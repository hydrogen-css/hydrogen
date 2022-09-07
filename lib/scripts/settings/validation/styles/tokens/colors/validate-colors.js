// Hydrogen: Validate settings.styles.tokens.colors
'use strict';

// Vendor dependencies

// Hydrogen dependencies
const { log_info } = require('../../../../../logs');

// Validation dependencies
const { log_error } = require('../../../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_colors(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.tokens.colors';
    var valid = true;
    if (settings.styles.tokens.colors != null) {
      // Create working variables ==============================================
      var colors = settings.styles.tokens.colors;
      // Validate self =========================================================
      // Type
      if (Array.isArray(colors) === false) {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The colors setting must be an array containing color objects.'
        );
        valid = false;
      }
      // Validate children =====================================================
      if (colors.length != 0) {
        colors.forEach(function (color_setting, color_setting_index) {
          // Validate self -----------------------------------------------------
          // Type
          if (typeof color_setting != 'object') {
            log_error(
              'Invalid setting type',
              validation_step,
              settings.path,
              'Color definitions must be an object containing a key, color, and an optional array of modifiers.'
            );
            valid = false;
          }
          // Validate key ------------------------------------------------------
          // Exists
          if (color_setting.key == null) {
            log_error(
              'Missing setting',
              validation_step,
              settings.path,
              'A color object is missing a key value.'
            );
            valid = false;
          }
          // Type
          if (typeof color_setting.key != 'string') {
            log_error(
              'Invalid setting type',
              validation_step,
              settings.path,
              'Color keys must be a string.'
            );
            valid = false;
          }
          // Detect spaces
          if (/\s/g.test(color_setting.key) === true) {
            log_error(
              'Key contains whitespace',
              validation_step,
              settings.path,
              'Color keys cannot contain whitespace. Use hyphen or underscore characters instead.',
              color_setting.key
            );
            valid = false;
          }
          // Detect periods
          if (color_setting.key.includes('.') === true) {
            log_error(
              'Key contains period',
              validation_step,
              settings.path,
              'Color keys cannot contain periods. Use hyphen or underscore characters instead.',
              color_setting.key
            );
            valid = false;
          }
          // Reserved words
          if (
            color_setting.key == 'light' ||
            color_setting.key == 'lighter' ||
            color_setting.key == 'lightest' ||
            color_setting.key == 'dark' ||
            color_setting.key == 'darker' ||
            color_setting.key == 'darkest'
          ) {
            log_error(
              'Reserved keyword',
              validation_step,
              settings.path,
              'A color key is using a reserved word (' +
                color_setting.key +
                ').',
              color_setting.key
            );
            valid = false;
          }
          // Only numbers
          if (/^\d+$/.test(color_setting.key) === true) {
            log_error(
              'Invalid key value',
              validation_step,
              settings.path,
              'A color key is using only numbers. Color keys require at least 1 letter.',
              color_setting.key
            );
            valid = false;
          }
          // Duplicates
          var sanitized_colors = colors.slice();
          sanitized_colors.splice(color_setting_index, 1);
          sanitized_colors.forEach(function (
            sanitized_color_setting,
            sanitized_color_setting_index
          ) {
            if (color_setting.key === sanitized_color_setting.key) {
              log_error(
                'Duplicate keys',
                validation_step,
                settings.path,
                'A color key is identical to one or more other color keys. Color keys must be unique.',
                color_setting.key
              );
              valid = false;
            }
          });
          // Validate color ----------------------------------------------------
          // Exists
          if (color_setting.color == null) {
            log_error(
              'Missing setting',
              validation_step,
              settings.path,
              'A color object is missing a color value.'
            );
            valid = false;
          }
          // Type
          if (typeof color_setting.color != 'string') {
            log_error(
              'Invalid setting type',
              validation_step,
              settings.path,
              'Color color values must be a string.'
            );
            valid = false;
          }
          // Validate modifiers ------------------------------------------------
          if (color_setting.modifiers != null) {
            // Validate self ...................................................
            // Type
            if (Array.isArray(color_setting.modifiers) === false) {
              log_error(
                'Invalid setting type',
                validation_step,
                settings.path,
                'The modifiers setting must be an array containing modifier objects.'
              );
              valid = false;
            }
            // Validate children ...............................................
            if (color_setting.modifiers.length != 0) {
              color_setting.modifiers.forEach(function (
                modifier_setting,
                modifier_setting_index
              ) {
                // Validate self _______________________________________________
                // Type
                if (typeof modifier_setting != 'object') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Modifiers must be an object containing a key and a color.'
                  );
                  valid = false;
                }
                // Validate key ________________________________________________
                // Exists
                if (modifier_setting.key == null) {
                  log_error(
                    'Missing setting',
                    validation_step,
                    settings.path,
                    'A modifier object is missing a key value.'
                  );
                  valid = false;
                }
                // Type
                if (typeof modifier_setting.key != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Modifier keys must be a string.'
                  );
                  valid = false;
                }
                // Detect spaces
                if (/\s/g.test(modifier_setting.key) === true) {
                  log_error(
                    'Key contains whitespace',
                    validation_step,
                    settings.path,
                    'Modifier keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                    modifier_setting.key
                  );
                  valid = false;
                }
                // Detect periods
                if (modifier_setting.key.includes('.') === true) {
                  log_error(
                    'Key contains period',
                    validation_step,
                    settings.path,
                    'Modifier keys cannot contain periods. Use hyphen or underscore characters instead.',
                    modifier_setting.key
                  );
                  valid = false;
                }
                // Doesn't match parent key
                if (modifier_setting.key === color_setting.key) {
                  log_error(
                    'Invalid key value',
                    validation_step,
                    settings.path,
                    "A modifier object contains a key that is identical to its parent color object's key value. Modifier keys must be unique from their parent color and from each other.",
                    color_setting.key + ' modifier: ' + modifier_setting.key
                  );
                  valid = false;
                }
                // Only numbers
                if (/^\d+$/.test(modifier_setting.key) === true) {
                  log_error(
                    'Invalid key value',
                    validation_step,
                    settings.path,
                    'A modifier key is using only numbers. Modifier keys require at least 1 letter.',
                    color_setting.key + ' modifier: ' + modifier_setting.key
                  );
                  valid = false;
                }
                // Duplicates
                var sanitized_modifiers = color_setting.modifiers.slice();
                sanitized_modifiers.splice(modifier_setting_index, 1);
                sanitized_modifiers.forEach(function (
                  sanitized_modifier_setting,
                  sanitized_modifier_setting_index
                ) {
                  if (modifier_setting.key === sanitized_modifier_setting.key) {
                    log_error(
                      'Duplicate keys',
                      validation_step,
                      settings.path,
                      'A modifier object contains a key that is identical to another modifier defined in its parent color object. Modifier keys must be unique.',
                      color_setting.key + ' modifier: ' + modifier_setting.key
                    );
                    valid = false;
                  }
                });
                // Validate color ______________________________________________
                // Exists
                if (modifier_setting.color == null) {
                  log_error(
                    'Missing setting',
                    validation_step,
                    settings.path,
                    'A modifier object is missing a color value.'
                  );
                  valid = false;
                }
                // Type
                if (typeof modifier_setting.color != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Modifier colors must be a string.'
                  );
                  valid = false;
                }
              });
            }
          }
        });
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
  validate_colors,
};
