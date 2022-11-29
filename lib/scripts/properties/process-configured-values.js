// Hydrogen: Process configured values
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
 * @returns {Promise<string>}
 */
function process_configured_values(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  return new Promise((resolve, reject) => {
    try {
      if (property_model.properties['font-family'].includes(property)) {
        process_generic_value(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query,
          'font-family',
          'fonts',
          query.values[0]
        )
          .then((result) => {
            let value = result;
            process_common_values(
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
      } else if (property_model.properties.radii.includes(property)) {
        process_generic_value(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query,
          'radius',
          'radii',
          query.values[0]
        )
          .then((result) => {
            let value = result;
            process_common_values(
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
      } else if (property_model.properties.shadow.includes(property)) {
        process_generic_value(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query,
          'shadow',
          'shadows',
          query.values[0]
        )
          .then((result) => {
            let value = result;
            process_common_values(
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
      } else if (property_model.properties.transition.includes(property)) {
        process_generic_value(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query,
          'transition',
          'transition_durations',
          query.values[0]
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
              'transition',
              'transition_functions',
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
                  'transition',
                  'transition_delays',
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
      } else {
        process_common_values()
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
          step: 'Processing configured values',
          attribute: attribute.attribute,
          query: query.query,
          files: attribute.files,
          error: error,
        });
      } else {
        log_message({
          type: 'warning',
          settings: settings,
          step: 'Processing configured values',
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
  process_configured_values,
};
