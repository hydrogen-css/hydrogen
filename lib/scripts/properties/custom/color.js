// Hydrogen: Color parsing
'use strict';

// Hydrogen data models
let Settings = require('../../../data/settings-model-definition');
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 */
let Properties = require('../../../data/property-model-definition');
/**
 * @typedef {import('../../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../../data/property-model-definition').Property} Property
 * @typedef {import('../../../data/property-model-definition').Instance} Instance
 * @typedef {import('../../../data/property-model-definition').Value} Value
 */

// Hydrogen data imports

// Hydrogen function imports
const {
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
} = require('../log-errors');
const { parse_color_value } = require('../../parse-color');

// Vendor imports

// Scripts

/** @typedef {string[]} AttributeCSS */

/**
 * Parse data-h2-color and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_text_color(
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
      option1 = parse_color_value(
        settings,
        property,
        prop_data,
        prop_instance,
        prop_value,
        options[0]
      );
    }
    // Check that a valid number of options were passed
    if (options.length === 1) {
      // Check option validity and build the CSS
      if (option1) {
        // Create the CSS string
        if (option1.type === 'solid') {
          css_string = '{color: ' + option1.color + ';}';
        } else if (option1.type === 'gradient') {
          // prettier-ignore
          css_string = '{color: ' + option1.fallback + ';background-image: ' + option1.color + ';background-clip: text;-webkit-text-fill-color: transparent;}';
        }
      } else {
        // Log a syntax error
        get_syntax_errors(
          settings,
          prop_data,
          property,
          prop_instance,
          options,
          0
        );
        return false;
      }
    } else {
      // Log that an invalid number of options was passed
      get_option_count_errors(
        settings,
        prop_data,
        property,
        prop_instance,
        options
      );
      return false;
    }
    // Assemble and return the CSS array
    selectors.forEach(function (selector) {
      attribute_css = attribute_css.concat(selector + css_string);
    });
    return attribute_css;
  } catch (error) {
    property_error_catch(settings, property, prop_instance, error);
    return false;
  }
}

module.exports = {
  parse_text_color,
};
