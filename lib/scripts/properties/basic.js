// Hydrogen: Basic property parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../logs');

/**
 * Parse simple Hydrogen properties and return CSS
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @param {string} error_message the custom error message for this property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_basic_property(
  instance,
  property,
  selector,
  values,
  syntax_error_message,
  value_count_error_message
) {
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
    if (values.length >= 1) {
      option = values[0];
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      if (option == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          syntax_error_message
        );
        return null;
      } else {
        css_string = '{' + property + ': ' + option + ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        value_count_error_message
      );
      return null;
    }
    // =========================================================================
    // Assemble the CSS array
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(single_selector + css_string);
    });
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
  parse_basic_property,
};
