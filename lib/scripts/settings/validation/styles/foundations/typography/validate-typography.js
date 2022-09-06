// Hydrogen: Validate typography
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { log_info } = require('../../../../../logs');

// Validation dependencies
const { log_error } = require('../../../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_typography(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.foundations.typography';
    var valid = true;
    // Validate self ===========================================================
    // Exists
    if (settings.styles.foundations == null) {
      log_error(
        'Missing setting',
        validation_step,
        settings.path,
        "The typography setting doesn't exist and is required."
      );
      valid = false;
    }
    // Type
    if (Array.isArray(settings.styles.foundations.typography) === false) {
      log_error(
        'Invalid setting type',
        validation_step,
        settings.path,
        'The typography setting must be an array containing typography objects.'
      );
      valid = false;
    }
    // Length
    if (settings.styles.foundations.typography.length === 0) {
      log_error(
        'Empty settings array',
        validation_step,
        settings.path,
        'The typography setting array is empty.'
      );
      valid = false;
    } else {
      // Validate children =====================================================
      settings.styles.foundations.typography.forEach(function (
        typography_setting,
        typography_setting_index
      ) {
        // Validate query_key --------------------------------------------------
        // Exists
        if (typography_setting.query_key == null) {
          log_error(
            'Missing setting',
            validation_step,
            settings.path,
            'A typography object is missing a query_key value.'
          );
          valid = false;
        }
        // Type
        if (typeof typography_setting.query_key != 'string') {
          log_error(
            'Invalid setting type',
            validation_step,
            settings.path,
            'Typography query_keys must be a string.'
          );
          valid = false;
        }
        // Matches media query
        var match_status = false;
        settings.styles.foundations.media.forEach(function (
          media_setting,
          media_setting_index
        ) {
          if (typography_setting.query_key === media_setting.key) {
            match_status = true;
          }
        });
        if (match_status === false) {
          log_error(
            'Invalid query definition',
            validation_step,
            settings.path,
            "A typography object has a query_key that doesn't match any defined media keys. Typography query_key values must always match a defined media key.",
            typography_setting.query_key
          );
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
            log_error(
              'Duplicate keys',
              validation_step,
              settings.path,
              'A typography query_key is identical to one or more other typography query_keys. Query_keys must be unique.',
              typography_setting.query_key
            );
            valid = false;
          }
        });
        // Validate line_height ------------------------------------------------
        // Exists
        if (typography_setting.line_height == null) {
          log_error(
            'Missing setting',
            validation_step,
            settings.path,
            'A typography object is missing a line_height value.'
          );
          valid = false;
        }
        // Type
        if (typeof typography_setting.line_height != 'string') {
          log_error(
            'Invalid setting type',
            validation_step,
            settings.path,
            'Typography line_height values must be a string.'
          );
          valid = false;
        }
        // Validate size -------------------------------------------------------
        // Exists
        if (typography_setting.size == null) {
          log_error(
            'Missing setting',
            validation_step,
            settings.path,
            'A typography object is missing a size value.'
          );
          valid = false;
        }
        // Type
        if (typeof typography_setting.size != 'string') {
          log_error(
            'Invalid setting type',
            validation_step,
            settings.path,
            'Typography size values must be a string.'
          );
          valid = false;
        }
        // Validate type_scale -------------------------------------------------
        // Exists
        if (typography_setting.type_scale == null) {
          log_error(
            'Missing setting',
            validation_step,
            settings.path,
            'A typography object is missing a type_scale value.'
          );
          valid = false;
        }
        // Type
        if (typeof typography_setting.type_scale != 'string') {
          log_error(
            'Invalid setting type',
            validation_step,
            settings.path,
            'Typography type_scale values must be a string.'
          );
          valid = false;
        }
      });
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
  validate_typography,
};
