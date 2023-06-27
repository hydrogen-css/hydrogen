// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../../data/css-property-data').ParsedAttributes} ParsedAttributes
 * @typedef {import('../../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../../data/css-property-data').ParsedQuery} ParsedQuery
 */

// Data imports

// Local functions

// Helper functions
const { log_message } = require('../../../console-logging/log-message');

// Vendor imports
const validator = require('csstree-validator');

// Script ==========================================================================================

/**
 * Validates individual attribute CSS to ensure the Hydrogen output is usable.
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
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
            config: settings,
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
