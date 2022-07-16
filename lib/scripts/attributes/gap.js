// Hydrogen: Gap parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error, h2_error_detail } = require('../logs');
var { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-gap and return CSS
 * @param {string} attribute The full attribute
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseGap(attribute, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] space unit
    var space = null;
    var space_error_message = '';
    if (values.length >= 1) {
      space = parseWhitespace(property, values[0]);
    }
    // -------------------------------------------------------------------------
    // Value 2: [optional] axis - all | column | row
    var axis = null;
    var axis_error_message =
      'gap accepts "all", "column", or "row" as an "axis" option.';
    if (values.length >= 2) {
      axis = values[1];
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      // -----------------------------------------------------------------------
      // 1 value syntax
      if (space == null) {
        h2_error_detail('syntax_invalid_whitespace', attribute, null);
        return null;
      } else {
        css_string = '{gap: ' + space + ';}';
      }
    } else if (values.length === 2) {
      // -----------------------------------------------------------------------
      // 2 value syntax
      if (space == null) {
        h2_error_detail('syntax_invalid_whitespace', attribute, null);
        return null;
      } else if (axis == null) {
        h2_error_detail(
          'syntax_invalid_whitespace',
          attribute,
          null,
          axis_error_message
        );
        return null;
      } else {
        if (axis == 'all' || axis == 'both') {
          css_string = '{gap: ' + space + ';}';
        } else if (axis == 'row') {
          css_string = '{row-gap: ' + space + ';}';
        } else if (axis == 'column') {
          css_string = '{column-gap: ' + space + ';}';
        } else {
          h2_error_detail(
            'syntax_invalid_whitespace',
            attribute,
            null,
            axis_error_message
          );
          return null;
        }
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        attribute,
        null,
        "gap accepts 1 (space_unit) or 2 (space_unit, axis) values, and you've specified " +
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
  parseGap,
};
