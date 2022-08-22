// Hydrogen: Log functions
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var hydrogen_console_error_label = '⛔ [' + 'Hydrogen'.magenta + ']';
var hydrogen_console_warning_label = '🔔 [' + 'Hydrogen'.magenta + ']';
var console_flourish = '   > ';

/**
 * Gets the current date and time for use in file slugs
 * @returns {string} 02-03-2022-12-45-12
 */
function date_time() {
  try {
    //
    // Get the working date ====================================================
    //
    var current_date = new Date();
    //
    // Generate readable slug ==================================================
    //
    var date_time =
      current_date.getFullYear() +
      '-' +
      ('0' + (current_date.getMonth() + 1)).slice(-2) +
      '-' +
      current_date.getDate() +
      '-' +
      current_date.getHours() +
      'h' +
      '-' +
      current_date.getMinutes() +
      'm' +
      '-' +
      current_date.getSeconds() +
      's';
    //
    // Return the date =========================================================
    //
    return date_time;
  } catch (error) {
    //
    // Catch errors ============================================================
    //
    console.log(hydrogen_console_error_label + ' ' + error);
  }
}

function h2_error(error, attribute, files) {
  try {
    // var type_message = console_flourish + 'Type: '.red + 'error' + '\n';
    var cause_message =
      console_flourish + 'Error: '.red + 'generic error' + '\n';
    var attribute_message = '';
    if (attribute) {
      attribute_message =
        console_flourish + 'Attribute: '.red + attribute + '\n';
    }
    var file_message = '';
    if (files) {
      file_message = console_flourish + 'Files: '.red;
      files.forEach(function (file, file_index) {
        if (file_index === 0) {
          file_message = file_message + file + '\n';
        } else {
          file_message = file_message + '            ' + file + '\n';
        }
      });
    }
    var error_message =
      hydrogen_console_error_label +
      '\n' +
      cause_message +
      attribute_message +
      file_message +
      console_flourish +
      'Info: '.red +
      error;
    console.log(error_message);
  } catch (error) {}
}

const error_types = [
  {
    key: 'generic',
    label: 'unknown error',
    info: '',
  },
  {
    key: 'configuration',
    label: 'configuration error',
    info: '',
  },
  {
    key: 'internal',
    label: 'internal error',
    info: '',
  },
  {
    key: 'wrapper_attribute',
    label: 'missing data-h2',
    info: "Hydrogen couldn't find a \"data-h2\" wrapper attribute anywhere in your code. If Hydrogen isn't working, this is likely why. Please put this attribute on your <html> element to take full advantage of Hydrogen's reset styles. Otherwise, you can put the attribute on any parent wrapper element.",
  },
  {
    key: 'invalid_attribute',
    label: 'invalid attribute',
    info: 'this attribute is using an invalid property. Please refer to the attributes page in the documentation for a comprehensive list of options.',
  },
  {
    key: 'invalid_query',
    label: 'invalid media query',
    info: 'this attribute is using an invalid media query key in one of its definitions. Please ensure you use a query key defined in your configuration.',
  },
  {
    key: 'empty_query',
    label: 'empty media query',
    info: 'this attribute contains query definitions that have no options passed to them.',
  },
  {
    key: 'missing_query',
    label: 'missing query key',
    info: 'this attribute has values set that are missing media query keys before their parentheses.',
  },
  {
    key: 'syntax',
    label: 'syntax error',
    info: '',
  },
  {
    key: 'syntax_invalid_color',
    label: 'color error',
    info: 'this attribute errored when processing a color value. Please see the error logged above this one for details.',
  },
  {
    key: 'syntax_invalid_whitespace',
    label: 'whitespace error',
    info: 'this attribute errored when processing a whitespace value. Please see the error logged above this one for details.',
  },
  {
    key: 'parens',
    label: 'too many parentheses',
    info: 'this attribute contains too many parentheses in one of its query definitions. This is likely a typo.',
  },
  {
    key: 'logs',
    label: 'debug log generation',
    info: 'Hydrogen has generated output logs and retained a pre-processed CSS file for debugging.',
  },
  {
    key: 'empty_attribute',
    label: 'empty attribute',
    info: 'this attribute has no values passed to it, so it has been ignored.',
  },
  {
    key: 'unsupported_modifier_children',
    label: 'unsupported modifier',
    info: "this attribute doesn't support the :children modifier, so this option has been ignored.",
  },
];

/**
 * Logs a detailed error to the console with options to include the specific attribute and its file for added context
 * @param {string} key the type of error
 * @param {string} [attribute] the attribute causing the error
 * @param {array} [files] the attribute's file location
 * @param {string} [message] a message override
 */
function h2_error_detail(key, attribute, files, info) {
  try {
    error_types.forEach(function (error_type, error_type_index) {
      if (key === error_type.key) {
        // var type_message = console_flourish + 'Type: '.red + 'error' + '\n';
        var cause_message =
          console_flourish + 'Error: '.red + error_type.label + '\n';
        var attribute_message = '';
        if (attribute) {
          attribute_message =
            console_flourish + 'Attribute: '.red + attribute + '\n';
        }
        var file_message = '';
        if (files) {
          file_message = console_flourish + 'Files: '.red;
          files.forEach(function (file, file_index) {
            if (file_index === 0) {
              file_message = file_message + file + '\n';
            } else {
              file_message = file_message + '            ' + file + '\n';
            }
          });
        }
        var info_message = error_type.info;
        if (info) {
          info_message = info;
        }
        var error_message =
          hydrogen_console_error_label +
          '\n' +
          cause_message +
          attribute_message +
          file_message +
          console_flourish +
          'Info: '.red +
          info_message;
        console.log(error_message);
      }
    });
  } catch (error) {}
}

function h2_warning(error) {
  console.log('🔔 [' + 'Hydrogen'.magenta + ']', error);
}

function h2_warning_detail(key, attribute, files, info) {
  try {
    error_types.forEach(function (warning_type, warning_type_index) {
      if (key === warning_type.key) {
        var cause_message =
          console_flourish + 'Warning: '.yellow + warning_type.label + '\n';
        var attribute_message = '';
        if (attribute) {
          attribute_message =
            console_flourish + 'Attribute: '.yellow + attribute + '\n';
        }
        var file_message = '';
        if (files) {
          file_message = console_flourish + 'Files: '.yellow;
          files.forEach(function (file, file_index) {
            if (file_index === 0) {
              file_message = file_message + file + '\n';
            } else {
              file_message = file_message + '            ' + file + '\n';
            }
          });
        }
        var info_message = warning_type.info;
        if (info) {
          info_message = info;
        }
        var warning_message =
          hydrogen_console_warning_label +
          '\n' +
          cause_message +
          attribute_message +
          file_message +
          console_flourish +
          'Info: '.yellow +
          info_message;
        console.log(warning_message);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function h2_timer(msg, start, end) {
  var ms = (end - start) / BigInt(1000000);
  ms = Number(ms);
  if (ms === 0) {
    ms = '< 0';
  }
  console.log(
    '⌚ [' + 'Hydrogen'.magenta + '] ' + msg + ':',
    colors.magenta(ms) + 'ms'.magenta + '.'
  );
}

module.exports = {
  date_time,
  h2_error,
  h2_error_detail,
  h2_warning,
  h2_warning_detail,
  h2_timer,
};
