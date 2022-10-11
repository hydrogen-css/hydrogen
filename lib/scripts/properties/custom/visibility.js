// Hydrogen: Visibility parsing
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
 * Parse data-h2-visibility and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_visibility(
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
    // Create an alias for the theme
    let theme = prop_value.modifiers.theme;
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
        // Create the CSS string
        if (option1 === 'invisible') {
          // prettier-ignore
          css_string = '{height: 1px;overflow: hidden;position: absolute;top: 0;left: -100vw;width: 1px;}';
        } else if (option1 === 'hidden') {
          // prettier-ignore
          css_string = '{display: none;visibility: hidden;}';
        } else if (option1 === 'visible') {
          // prettier-ignore
          css_string = '{display: block;height: auto;overflow: visible;position: static;top: auto;left: auto;width: auto;visibility: visible;}';
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
    // As a shortcut property, visibility should take precedence over other utilities that it applies. This includes display, height, offset, overflow, position, and width.
    selectors.forEach(function (selector) {
      attribute_css = attribute_css.concat(
        '[data-h2-display]' + selector + ','
      );
      attribute_css = attribute_css.concat('[data-h2-height]' + selector + ',');
      attribute_css = attribute_css.concat('[data-h2-offset]' + selector + ',');
      attribute_css = attribute_css.concat(
        '[data-h2-overflow]' + selector + ','
      );
      attribute_css = attribute_css.concat(
        '[data-h2-position]' + selector + ','
      );
      attribute_css = attribute_css.concat('[data-h2-width]' + selector + ',');
      attribute_css = attribute_css.concat(selector + css_string);
    });
    return attribute_css;
  } catch (error) {
    property_error_catch(property, prop_instance, error);
    return false;
  }
}

module.exports = {
  parse_visibility,
};
