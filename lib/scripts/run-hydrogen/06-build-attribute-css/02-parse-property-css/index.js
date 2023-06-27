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
const { sort_custom_property } = require('./parse-custom-property');
const { parse_standard_property } = require('./parse-standard-property');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Parses an attribute and assembles CSS based on its output.
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
 * @returns {string[] | false}
 */
function parse_attribute_property(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  try {
    // Check for a matching theme
    if (settings.themes[query.modifiers.theme]) {
      if (property_model.properties.custom.includes(property)) {
        let custom_property = sort_custom_property(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query
        );
        return custom_property;
      } else {
        let standard_property = parse_standard_property(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query
        );
        return standard_property;
      }
    } else {
      throw new Error("This query is using a theme that isn't defined in the configuration.");
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing attribute property',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_attribute_property,
};
