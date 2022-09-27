// Hydrogen: Property error logging
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { log_info } = require('../logs/logs');

function property_option_error(property, instance, option, values) {
  log_info(
    'error',
    'Syntax error',
    'Parsing ' + property,
    instance.attribute,
    null,
    null,
    instance.files,
    'The ' +
      option +
      ' option for the ' +
      property +
      ' property only accepts ' +
      values +
      ' values.'
  );
}

function property_invalid_option_count(property, instance, values, options) {
  log_info(
    'error',
    'Invalid number of options',
    'Parsing ' + property,
    instance.attribute,
    null,
    null,
    instance.files,
    'The ' +
      property +
      ' property accepts ' +
      options +
      " and you've specified " +
      values.length +
      '.'
  );
}

function property_error_catch(property, instance, error) {
  log_info(
    'error',
    'Unknown error',
    'Parsing ' + property,
    instance.attribute,
    null,
    null,
    instance.files,
    error
  );
}

function get_syntax_errors(prop_data, property, instance, values, index) {
  try {
    // Get the specific property's syntax data
    let syntax_option_name = '';
    let assembled_options = '';
    prop_data.syntaxes.forEach(function (syntax) {
      // has default and options []
      if (syntax.options.length === values.length) {
        syntax.options.forEach(function (option, option_index) {
          if (index === option_index) {
            // set the name
            syntax_option_name = option.value;
            // matching value
            // option has required, types, value (name)
            let syntax_values = [];
            option.types.css.forEach(function (css) {
              syntax_values = syntax_values.concat(css);
            });
            option.types.tokens.forEach(function (token) {
              syntax_values = syntax_values.concat(token);
            });
            syntax_values.forEach(function (v, v_index) {
              if (v_index + 1 === syntax_values.length) {
                // Last item
                if (syntax_values.length > 1) {
                  assembled_options = assembled_options + 'or ' + v;
                } else {
                  assembled_options = assembled_options + v;
                }
              } else {
                if (syntax_values.length === 2) {
                  assembled_options = assembled_options + v + ' ';
                } else {
                  assembled_options = assembled_options + v + ', ';
                }
              }
            });
          }
        });
      }
    });
    // Log the error with the final string
    property_option_error(
      property,
      instance,
      syntax_option_name,
      assembled_options
    );
  } catch (error) {
    property_error_catch(property, instance, error);
    return null;
  }
}

function get_option_count_errors(prop_data, property, instance, values) {
  try {
    // Get the number of syntax options for this property
    let syntax_count = prop_data.syntaxes.length;
    // Create working variables
    let options_count_string = '';
    let options_error_label = '';
    // aiming for 1 (thing), 2 (thing, thing), or 3 (thing, thing thing) options
    prop_data.syntaxes.forEach(function (syntax, syntax_index) {
      let option_count = syntax.options.length;
      if (option_count === 1) {
        options_error_label = 'option';
      } else if (option_count > 1) {
        options_error_label = 'options';
      }
      let syntax_options = '';
      syntax.options.forEach(function (option, option_index) {
        // Check the index of the option to see if it's the last one in the list
        if (option_index + 1 === option_count) {
          // Last item
          syntax_options = syntax_options + option.value;
        } else {
          syntax_options = syntax_options + option.value + ', ';
        }
      });
      // Check to see if this syntax was the last in the list
      if (syntax_index + 1 === syntax_count) {
        // Last item
        if (syntax_count > 1) {
          options_count_string =
            options_count_string +
            'or ' +
            option_count +
            ' (' +
            syntax_options +
            ') ';
        } else {
          options_count_string =
            options_count_string + option_count + ' (' + syntax_options + ') ';
        }
      } else {
        if (syntax_count === 2) {
          options_count_string =
            options_count_string + option_count + ' (' + syntax_options + ') ';
        } else {
          options_count_string =
            options_count_string + option_count + ' (' + syntax_options + '), ';
        }
      }
    });
    // Create the error label
    options_count_string = options_count_string + options_error_label;
    // Log the error
    property_invalid_option_count(
      property,
      instance,
      values,
      options_count_string
    );
  } catch (error) {
    property_error_catch(property, instance, error);
    return null;
  }
}

module.exports = {
  property_option_error,
  property_invalid_option_count,
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
};
