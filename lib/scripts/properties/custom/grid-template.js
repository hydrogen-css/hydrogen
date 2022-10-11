// Hydrogen: Grid template column and row parsing
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
 * Parse data-h2-grid-templates-columns and data-h2-grid-template-rows attributes and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_grid_template(
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
    let option1 = false;
    if (options.length >= 1) {
      option1 = options[0];
    }
    // Check that a valid number of options were passed
    if (options.length === 1) {
      // Check option validity and build the CSS
      if (option1) {
        let individual_template_items = [];
        // Break the value into individual items so that we can check for multipliers and replace them with the correct value
        if (option1.indexOf(' ') > -1) {
          individual_template_items = option1.split(/ +/);
          for (const new_template of individual_template_items) {
            new_template.trim();
          }
        } else {
          individual_template_items = individual_template_items.concat(option1);
        }
        // Loop through the options and check for multipliers
        for (const [i, el] of individual_template_items.entries()) {
          let parsed_item = parse_whitespace_value(
            property,
            prop_data,
            prop_instance,
            prop_value,
            el
          );
          individual_template_items[i] = parsed_item;
        }
        let final_template = individual_template_items.join(' ');
        // Build the final CSS string
        css_string = '{' + property + ': ' + final_template + ';}';
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
  parse_grid_template,
};
