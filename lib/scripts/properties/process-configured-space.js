// Hydrogen: Process configured space
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
function process_configured_space(
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
      if (property_model.properties.space.indexOf(property) !== -1) {
        let parsed_space = [];
        let processed_space = [];
        // Create the multiplier expression
        // To note about this expression: it also matches the "x" in "px", so we have to check that the expression also matched a number before adding it to the processing array below
        let space_regex = new RegExp('(-?)(x{1})([0-9]*)(\\.?)([0-9]*)', 'gm');
        // Find space matches
        let matches;
        while ((matches = space_regex.exec(value)) !== null) {
          if (matches.index === space_regex.lastIndex) {
            space_regex.lastIndex++;
          }
          let negative = false;
          if (matches[1]) {
            negative = matches[1];
          }
          let integer = false;
          if (matches[3]) {
            integer = matches[3];
          }
          let float = false;
          if (matches[5]) {
            float = matches[5];
          }
          if (integer == false && float == false) {
            // Do nothing
          } else {
            parsed_space.push({
              match: matches[0],
              groups: {
                negative: negative,
                integer: integer,
                float: float,
              },
            });
          }
        }
        // Process space matches
        parsed_space.forEach((parsed_space) => {
          let processed = false;
          let negative = '';
          if (parsed_space.groups.negative) {
            negative = '-';
          }
          let integer = '';
          if (parsed_space.groups.integer) {
            integer = parsed_space.groups.integer.toString();
          }
          let float = '';
          if (parsed_space.groups.float) {
            float = '.' + parsed_space.groups.float.toString();
          }
          let number = negative + integer + float;
          // Do the math
          processed =
            'calc((' + number + ' * var(--h2-base-whitespace)) * 1rem)';
          if (processed) {
            let processed_space_data = {
              match: parsed_space.match,
              processed: process_space_value(
                settings,
                query_data,
                parsed_space.groups
              ),
            };
            processed_space = processed_space.concat(processed_space_data);
          } else {
            reject();
          }
        });
        // Replace space matches with processed values
        processed_space.forEach((pair) => {
          value = value.replace(pair.match, pair.processed);
        });
        if (value) {
          resolve(value);
        } else {
          reject();
        }
      } else {
        resolve(value);
      }
    } catch (error) {
      if (typeof error === Error) {
        log_message({
          type: 'error',
          settings: settings,
          step: 'Processing configured space',
          attribute: attribute.attribute,
          query: query.query,
          files: attribute.files,
          error: error,
        });
      } else {
        log_message({
          type: 'warning',
          settings: settings,
          step: 'Processing configured space',
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
  process_configured_space,
};
