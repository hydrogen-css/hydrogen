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
const { log_message } = require('../logging/log-message');

// Functions

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
 * @returns {boolean}
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
        return false;
      } else {
        return true;
      }
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Validating attribute CSS',
        error: error,
      };
    }
  }
}

module.exports = {
  validate_attribute_css,
};
