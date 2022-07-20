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
 * Gap is a custom property that has to parse size tokens
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_gap(instance, property, selector, values) {
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
      space = parse_whitespace_value(instance, property, values[0]);
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
        // Whitespace handles error messages for us
        return null;
      } else {
        css_string = '{gap: ' + space + ';}';
      }
    } else if (values.length === 2) {
      // -----------------------------------------------------------------------
      // 2 value syntax
      if (space == null) {
        // Whitespace handles error messages for us
        return null;
      } else if (axis == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
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
            'syntax',
            instance.attribute,
            instance.files,
            axis_error_message
          );
          return null;
        }
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
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
    h2_error_detail('generic', instance.attribute, instance.files, error);
    return null;
  }
}

module.exports = {
  parse_gap,
};
