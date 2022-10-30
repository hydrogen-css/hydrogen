// Hydrogen: Font size parsing
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
 * Parse data-h2-font-size and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_font_size(
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
    let font_size_unit = '';
    if (options.length >= 1) {
      option1 = options[0];
    }
    // Parse the second option if it exists
    let option2 = false;
    if (options.length >= 2) {
      option2 = options[1];
    }
    // Check option validity and build the CSS
    // Font size has a second optional option that allows the user to override the default line height - apply the calculated one only if option2 is false
    if (option1) {
      if (option1 === 'display') {
        font_size_unit = 'var(--h2-font-size-display)';
        if (option2 === false) {
          option2 = 'var(--h2-line-height-display)';
        }
      } else if (option1 === 'h1') {
        font_size_unit = 'var(--h2-font-size-h1)';
        if (option2 === false) {
          option2 = 'var(--h2-line-height-h1)';
        }
      } else if (option1 === 'h2') {
        font_size_unit = 'var(--h2-font-size-h2)';
        if (option2 === false) {
          option2 = 'var(--h2-line-height-h2)';
        }
      } else if (option1 === 'h3') {
        font_size_unit = 'var(--h2-font-size-h3)';
        if (option2 === false) {
          option2 = 'var(--h2-line-height-h3)';
        }
      } else if (option1 === 'h4') {
        font_size_unit = 'var(--h2-font-size-h4)';
        if (option2 === false) {
          option2 = 'var(--h2-line-height-h4)';
        }
      } else if (option1 === 'h5') {
        font_size_unit = 'var(--h2-font-size-h5)';
        if (option2 === false) {
          option2 = 'var(--h2-line-height-h5)';
        }
      } else if (option1 === 'h6') {
        font_size_unit = 'var(--h2-font-size-h6)';
        if (option2 === false) {
          option2 = 'var(--h2-line-height-h6)';
        }
      } else if (
        option1 === 'base' ||
        option1 === 'paragraph' ||
        option1 === 'normal' ||
        option1 === 'copy'
      ) {
        font_size_unit = 'var(--h2-font-size-copy)';
        if (option2 === false) {
          option2 = 'var(--h2-line-height-copy)';
        }
      } else if (option1 === 'label' || option1 === 'caption') {
        font_size_unit = 'var(--h2-font-size-caption)';
        if (option2 === false) {
          option2 = 'var(--h2-line-height-caption)';
        }
      } else {
        // CSS units were used for font size
        font_size_unit = option1;
        if (option2 === false) {
          option2 = 'var(--h2-line-height-copy)';
        }
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
    // Check that a valid number of options were passed
    if (options.length === 1) {
      // Check option validity and build the CSS
      if (option1) {
        // Create the CSS string
        // prettier-ignore
        css_string = '{font-size: ' + font_size_unit + ';line-height: ' + option2 + ';}';
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
        css_string = '{font-size: ' + font_size_unit + ';line-height: ' + option2 + ';}';
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
      attribute_css = attribute_css.concat(
        '[data-h2-line-height]' + selector + ',',
        '[data-h2-leading]' + selector + ','
      );
      attribute_css = attribute_css.concat(selector + css_string);
    });
    return attribute_css;
  } catch (error) {
    property_error_catch(settings, property, prop_instance, error);
    return false;
  }
}

module.exports = {
  parse_font_size,
};
