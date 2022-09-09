// Hydrogen: Overlay parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var {
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
} = require('../log-errors');
var { parse_color_value } = require('../../parse-color');

/**
 * Parse data-h2-overlay and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_overlay(settings, instance, property, selector, values) {
  try {
    // Create working variables ================================================
    var attribute_css = [];
    var css_string = '';
    // Define possible options for the attribute ===============================
    // Value 1 -----------------------------------------------------------------
    var value_1 = null;
    if (values.length >= 1) {
      value_1 = parse_color_value(settings, instance, property, values[0]);
    }
    // Value 2 -----------------------------------------------------------------
    var value_2 = null;
    if (values.length >= 2) {
      value_2 = values[1];
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 1) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else {
        if (value_1.type === 'solid') {
          css_string =
            '{background-color: ' +
            value_1.color +
            ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        } else if (value_1.type === 'gradient') {
          css_string =
            '{background-color: ' +
            value_1.fallback +
            ';background-image: ' +
            value_1.color +
            ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        }
      }
    } else if (values.length === 2) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(property, instance, values, 1);
        return null;
      } else {
        if (value_1.type == 'solid') {
          css_string =
            '{background-color: ' +
            value_1.color +
            ';opacity: ' +
            value_2 +
            ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        } else if (value_1.type == 'gradient') {
          css_string =
            '{background-color: ' +
            value_1.fallback +
            ';background-image: ' +
            value_1.color +
            ';opacity: ' +
            value_2 +
            ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        }
      }
    } else {
      // An invalid number of options was passed
      get_option_count_errors(property, instance, values);
      return null;
    }
    // Assemble the CSS array ==================================================
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(
        single_selector + ':before' + css_string
      );
      attribute_css = attribute_css.concat(
        single_selector + '{position: relative;}'
      );
      attribute_css = attribute_css.concat(
        single_selector + ' > * {position: relative;}'
      );
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
  parse_overlay,
};
