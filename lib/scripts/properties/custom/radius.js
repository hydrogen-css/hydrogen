// Hydrogen: Radius parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var {
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
} = require('../log-errors');
var { parse_whitespace_value } = require('../../parse-whitespace');

/**
 * Parse data-h2-radius and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_radius(
  settings,
  prop_data,
  instance,
  property,
  selector,
  values
) {
  try {
    // Create working variables ================================================
    var attribute_css = [];
    var css_string = '';
    // Define possible options for the attribute ===============================
    // Value 1 -----------------------------------------------------------------
    var value_1;
    if (values.length >= 1) {
      value_1 = values[0];
      // Check for and return user-set radii ...................................
      if (
        settings.styles.tokens != null &&
        settings.styles.tokens.radii != null &&
        settings.styles.tokens.radii.length != 0
      ) {
        settings.styles.tokens.radii.forEach(function (radiusSetting) {
          if (value_1 == radiusSetting.key) {
            value_1 = radiusSetting.radius;
          }
        });
      }
      value_1 = parse_whitespace_value(instance, property, value_1);
    }
    // Value 2 -----------------------------------------------------------------
    var value_2;
    if (values.length >= 2) {
      value_2 = values[1];
      if (
        settings.styles.tokens != null &&
        settings.styles.tokens.radii != null &&
        settings.styles.tokens.radii.length != 0
      ) {
        settings.styles.tokens.radii.forEach(function (radiusSetting) {
          if (value_2 == radiusSetting.key) {
            value_2 = radiusSetting.radius;
          }
        });
      }
      value_2 = parse_whitespace_value(instance, property, value_2);
    }
    // Value 3 -----------------------------------------------------------------
    var value_3;
    if (values.length >= 3) {
      value_3 = values[2];
      if (
        settings.styles.tokens != null &&
        settings.styles.tokens.radii != null &&
        settings.styles.tokens.radii.length != 0
      ) {
        settings.styles.tokens.radii.forEach(function (radiusSetting) {
          if (value_3 == radiusSetting.key) {
            value_3 = radiusSetting.radius;
          }
        });
      }
      value_3 = parse_whitespace_value(instance, property, value_3);
    }
    // Value 4 -----------------------------------------------------------------
    var value_4;
    if (values.length >= 4) {
      value_4 = values[3];
      if (
        settings.styles.tokens != null &&
        settings.styles.tokens.radii != null &&
        settings.styles.tokens.radii.length != 0
      ) {
        settings.styles.tokens.radii.forEach(function (radiusSetting) {
          if (value_4 == radiusSetting.key) {
            value_4 = radiusSetting.radius;
          }
        });
      }
      value_4 = parse_whitespace_value(instance, property, value_4);
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 1) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 0);
        return null;
      } else {
        css_string = '{border-radius: ' + value_1 + ';}';
      }
    } else if (values.length === 2) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 1);
        return null;
      } else {
        css_string =
          '{border-top-left-radius: ' +
          value_1 +
          ';border-bottom-right-radius: ' +
          value_1 +
          ';border-top-right-radius: ' +
          value_2 +
          ';border-bottom-left-radius: ' +
          value_2 +
          ';}';
      }
    } else if (values.length === 3) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 1);
        return null;
      } else if (value_3 == null || value_3 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 2);
        return null;
      } else {
        css_string =
          '{border-top-left-radius: ' +
          value_1 +
          ';border-top-right-radius: ' +
          value_2 +
          ';border-bottom-right-radius: ' +
          value_3 +
          ';border-bottom-left-radius: ' +
          value_2 +
          ';}';
      }
    } else if (values.length === 4) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 1);
        return null;
      } else if (value_3 == null || value_3 === 'null') {
        get_syntax_errors(property, instance, values, 2);
        return null;
      } else if (value_4 == null || value_4 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 3);
        return null;
      } else {
        css_string =
          '{border-top-left-radius: ' +
          value_1 +
          ';border-top-right-radius: ' +
          value_2 +
          ';border-bottom-right-radius: ' +
          value_3 +
          ';border-bottom-left-radius: ' +
          value_4 +
          ';}';
      }
    } else {
      // An invalid number of options was passed
      get_option_count_errors(prop_data, property, instance, values);
      return null;
    }
    // Assemble the CSS array ==================================================
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(single_selector + css_string);
    });
    // Return the array
    return attribute_css;
  } catch (error) {
    // Catch any errors ========================================================
    property_error_catch(property, instance, error);
    return null;
  }
}

module.exports = {
  parse_radius,
};
