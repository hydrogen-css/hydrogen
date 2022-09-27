// Hydrogen: Flex item parsing
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
 * Parse data-h2-flex-item and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_flex_item(
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
        // Check to see if the value is a reserved key first
        if (value_1 === 'auto') {
          css_string = '{flex: auto;max-width: 100%;min-width: 0;}';
        } else if (value_1 === 'content' || value_1 === 'initial') {
          css_string = '{flex: initial;max-width: 100%;min-width: 0;}';
        } else if (value_1 === 'fill' || value_1 === '1') {
          css_string = '{flex: 1;max-width: 100%;min-width: 0;}';
        } else if (value_1.includes('of') === true) {
          // Since the value wasn't a key, it might be an XofY
          var x_column = value_1.match(/^[0-9]+/g);
          var y_column = value_1.match(/(?<=of)[0-9]+/g);
          if (x_column != null && y_column != null) {
            css_string =
              '{flex: 0 0 calc((' +
              x_column +
              ' / ' +
              y_column +
              ' * 100%) - var(--h2-column-gap));min-width: 0;}';
          } else {
            get_syntax_errors(prop_data, property, instance, values, 0);
            return null;
          }
        } else if (value_1.includes('/') === true) {
          // Since the value wasn't an XofY, check for the fraction syntax
          let numerator = value_1.match(/^[0-9]+/g);
          let denominator = value_1.match(/(?<=\/)[0-9]+/g);
          if (numerator != null && denominator != null) {
            css_string =
              '{flex: 0 0 calc((' +
              numerator +
              ' / ' +
              denominator +
              ' * 100%) - var(--h2-column-gap));min-width: 0;}';
          } else {
            get_syntax_errors(prop_data, property, instance, values, 0);
            return null;
          }
        } else {
          get_syntax_errors(prop_data, property, instance, values, 0);
          return null;
        }
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
  parse_flex_item,
};
