// Hydrogen: Parse attribute property
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
 * @returns {Promise<string[]>}
 */
function parse_attribute_property(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  return new Promise((resolve, reject) => {
    try {
      // Check for a matching theme
      if (settings.themes[query.modifiers.theme]) {
        if (property_model.properties.custom.includes(property)) {
          sort_custom_property(
            settings,
            media_model,
            property_model,
            property,
            attribute,
            query
          )
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject();
            });
        } else {
          parse_standard_property(
            settings,
            media_model,
            property_model,
            property,
            attribute,
            query
          )
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject();
            });
        }
      } else {
        throw new Error(
          "This query is using a theme that isn't defined in the configuration."
        );
      }
    } catch (error) {
      log_message({
        type: 'error',
        settings: settings,
        step: 'Processing attribute property',
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
  parse_attribute_property,
};
