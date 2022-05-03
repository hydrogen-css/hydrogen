// Hydrogen: Parse whitespace

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');

function parseWhitespace(argv, property, string) {
  try {
    // Get settings
    var settings = loadSettings(argv);
    // Get line height from settings
    var baseLineHeight = settings.baseLineHeight;
    // Set the return variable to the passed string so it can be manipulated if necessary
    var finalValue = string;
    // Parse for "x", numbers following it
    var numericValue = null;
    if (string.match(/^x/g) != null) {
      numericValue = string.match(/[\.0-9]+/g);
    }
    // Parse for "-x", numbers following it
    if (string.match(/^-x/g) != null) {
      if (property == 'margin') {
        numericValue = string.match(/[\.0-9]+/g);
        numericValue = numericValue * -1;
      } else {
        var negaError = '"data-h2-'.red + property[0].red + '"'.red + ' does not accept a negative multipler (' + string + ').';
        throw negaError;
      }
    }
    // Do the math
    if (numericValue != null) {
      finalValue = numericValue * baseLineHeight + 'rem';
    }
    // Check to see if the value is "none" or similar
    if (string == 'none') {
      finalValue = 0;
    }
    // Return a string
    return finalValue;
  } catch (err) {
    console.log(
      '⛔ [' + 'Hydrogen'.magenta + ']',
      err
    );
    return null;
  }
}

module.exports = {
  parseWhitespace
}