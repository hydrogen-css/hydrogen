// Hydrogen: Process common values
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
  return new Promise((resolve, reject) => {
    try {
      process_configured_color(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        value
      )
        .then((result) => {
          let value = result;
          process_generic_value(
            settings,
            media_model,
            property_model,
            property,
            attribute,
            query,
            'gradient',
            'gradients',
            value
          )
            .then((result) => {
              let value = result;
              process_configured_space(
                settings,
                media_model,
                property_model,
                property,
                attribute,
                query,
                value
              )
                .then((result) => {
                  resolve(result);
                })
                .catch((error) => {
                  reject();
                });
            })
            .catch((error) => {
              reject();
            });
        })
        .catch((error) => {
          reject();
        });
    } catch (error) {
      if (typeof error === Error) {
        log_message({
          type: 'error',
          settings: settings,
          step: 'Processing common values',
          attribute: attribute.attribute,
          query: query.query,
          files: attribute.files,
          error: error,
        });
      } else {
        log_message({
          type: 'warning',
          settings: settings,
          step: 'Processing common values',
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
  process_common_values,
};
