// Hydrogen: Radius parsing
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
 * Parse data-h2-radius and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_radius(
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
      // Set a check so that the value isn't unnecessarily parsed as whitespace
      let token_check = false;
      // Assemble the option
      if (
        settings.themes[theme].radii &&
        settings.themes[theme].radii.length > 0
      ) {
        settings.themes[theme].radii.forEach(function (radius_setting) {
          if (radius_setting.key === option1) {
            token_check = true;
            if (prop_value.modifiers.mode === 'all') {
              option1 =
                'var(' + '--h2-radius-' + radius_setting.key + '-locked)';
            } else {
              option1 = 'var(' + '--h2-radius-' + radius_setting.key + ')';
            }
          }
        });
      }
      // If the value didn't match a token, parse it as whitespace
      if (!token_check) {
        option1 = parse_whitespace_value(
          settings,
          property,
          prop_data,
          prop_instance,
          prop_value,
          option1
        );
      }
    }
    // Parse the second option if it exists
    let option2 = false;
    if (options.length >= 2) {
      option2 = options[1];
      // Set a check so that the value isn't unnecessarily parsed as whitespace
      let token_check = false;
      // Assemble the option
      if (
        settings.themes[theme].radii &&
        settings.themes[theme].radii.length > 0
      ) {
        settings.themes[theme].radii.forEach(function (radius_setting) {
          if (radius_setting.key === option2) {
            token_check = true;
            if (prop_value.modifiers.mode === 'all') {
              option2 =
                'var(' + '--h2-radius-' + radius_setting.key + '-locked)';
            } else {
              option2 = 'var(' + '--h2-radius-' + radius_setting.key + ')';
            }
          }
        });
      }
      // If the value didn't match a token, parse it as whitespace
      if (!token_check) {
        option2 = parse_whitespace_value(
          settings,
          property,
          prop_data,
          prop_instance,
          prop_value,
          option2
        );
      }
    }
    // Parse the third option if it exists
    let option3 = false;
    if (options.length >= 3) {
      option3 = options[2];
      // Set a check so that the value isn't unnecessarily parsed as whitespace
      let token_check = false;
      // Assemble the option
      if (
        settings.themes[theme].radii &&
        settings.themes[theme].radii.length > 0
      ) {
        settings.themes[theme].radii.forEach(function (radius_setting) {
          if (radius_setting.key === option3) {
            token_check = true;
            if (prop_value.modifiers.mode === 'all') {
              option3 =
                'var(' + '--h2-radius-' + radius_setting.key + '-locked)';
            } else {
              option3 = 'var(' + '--h2-radius-' + radius_setting.key + ')';
            }
          }
        });
      }
      // If the value didn't match a token, parse it as whitespace
      if (!token_check) {
        option3 = parse_whitespace_value(
          settings,
          property,
          prop_data,
          prop_instance,
          prop_value,
          option3
        );
      }
    }
    // Parse the fourth option if it exists
    let option4 = false;
    if (options.length >= 4) {
      option4 = options[3];
      // Set a check so that the value isn't unnecessarily parsed as whitespace
      let token_check = false;
      // Assemble the option
      if (
        settings.themes[theme].radii &&
        settings.themes[theme].radii.length > 0
      ) {
        settings.themes[theme].radii.forEach(function (radius_setting) {
          if (radius_setting.key === option4) {
            token_check = true;
            if (prop_value.modifiers.mode === 'all') {
              option4 =
                'var(' + '--h2-radius-' + radius_setting.key + '-locked)';
            } else {
              option4 = 'var(' + '--h2-radius-' + radius_setting.key + ')';
            }
          }
        });
      }
      // If the value didn't match a token, parse it as whitespace
      if (!token_check) {
        option4 = parse_whitespace_value(
          settings,
          property,
          prop_data,
          prop_instance,
          prop_value,
          option4
        );
      }
    }
    // Check that a valid number of options were passed
    if (options.length === 1) {
      // Check option validity and build the CSS
      if (option1) {
        // Create the CSS string
        css_string = '{border-radius: ' + option1 + ';}';
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
        // prettier-ignore
        css_string = '{border-top-left-radius: ' + option1 +
          ';border-bottom-right-radius: ' + option1 +
          ';border-top-right-radius: ' + option2 +
          ';border-bottom-left-radius: ' + option2 + ';}';
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
    } else if (options.length === 3) {
      // Check option validity and build the CSS
      if (option1 && option2 && option3) {
        // Build the CSS string
        // prettier-ignore
        css_string = '{border-top-left-radius: ' + option1 +
          ';border-top-right-radius: ' + option2 +
          ';border-bottom-right-radius: ' + option3 +
          ';border-bottom-left-radius: ' + option2 + ';}';
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
        if (!option3) {
          get_syntax_errors(
            settings,
            prop_data,
            property,
            prop_instance,
            options,
            2
          );
        }
        return false;
      }
    } else if (options.length === 4) {
      // Check option validity and build the CSS
      if (option1 && option2 && option3 && option4) {
        // Build the CSS string
        // prettier-ignore
        css_string = '{border-top-left-radius: ' + option1 +
          ';border-top-right-radius: ' + option2 +
          ';border-bottom-right-radius: ' + option3 +
          ';border-bottom-left-radius: ' + option4 + ';}';
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
        if (!option3) {
          get_syntax_errors(
            settings,
            prop_data,
            property,
            prop_instance,
            options,
            2
          );
        }
        if (!option4) {
          get_syntax_errors(
            settings,
            prop_data,
            property,
            prop_instance,
            options,
            3
          );
        }
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
  parse_radius,
};
