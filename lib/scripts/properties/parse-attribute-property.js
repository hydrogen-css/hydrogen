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

// Function
const { sort_custom_property } = require('../properties/sort-custom-property');
const {
  parse_standard_property,
} = require('../properties/parse-standard-property');

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
      throw new Error(
        "This query is using a theme that isn't defined in the configuration."
      );
    }
  } catch (error) {
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
