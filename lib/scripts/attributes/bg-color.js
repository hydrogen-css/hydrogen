// Hydrogen: Background color parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2_error } = require('../logs');
var { parseColor } = require('../parse-color');

/**
 * Parse data-h2-bg-color and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseBackgroundColor(property, selector, values) {
  try {
    // Background color only accepts 1 value, so check for the array length
    if (values.length == 1) {
      // There was only one option passed, so parse the color to check for congifured keys
      var bgColor = parseColor(property, values[0]);
      // Check to see if the parsed color is valid
      if (bgColor == null) {
        // The color was invalid, so log and throw an error
        throw 'Error';
      } else {
        // The color was accepted, so assemble the CSS string
        var cssString;
        // Check to see if the color is solid or a gradient
        if (bgColor.type == 'solid') {
          cssString = '{background-color: ' + bgColor.color + ';}';
        } else if (bgColor.type == 'gradient') {
          cssString =
            '{background-color: ' +
            bgColor.fallback +
            ';background-image: ' +
            bgColor.color +
            ';}';
        }
        // Assemble the CSS array
        var bgColorCSS = [selector + cssString];
        // Return the array
        return bgColorCSS;
      }
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
  } catch (error) {
    return null;
  }
}

module.exports = {
  parseBackgroundColor,
};
