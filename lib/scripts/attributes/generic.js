// Hydrogen: Simple attribute parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error } = require('../logs');

/**
 * Parse simple Hydrogen attributes and return CSS
 * @param {string} attribute The full attribute
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseSimpleAttribute(attribute, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] option
    var option = null;
    var option_error_message = '';
    if (values.length >= 1) {
      option = values[0];
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      if (option == null) {
        h2_error_detail(
          'syntax_invalid_color',
          attribute,
          option_error_message
        );
        return null;
      } else {
        css_string = '{' + property[0] + ': ' + option + ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        attribute,
        null,
        property[0] +
          " accepts 1 value, and you've specified " +
          values.length +
          '.'
      );
      return null;
    }
    // =========================================================================
    // Assemble the CSS array
    attribute_css = [selector + css_string];
    // =========================================================================
    // Return the array
    return attribute_css;
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error(error, attribute);
    return null;
  }
}

module.exports = {
  parseSimpleAttribute,
};
