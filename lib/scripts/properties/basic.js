// Hydrogen: Basic property parsing
'use strict';

// Hydrogen type imports
let Settings = require('../../data/settings-model-definition');
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
let Properties = require('../../data/property-model-definition');
/**
 * @typedef {import('../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../data/property-model-definition').Property} Property
 * @typedef {import('../../data/property-model-definition').PropertyKeyInstances} Instance
 * @typedef {import('../../data/property-model-definition').PropertyKeyInstanceValues} Value
 */
// Hydrogen data imports
// Hydrogen function imports
const {
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
} = require('./log-errors');
const { parse_whitespace_value } = require('../parse-whitespace');
// Vendor imports
var colors = require('colors');

/**
 * @typedef {string[]} AttributeCSS
 */

/**
 * Parse simple Hydrogen properties and return CSS
 * @param {Settings} settings The user's settings
 * @param {"base" | "size"} type The type of property - used to determined if whitespace should be parsed
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_basic_property(
  settings,
  type,
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
    // Basic properties only accept a single option, so parse the first option passed
    let option1 = false;
    if (prop_value.options.length >= 1) {
      if (type === 'basic') {
        option1 = prop_value.options[0];
      } else if (type === 'size') {
        option1 = prop_value.options[0];
        option1 = parse_whitespace_value(
          property,
          prop_data,
          prop_instance,
          prop_value,
          prop_value.options[0]
        );
      }
    }
    // Check that a valid number of options were passed
    if (prop_value.options.length === 1) {
      // Check option validity and build the CSS
      if (option1) {
        // Create the CSS string
        css_string = '{' + property + ': ' + option1 + ';}';
      } else {
        // Log a syntax error
        get_syntax_errors(
          prop_data,
          property,
          prop_instance,
          prop_value.options,
          0
        );
        return false;
      }
    } else {
      // Log that an invalid number of options was passed
      get_option_count_errors(
        prop_data,
        property,
        prop_instance,
        prop_value.options
      );
      return false;
    }
    // Assemble and return the CSS array
    prop_value.selectors.forEach(function (selector) {
      if (property === 'display') {
        attribute_css = attribute_css.concat(
          '[data-h2-flex-grid]' + selector + ','
        );
      }
      attribute_css = attribute_css.concat(selector + css_string);
    });
    return attribute_css;
  } catch (error) {
    property_error_catch(property, prop_instance, error);
    return false;
  }
}

module.exports = {
  parse_basic_property,
};
