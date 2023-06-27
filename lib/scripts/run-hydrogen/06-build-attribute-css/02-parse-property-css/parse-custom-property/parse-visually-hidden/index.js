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
 * Processes custom visually-hidden values.
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
 * @returns {string[]}
 */
function parse_visually_hidden(settings, media_model, property_model, property, attribute, query) {
  try {
    if (query.values.length === 1) {
      let css = '';
      let css_array = [];
      let vis = query.values[0];
      let vis_css = '';
      if (vis === 'invisible') {
        css = '{height: 1px;overflow: hidden;position: absolute;top: 0;left: -100vw;width: 1px;}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat('[data-h2-display]' + selector + ',');
          css_array = css_array.concat('[data-h2-height]' + selector + ',');
          css_array = css_array.concat('[data-h2-offset]' + selector + ',');
          css_array = css_array.concat('[data-h2-overflow]' + selector + ',');
          css_array = css_array.concat('[data-h2-position]' + selector + ',');
          css_array = css_array.concat('[data-h2-width]' + selector + ',');
          css_array = css_array.concat(selector + css);
        });
        return css_array;
      } else if (vis === 'hidden') {
        css = '{display: none;visibility: hidden;}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat('[data-h2-display]' + selector + ',');
          css_array = css_array.concat('[data-h2-height]' + selector + ',');
          css_array = css_array.concat('[data-h2-offset]' + selector + ',');
          css_array = css_array.concat('[data-h2-overflow]' + selector + ',');
          css_array = css_array.concat('[data-h2-position]' + selector + ',');
          css_array = css_array.concat('[data-h2-width]' + selector + ',');
          css_array = css_array.concat(selector + css);
        });
        return css_array;
      } else if (vis === 'visible') {
        css =
          '{display: block;height: auto;overflow: visible;position: static;top: auto;left: auto;width: auto;visibility: visible;}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat('[data-h2-display]' + selector + ',');
          css_array = css_array.concat('[data-h2-height]' + selector + ',');
          css_array = css_array.concat('[data-h2-offset]' + selector + ',');
          css_array = css_array.concat('[data-h2-overflow]' + selector + ',');
          css_array = css_array.concat('[data-h2-position]' + selector + ',');
          css_array = css_array.concat('[data-h2-width]' + selector + ',');
          css_array = css_array.concat(selector + css);
        });
        return css_array;
      }
    } else {
      throw new Error('Visually-hidden only accepts 1 value.');
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
  parse_visually_hidden,
};
