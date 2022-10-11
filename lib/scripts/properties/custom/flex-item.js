// Hydrogen: Flex item parsing
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
// Vendor imports
var colors = require('colors');

/**
 * @typedef {string[]} AttributeCSS
 */

/**
 * Parse data-h2-flex-item and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_flex_item(
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
        // Check to see if the value is a reserved key first
        if (option1 === 'auto') {
          css_string = '{flex: auto;max-width: 100%;min-width: 0;}';
        } else if (option1 === 'content' || option1 === 'initial') {
          css_string = '{flex: initial;max-width: 100%;min-width: 0;}';
        } else if (option1 === 'fill' || option1 === '1') {
          css_string = '{flex: 1;max-width: 100%;min-width: 0;}';
        } else if (option1.includes('of') === true) {
          // Since the value wasn't a key, it might be an XofY
          let x_column = option1.match(/^[0-9]+/g);
          let y_column = option1.match(/(?<=of)[0-9]+/g);
          if (x_column && y_column) {
            // prettier-ignore
            css_string = '{flex: 0 0 calc((' + x_column + ' / ' + y_column + ' * 100%) - var(--h2-column-gap));min-width: 0;}';
          } else {
            get_syntax_errors(prop_data, property, prop_instance, options, 0);
            return false;
          }
        } else if (option1.includes('/') === true) {
          // Since the value wasn't an XofY, check for the fraction syntax
          let numerator = option1.match(/^[0-9]+/g);
          let denominator = option1.match(/(?<=\/)[0-9]+/g);
          if (numerator && denominator) {
            // prettier-ignore
            css_string = '{flex: 0 0 calc((' + numerator + ' / ' + denominator + ' * 100%) - var(--h2-column-gap));min-width: 0;}';
          } else {
            get_syntax_errors(prop_data, property, prop_instance, options, 0);
            return false;
          }
        } else {
          get_syntax_errors(prop_data, property, prop_instance, options, 0);
          return false;
        }
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
  parse_flex_item,
};
