// Hydrogen: Parse location
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
 * @typedef {import('../../../data/property-model-definition').PropertyModel} PropertyModel
 * @typedef {import('../../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../../data/property-model-definition').Attribute} Attribute
 * @typedef {import('../../../data/property-model-definition').Query} Query
 * @typedef {import('../../../data/property-model-definition').Modifiers} Modifiers
 */

// Hydrogen data imports

// Hydrogen function imports
const { log_message } = require('../../logs/log-message');
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
function parse_location(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  return new Promise((resolve, reject) => {
    try {
      if (
        query.values.length === 1 ||
        query.values.length === 2 ||
        query.values.length === 4
      ) {
        let css = '';
        let css_array = [];
        let option1 = query.values[0];
        let option1_css = '';
        let option2 = false;
        let option2_css = '';
        if (query.values[1]) {
          option2 = query.values[1];
        }
        let option3 = false;
        let option3_css = '';
        if (query.values[1]) {
          option3 = query.values[2];
        }
        let option4 = false;
        let option4_css = '';
        if (query.values[1]) {
          option4 = query.values[3];
        }
        // Parse the first option
        process_configured_space(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query,
          option1
        )
          .then((result) => {
            option1_css = result;
            if (option2) {
              process_configured_space(
                settings,
                media_model,
                property_model,
                property,
                attribute,
                query,
                option2
              )
                .then((result) => {
                  option2_css = result;
                  if (option3) {
                    process_configured_space(
                      settings,
                      media_model,
                      property_model,
                      property,
                      attribute,
                      query,
                      option3
                    )
                      .then((result) => {
                        option3_css = result;
                        process_configured_space(
                          settings,
                          media_model,
                          property_model,
                          property,
                          attribute,
                          query,
                          option4
                        )
                          .then((result) => {
                            option4_css = result;
                            // prettier-ignore
                            css = '{top: ' + option1_css + ';right: ' + option2_css + ';bottom: ' + option3_css + ';left: ' + option4_css + ';}';
                            // Assemble and return the CSS array
                            query.selectors.forEach((selector) => {
                              css_array = css_array.concat(selector + css);
                            });
                            resolve(css_array);
                          })
                          .catch((error) => {
                            reject();
                          });
                      })
                      .catch((error) => {
                        reject();
                      });
                  } else {
                    // prettier-ignore
                    css = '{top: ' + option1_css + ';right: ' + option2_css + ';bottom: ' + option1_css + ';left: ' + option2_css + ';}';
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
            } else {
              // prettier-ignore
              css = '{top: ' + option1_css + ';right: ' + option1_css + ';bottom: ' + option1_css + ';left: ' + option1_css + ';}';
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
      } else {
        throw new Error('Location accepts 1, 2, or 4 values.');
      }
    } catch (error) {
      if (typeof error === Error) {
        log_message({
          type: 'error',
          settings: settings,
          step: 'Processing ' + property,
          attribute: attribute.attribute,
          query: query.query,
          files: attribute.files,
          error: error,
        });
      } else {
        log_message({
          type: 'warning',
          settings: settings,
          step: 'Processing ' + property,
          attribute: attribute.attribute,
          query: query.query,
          files: attribute.files,
          message: error,
        });
      }
      reject();
    }
  });
}

module.exports = {
  parse_location,
};
