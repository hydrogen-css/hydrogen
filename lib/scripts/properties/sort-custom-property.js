// Hydrogen: Sort custom property
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
const { parse_container } = require('./custom/parse-container');
const { parse_flex_grid } = require('./custom/parse-flex-grid');
const { parse_flex_item } = require('./custom/parse-flex-item');
const { parse_font_size } = require('./custom/parse-font-size');
const { parse_layer } = require('./custom/parse-layer');
const { parse_location } = require('./custom/parse-location');
const { parse_overlay } = require('./custom/parse-overlay');

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
function sort_custom_property(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  return new Promise((resolve, reject) => {
    try {
      if (property === 'container') {
        parse_container(
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
      } else if (property === 'flex-grid') {
        parse_flex_grid(
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
      } else if (property === 'flex-item') {
        parse_flex_item(
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
      } else if (property === 'font-size') {
        parse_font_size(
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
      } else if (property === 'layer') {
        parse_layer(
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
      } else if (property === 'location') {
        parse_location(
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
      } else if (property === 'overlay') {
        parse_overlay(
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
    } catch (error) {
      if (typeof error === Error) {
        log_message({
          type: 'error',
          settings: settings,
          step: 'Processing custom property',
          attribute: attribute.attribute,
          query: query.query,
          files: attribute.files,
          error: error,
        });
      } else {
        log_message({
          type: 'warning',
          settings: settings,
          step: 'Processing custom property',
          attribute: attribute.attribute,
          query: query.query,
          files: attribute.files,
          message: error,
        });
      }
      reject();
    }
  });
}

module.exports = {
  sort_custom_property,
};
