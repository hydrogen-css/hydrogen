// Hydrogen: Transform parsing
'use strict';

// Hydrogen type imports
let Settings = require('../../../data/settings-model-definition');
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 */
let Properties = require('../../../data/property-model-definition');
/**
 * @typedef {import('../../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../../data/property-model-definition').Property} Property
 * @typedef {import('../../../data/property-model-definition').PropertyKeyInstances} Instance
 * @typedef {import('../../../data/property-model-definition').PropertyKeyInstanceValues} Value
 */
// Hydrogen data imports
// Hydrogen function imports
const {
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
} = require('../log-errors');
const { parse_whitespace_value } = require('../../parse-whitespace');
// Vendor imports
var colors = require('colors');

/**
 * @typedef {string[]} AttributeCSS
 */

/**
 * Parse data-h2-transform and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_transform(
  settings,
  property,
  prop_data,
  prop_instance,
  prop_value
) {
  try {
    // Create an empty array to store each selector and its CSS
    /** @type {AttributeCSS} */
    let attribute_css = [];
    // Create an empty string for the concatenated CSS to be assigned to each selector
    let css_string = '';
    // Create an alias for the selectors
    let selectors = prop_value.selectors;
    // Create an alias for the query options
    let options = prop_value.options;
    // Parse the first option if it exists
    let option1 = null;
    if (options.length >= 1) {
      // Set the value to be an exact match to start
      option1 = options[0];
      // Check for whitespace multipliers
      // Because transforms generally rely on consistent values that match spacing of surrounding elements, it's important that transforms support multipliers despite them only accepting a single CSS string
      let multipliers = option1.match(/-?x[0-9]+.?[0-9]+/g); // grabs matching multipliers
      let multiplier_pairs = []; // sets up an array to work with
      let failed = false; // sets up a check to fail the attribute if a multiplier is returned incorrectly
      if (multipliers) {
        // Multipliers were found, so loop through the matches and parse them
        multipliers.forEach(function (multiplier) {
          let multiplier_data = {
            initial: multiplier,
            converted: parse_whitespace_value(
              property,
              prop_data,
              prop_instance,
              prop_value,
              multiplier
            ),
          };
          // If the parsed multiplier was valid, add it to the pairs array
          if (multiplier_data.converted) {
            multiplier_pairs = multiplier_pairs.concat(multiplier_data);
          } else {
            failed = true;
          }
        });
      }
      // Check if the parsing passed, and if it did, replace the multipliers in the string with their parsed values
      if (!failed) {
        multiplier_pairs.forEach(function (pair) {
          option1 = option1.replace(pair.initial, pair.converted);
        });
      }
    }
    // Check that a valid number of options were passed
    if (values.length === 1) {
      if (value1) {
        // Create the CSS string
        css_string = '{' + property + ': ' + option1 + ';}';
      } else {
        // Log a syntax error
        get_syntax_errors(prop_data, property, prop_instance, options, 0);
        return false;
      }
    } else {
      // Log that an invalid number of options was passed
      get_option_count_errors(prop_data, property, prop_instance, options);
      return false;
    }
    // Assemble and return the CSS array
    selectors.forEach(function (selector) {
      attribute_css = attribute_css.concat(selector + css_string);
    });
    return attribute_css;
  } catch (error) {
    property_error_catch(property, prop_instance, error);
    return false;
  }
}

module.exports = {
  parse_transform,
};
