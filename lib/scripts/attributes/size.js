// Hydrogen: Height and width parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');
var { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-height or data-h2-width and return CSS
 * @param {array} argv Command line arguments, used to detect prod or dev environment
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseSize(argv, property, selector, values) {
  try {
    // Height and width accept 1 option, so check for the array length
    if (values.length == 1) {
      // There was only 1 option passed, so parse the size to check for multipliers
      var size = parseWhitespace(argv, property, values[0]);
      // Check to make sure the unit was parsed as something viable
      if (size == null) {
        // The size unit was invalid, so log and throw an error
        var errorMessage = '"'.red + values[0].red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
        h2Error(errorMessage);
        throw 'Error';
      } else {
        // It was something viable, assemble the CSS
        var cssString = '{' + property[0] + ': ' + size + ';transition: 0.2s ease all;}';
        // Assemble the CSS array
        var sizeCSS = [selector + cssString];
        // Return the array
        return sizeCSS;
      }
    } else {
      // There were multiple options passed, so log and throw an error
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " only accepts 1 value, and you've specified " + values.length + '.';
      h2Error(errorMessage);
      throw 'Error';
    }
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseSize,
};
