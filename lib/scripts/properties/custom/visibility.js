// Hydrogen: Visibility parsing
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
 * Parse data-h2-visibility and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_visibility(settings, instance, property, selector, values) {
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
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else {
        if (value_1 === 'invisible') {
          css_string =
            '{height: 1px;overflow: hidden;position: absolute;top: 0;left: -100vw;width: 1px;}';
        } else if (value_1 === 'hidden') {
          css_string = '{display: none;visibility: hidden;}';
        } else if (value_1 === 'visible') {
          css_string =
            '{display: block;height: auto;overflow: visible;position: static;top: auto;left: auto;width: auto;visibility: visible;}';
        } else {
          get_syntax_errors(property, instance, values, 0);
          return null;
        }
      }
    } else {
      // An invalid number of options was passed
      get_option_count_errors(property, instance, values);
      return null;
    }
    // Assemble the CSS array ==================================================
    // As a shortcut property, visibility should take precedence over other utilities that it applies. This includes display, height, offset, overflow, position, and width.
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(
        '[data-h2-display]' + single_selector + ','
      );
      attribute_css = attribute_css.concat(
        '[data-h2-height]' + single_selector + ','
      );
      attribute_css = attribute_css.concat(
        '[data-h2-offset]' + single_selector + ','
      );
      attribute_css = attribute_css.concat(
        '[data-h2-overflow]' + single_selector + ','
      );
      attribute_css = attribute_css.concat(
        '[data-h2-position]' + single_selector + ','
      );
      attribute_css = attribute_css.concat(
        '[data-h2-width]' + single_selector + ','
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
  parse_visibility,
};
