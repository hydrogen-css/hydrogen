// Hydrogen: Position parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var {
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
} = require('../log-errors');

/**
 * Parse data-h2-position and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_position(
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
    var value_1 = null;
    if (values.length >= 1) {
      value_1 = values[0];
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 1) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 0);
        return null;
      } else {
        if (value_1 === 'center') {
          css_string =
            '{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}';
        } else {
          css_string = '{position: ' + value_1 + ';}';
        }
      }
    } else {
      // An invalid number of options was passed
      get_option_count_errors(prop_data, property, instance, values);
      return null;
    }
    // Assemble the CSS array ==================================================
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(
        '[data-h2-offset]' + single_selector + ',',
        '[data-h2-transform]' + single_selector + ','
      );
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
  parse_position,
};
