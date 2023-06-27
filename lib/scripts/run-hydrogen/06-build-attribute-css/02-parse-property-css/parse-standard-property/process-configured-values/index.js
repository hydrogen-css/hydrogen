// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../../../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../../../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../../../../data/css-property-data').ParsedAttributes} ParsedAttributes
 * @typedef {import('../../../../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../../../../data/css-property-data').ParsedQuery} ParsedQuery
 */

// Data imports

// Local functions
const { process_generic_value } = require('../../process-configured-generic');
const { process_common_values } = require('./process-common-values');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Parses configured options found in the attribute by referring to the options in the config file.
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
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
