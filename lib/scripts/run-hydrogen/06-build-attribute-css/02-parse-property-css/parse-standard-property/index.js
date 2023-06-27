// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../../../data/css-property-data').ParsedAttributes} ParsedAttributes
 * @typedef {import('../../../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../../../data/css-property-data').ParsedQuery} ParsedQuery
 */

// Data imports

// Local functions
const { process_configured_values } = require('./process-configured-values');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Parses a standard CSS property (as opposed to a custom Hydrogen property).
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
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
      let css = '{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}';
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
