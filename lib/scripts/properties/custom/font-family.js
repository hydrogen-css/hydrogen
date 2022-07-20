// Hydrogen: Font family parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_load_settings } = require('../../load-settings');
var { h2_error_detail } = require('../../logs');

/**
 * Parse data-h2-font-family and return CSS
 *
 * Font family is a custom property that has to parse configured families
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_font_family(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var settings = h2_load_settings();
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] configured font key | system font
    var font_family = null;
    var font_family_error_message = '';
    if (values.length >= 1) {
      font_family = values[0];
      font_family_error_message =
        'the "family" option for font-family only accepts configured font keys from your configuration file.';
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      // -----------------------------------------------------------------------
      // 1 value syntax
      if (font_family == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          font_family_error_message
        );
        return null;
      } else {
        settings.fonts.forEach(function (
          configured_font_family,
          configured_font_family_index
        ) {
          if (font_family === configured_font_family.key) {
            font_family =
              'var(--h2-font-family-' + configured_font_family.key + ')';
          }
        });
        css_string = '{font-family: ' + font_family + ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "font-family accepts 1 value (family), and you've specified " +
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
  parse_font_family,
};
