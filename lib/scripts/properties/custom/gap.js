// Hydrogen: Gap parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');
var { parse_whitespace_value } = require('../../parse-whitespace');

/**
 * Parse data-h2-gap and return CSS
 *
 * Gap is a custom property that has to parse whitespace values
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_gap(instance, property, selector, values) {
  try {
    // Create initial variables ================================================
    var attribute_css = [];
    var css_string = '';
    // Define possible options =================================================
    // Gap accepts 1 or 2 options, where providing 1 option sets a gap value on both axes, and 2 values sets values on column and row respectively
    // Value 1 -----------------------------------------------------------------
    // [required] - "column"
    var column = null;
    var column_error_message = '';
    if (values.length >= 1) {
      column = parse_whitespace_value(instance, property, values[0]);
    }
    // Value 2 -----------------------------------------------------------------
    // [optional] - "row"
    var row = null;
    var row_error_message = '';
    if (values.length >= 2) {
      row = parse_whitespace_value(instance, property, values[1]);
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 1) {
      if (column == null) {
        return null;
      } else {
        css_string = '{gap: ' + column + ';}';
      }
    } else if (values.length === 2) {
      if (column == null || row == null) {
        return null;
      } else {
        css_string = '{column-gap: ' + column + ';row-gap: ' + row + ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "gap accepts 1 (gap-unit) or 2 (column-gap-unit, row-gap-unit) values, and you've specified " +
          values.length +
          '.'
      );
      return null;
    }
    // Assemble the CSS array ==================================================
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(single_selector + css_string);
    });
    // Return the array
    return attribute_css;
  } catch (error) {
    // Log any errors that weren't accounted for ===============================
    h2_error_detail('generic', instance.attribute, instance.files, error);
    // Return null
    return null;
  }
}

module.exports = {
  parse_gap,
};
