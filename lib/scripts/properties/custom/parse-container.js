// Hydrogen: Parse container
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
const { process_configured_space } = require('../process-configured-space');

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
function parse_container(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  return new Promise((resolve, reject) => {
    try {
      if (query.values.length === 2 || query.values.length === 3) {
        let css = '';
        let css_array = [];
        let alignment = query.values[0];
        let alignment_css = '';
        let width = query.values[1];
        let width_css = '';
        let padding = false;
        let padding_css = '';
        if (query.values[2]) {
          padding = query.values[2];
        }
        // Construct alignment CSS
        if (alignment === 'center' || alignment === 'middle') {
          alignment_css = 'margin-right: auto;margin-left: auto;';
        } else if (alignment === 'left') {
          alignment_css = 'margin-right: auto;margin-left: 0;';
        } else if (alignment === 'right') {
          alignment_css = 'margin-right: 0;margin-left: auto;';
        } else {
          throw new Error(
            'The first option passed to container must be "center", "left", or "right".'
          );
        }
        // Construct width CSS
        process_generic_value(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query,
          'container',
          'containers',
          width
        )
          .then((result) => {
            let value = result;
            process_configured_space(
              settings,
              media_model,
              property_model,
              property,
              attribute,
              query,
              value
            )
              .then((result) => {
                width_css = result;
                // Construct padding CSS if applicable
                if (padding) {
                  process_configured_space()
                    .then((result) => {
                      padding_css = result;
                      let modified_width_css = '';
                      if (
                        width_css === 'none' ||
                        width_css === 'initial' ||
                        width_css === 'inherit'
                      ) {
                        modified_width_css = width_css;
                      } else {
                        modified_width_css =
                          'calc(' + width_css + ' + (' + padding_css + ' * 2))';
                      }
                      // Build the CSS string
                      // prettier-ignore
                      css = '{' + alignment_css + 'max-width:' + modified_width_css + ';padding-right:' + padding_css + ';padding-left:' + padding_css + ';width: 100%;}';
                      // Assemble and return the CSS array
                      query.selectors.forEach((selector) => {
                        css_array = css_array.concat(selector + css);
                      });
                      resolve(css_array);
                    })
                    .catch((error) => {
                      reject();
                    });
                } else {
                  // prettier-ignore
                  css = '{' + alignment_css + 'max-width: ' + width_css + ';width: 100%;}';
                  // Assemble and return the CSS array
                  query.selectors.forEach((selector) => {
                    css_array = css_array.concat(selector + css);
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
        throw new Error('Container accepts 2 or 3 values.');
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
  parse_container,
};
