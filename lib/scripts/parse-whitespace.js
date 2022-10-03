// Hydrogen: Parse whitespace
'use strict';

// Hydrogen type imports
let Properties = require('../data/property-model-definition');
/**
 * @typedef {import('../data/property-model-definition').PropertyKeyInstances} Instance
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('./logs/log-message');
// Vendor imports
var colors = require('colors');

/**
 * Parse a space value and return a usable CSS unit
 * @param {Instance} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} string the space value to be parsed
 * @returns {string | false} The calculated space value
 */
function parse_whitespace_value(instance, property, string) {
  try {
    // Set the return variable to the passed string so it can be manipulated if necessary
    let final_value = string;
    // Parse for "x", numbers following it
    let numeric_value = null;
    if (string.match(/^x/g) != null) {
      numeric_value = string.match(/[\.0-9]+/g);
    }
    // Parse for "-x", numbers following it
    if (string.match(/^-x/g) != null) {
      if (
        property == 'margin' ||
        property == 'margin-top' ||
        property == 'margin-right' ||
        property == 'margin-bottom' ||
        property == 'margin-left' ||
        property == 'offset' ||
        property == 'location' ||
        property == 'transform'
      ) {
        numeric_value = string.match(/[\.0-9]+/g);
        numeric_value = numeric_value * -1;
      } else {
        log_message({
          type: 'error',
          step: 'Parsing whitespace multipliers',
          attribute: instance.attribute,
          files: instance.files,
          message:
            'The ' +
            property +
            " property doesn't accept negative multipliers as whitespace values.",
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
    if (string == 'none' || string == 0 || string == '0') {
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
      attribute: instance.attribute,
      files: instance.files,
      message: error,
    });
    return false;
  }
}

module.exports = {
  parse_whitespace_value,
};
