// Hydrogen: Log functions

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies

var hydrogen_console_error_label = '⛔ [' + 'Hydrogen'.magenta + ']';
var hydrogen_console_warning_label = '🔔 [' + 'Hydrogen'.magenta + ']';
var console_flourish = '   > ';

function h2_error(error, attribute) {
  try {
    var type_message = console_flourish + 'Type: '.red + 'error' + '\n';
    var cause_message =
      console_flourish + 'Cause: '.red + 'generic error' + '\n';
    var attribute_message = '';
    if (attribute) {
      attribute_message =
        console_flourish + 'Attribute: '.red + attribute + '\n';
    }
    var error_message =
      hydrogen_console_error_label +
      '\n' +
      type_message +
      cause_message +
      attribute_message +
      console_flourish +
      'Info: '.red +
      error;
    console.log(error_message);
  } catch (error) {}
}

const error_types = [
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
    info: 'Hydrogen has generated output logs and retained a pre-processed CSS file debugging.',
  },
  {
    key: 'empty_attribute',
    label: 'empty attribute',
    info: 'this attribute has no values passed to it, so it has been ignored.',
  },
];

function h2_error_detail(key, attribute, file, info) {
  try {
    error_types.forEach(function (error_type, error_type_index) {
      if (key === error_type.key) {
        var type_message = console_flourish + 'Type: '.red + 'error' + '\n';
        var cause_message =
          console_flourish + 'Cause: '.red + error_type.label + '\n';
        var file_message = '';
        if (file) {
          file_message = console_flourish + 'File: '.red + file + '\n';
        }
        var attribute_message = '';
        if (attribute) {
          attribute_message =
            console_flourish + 'Attribute: '.red + attribute + '\n';
        }
        var info_message = error_type.info;
        if (info) {
          info_message = info;
        }
        var error_message =
          hydrogen_console_error_label +
          '\n' +
          type_message +
          cause_message +
          file_message +
          attribute_message +
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

function h2_warning_detail(key, attribute, file) {
  try {
    error_types.forEach(function (warning_type, warning_type_index) {
      if (key === warning_type.key) {
        var type_message =
          console_flourish + 'Type: '.yellow + 'warning' + '\n';
        var cause_message =
          console_flourish + 'Cause: '.yellow + warning_type.label + '\n';
        var file_message = '';
        if (file) {
          file_message = console_flourish + 'File: '.yellow + file + '\n';
        }
        var attribute_message = '';
        if (attribute) {
          attribute_message =
            console_flourish + 'Attribute: '.yellow + attribute + '\n';
        }
        var warning_message =
          hydrogen_console_warning_label +
          '\n' +
          type_message +
          cause_message +
          file_message +
          attribute_message +
          console_flourish +
          'Info: '.yellow +
          warning_type.info;
        console.log(warning_message);
      }
    });
  } catch (error) {}
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
  h2_error,
  h2_error_detail,
  h2_warning,
  h2_warning_detail,
  h2_timer,
};
