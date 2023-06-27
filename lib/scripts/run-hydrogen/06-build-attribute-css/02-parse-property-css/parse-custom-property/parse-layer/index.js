// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../../../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../../../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../../../../data/css-property-data').ParsedAttributes} ParsedAttributes
 * @typedef {import('../../../../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../../../../data/css-property-data').ParsedQuery} ParsedQuery
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Processes custom layer (z-index and position) values.
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
 * @returns {string[]}
 */
function parse_layer(settings, media_model, property_model, property, attribute, query) {
  try {
    if (query.values.length === 1 || query.values.length === 2) {
      let css = '';
      let css_array = [];
      let zindex = query.values[0];
      let zindex_css = '';
      let position = false;
      let position_css = '';
      if (query.values[1]) {
        position = query.values[1];
      }
      // Assemble the CSS
      if (position) {
        css = '{position: ' + position + ';z-index: ' + zindex + ';}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat('[data-h2-position]' + selector + ',');
          css_array = css_array.concat(selector + css);
        });
        return css_array;
      } else {
        css = '{z-index: ' + zindex + ';}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat('[data-h2-position]' + selector + ',');
          css_array = css_array.concat(selector + css);
        });
        return css_array;
      }
    } else {
      throw new Error('Layer accepts 1 or 2 values.');
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Processing ' + property,
        error: error,
      };
    }
  }
}

module.exports = {
  parse_layer,
};
