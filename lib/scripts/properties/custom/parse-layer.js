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
 * @returns {Promise<string[]>}
 */
function parse_layer(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
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
        // prettier-ignore
        css = '{position: ' + position + ';z-index: ' + zindex + ';}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat('[data-h2-position]' + selector + ',');
          css_array = css_array.concat(selector + css);
        });
        return css_array;
      } else {
        // prettier-ignore
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
