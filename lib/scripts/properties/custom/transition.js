// Hydrogen: Transition parsing
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
 * Parse data-h2-transition and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_transition(
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
    // Parse the second option if it exists
    let option2 = false;
    if (options.length >= 2) {
      option2 = options[1];
      if (
        settings.runtime.themes[theme].transitions &&
        Object.keys(settings.runtime.themes[theme].transitions).length > 0 &&
        settings.runtime.themes[theme].transitions.durations &&
        settings.runtime.themes[theme].transitions.durations.length > 0
      ) {
        settings.runtime.themes[theme].transitions.durations.forEach(function (
          duration_setting
        ) {
          if (option2 === duration_setting.key) {
            option2 = duration_setting.duration;
          }
        });
      }
    }
    // Parse the third option if it exists
    let option3 = false;
    if (options.length >= 3) {
      option3 = options[2];
      if (
        settings.runtime.themes[theme].transitions &&
        Object.keys(settings.runtime.themes[theme].transitions).length > 0 &&
        settings.runtime.themes[theme].transitions.functions &&
        settings.runtime.themes[theme].transitions.functions.length > 0
      ) {
        settings.runtime.themes[theme].transitions.functions.forEach(function (
          function_setting
        ) {
          if (option3 == function_setting.key) {
            option3 = function_setting.function;
          }
        });
      }
    }
    // Parse the fourth option if it exists
    let option4 = false;
    if (options.length >= 4) {
      option4 = options[3];
      if (
        settings.runtime.themes[theme].transitions &&
        Object.keys(settings.runtime.themes[theme].transitions).length > 0 &&
        settings.runtime.themes[theme].transitions.delays &&
        settings.runtime.themes[theme].transitions.delays.length > 0
      ) {
        settings.runtime.themes[theme].transitions.delays.forEach(function (
          delay_setting
        ) {
          if (option4 == delay_setting.key) {
            option4 = delay_setting.delay;
          }
        });
      }
    }
    // Check that a valid number of options were passed
    if (options.length === 2) {
      // Check option validity and build the CSS
      if (option1 && option2) {
        // Build the CSS string
        // prettier-ignore
        css_string = '{transition: ' + option1 + ' ' + option2 + ';}';
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
        // Build the CSS string
        // prettier-ignore
        css_string = '{transition: ' + option1 + ' ' + option2 + ' ' + option3 + ';}';
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
    } else if (options.length === 4) {
      // Check option validity and build the CSS
      if (option1 && option2 && option3 && option4) {
        // Build the CSS string
        // prettier-ignore
        css_string = '{transition: ' + option1 + ' ' + option2 + ' ' + option3 + ' ' + option4 + ';}';
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
    console.log(error);
    return false;
  }
}

module.exports = {
  parse_transition,
};
