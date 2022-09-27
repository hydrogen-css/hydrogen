// Hydrogen: Transform parsing
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
 * Parse data-h2-transform and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @param {string} error_message the custom error message for this property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_transform(
  settings,
  prop_data,
  instance,
  property,
  selector,
  values
) {
  try {
    // Create working variables ================================================
    var attribute_css = [];
    var css_string = '';
    // Define possible options for the attribute ===============================
    // Value 1 -----------------------------------------------------------------
    var value_1 = null;
    if (values.length >= 1) {
      // Set the value to be an exact match to start
      value_1 = values[0];
      // Check for whitespace multipliers ......................................
      // Because transforms generally rely on consistent values that match spacing of surrounding elements, it's important that transforms support multipliers despite them only accepting a single CSS string
      var multipliers = value_1.match(/-?x[0-9]+.?[0-9]+/g); // grabs matching multipliers
      var multiplier_pairs = []; // sets up an array to work with
      var failed = false; // sets up a check to fail the attribute if a multiplier is returned incorrectly
      if (multipliers != null) {
        // Multipliers were found, so loop through the matches and parse them
        multipliers.forEach(function (multiplier, multiplier_index) {
          var multiplier_data = {
            initial: multiplier,
            converted: parse_whitespace_value(instance, property, multiplier),
          };
          // If the parsed multiplier was valid, add it to the pairs array
          if (multiplier_data.converted != null) {
            multiplier_pairs = multiplier_pairs.concat(multiplier_data);
          } else {
            failed = true;
          }
        });
      }
      // Check if the parsing passed, and if it did, replace the multipliers in the string with their parsed values
      if (failed === false) {
        multiplier_pairs.forEach(function (pair, pair_index) {
          value_1 = value_1.replace(pair.initial, pair.converted);
        });
      }
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 1) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 0);
        return null;
      } else {
        css_string = '{' + property + ': ' + value_1 + ';}';
      }
    } else {
      // An invalid number of options was passed
      get_option_count_errors(prop_data, property, instance, values);
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
  parse_transform,
};
