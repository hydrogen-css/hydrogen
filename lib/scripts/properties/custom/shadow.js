// Hydrogen: Shadow parsing
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
 * Parse data-h2-shadow and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_shadow(settings, instance, property, selector, values) {
  try {
    // Create working variables ================================================
    var attribute_css = [];
    var css_string = '';
    // Define possible options for the attribute ===============================
    // Value 1 -----------------------------------------------------------------
    var shadow;
    var shadow_string = '';
    if (values.length >= 1) {
      values.forEach(function (value, index) {
        shadow = value;
        if (
          settings.styles.tokens != null &&
          settings.styles.tokens.shadows != null &&
          settings.styles.tokens.shadows.length != 0
        ) {
          settings.styles.tokens.shadows.forEach(function (
            shadow_setting,
            shadow_setting_index
          ) {
            if (shadow == shadow_setting.key) {
              shadow = shadow_setting.shadow;
            }
          });
        }
        if (index === values.length - 1) {
          shadow_string = shadow_string + shadow;
        } else {
          shadow_string = shadow_string + shadow + ',';
        }
      });
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length >= 1) {
      if (shadow_string == null) {
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else {
        css_string = '{box-shadow: ' + shadow_string + ';}';
      }
    } else {
      // An invalid number of options was passed
      get_option_count_errors(property, instance, values);
      return null;
    }
    // Assemble the CSS array ==================================================
    selector.forEach(function (single_selector, single_selector_index) {
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
  parse_shadow,
};
