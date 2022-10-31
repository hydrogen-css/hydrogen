// Hydrogen: Basic property parsing
'use strict';

// Hydrogen data models
let Settings = require('../../data/settings-model-definition');
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
let Properties = require('../../data/property-model-definition');
/**
 * @typedef {import('../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../data/property-model-definition').Property} Property
 * @typedef {import('../../data/property-model-definition').Instance} Instance
 * @typedef {import('../../data/property-model-definition').Value} Value
 */

// Hydrogen data imports

// Hydrogen function imports
const { property_error_catch, get_syntax_errors } = require('./log-errors');
const { parse_whitespace_value } = require('../parse-whitespace');

// Vendor imports

// Script

/** @typedef {string[]} AttributeCSS */

/**
 * Parse simple Hydrogen properties and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {AttributeCSS | false} An array of strings containing CSS selectors and their values
 */
function parse_basic_property(
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
    // Basic properties only accept a single option, so parse the first option passed
    let option1 = false;
    if (prop_value.options.length >= 1) {
      if (
        property === 'height' ||
        property === 'line-height' ||
        property === 'leading' ||
        property === 'margin-top' ||
        property === 'margin-right' ||
        property === 'margin-bottom' ||
        property === 'margin-left' ||
        property === 'max-height' ||
        property === 'max-width' ||
        property === 'min-height' ||
        property === 'min-width' ||
        property === 'padding-top' ||
        property === 'padding-right' ||
        property === 'padding-bottom' ||
        property === 'padding-left' ||
        property === 'width'
      ) {
        let parsed_options = [];
        prop_value.options.forEach(function (option) {
          let parsed_option = parse_whitespace_value(
            settings,
            property,
            prop_data,
            prop_instance,
            prop_value,
            option
          );
          parsed_options = parsed_options.concat(parsed_option);
        });
        option1 = parsed_options.toString();
      } else {
        option1 = prop_value.options.toString();
      }
    }
    // Check option validity and build the CSS
    if (option1) {
      // Create the CSS string
      css_string = '{' + property + ': ' + option1 + ';}';
    } else {
      // Log a syntax error
      get_syntax_errors(
        settings,
        prop_data,
        property,
        prop_instance,
        prop_value.options,
        0
      );
      return false;
    }
    // Assemble and return the CSS array
    prop_value.selectors.forEach(function (selector) {
      if (property === 'display') {
        attribute_css = attribute_css.concat(
          '[data-h2-flex-grid]' + selector + ','
        );
      }
      attribute_css = attribute_css.concat(selector + css_string);
    });
    return attribute_css;
  } catch (error) {
    property_error_catch(settings, property, prop_instance, error);
    return false;
  }
}

module.exports = {
  parse_basic_property,
};
