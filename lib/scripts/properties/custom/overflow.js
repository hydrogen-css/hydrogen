// Hydrogen: Overflow parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Local dependencies
var { h2_error_detail } = require('../../logs');

/**
 * Parse data-h2-overflow and return CSS
 *
 * Overflow is a custom property that has to parse a second optional value
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_overflow(instance, property, selector, values) {
  try {
    // Create initial variables ================================================
    var attribute_css = [];
    var css_string = '';
    // Define possible options =================================================
    // Overflow accepts 1 or 2 options, where providing 1 option sets the overflow on both axes, while providing 2 options sets it on the x and y axes respectively
    // Value 1 -----------------------------------------------------------------
    // [required] - "x-overflow"
    var x_overflow = null;
    var x_overflow_error_message = '';
    if (values.length >= 1) {
      x_overflow = values[0];
      x_overflow_error_message =
        'the "overflow" option for overflow only accepts CSS overflow values.';
    }
    if (values.length >= 2) {
      x_overflow_error_message =
        'the "x-overflow" option for overflow only accepts CSS overflow values.';
    }
    // Value 2 -----------------------------------------------------------------
    // [optional] - "y-overflow"
    var y_overflow;
    var y_overflow_error_message;
    if (values.length >= 2) {
      y_overflow = values[1];
      y_overflow_error_message =
        'the "y-overflow" option for overflow only accepts CSS overflow values.';
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 1) {
      if (x_overflow == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          x_overflow_error_message
        );
        return null;
      } else {
        css_string = '{overflow: ' + x_overflow + ';}';
      }
    } else if (values.length === 2) {
      if (x_overflow == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          x_overflow_error_message
        );
        return null;
      } else if (y_overflow == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          y_overflow_error_message
        );
        return null;
      } else {
        css_string =
          '{overflow-x: ' + x_overflow + ';overflow-y: ' + y_overflow + ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "overflow accepts 1 (overflow) or 2 (x-overflow, y-overflow) values, and you've specified " +
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
  parse_overflow,
};
