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
const { process_generic_value } = require('./process-generic-value');
const { process_configured_color } = require('./process-configured-color');
const { process_configured_space } = require('./process-configured-space');

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
 * @param {string} value
 * @returns {Promise<string>}
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
