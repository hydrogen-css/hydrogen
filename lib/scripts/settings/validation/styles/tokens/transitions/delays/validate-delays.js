// Hydrogen: Validate settings.styles.tokens.transitions.delays
'use strict';

// Vendor dependencies

// Hydrogen dependencies
const { log_info } = require('../../../../../../logs');

// Validation dependencies
const { log_error } = require('../../../../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_delays(settings) {
  try {
    // Create working variables ================================================
    var validation_step = 'styles.tokens.transitions.delays';
    var valid = true;
    if (settings.styles.tokens.transitions.delays != null) {
      // Create working variables ==============================================
      var delays = settings.styles.tokens.transitions.delays;
      // Validate self =========================================================
      // Type
      if (Array.isArray(delays) === false) {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The transition delays setting must be an array containing delay objects.'
        );
        valid = false;
      }
      // Validate children =====================================================
      if (delays.length != 0) {
        delays.forEach(function (delay_setting, delay_setting_index) {
          // Validate self -----------------------------------------------------
          // Type
          if (typeof delay_setting != 'object') {
            log_error(
              'Invalid setting type',
              validation_step,
              settings.path,
              'Transition delay definitions must be an object containing a key and delay.'
            );
            valid = false;
          }
          // Validate key ------------------------------------------------------
          // Exists
          if (delay_setting.key == null) {
            log_error(
              'Missing setting',
              validation_step,
              settings.path,
              'A transition delay object is missing a key value.'
            );
            valid = false;
          }
          // Type
          if (typeof delay_setting.key != 'string') {
            log_error(
              'Invalid setting type',
              validation_step,
              settings.path,
              'Transition delay keys must be a string.'
            );
            valid = false;
          }
          // Duplicates
          var sanitized_delays = delays.slice();
          sanitized_delays.splice(delay_setting_index, 1);
          sanitized_delays.forEach(function (
            sanitized_delay_setting,
            sanitized_delay_setting_index
          ) {
            if (delay_setting.key === sanitized_delay_setting.key) {
              log_error(
                'Duplicate keys',
                validation_step,
                settings.path,
                'A transition delay key is identical to one or more other delay keys. Delay keys must be unique.',
                delay_setting.key
              );
              valid = false;
            }
          });
          // Validate delay ----------------------------------------------------
          // Exists
          if (delay_setting.delay == null) {
            log_error(
              'Missing setting',
              validation_step,
              settings.path,
              'A transition delay object is missing a delay value.'
            );
            valid = false;
          }
          // Type
          if (typeof delay_setting.delay != 'string') {
            log_error(
              'Invalid setting type',
              validation_step,
              settings.path,
              'Transition delay delay values must be a string.'
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
  validate_delays,
};
