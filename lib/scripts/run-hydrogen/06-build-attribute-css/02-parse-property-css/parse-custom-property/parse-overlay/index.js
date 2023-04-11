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
const { process_generic_value } = require('../../process-configured-generic');
const { process_configured_color } = require('../../process-configured-color');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Processes custom overlay values.
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
 * @returns {string[]}
 */
function parse_overlay(settings, media_model, property_model, property, attribute, query) {
  try {
    if (query.values.length === 1 || query.values.length === 2) {
      let css = '';
      let css_array = [];
      let color = query.values[0];
      let color_css = '';
      let opacity = false;
      let opacity_css = '';
      if (query.values[1]) {
        opacity = query.values[1];
      }
      // Construct color CSS
      color_css = process_configured_color(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        color
      );
      color_css = process_generic_value(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        'gradient',
        'gradients',
        color_css
      );
      if (opacity) {
        css =
          '{background: ' +
          color_css +
          ';opacity: ' +
          opacity +
          ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat(selector + ':before' + css);
          css_array = css_array.concat(selector + '{position: relative;}');
          css_array = css_array.concat(selector + ' > * {position: relative;}');
        });
        return css_array;
      } else {
        css =
          '{background: ' +
          color_css +
          ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat(selector + ':before' + css);
          css_array = css_array.concat(selector + '{position: relative;}');
          css_array = css_array.concat(selector + ' > * {position: relative;}');
        });
        return css_array;
      }
    } else {
      throw new Error('Overlay accepts 1 or 2 values.');
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
  parse_overlay,
};
