// Hydrogen: Shadow parsing
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
 * Parse data-h2-shadow and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_shadow(
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
    // Shadows are a unique property because they accept one or more shadow definitions that need to be concatenated into a single string and passed to the final CSS output
    let option1 = false;
    let option1_string = '';
    if (options.length >= 1) {
      options.forEach(function (option, index) {
        option1 = option;
        if (
          settings.runtime.themes[theme].shadows &&
          settings.runtime.themes[theme].shadows.length > 0
        ) {
          settings.runtime.themes[theme].shadows.forEach(function (
            shadow_setting
          ) {
            if (shadow_setting.key === option1) {
              option1 = 'var(' + '--h2-shadow-' + shadow_setting.key + ')';
            }
          });
        }
        if (index === options.length - 1) {
          option1_string = option1_string + option1;
        } else {
          option1_string = option1_string + option1 + ',';
        }
      });
      // Now that the loop is complete, check to see if the option is still null, if it's not, write CSS
      if (option1_string.length > 0) {
        // Build the CSS string
        css_string = '{box-shadow: ' + option1_string + ';}';
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
  parse_shadow,
};
