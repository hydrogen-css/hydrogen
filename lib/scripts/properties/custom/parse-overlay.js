// Hydrogen: Parse overlay
'use strict';

// Hydrogen data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('../../../data/media-model-definition').MediaArray} MediaModel
 * @typedef {import('../../../data/media-model-definition').MediaObject} Media
 */
/**
 * @typedef {import('../../../data/property-model-new-definition').PropertyModel} PropertyModel
 * @typedef {import('../../../data/property-model-new-definition').Properties} Properties
 * @typedef {import('../../../data/property-model-new-definition').Attribute} Attribute
 * @typedef {import('../../../data/property-model-new-definition').Query} Query
 * @typedef {import('../../../data/property-model-new-definition').Modifiers} Modifiers
 */

// Hydrogen data imports

// Hydrogen function imports
const { log_message } = require('../../logs/log-message');
const { process_generic_value } = require('../process-generic-value');
const { process_configured_color } = require('../process-configured-color');

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
function parse_overlay(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  return new Promise((resolve, reject) => {
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
        process_configured_color(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query,
          color
        )
          .then((result) => {
            let value = result;
            process_generic_value(
              settings,
              media_model,
              property_model,
              property,
              attribute,
              query,
              'gradients',
              'gradient',
              value
            )
              .then((result) => {
                color_css = result;
                // Construct padding CSS if applicable
                if (opacity) {
                  // prettier-ignore
                  css = '{background: ' + color_css + ';opacity: ' + opacity + ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
                  // Assemble and return the CSS array
                  query.selectors.forEach((selector) => {
                    css_array = css_array.concat(selector + ':before' + css);
                    css_array = css_array.concat(
                      selector + '{position: relative;}'
                    );
                    css_array = css_array.concat(
                      selector + ' > * {position: relative;}'
                    );
                  });
                  resolve(css_array);
                } else {
                  // prettier-ignore
                  css = '{background: ' + color_css + ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
                  // Assemble and return the CSS array
                  query.selectors.forEach((selector) => {
                    css_array = css_array.concat(selector + ':before' + css);
                    css_array = css_array.concat(
                      selector + '{position: relative;}'
                    );
                    css_array = css_array.concat(
                      selector + ' > * {position: relative;}'
                    );
                  });
                  resolve(css_array);
                }
              })
              .catch((error) => {
                reject();
              });
          })
          .catch((error) => {
            reject();
          });
      } else {
        throw new Error('Overlay accepts 1 or 2 values.');
      }
    } catch (error) {
      log_message({
        type: 'error',
        settings: settings,
        step: 'Processing ' + property,
        attribute: attribute.attribute,
        query: query.query,
        files: attribute.files,
        error: error,
      });
      reject();
    }
  });
}

module.exports = {
  parse_overlay,
};
