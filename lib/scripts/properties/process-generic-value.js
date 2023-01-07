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
 * @param {string} model
 * @param {string} target
 * @param {string} value
 * @returns {string}
 */
function process_generic_value(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query,
  model,
  target,
  value
) {
  try {
    if (property_model.properties[model].indexOf(property) !== -1) {
      let parsed_values = [];
      let processed_values = [];
      // Loop through the settings to grab keys for building the regex
      Object.keys(settings.variables[target]).forEach((key) => {
        // Create the regexp
        let regexp = new RegExp(
          '((?<![a-zA-Z0-9])' + key + '(?![a-zA-Z0-9]))',
          'gm'
        );
        // Find the matches
        let matches;
        while ((matches = regexp.exec(value)) !== null) {
          if (matches.index === regexp.lastIndex) {
            regexp.lastIndex++;
          }
          parsed_values.push({
            key: key,
            match: matches[0],
          });
        }
      });
      // Process the matches
      parsed_values.forEach((parsed_value) => {
        let processed_data;
        if (query.modifiers.mode === 'all') {
          processed_data = {
            match: parsed_value.match,
            processed: settings.variables[target][parsed_value.key].all,
          };
        } else {
          processed_data = {
            match: parsed_value.match,
            processed: settings.variables[target][parsed_value.key].default,
          };
        }
        if (processed_data.processed) {
          processed_values = processed_values.concat(processed_data);
        } else {
          throw new Error('Processed data was missing.');
        }
      });
      // Replace color matches with processed values
      processed_values.forEach((pair) => {
        value = value.replace(pair.match, pair.processed);
      });
      if (value) {
        return value;
      } else {
        throw new Error("A value couldn't be parsed.");
      }
    } else {
      return value;
    }
  } catch (error) {
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Processing generic values',
        error: error,
      };
    }
  }
}

module.exports = {
  process_generic_value,
};
