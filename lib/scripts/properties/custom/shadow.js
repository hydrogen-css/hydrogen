// Hydrogen: Shadow parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_load_settings } = require('../../load-settings');
var { h2_error_detail } = require('../../logs');

/**
 * Parse data-h2-shadow and return CSS
 *
 * Shadow is a custom property that has to parse configured settings
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_shadow(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var settings = h2_load_settings();
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] configured key, CSS shadow
    var shadow;
    var shadow_string = '';
    var shadow_error_message;
    if (values.length >= 1) {
      values.forEach(function (value, index) {
        shadow = value;
        if (settings.shadows != null) {
          settings.shadows.forEach(function (shadowSetting) {
            if (shadow == shadowSetting.key) {
              shadow = shadowSetting.shadow;
            }
          });
        }
        if (index === values.length - 1) {
          shadow_string = shadow_string + shadow;
        } else {
          shadow_string = shadow_string + shadow + ',';
        }
      });
      shadow_error_message =
        'the "shadow" option for shadow only accepts configured shadow keys or a CSS box-shadow value.';
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length >= 1) {
      if (shadow_string == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          shadow_error_message
        );
        return null;
      } else {
        css_string = '{box-shadow: ' + shadow_string + ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "shadow accepts 1 value (shadow), and you've specified " +
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
  parse_shadow,
};
