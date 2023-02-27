// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('../../data/media-model-definition').MediaArray} MediaModel
 * @typedef {import('../../data/media-model-definition').MediaObject} Media
 */
/**
 * @typedef {import('../../data/property-model-definition').PropertyModel} PropertyModel
 * @typedef {import('../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../data/property-model-definition').Attribute} Attribute
 * @typedef {import('../../data/property-model-definition').Query} Query
 * @typedef {import('../../data/property-model-definition').Modifiers} Modifiers
 */

// Data imports

// Logging

// Functions
const { process_configured_values } = require('./process-configured-values');

// Vendor imports

// Scripts
/**
 *
 * @param {Settings} settings
 * @param {MediaModel} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {Attribute} attribute
 * @param {Query} query
 * @returns {string[] | false}
 */
function parse_standard_property(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  try {
    // Create an alias for the selectors
    let selectors = query.selectors;
    // Parse for standard Hydrogen values and account for custom values
    if (property === 'position' && query.values[0] === 'center') {
      let css =
        '{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}';
      // Assemble and return the CSS array
      let css_array = [];
      selectors.forEach((selector) => {
        css_array = css_array.concat(selector + css);
      });
      return css_array;
    } else {
      let result = process_configured_values(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query
      );
      // Check for aliases
      let alias = property;
      if (property === 'leading') {
        alias = 'line-height';
      } else if (property === 'bg-color') {
        alias = 'background';
      } else if (property === 'font-color') {
        alias = 'color';
      } else if (property === 'radius') {
        alias = 'border-radius';
      } else if (property === 'shadow') {
        alias = 'box-shadow';
      }
      // Create the CSS string
      let css = '{' + alias + ': ' + result + ';}';
      // Assemble and return the CSS array
      let css_array = [];
      selectors.forEach((selector) => {
        css_array = css_array.concat(selector + css);
      });
      return css_array;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Processing standard property',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_standard_property,
};
