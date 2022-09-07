// Hydrogen: Validate settings.styles.tokens.transitions.functions
'use strict';

// Vendor dependencies

// Hydrogen dependencies
const { log_info } = require('../../../../../../logs');

// Validation dependencies
const { log_error } = require('../../../../log-error');

// See lib/scripts/settings/README.md for guidance on validation

function validate_functions(settings) {
  try {
    // Create working variables ================================================
    var valid = true;
    if (settings.styles.tokens.transitions.functions != null) {
      // Create working variables ==============================================
      var validation_step = 'styles.tokens.transitions.functions';
      var functions = settings.styles.tokens.transitions.functions;
      // Validate self =========================================================
      // Type
      if (Array.isArray(functions) === false) {
        log_error(
          'Invalid setting type',
          validation_step,
          settings.path,
          'The transition functions setting must be an array containing function objects.'
        );
        valid = false;
      } else {
        // Validate children ===================================================
        if (functions.length != 0) {
          functions.forEach(function (
            function_setting,
            function_setting_index
          ) {
            // Validate self ---------------------------------------------------
            // Type
            if (typeof function_setting != 'object') {
              log_error(
                'Invalid setting type',
                validation_step,
                settings.path,
                'Transition function definitions must be an object containing a key and function.'
              );
              valid = false;
            } else {
              // Validate key --------------------------------------------------
              // Exists
              if (function_setting.key == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A transition function object is missing a key value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof function_setting.key != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Transition function keys must be a string.'
                  );
                  valid = false;
                } else {
                  // Detect spaces
                  if (/\s/g.test(function_setting.key) === true) {
                    log_error(
                      'Key contains whitespace',
                      validation_step,
                      settings.path,
                      'Function keys cannot contain whitespace. Use hyphen or underscore characters instead.',
                      function_setting.key
                    );
                    valid = false;
                  }
                  // Detect periods
                  if (function_setting.key.includes('.') === true) {
                    log_error(
                      'Key contains period',
                      validation_step,
                      settings.path,
                      'Function keys cannot contain periods. Use hyphen or underscore characters instead.',
                      function_setting.key
                    );
                    valid = false;
                  }
                  // Duplicates
                  var sanitized_functions = functions.slice();
                  sanitized_functions.splice(function_setting_index, 1);
                  sanitized_functions.forEach(function (
                    sanitized_function_setting,
                    sanitized_function_setting_index
                  ) {
                    if (
                      function_setting.key === sanitized_function_setting.key
                    ) {
                      log_error(
                        'Duplicate keys',
                        validation_step,
                        settings.path,
                        'A transition function key is identical to one or more other function keys. Function keys must be unique.',
                        function_setting.key
                      );
                      valid = false;
                    }
                  });
                }
              }
              // Validate function ---------------------------------------------
              // Exists
              if (function_setting.function == null) {
                log_error(
                  'Missing setting',
                  validation_step,
                  settings.path,
                  'A transition function object is missing a function value.'
                );
                valid = false;
              } else {
                // Type
                if (typeof function_setting.function != 'string') {
                  log_error(
                    'Invalid setting type',
                    validation_step,
                    settings.path,
                    'Transition function function values must be a string.'
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
  validate_functions,
};
