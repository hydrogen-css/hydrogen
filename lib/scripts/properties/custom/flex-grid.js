// Hydrogen: Flex grid parsing
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
 * Parse data-h2-flex-grid and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_flex_grid(
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
    let option1;
    if (options.length >= 1) {
      option1 = options[0];
      if (option1 === 'top') {
        option1 = 'flex-start';
      } else if (option1 === 'middle') {
        option1 = 'center';
      } else if (option1 === 'bottom') {
        option1 = 'flex-end';
      }
    }
    // Parse the second option if it exists
    let option2;
    if (options.length >= 2) {
      option2 = parse_whitespace_value(
        property,
        prop_data,
        prop_instance,
        prop_value,
        options[1]
      );
    }
    // Parse the third option if it exists
    let option3;
    if (options.length >= 3) {
      option3 = parse_whitespace_value(
        property,
        prop_data,
        prop_instance,
        prop_value,
        options[2]
      );
    }
    // Check that a valid number of options were passed
    if (options.length === 2) {
      // Check option validity and build the CSS
      if (option1 && option2) {
        // Create the CSS string
        // prettier-ignore
        css_string = '{align-items: ' + option1 + ';display: flex;flex-wrap: wrap;--h2-column-gap: ' + option2 + ';--h2-row-gap: ' + option2 + ';margin: calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap));' + 'width:calc(100% + var(--h2-column-gap));}';
      } else {
        // Log a syntax error
        if (!option1) {
          get_syntax_errors(prop_data, property, prop_instance, options, 0);
        }
        if (!option2) {
          get_syntax_errors(prop_data, property, prop_instance, options, 1);
        }
        return false;
      }
    } else if (options.length === 3) {
      // Check option validity and build the CSS
      if (option1 && option2 && option3) {
        // Create the CSS string
        // prettier-ignore
        css_string = '{align-items: ' + option1 + ';display: flex;flex-wrap: wrap;--h2-column-gap: ' + option2 + ';--h2-row-gap: ' + option3 + ';margin: calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap))' + ';width:calc(100% + var(--h2-column-gap));}';
      } else {
        // Log a syntax error
        if (!option1) {
          get_syntax_errors(prop_data, property, prop_instance, options, 0);
        }
        if (!option2) {
          get_syntax_errors(prop_data, property, prop_instance, options, 1);
        }
        if (!option3) {
          get_syntax_errors(prop_data, property, prop_instance, options, 2);
        }
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
      attribute_css = attribute_css.concat(
        // prettier-ignore
        selector + ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}'
      );
      attribute_css = attribute_css.concat(
        selector + '{pointer-events: none;}'
      );
      attribute_css = attribute_css.concat(
        selector + ' > * {pointer-events: auto;}'
      );
    });
    return attribute_css;
  } catch (error) {
    property_error_catch(property, prop_instance, error);
    return false;
  }
}

module.exports = {
  parse_flex_grid,
};
