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
 * @returns {string[]}
 */
function parse_visually_hidden(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  try {
    if (query.values.length === 1) {
      let css = '';
      let css_array = [];
      let vis = query.values[0];
      let vis_css = '';
      if (vis === 'invisible') {
        // prettier-ignore
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
        // prettier-ignore
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
        // prettier-ignore
        css = '{display: block;height: auto;overflow: visible;position: static;top: auto;left: auto;width: auto;visibility: visible;}';
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
