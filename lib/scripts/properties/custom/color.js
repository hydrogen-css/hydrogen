// Hydrogen: Color parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');
var { parse_color_value } = require('../../parse-color');

/**
 * Parse data-h2-font-color and return CSS
 *
 * Color is a custom property that has to parse colors
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_text_color(instance, property, selector, values) {
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
      color = parse_color_value(instance, property, values[0]);
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      if (color == null) {
        // Color parser provides an error for us
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
        instance.attribute,
        instance.files,
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
    h2_error_detail('generic', instance.attribute, instance.files, error);
    return null;
  }
}

module.exports = {
  parse_text_color,
};
