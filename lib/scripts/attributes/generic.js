// Hydrogen: Simple attribute parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');

// This script handles the following attributes:
//    - align-content
//    - align-items
//    - align-self
//    - display
//    - flex-direction
//    - flex-wrap
//    - font-style
//    - font-weight
//    - justify-content
//    - opacity
//    - order
//    - text-align
//    - text-decoration
//    - text-transform

/**
 * Parse simple Hydrogen attributes and return CSS
 * @param {array} argv Command line arguments, used to detect prod or dev environment
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseSimpleAttribute(argv, property, selector, values) {
  try {
    // Simple attributes only accept 1 value, so check for the array length
    if (values.length == 1) {
      // There was only one option passed
      var css = values[0];
      // Set up the css string
      var cssString = '{' + property[0] + ': ' + css + ';transition: 0.2s ease all;}';
      // Assemble the CSS array
      var attributeCSS = [selector + cssString];
      // Return the array
      return attributeCSS;
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
  parseSimpleAttribute,
};
