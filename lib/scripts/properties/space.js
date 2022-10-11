// Hydrogen: Padding and margin property parsing
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
 * Parse data-h2-padding and data-h2-margin attributes and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_space(settings, property, prop_data, prop_instance, prop_value) {
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
      option1 = parse_whitespace_value(
        property,
        prop_data,
        prop_instance,
        prop_value,
        options[0]
      );
    }
    // Parse the second option if it exists
    let option2 = false;
    if (options.length >= 2) {
      option2 = options[1];
      option2 = parse_whitespace_value(
        property,
        prop_data,
        prop_instance,
        prop_value,
        options[1]
      );
    }
    // Parse the third option if it exists
    let option3 = false;
    if (options.length >= 3) {
      option3 = options[2];
      option3 = parse_whitespace_value(
        property,
        prop_data,
        prop_instance,
        prop_value,
        options[2]
      );
    }
    // Parse the fourth option if it exists
    let option4 = false;
    if (options.length >= 4) {
      option4 = options[3];
      option4 = parse_whitespace_value(
        property,
        prop_data,
        prop_instance,
        prop_value,
        options[3]
      );
    }
    // Check that a valid number of options were passed
    if (options.length === 1) {
      // Check option validity and build the CSS
      if (option1) {
        // Create the CSS string
        css_string = '{' + property + ': ' + option1 + ';}';
      } else {
        // Log a syntax error
        get_syntax_errors(prop_data, property, prop_instance, options, 0);
        return false;
      }
    } else if (options.length === 2) {
      // Check option validity and build the CSS
      if (option1 && option2) {
        // Create the CSS string
        // prettier-ignore
        css_string = '{' + 
          property + '-top: ' + option1 + ';' +
          property + '-bottom: ' + option1 + ';' +
          property + '-right: ' + option2 + ';' +
          property + '-left: ' + option2 + ';}';
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
    } else if (options.length === 4) {
      // Check option validity and build the CSS
      if (option1 && option2 && option3 && option4) {
        // Create the CSS string
        // prettier-ignore
        css_string = '{' + 
          property + '-top: ' + option1 + ';' +
          property + '-bottom: ' + option3 + ';' +
          property + '-right: ' + option2 + ';' +
          property + '-left: ' + option4 + ';}';
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
        if (!option4) {
          get_syntax_errors(prop_data, property, prop_instance, options, 3);
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
    });
    return attribute_css;
  } catch (error) {
    property_error_catch(property, prop_instance, error);
    return false;
  }
}

module.exports = {
  parse_space,
};
