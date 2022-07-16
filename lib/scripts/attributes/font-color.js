// Hydrogen: Font color parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error, h2_error_detail } = require('../logs');
var { parseColor } = require('../parse-color');

/**
 * Parse data-h2-font-color and return CSS
 * @param {string} attribute The full attribute
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseFontColor(attribute, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] color/gradient
    var color = null;
    var color_error_message = '';
    if (values.length >= 1) {
      color = parseColor(property, values[0]);
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      if (color == null) {
        // Rather than using color_error_message, use the default invalid color syntax error
        h2_error_detail('syntax_invalid_color', attribute, null);
        return null;
      } else {
        if (color.type === 'solid') {
          css_string = '{color: ' + color.color + ';}';
        } else if (color.type === 'gradient') {
          css_string =
            '{color: ' +
            color.fallback +
            ';background-image: ' +
            color.color +
            ';background-clip: text;-webkit-text-fill-color: transparent;}';
        }
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        attribute,
        null,
        "color accepts 1 value (color | gradient), and you've specified " +
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
  parseFontColor,
};
