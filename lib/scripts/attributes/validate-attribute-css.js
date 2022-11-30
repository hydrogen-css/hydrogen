// Hydrogen: Validate attribute CSS
'use strict';

// Hydrogen data models
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

// Hydrogen data imports

// Hydrogen function imports
const { log_message } = require('../logs/log-message');

// Vendor imports
const validator = require('csstree-validator');

// Scripts

/**
 *
 * @param {Settings} settings
 * @param {MediaModel} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {Attribute} attribute
 * @param {Query} query
 * @param {string[]} css
 * @returns {Promise}
 */
function validate_attribute_css(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query,
  css
) {
  return new Promise((resolve, reject) => {
    try {
      // Assemble the processed CSS into a single string
      let string = '';
      css.forEach((i) => {
        string = string + i;
      });
      // Run the validator
      let validation = validator.validateString(string, '');
      // Loop through and log any validation errors, then resolve or reject the validation
      for (const [filename, errors] of validation) {
        if (errors && errors.length != 0) {
          errors.forEach((error) => {
            log_message({
              type: 'error',
              settings: settings,
              error: error,
              step: 'Validating attribute CSS',
              attribute: attribute.attribute,
              query: query.query,
              css: string,
              files: attribute.files,
            });
          });
          reject();
        } else {
          resolve();
        }
      }
    } catch (error) {
      log_message({
        type: 'error',
        settings: settings,
        step: 'Validating attribute CSS',
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
  validate_attribute_css,
};
