// Hydrogen: Parse whitespace

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2_error } = require('./logs');

function parseWhitespace(property, string) {
  try {
    // Set the return variable to the passed string so it can be manipulated if necessary
    var finalValue = string;
    // Parse for "x", numbers following it
    var numericValue = null;
    if (string.match(/^x/g) != null) {
      numericValue = string.match(/[\.0-9]+/g);
    }
    // Parse for "-x", numbers following it
    if (string.match(/^-x/g) != null) {
      if (
        property == 'margin' ||
        property == 'offset' ||
        property == 'location'
      ) {
        numericValue = string.match(/[\.0-9]+/g);
        numericValue = numericValue * -1;
      } else {
        var negaError =
          '"data-h2-'.red +
          property[0].red +
          '"'.red +
          ' does not accept a negative multipler (' +
          string +
          ').';
        throw negaError;
      }
    }
    // Do the math
    if (numericValue != null) {
      finalValue =
        'calc((' + numericValue + ' * var(--h2-base-whitespace)) * 1rem)';
    }
    // Check to see if the value is "none" or similar
    if (string == 'none' || string == 0) {
      finalValue = '0px';
    }
    // Return a string
    return finalValue;
  } catch (error) {
    h2_error(error);
    return null;
  }
}

module.exports = {
  parseWhitespace,
};
