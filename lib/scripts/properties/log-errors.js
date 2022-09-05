// Hydrogen: Property error logging
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { log_info } = require('../logs');
var { load_property_data } = require('../parse-attributes');

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

function get_syntax_errors(property, instance, values, index) {
  try {
    var property_model_data = load_property_data();
    var value_length = values.length;
    var syntax_errors = [];
    // Get the property data from the model
    var property_data = property_model_data.properties[property];
    // Loop through the property data syntax
    for (let syntax_data in property_data.syntax) {
      var syntax = property_data.syntax[syntax_data];
      // If the syntax's option count matches the number of values passed, grab the syntax option data
      if (Object.keys(syntax.options).length === value_length) {
        syntax_errors = syntax.options;
      }
    }
    // Match the value index to the index of the option in the syntax options
    var syntax_option_keys = Object.keys(syntax_errors);
    var syntax_option = '';
    syntax_option_keys.forEach(function (o, o_index) {
      if (o_index === index) {
        syntax_option = o;
      }
    });
    // Loop through the syntax values and assemble a string
    var syntax_values = '';
    syntax_errors[syntax_option].values.forEach(function (v, v_index) {
      if (v_index + 1 === syntax_errors[syntax_option].values.length) {
        // Last item
        if (syntax_errors[syntax_option].values.length > 1) {
          syntax_values = syntax_values + 'or ' + v;
        } else {
          syntax_values = syntax_values + v;
        }
      } else {
        if (syntax_errors[syntax_option].values.length === 2) {
          syntax_values = syntax_values + v + ' ';
        } else {
          syntax_values = syntax_values + v + ', ';
        }
      }
    });
    // Log the error with the final string
    property_option_error(property, instance, syntax_option, syntax_values);
  } catch (error) {
    property_error_catch(property, instance, error);
    return null;
  }
}

function get_option_count_errors(property, instance, values) {
  try {
    // Load the property model
    var property_model = load_property_data();
    // Get the specific property's syntax data
    var syntax_data = property_model.properties[property].syntax;
    // Get the number of syntax options for this property
    var syntax_count = Object.keys(syntax_data).length;
    // Create working variables
    var options_count_string = '';
    var options_error_label = '';
    // Loop through each syntax option for this property
    Object.keys(syntax_data).forEach(function (syntax_key, syntax_index) {
      var syntax_value = syntax_data[syntax_key];
      // Get the number of options required by this syntax
      var option_count = Object.keys(syntax_value.options).length;
      // Create working variables
      var syntax_option = '';
      // If the number of options is 1, set the singular label, otherwise, set the plural label
      if (option_count === 1) {
        options_error_label = 'option';
      } else if (option_count > 1) {
        options_error_label = 'options';
      }
      // Loop through each option required by this syntax
      Object.keys(syntax_value.options).forEach(function (
        option_key,
        option_index
      ) {
        var option_value = syntax_value.options[option_key];
        // Check the index of the option to see if it's the last one in the list
        if (option_index + 1 === option_count) {
          // Last item
          syntax_option = syntax_option + option_key;
        } else {
          syntax_option = syntax_option + option_key + ', ';
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
            syntax_option +
            ') ';
        } else {
          options_count_string =
            options_count_string + option_count + ' (' + syntax_option + ') ';
        }
      } else {
        if (syntax_count === 2) {
          options_count_string =
            options_count_string + option_count + ' (' + syntax_option + ') ';
        } else {
          options_count_string =
            options_count_string + option_count + ' (' + syntax_option + '), ';
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
    // Catch any errors ========================================================
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
