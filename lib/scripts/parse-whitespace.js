// Hydrogen: Parse whitespace
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { log_info } = require('./logs');

/**
 * Parse a space value and return a usable CSS unit
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} string the space value to be parsed
 * @returns
 */
function parse_whitespace_value(instance, property, string) {
  try {
    // Set the return variable to the passed string so it can be manipulated if necessary
    var final_value = string;
    // Parse for "x", numbers following it
    var numeric_value = null;
    if (string.match(/^x/g) != null) {
      numeric_value = string.match(/[\.0-9]+/g);
    }
    // Parse for "-x", numbers following it
    if (string.match(/^-x/g) != null) {
      if (
        property == 'margin' ||
        property == 'offset' ||
        property == 'location' ||
        property == 'transform'
      ) {
        numeric_value = string.match(/[\.0-9]+/g);
        numeric_value = numeric_value * -1;
      } else {
        log_info(
          'error',
          'Whitespace syntax',
          'Parsing whitespace values',
          instance.attribute,
          null,
          null,
          instance.files,
          'The ' +
            property +
            " property doesn't accept negative multipliers as whitespace values."
        );
        return null;
      }
    }
    // Do the math
    if (numeric_value != null) {
      final_value =
        'calc((' + numeric_value + ' * var(--h2-base-whitespace)) * 1rem)';
    }
    // Check to see if the value is "none" or similar
    if (string == 'none' || string == 0 || string == '0') {
      final_value = '0px';
    }
    // Return a string
    return final_value;
  } catch (error) {
    // Catch any errors ========================================================
    log_info(
      'error',
      'Unknown error',
      'Parsing whitespace values',
      instance.attribute,
      null,
      null,
      instance.files,
      error
    );
    return null;
  }
}

module.exports = {
  parse_whitespace_value,
};
