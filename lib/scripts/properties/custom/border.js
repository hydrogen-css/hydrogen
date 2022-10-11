// Hydrogen: Border parsing
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
const { parse_whitespace_value } = require('../../parse-whitespace');
// Vendor imports
var colors = require('colors');

/**
 * @typedef {string[]} AttributeCSS
 */

/**
 * Parse data-h2-border and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_border(
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
      if (options.length === 1) {
        if (option1 != 'none') {
          option1 = false;
        }
      } else if (options.length === 2 || options.length === 4) {
        if (
          option1 != 'all' &&
          option1 != 'top-bottom' &&
          option1 != 'right-left' &&
          option1 != 'top' &&
          option1 != 'right' &&
          option1 != 'bottom' &&
          option1 != 'left'
        ) {
          option1 = false;
        }
      }
    }
    // Parse the second option if it exists
    let option2 = false;
    if (options.length >= 2) {
      option2 = options[1];
      if (options.length === 4) {
        option2 = parse_whitespace_value(
          property,
          prop_data,
          prop_instance,
          prop_value,
          options[1]
        );
      }
    }
    // Parse the third option if it exists
    let option3 = false;
    if (options.length >= 3) {
      option3 = options[2];
    }
    // Parse the fourth option if it exists
    let option4 = false;
    if (options.length >= 4) {
      option4 = parse_color_value(
        settings,
        property,
        prop_data,
        prop_instance,
        prop_value,
        options[3]
      );
      if (option4 && option4.type === 'gradient') {
        get_syntax_errors(prop_data, property, prop_instance, options, 3);
        return false;
      }
    }
    // Assemble side selectors
    let side_selectors = [
      {
        key: 'all',
        selectors: [],
      },
      {
        key: 'top-bottom',
        selectors: ['none', 'all'],
      },
      {
        key: 'right-left',
        selectors: ['none', 'all'],
      },
      {
        key: 'top',
        selectors: ['none', 'all', 'top-bottom'],
      },
      {
        key: 'right',
        selectors: ['none', 'all', 'right-left'],
      },
      {
        key: 'bottom',
        selectors: ['none', 'all', 'top-bottom'],
      },
      {
        key: 'left',
        selectors: ['none', 'all', 'right-left'],
      },
    ];
    // Check that a valid number of options were passed
    if (options.length === 1) {
      // Check option validity and build the CSS
      if (option1) {
        // The border should be removed from all 4 sides
        css_string = '{border: ' + option1 + ';}';
        // Assemble the CSS array
        selectors.forEach(function (single_selector) {
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else {
        // Log a syntax error
        get_syntax_errors(prop_data, property, prop_instance, options, 0);
        return false;
      }
    } else if (options.length === 2) {
      // Check option validity and build the CSS
      if (option1 && option2) {
        if (option1 === 'all') {
          css_string = '{border: ' + option2 + ';}';
        } else if (option1 === 'top-bottom') {
          // prettier-ignore
          css_string = '{border-top: ' + option2 + ';border-bottom: ' + option2 + ';}';
        } else if (option1 === 'right-left') {
          // prettier-ignore
          css_string = '{border-left: ' + option2 + ';border-right: ' + option2 + ';}';
        } else {
          css_string = '{border-' + option1 + ': ' + option2 + ';}';
        }
        side_selectors.forEach(function (s) {
          if (s.key === option1) {
            selectors.forEach(function (selector) {
              s.selectors.forEach(function (t) {
                attribute_css = attribute_css.concat(
                  // prettier-ignore
                  '[data-h2-border*="' + prop_value.prefix + '(' + t + '"]' + selector + ','
                );
              });
              attribute_css = attribute_css.concat(selector + css_string);
            });
          }
        });
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
        if (option1 === 'all') {
          // prettier-ignore
          css_string = '{border: ' + option2 + ' ' + option3 + ' ' + option4.color + ';}';
        } else if (option1 === 'top-bottom') {
          // Build the CSS string
          // prettier-ignore
          css_string =
            '{border-top: ' + option2 + ' ' + option3 + ' ' + option4.color +
            ';border-bottom: ' + option2 + ' ' + option3 + ' ' + option4.color + ';}';
        } else if (option1 === 'right-left') {
          // Build the CSS string
          // prettier-ignore
          css_string =
            '{border-right: ' + option2 + ' ' + option3 + ' ' + option4.color +
            ';border-left: ' + option2 + ' ' + option3 + ' ' + option4.color + ';}';
        } else {
          // Build the CSS string
          // prettier-ignore
          css_string = '{border-' + option1 + ': ' + option2 + ' ' + option3 + ' ' + option4.color + ';}';
        }
        side_selectors.forEach(function (s) {
          if (s.key === option1) {
            selectors.forEach(function (selector) {
              s.selectors.forEach(function (t) {
                attribute_css = attribute_css.concat(
                  // prettier-ignore
                  '[data-h2-border*="' + prop_value.prefix + '(' + t + '"]' + selector + ','
                );
              });
              attribute_css = attribute_css.concat(selector + css_string);
            });
          }
        });
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
      // An invalid number of options was passed
      get_option_count_errors(prop_data, property, prop_instance, options);
      return false;
    }
    // Return the array
    return attribute_css;
  } catch (error) {
    property_error_catch(property, prop_instance, error);
    return false;
  }
}

module.exports = {
  parse_border,
};
