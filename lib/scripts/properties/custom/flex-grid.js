// Hydrogen: Flex grid parsing
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
 * Parse data-h2-flex-grid and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_flex_grid(
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
    /// Define possible options for the attribute ==============================
    // Value 1 -----------------------------------------------------------------
    var value_1;
    if (values.length >= 1) {
      value_1 = values[0];
      if (value_1 === 'top') {
        value_1 = 'flex-start';
      } else if (value_1 === 'middle') {
        value_1 = 'center';
      } else if (value_1 === 'bottom') {
        value_1 = 'flex-end';
      }
    }
    // Value 2 -----------------------------------------------------------------
    var value_2;
    if (values.length >= 2) {
      value_2 = parse_whitespace_value(instance, property, values[1]);
    }
    // Value 3 -----------------------------------------------------------------
    var value_3;
    if (values.length >= 3) {
      value_3 = parse_whitespace_value(instance, property, values[2]);
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 2) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 1);
        return null;
      } else {
        css_string =
          '{align-items: ' +
          value_1 +
          ';display: flex;flex-wrap: wrap;--h2-column-gap: ' +
          value_2 +
          ';--h2-row-gap: ' +
          value_2 +
          ';margin: calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap));' +
          'width:calc(100% + var(--h2-column-gap));}';
        // Assemble the CSS array ==============================================
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(single_selector + css_string);
          attribute_css = attribute_css.concat(
            single_selector +
              ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}'
          );
          attribute_css = attribute_css.concat(
            single_selector + '{pointer-events: none;}'
          );
          attribute_css = attribute_css.concat(
            single_selector + ' > * {pointer-events: auto;}'
          );
        });
        // Return the array
        return attribute_css;
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
          '{align-items: ' +
          value_1 +
          ';display: flex;flex-wrap: wrap;--h2-column-gap: ' +
          value_2 +
          ';--h2-row-gap: ' +
          value_3 +
          ';margin: calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap))' +
          ';width:calc(100% + var(--h2-column-gap));}';
        // Assemble the CSS array ==============================================
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(single_selector + css_string);
          attribute_css = attribute_css.concat(
            single_selector +
              ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}'
          );
          attribute_css = attribute_css.concat(
            single_selector + '{pointer-events: none;}'
          );
          attribute_css = attribute_css.concat(
            single_selector + ' > * {pointer-events: auto;}'
          );
        });
        // Return the array
        return attribute_css;
      }
    } else {
      // An invalid number of options was passed
      get_option_count_errors(prop_data, property, instance, values);
      return null;
    }
  } catch (error) {
    // Catch any errors ========================================================
    property_error_catch(property, instance, error);
    return null;
  }
}

module.exports = {
  parse_flex_grid,
};
