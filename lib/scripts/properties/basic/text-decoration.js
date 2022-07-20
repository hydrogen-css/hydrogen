// Hydrogen: Text decoration parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');
var { parse_basic_property } = require('../basic');

/**
 * Parse data-h2-text-decoration and return CSS
 *
 * Text decoration is a basic property and leverages the basic parser function
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_text_decoration(instance, property, selector, values) {
  try {
    // =========================================================================
    // Generate a custom error messages
    var syntax_error_message =
      'the "decoration" value for text-decoration only accepts CSS text-decoration values."';
    var value_count_error_message =
      "text-decoration accepts 1 value (decoration), and you've specified " +
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
  parse_text_decoration,
};
