// Hydrogen: Justify items parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');
var { parse_basic_property } = require('../basic');

/**
 * Parse data-h2-justify-items and return CSS
 *
 * Justify items is a basic property and leverages the basic parser function
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_justify_items(instance, property, selector, values) {
  try {
    // =========================================================================
    // Generate a custom error messages
    var syntax_error_message =
      'the "justification" value for justify-items only accepts CSS justify-items values."';
    var value_count_error_message =
      "justify-items accepts 1 value (justification), and you've specified " +
      values.length +
      '.';
    // =========================================================================
    // Parse the instance as a basic property
    var property_css = parse_basic_property(
      instance,
      property,
      selector,
      values,
      syntax_error_message,
      value_count_error_message
    );
    // =========================================================================
    // Return the array
    return property_css;
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error_detail('generic', instance.attribute, instance.files, error);
    return null;
  }
}

module.exports = {
  parse_justify_items,
};
