// Hydrogen: Validate settings.styles.tokens.containers
'use strict';

// Vendor dependencies

// Hydrogen dependencies
const { log_info } = require('../../../../../logs');

// Validation dependencies
const { log_error } = require('../../../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_containers(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.tokens.containers';
    var valid = true;
    if (settings.styles.tokens.containers != null) {
      // Create working variables ==============================================
      var containers = settings.styles.tokens.containers;
      // Validate self =========================================================
      // Type
      if (Array.isArray(containers) === false) {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The containers setting must be an array containing container objects.'
        );
        valid = false;
      }
      // Validate children =====================================================
      if (containers.length != 0) {
        containers.forEach(function (
          container_setting,
          container_setting_index
        ) {
          // Validate self -----------------------------------------------------
          // Type
          if (typeof container_setting != 'object') {
            console.log(
              'Container definitions in styles.tokens.containers must be an object.'
            );
            log_error(
              'Invalid setting type',
              validation_step,
              settings.path,
              'Container definitions must be an object containing a key and a max_width.'
            );
            valid = false;
          }
          // Validate key ------------------------------------------------------
          // Exists
          if (container_setting.key == null) {
            log_error(
              'Missing setting',
              validation_step,
              settings.path,
              'A container object is missing a key value.'
            );
            valid = false;
          }
          // Type
          if (typeof container_setting.key != 'string') {
            log_error(
              'Invalid setting type',
              validation_step,
              settings.path,
              'Container keys must be a string.'
            );
            valid = false;
          }
          // Detect spaces
          if (/\s/g.test(container_setting.key) === true) {
            log_error(
              'Key contains whitespace',
              validation_step,
              settings.path,
              'Container keys cannot contain whitespace. Use hyphen or underscore characters instead.',
              container_setting.key
            );
            valid = false;
          }
          // Detect periods
          if (container_setting.key.includes('.') === true) {
            log_error(
              'Key contains period',
              validation_step,
              settings.path,
              'Container keys cannot contain periods. Use hyphen or underscore characters instead.',
              container_setting.key
            );
            valid = false;
          }
          // Duplicates
          var sanitized_containers = containers.slice();
          sanitized_containers.splice(container_setting_index, 1);
          sanitized_containers.forEach(function (
            sanitized_container_setting,
            sanitized_container_setting_index
          ) {
            if (container_setting.key === sanitized_container_setting.key) {
              log_error(
                'Duplicate keys',
                validation_step,
                settings.path,
                'A container key is identical to one or more other container keys. Container keys must be unique.',
                container_setting.key
              );
              valid = false;
            }
          });
          // Validate max_width ------------------------------------------------
          // Exists
          if (container_setting.max_width == null) {
            log_error(
              'Missing setting',
              validation_step,
              settings.path,
              'A container object is missing a max_width value.'
            );
            valid = false;
          }
          // Type
          if (typeof container_setting.max_width != 'string') {
            log_error(
              'Invalid setting type',
              validation_step,
              settings.path,
              'Container max_widths must be a string.'
            );
            valid = false;
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
  validate_containers,
};
