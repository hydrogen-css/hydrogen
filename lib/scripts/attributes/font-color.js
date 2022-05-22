// Hydrogen: Font color parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');
var { parseColor } = require('../parse-color');

/**
 * Parse data-h2-font-color and return CSS
 * @param {array} argv Command line arguments, used to detect prod or dev environment
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseFontColor(argv, property, selector, values) {
  try {
    // Set up the main variables
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] Color
    var fontColor;
    var fontColorErr;
    if (values.length >= 1) {
      fontColor = parseColor(argv, property, values[0]);
      fontColorErr = '"'.red + fontColor.red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Check the array length for valid options
    if (values.length == 1) {
      if (fontColor == null) {
        h2Error(fontColorErr);
        throw 'Error';
      } else {
        if (fontColor.type == 'solid') {
          cssString = '{color: ' + fontColor.color + ';transition: 0.2s ease all;}';
        } else if (fontColor.type == 'gradient') {
          cssString = '{background-image: ' + fontColor.color + ';background-clip: text;color: rgba(0, 0, 0, 0);transition: 0.2s ease all;}';
        }
      }
    } else {
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " only accepts 1 value, and you've specified " + values.length + '.';
      h2Error(errorMessage);
      throw 'Error';
    }
    // Assemble the CSS array
    var attributeCSS = [selector + cssString];
    // Return the array
    return attributeCSS;
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseFontColor,
};
