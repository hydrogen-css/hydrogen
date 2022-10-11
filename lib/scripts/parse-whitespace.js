// Hydrogen: Parse whitespace
'use strict';

// Hydrogen type imports
let Properties = require('../data/property-model-definition');
/**
 * @typedef {import('../data/property-model-definition').Properties} Properties
 * @typedef {import('../data/property-model-definition').Property} Property
 * @typedef {import('../data/property-model-definition').PropertyKeyInstances} Instance
 * @typedef {import('../data/property-model-definition').PropertyKeyInstanceValues} Value
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('./logs/log-message');
// Vendor imports
var colors = require('colors');

/**
 * Parse a space value and return a usable CSS unit
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @param {string} input The input to be parsed
 * @returns {string | false} The calculated space value
 */
function parse_whitespace_value(
  property,
  prop_data,
  prop_instance,
  prop_value,
  input
) {
  try {
    // Set the return variable to the passed string so it can be manipulated if necessary
    let final_value = input;
    // Parse for "x", numbers following it
    let numeric_value = null;
    if (input.match(/^x/g) != null) {
      numeric_value = input.match(/[\.0-9]+/g);
    }
    // Parse for "-x", numbers following it
    if (input.match(/^-x/g) != null) {
      if (
        property === 'margin' ||
        property === 'margin-top' ||
        property === 'margin-right' ||
        property === 'margin-bottom' ||
        property === 'margin-left' ||
        property === 'offset' ||
        property === 'location' ||
        property === 'transform'
      ) {
        numeric_value = input.match(/[\.0-9]+/g);
        numeric_value = numeric_value * -1;
      } else {
        log_message({
          type: 'error',
          step: 'Parsing whitespace multipliers',
          attribute: prop_instance.attribute,
          query: prop_value.query,
          files: prop_instance.files,
          // prettier-ignore
          message: 'The ' + property + " property doesn't accept negative multipliers as whitespace values.",
        });
        return false;
      }
    }
    // Do the math
    if (numeric_value != null) {
      final_value =
        'calc((' + numeric_value + ' * var(--h2-base-whitespace)) * 1rem)';
    }
    // Check to see if the value is "none" or similar
    if (input === 'none' || input === 0 || input === '0') {
      if (property != 'max-height' && property != 'max-width') {
        final_value = '0px';
      }
    }
    // Return a string
    return final_value;
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Parsing whitespace multipliers',
      attribute: prop_instance.attribute,
      query: prop_value.query,
      files: prop_instance.files,
      message: error,
    });
    return false;
  }
}

module.exports = {
  parse_whitespace_value,
};
