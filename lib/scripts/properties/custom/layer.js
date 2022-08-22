// Hydrogen: Layer parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');

/**
 * Parse data-h2-layer and return CSS
 *
 * Layer is a custom property that has to parse positioning
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_layer(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] layer
    var layer = null;
    var layer_error_message = '';
    if (values.length >= 1) {
      layer = values[0];
      layer_error_message =
        'the "layer" option for layer only accepts numbers.';
    }
    // -------------------------------------------------------------------------
    // Value 2: [optional] CSS position value
    var position = null;
    var position_error_message = '';
    if (values.length >= 2) {
      position = values[1];
      position_error_message =
        'the "position" option for layer only accepts CSS position values.';
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      // -----------------------------------------------------------------------
      // 1 value syntax
      if (layer == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          layer_error_message
        );
        return null;
      } else {
        css_string = '{z-index: ' + layer + ';}';
      }
    } else if (values.length === 2) {
      // -----------------------------------------------------------------------
      // 2 value syntax
      if (layer == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          layer_error_message
        );
        return null;
      } else if (position == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          position_error_message
        );
        return null;
      } else {
        css_string = '{position: ' + position + ';z-index: ' + layer + ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "layer accepts 1 (layer) or 2 (layer, position) values, and you've specified " +
          values.length +
          '.'
      );
      return null;
    }
    // =========================================================================
    // Assemble the CSS array
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(
        '[data-h2-position]' + single_selector + ','
      );
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
  parse_layer,
};
