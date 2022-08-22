// Hydrogen: Visibility parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');

/**
 * Parse data-h2-visibility and return CSS
 *
 * Visibility is a custom property that has to parse unique custom keys
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_visibility(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] configured font key | system font
    var value1 = null;
    var value1_error_message = '';
    if (values.length >= 1) {
      value1 = values[0];
      value1_error_message =
        'the "visibility" option for visibility only accepts "visible", "hidden", and "invisible".';
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      // -----------------------------------------------------------------------
      // 1 value syntax
      if (value1 == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          value1_error_message
        );
        return null;
      } else {
        if (value1 === 'invisible') {
          css_string =
            '{height: 1px;overflow: hidden;position: absolute;top: 0;left: -100vw;width: 1px;}';
        } else if (value1 === 'hidden') {
          css_string = '{display: none;visibility: hidden;}';
        } else if (value1 === 'visible') {
          css_string =
            '{display: block;height: auto;overflow: auto;position: static;top: auto;left: auto;width: auto;visibility: visible;}';
        } else {
          h2_error_detail(
            'syntax',
            instance.attribute,
            instance.files,
            value1_error_message
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
        "visibility accepts 1 value (visibility), and you've specified " +
          values.length +
          '.'
      );
      return null;
    }
    //
    // Assemble the CSS array ==================================================
    // As a shortcut property, visibility should take precedence over other utilities that it applies. This includes display, height, offset, overflow, position, and width.
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(
        '[data-h2-display]' + single_selector + ','
      );
      attribute_css = attribute_css.concat(
        '[data-h2-height]' + single_selector + ','
      );
      attribute_css = attribute_css.concat(
        '[data-h2-offset]' + single_selector + ','
      );
      attribute_css = attribute_css.concat(
        '[data-h2-overflow]' + single_selector + ','
      );
      attribute_css = attribute_css.concat(
        '[data-h2-position]' + single_selector + ','
      );
      attribute_css = attribute_css.concat(
        '[data-h2-width]' + single_selector + ','
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
  parse_visibility,
};
