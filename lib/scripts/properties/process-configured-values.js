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
const { process_common_values } = require('./process-common-values');

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
 * @returns {string | false}
 */
function process_configured_values(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  try {
    if (property_model.properties['font-family'].includes(property)) {
      let generic_value = process_generic_value(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        'font-family',
        'fonts',
        query.values[0]
      );
      let common_values = process_common_values(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        generic_value
      );
      return common_values;
    } else if (property_model.properties.radius.includes(property)) {
      let generic_value = process_generic_value(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        'radius',
        'radii',
        query.values[0]
      );
      let common_values = process_common_values(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        generic_value
      );
      return common_values;
    } else if (property_model.properties.shadow.includes(property)) {
      let generic_value = process_generic_value(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        'shadow',
        'shadows',
        query.values[0]
      );
      let common_values = process_common_values(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        generic_value
      );
      return common_values;
    } else if (property_model.properties.transition.includes(property)) {
      let transition_generic_value = process_generic_value(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        'transition',
        'transition_durations',
        query.values[0]
      );
      let function_generic_value = process_generic_value(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        'transition',
        'transition_functions',
        transition_generic_value
      );
      let delay_generic_value = process_generic_value(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        'transition',
        'transition_delays',
        function_generic_value
      );
      return delay_generic_value;
    } else {
      let common_values = process_common_values(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        query.values[0]
      );
      return common_values;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Processing configured values',
        error: error,
      };
    }
  }
}

module.exports = {
  process_configured_values,
};
