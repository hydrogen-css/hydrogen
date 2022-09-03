// Hydrogen: Container parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var {
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
} = require('../log-errors');
const { parse_whitespace_value } = require('../../parse-whitespace');

/**
 * Parse data-h2-container and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_container(settings, instance, property, selector, values) {
  try {
    // Create working variables ================================================
    var attribute_css = [];
    var css_string = '';
    /// Define possible options for the attribute ==============================
    // Value 1 -----------------------------------------------------------------
    var value_1 = null;
    var alignment_css = '';
    if (values.length >= 1) {
      // Set the initial alignment value
      value_1 = values[0];
      // Check if the alignment value matches a key
      if (value_1 === 'center' || value_1 === 'middle') {
        alignment_css = 'margin-right: auto;margin-left: auto;';
      } else if (value_1 === 'left') {
        alignment_css = 'margin-right: auto;margin-left: 0;';
      } else if (value_1 === 'right') {
        alignment_css = 'margin-right: 0;margin-left: auto;';
      } else {
        // Because it matches no keys, set it to error
        value_1 = null;
      }
    }
    // Value 2 -----------------------------------------------------------------
    var value_2 = null;
    if (values.length >= 2) {
      // Set the container as the value for now
      value_2 = values[1];
      // Loop through the user's container settings
      settings.styles.tokens.containers.forEach(function (containerSetting) {
        // Check for a matching container key
        if (value_2 === containerSetting.key) {
          // Set the container as the setting's max_width value
          value_2 = containerSetting.max_width;
        }
      });
      // Check to see if the container matched a key or not by comparing it to its original value
      if (value_2 === values[1]) {
        // It didn't match any settings, so assume it's a CSS value
        value_2 = parse_whitespace_value(instance, property, values[1]);
      }
    }
    // Value 3 -----------------------------------------------------------------
    var value_3 = null;
    if (values.length >= 3) {
      value_3 = parse_whitespace_value(instance, property, values[2]);
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 2) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(property, instance, values, 1);
        return null;
      } else {
        css_string =
          '{' + alignment_css + 'max-width: ' + value_2 + ';width: 100%;}';
      }
    } else if (values.length === 3) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(property, instance, values, 1);
        return null;
      } else if (value_3 == null || value_3 === 'null') {
        get_syntax_errors(property, instance, values, 2);
        return null;
      } else {
        // Deal with non-unit values for max_width
        var max_width_string = '';
        if (
          value_2 === 'none' ||
          value_2 === 'initial' ||
          value_2 === 'inherit'
        ) {
          max_width_string = value_2;
        } else {
          max_width_string = 'calc(' + value_2 + ' + (' + value_3 + ' * 2))';
        }
        // Build the CSS string
        css_string =
          '{' +
          alignment_css +
          'max-width:' +
          max_width_string +
          ';padding-right:' +
          value_3 +
          ';padding-left:' +
          value_3 +
          ';width: 100%;}';
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
  parse_container,
};
