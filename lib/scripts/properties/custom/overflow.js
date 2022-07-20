// Hydrogen: Overflow parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Local dependencies
var { h2_error_detail } = require('../../logs');

/**
 * Parse data-h2-overflow and return CSS
 *
 * Overflow is a custom property that has to parse a second optional axis value
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_overflow(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] CSS overflow
    var overflow = null;
    var overflow_error_message = '';
    if (values.length >= 1) {
      overflow = values[0];
      overflow_error_message =
        'the "overflow" option for overflow only accepts CSS overflow values.';
    }
    // -------------------------------------------------------------------------
    // Value 2: [optional] axis (all, x, y)
    var axis;
    var axis_error_message;
    if (values.length >= 2) {
      axis = values[1];
      axis_error_message =
        'the "axis" option for overflow only accepts "all", "x", or "y".';
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      // -----------------------------------------------------------------------
      // 1 value syntax
      if (overflow == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          overflow_error_message
        );
        return null;
      } else {
        css_string = '{overflow: ' + overflow + ';}';
      }
    } else if (values.length === 2) {
      // -----------------------------------------------------------------------
      // 2 value syntax
      if (overflow == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          overflow_error_message
        );
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
        if (axis === 'all' || axis === 'both') {
          css_string = '{overflow: ' + overflow + ';}';
        } else if (axis === 'x') {
          css_string = '{overflow-x: ' + overflow + ';}';
        } else if (axis === 'y') {
          css_string = '{overflow-y: ' + overflow + ';}';
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
        "overflow accepts 1 (overflow) or 2 (overflow, axis) values, and you've specified " +
          values.length +
          '.'
      );
      return null;
    }
    // =========================================================================
    // Assemble the CSS array
    attribute_css = [
      '[data-h2-visibility]' + selector + ',',
      selector + css_string,
    ];
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
  parse_overflow,
};
