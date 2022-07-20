// Hydrogen: Padding and margin attribute parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');
var { parse_whitespace_value } = require('../../parse-whitespace');

/**
 * Parse data-h2-padding and data-h2-margin attributes and return CSS
 *
 * Margin and padding are custom attributes that have unique side constraints and need to parse size tokens
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_space(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required]
    var value1 = null;
    var value1_error_message = '';
    if (values.length >= 1) {
      value1 = parse_whitespace_value(instance, property, values[0]);
    }
    // -------------------------------------------------------------------------
    // Value 2: [optional]
    var value2 = null;
    var value2_error_message = '';
    if (values.length >= 2) {
      value2 = parse_whitespace_value(instance, property, values[1]);
    }
    // -------------------------------------------------------------------------
    // Value 3: [optional]
    var value3 = null;
    var value3_error_message = '';
    if (values.length >= 3) {
      value3 = parse_whitespace_value(instance, property, values[2]);
    }
    // -------------------------------------------------------------------------
    // Value 4: [optional]
    var value4 = null;
    var value4_error_message = '';
    if (values.length >= 4) {
      value4 = parse_whitespace_value(instance, property, values[3]);
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      // -----------------------------------------------------------------------
      // 1 value syntax
      if (value1 == null) {
        // Whitespace parser provides an error for us
        return null;
      } else {
        css_string = '{' + property + ': ' + value1 + ';}';
      }
    } else if (values.length === 2) {
      // -----------------------------------------------------------------------
      // 2 value syntax
      if (value1 == null || value2 == null) {
        // Whitespace parser provides an error for us
        return null;
      } else {
        css_string =
          '{' +
          property +
          '-top: ' +
          value1 +
          ';' +
          property +
          '-bottom: ' +
          value1 +
          ';' +
          property +
          '-right: ' +
          value2 +
          ';' +
          property +
          '-left: ' +
          value2 +
          ';}';
      }
    } else if (values.length === 4) {
      // -----------------------------------------------------------------------
      // 4 value syntax
      if (
        value1 == null ||
        value2 == null ||
        value3 == null ||
        value4 == null
      ) {
        // Whitespace parser provides an error for us
        return null;
      } else {
        css_string =
          '{' +
          property +
          '-top: ' +
          value1 +
          ';' +
          property +
          '-bottom: ' +
          value3 +
          ';' +
          property +
          '-right: ' +
          value2 +
          ';' +
          property +
          '-left: ' +
          value4 +
          ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        property +
          " accepts 1 (size), 2 (top-bottom_size, right_left_size), or 4 (top_size, right_size, bottom_size, left_size) values, and you've specified " +
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
  parse_space,
};
