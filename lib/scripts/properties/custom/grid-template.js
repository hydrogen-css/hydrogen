// Hydrogen: Grid template column and row parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var {
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
} = require('../log-errors');
var { parse_whitespace_value } = require('../../parse-whitespace');

/**
 * Parse data-h2-grid-templates-columns and data-h2-grid-template-rows attributes and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_grid_template(settings, instance, property, selector, values) {
  try {
    // Create working variables ================================================
    var attribute_css = [];
    var css_string = '';
    // Define possible options for the attribute ===============================
    // Value 1 -----------------------------------------------------------------
    var value_1 = null;
    if (values.length >= 1) {
      value_1 = values[0];
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 1) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else {
        var individual_template_items = [];
        // Break the value into individual items so that we can check for multipliers and replace them with the correct value
        if (value_1.indexOf(' ') > -1) {
          individual_template_items = value_1.split(/ +/);
          for (const new_template of individual_template_items) {
            new_template.trim();
          }
        } else {
          individual_template_items = individual_template_items.concat(value_1);
        }
        // Loop through the options and check for multipliers
        for (const [i, el] of individual_template_items.entries()) {
          var parsed_item = parse_whitespace_value(instance, property, el);
          individual_template_items[i] = parsed_item;
        }
        var final_template = individual_template_items.join(' ');
        // Build the final CSS string
        css_string = '{' + property + ': ' + final_template + ';}';
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
  parse_grid_template,
};
