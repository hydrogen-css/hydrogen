// Hydrogen: Overlay parsing
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
const { parse_color_value } = require('../../parse-color');
// Vendor imports
var colors = require('colors');

/**
 * @typedef {string[]} AttributeCSS
 */

/**
 * Parse data-h2-overlay and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_overlay(
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
    // Parse the second option if it exists
    let option2 = false;
    if (options.length >= 2) {
      option2 = options[1];
    }
    // Check that a valid number of options were passed
    if (options.length === 1) {
      // Check option validity and build the CSS
      if (option1) {
        // Create the CSS string
        if (option1.type === 'solid') {
          // prettier-ignore
          css_string = '{background-color: ' + option1.color + ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        } else if (option1.type === 'gradient') {
          // prettier-ignore
          css_string = '{background: ' + option1.fallback + ';background: ' + option1.color + ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
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
    } else if (options.length === 2) {
      // Check option validity and build the CSS
      if (option1 && option2) {
        // Build the CSS string
        if (option1.type == 'solid') {
          // prettier-ignore
          css_string = '{background-color: ' + option1.color + ';opacity: ' + option2 + ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        } else if (option1.type == 'gradient') {
          // prettier-ignore
          css_string = '{background: ' + option1.fallback + ';background: ' + option1.color + ';opacity: ' + option2 + ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        }
      } else {
        // Log a syntax error
        if (!option1) {
          get_syntax_errors(
            settings,
            prop_data,
            property,
            prop_instance,
            options,
            0
          );
        }
        if (!option2) {
          get_syntax_errors(
            settings,
            prop_data,
            property,
            prop_instance,
            options,
            1
          );
        }
        return false;
      }
    } else {
      // An invalid number of options was passed
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
      attribute_css = attribute_css.concat(selector + ':before' + css_string);
      attribute_css = attribute_css.concat(selector + '{position: relative;}');
      attribute_css = attribute_css.concat(
        selector + ' > * {position: relative;}'
      );
    });
    return attribute_css;
  } catch (error) {
    property_error_catch(settings, property, prop_instance, error);
    return false;
  }
}

module.exports = {
  parse_overlay,
};
