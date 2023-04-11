// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../../../../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../../../../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../../../../../data/css-property-data').ParsedAttributes} ParsedAttributes
 * @typedef {import('../../../../../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../../../../../data/css-property-data').ParsedQuery} ParsedQuery
 */

// Data imports

// Local functions
const { process_generic_value } = require('../../../process-configured-generic');
const { process_configured_color } = require('../../../process-configured-color');
const { process_configured_space } = require('../../../process-configured-space');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Processes common values that are frequently needed, including color, gradients, and space.
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
 * @param {string} value
 * @returns {string}
 */
function process_common_values(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query,
  value
) {
  try {
    let configured_color = process_configured_color(
      settings,
      media_model,
      property_model,
      property,
      attribute,
      query,
      value
    );
    let gradient_generic_value = process_generic_value(
      settings,
      media_model,
      property_model,
      property,
      attribute,
      query,
      'gradient',
      'gradients',
      configured_color
    );
    let configured_space = process_configured_space(
      settings,
      media_model,
      property_model,
      property,
      attribute,
      query,
      gradient_generic_value
    );
    return configured_space;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Processing common values',
        error: error,
      };
    }
  }
}

module.exports = {
  process_common_values,
};
