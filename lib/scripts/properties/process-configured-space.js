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
const { multiplier_match } = require('../helpers/create-regex');

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
 * @returns {string}
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
  try {
    if (property_model.properties.space.indexOf(property) !== -1) {
      let parsed_space = [];
      let processed_space = [];
      // Create the multiplier expression
      let space_regex = multiplier_match();
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
        processed = 'calc((' + number + ' * var(--h2-base-whitespace)) * 1rem)';
        if (processed) {
          let processed_space_data = {
            match: parsed_space.match,
            processed: processed,
          };
          processed_space = processed_space.concat(processed_space_data);
        } else {
          throw new Error(
            "The number was invalid and couldn't be added to a calc function."
          );
        }
      });
      // Replace space matches with processed values
      processed_space.forEach((pair) => {
        value = value.replace(pair.match, pair.processed);
      });
      if (value) {
        if (value === 0 || value === '0') {
          value = '0px';
        }
        return value;
      } else {
        throw new Error("A value couldn't be processed.");
      }
    } else {
      return value;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Processing configured space',
        error: error,
      };
    }
  }
}

module.exports = {
  process_configured_space,
};
