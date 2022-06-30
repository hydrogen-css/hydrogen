// Hydrogen: Visibility parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2_error } = require('../logs');

/**
 * Parse data-h2-visibility and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseVisibility(property, selector, values) {
  try {
    // Visibility only accept 1 value, so check for the array length
    if (values.length == 1) {
      // There was only one option passed
      var visibility = values[0];
      // Set up the string variable
      var cssString;
      // Check for key values and set the CSS
      if (visibility == 'invisible') {
        cssString =
          '{height: 1px;overflow: hidden;position: absolute;top: 0;left: -100vw;width: 1px;}';
      } else if (visibility == 'hidden') {
        cssString = '{display: none;visibility: hidden;}';
      } else if (visibility == 'visible') {
        cssString =
          '{display: block;height: auto;overflow: auto;position: static;top: auto;left: auto;width: auto;visibility: visible;}';
      } else {
        // They specified an invalid option, so log and throw an error
        var errorMessage =
          '"'.red +
          visibility.red +
          '"'.red +
          ' is an invalid option for ' +
          property[0].underline +
          '. Please use visible, hidden, or invisible.';
        h2_error(errorMessage);
        throw 'Error';
      }
      // Assemble the CSS array
      var attributeCSS = [selector + cssString];
      // Return the array
      return attributeCSS;
    } else {
      // There were multiple options passed, so log and throw an error
      var errorMessage =
        '"data-h2-'.red +
        property[0].red +
        '"'.red +
        " only accepts 1 value, and you've specified " +
        values.length +
        '.';
      h2_error(errorMessage);
      throw 'Error';
    }
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseVisibility,
};
