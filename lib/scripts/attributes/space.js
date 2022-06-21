// Hydrogen: Padding and margin attribute parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');
var { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-padding and data-h2-margin attributes and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseSpace(property, selector, values) {
  try {
    // Simple attributes only accept 1 value, so check for the array length
    var value1 = parseWhitespace(property, values[0]);
    if (values.length == 1) {
      // Check to make sure the unit was parsed as something viable
      if (value1 == null) {
        // The unit was invalid, so log and throw an error
        var errorMessage = '"'.red + values[0].red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
        h2Error(errorMessage);
        throw 'Error';
      } else {
        // It was something viable, assemble the CSS
        var cssString = '{' + property[0] + ': ' + value1 + ';}';
        // Assemble the CSS array
        var attributeCSS = [selector + cssString];
        // Return the array
        return attributeCSS;
      }
    } else if (values.length == 2) {
      var value2 = parseWhitespace(property, values[1]);
      // Check to make sure the unit was parsed as something viable
      if (value1 == null || value2 == null) {
        // At least one of the units was invalid, so log and throw an error
        var errorMessage = '"'.red + value1 + ', ' + value2 + '"'.red + ' contain an invalid option for ' + property[0].underline + '.';
        h2Error(errorMessage);
        throw 'Error';
      } else {
        // It was something viable, assemble the CSS
        var cssString = '{' + property[0] + '-top: ' + value1 + ';' + property[0] + '-bottom: ' + value1 + ';' + property[0] + '-right: ' + value2 + ';' + property[0] + '-left: ' + value2 + ';}';
        // Assemble the CSS array
        var attributeCSS = [selector + cssString];
        // Return the array
        return attributeCSS;
      }
    } else if (values.length == 4) {
      var value2 = parseWhitespace(property, values[1]);
      var value3 = parseWhitespace(property, values[2]);
      var value4 = parseWhitespace(property, values[3]);
      // Check to make sure the unit was parsed as something viable
      if (value1 == null || value2 == null || value3 == null || value4 == null) {
        // At least one of the units was invalid, so log and throw an error
        var errorMessage = '"'.red + value1 + ', ' + value2 + ', ' + value3 + ', ' + value4 + '"'.red + ' contain an invalid option for ' + property[0].underline + '.';
        h2Error(errorMessage);
        throw 'Error';
      } else {
        // It was something viable, assemble the CSS
        var cssString = '{' + property[0] + '-top: ' + value1 + ';' + property[0] + '-bottom: ' + value3 + ';' + property[0] + '-right: ' + value2 + ';' + property[0] + '-left: ' + value4 + ';}';
        // Assemble the CSS array
        var attributeCSS = [selector + cssString];
        // Return the array
        return attributeCSS;
      }
    } else {
      // There were multiple options passed, so log and throw an error
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " only accepts 1, 2, or 4 values, and you've specified " + values.length + '.';
      h2Error(errorMessage);
      throw 'Error';
    }
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseSpace,
};
