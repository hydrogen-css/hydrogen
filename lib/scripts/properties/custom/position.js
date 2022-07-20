// Hydrogen: Position parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');

/**
 * Parse data-h2-position and return CSS
 *
 * Position is a custom property that has to parse unique shortcuts
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_position(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] CSS position
    var position = null;
    var position_error_message = '';
    if (values.length >= 1) {
      position = values[0];
      position_error_message =
        'the "position" option only accepts CSS position values or "center".';
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      // -----------------------------------------------------------------------
      // 1 value syntax
      if (position == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          position_error_message
        );
        return null;
      } else {
        if (position === 'center') {
          css_string =
            '{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}';
        } else {
          css_string = '{position: ' + position + ';}';
        }
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "position accepts 1 value (position), and you've specified " +
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
  parse_position,
};
