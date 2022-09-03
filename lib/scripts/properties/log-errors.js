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
    var property_data = load_property_data();
    var value_length = values.length;
    var syntax_errors = [];
    property_data.properties.forEach(function (prop, prop_index) {
      if (prop.id === property) {
        prop.syntax.forEach(function (s, s_index) {
          if (s.options.length === value_length) {
            syntax_errors = s.options;
          }
        });
        var syntax_option = syntax_errors[index].key;
        var syntax_values = '';
        syntax_errors[index].values.forEach(function (v, v_index) {
          if (v_index + 1 === syntax_errors[index].values.length) {
            // Last item
            if (syntax_errors[index].values.length > 1) {
              syntax_values = syntax_values + 'or ' + v;
            } else {
              syntax_values = syntax_values + v;
            }
          } else {
            if (syntax_errors[index].values.length === 2) {
              syntax_values = syntax_values + v + ' ';
            } else {
              syntax_values = syntax_values + v + ', ';
            }
          }
        });
        property_option_error(property, instance, syntax_option, syntax_values);
      }
    });
  } catch (error) {
    property_error_catch(property, instance, error);
    return null;
  }
}

function get_option_count_errors(property, instance, values) {
  try {
    var property_data = load_property_data();
    var count_options_label = '';
    var count_options = '';
    property_data.properties.forEach(function (prop, prop_index) {
      if (prop.id === property) {
        prop.syntax.forEach(function (v, v_index) {
          var option_number = v.options.length;

          var syntax_option = '';
          if (option_number === 1) {
            count_options_label = 'option';
          } else if (option_number > 1) {
            count_options_label = 'options';
          }
          v.options.forEach(function (o, o_index) {
            if (o_index + 1 === v.options.length) {
              // Last item
              syntax_option = syntax_option + o.key;
            } else {
              syntax_option = syntax_option + o.key + ', ';
            }
          });
          if (v_index + 1 === prop.syntax.length) {
            // Last item
            if (prop.syntax.length > 1) {
              count_options =
                count_options +
                'or ' +
                option_number +
                ' (' +
                syntax_option +
                ') ';
            } else {
              count_options =
                count_options + option_number + ' (' + syntax_option + ') ';
            }
          } else {
            if (prop.syntax.length === 2) {
              count_options =
                count_options + option_number + ' (' + syntax_option + ') ';
            } else {
              count_options =
                count_options + option_number + ' (' + syntax_option + '), ';
            }
          }
        });
      }
    });
    count_options = count_options + count_options_label;
    property_invalid_option_count(property, instance, values, count_options);
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
