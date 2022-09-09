// Hydrogen: Font size parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var {
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
} = require('../log-errors');

/**
 * Parse data-h2-font-size and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_font_size(settings, instance, property, selector, values) {
  try {
    // Create working variables ================================================
    var attribute_css = [];
    var css_string = '';
    // Define possible options for the attribute ===============================
    // Value 1 -----------------------------------------------------------------
    var value_1 = null;
    var font_size_unit = '';
    if (values.length >= 1) {
      value_1 = values[0];
    }
    // Value 2 -----------------------------------------------------------------
    var value_2 = null;
    if (values.length >= 2) {
      value_2 = values[1];
    }
    // Construct line height values ============================================
    // This is required to account for a user setting a size value with no line-height override
    if (value_1 == null) {
      get_syntax_errors(property, instance, values, 0);
      return null;
    } else {
      if (value_1 === 'h1') {
        font_size_unit = 'var(--h2-font-size-h1)';
        if (value_2 == null) {
          value_2 = 'var(--h2-line-height-h1)';
        }
      } else if (value_1 === 'h2') {
        font_size_unit = 'var(--h2-font-size-h2)';
        if (value_2 == null) {
          value_2 = 'var(--h2-line-height-h2)';
        }
      } else if (value_1 === 'h3') {
        font_size_unit = 'var(--h2-font-size-h3)';
        if (value_2 == null) {
          value_2 = 'var(--h2-line-height-h3)';
        }
      } else if (value_1 === 'h4') {
        font_size_unit = 'var(--h2-font-size-h4)';
        if (value_2 == null) {
          value_2 = 'var(--h2-line-height-h4)';
        }
      } else if (value_1 === 'h5') {
        font_size_unit = 'var(--h2-font-size-h5)';
        if (value_2 == null) {
          value_2 = 'var(--h2-line-height-h5)';
        }
      } else if (value_1 === 'h6') {
        font_size_unit = 'var(--h2-font-size-h6)';
        if (value_2 == null) {
          value_2 = 'var(--h2-line-height-h6)';
        }
      } else if (
        value_1 === 'base' ||
        value_1 === 'paragraph' ||
        value_1 === 'normal' ||
        value_1 === 'copy'
      ) {
        font_size_unit = 'var(--h2-font-size-copy)';
        if (value_2 == null) {
          value_2 = 'var(--h2-line-height-copy)';
        }
      } else if (value_1 === 'label' || value_1 === 'caption') {
        font_size_unit = 'var(--h2-font-size-caption)';
        if (value_2 == null) {
          value_2 = 'var(--h2-line-height-caption)';
        }
      } else {
        // CSS units were used for font size
        font_size_unit = value_1;
        if (value_2 == null) {
          value_2 = 'var(--h2-line-height-copy)';
        }
      }
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 1) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else {
        css_string =
          '{font-size: ' + font_size_unit + ';line-height: ' + value_2 + ';}';
      }
    } else if (values.length === 2) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(property, instance, values, 1);
        return null;
      } else {
        css_string =
          '{font-size: ' + font_size_unit + ';line-height: ' + value_2 + ';}';
      }
    } else {
      // An invalid number of options was passed
      get_option_count_errors(property, instance, values);
      return null;
    }
    // Assemble the CSS array ==================================================
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(
        '[data-h2-line-height]' + single_selector + ',',
        '[data-h2-leading]' + single_selector + ','
      );
      attribute_css = attribute_css.concat(single_selector + css_string);
    });
    // Return the array
    return attribute_css;
  } catch (error) {
    // Catch any errors ========================================================
    property_error_catch(property, instance, error);
    return null;
  }
}

module.exports = {
  parse_font_size,
};
