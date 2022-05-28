// Hydrogen: Overlay parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');
var { parseColor } = require('../parse-color');

/**
 * Parse data-h2-overlay and return CSS
 * @param {array} argv Command line arguments, used to detect prod or dev environment
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseOverlay(argv, property, selector, values) {
  try {
    // Set up the main variables
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] Color
    var bgColor;
    var bgColorErr;
    if (values.length >= 1) {
      bgColor = parseColor(argv, property, values[0]);
      bgColorErr = '"'.red + bgColor.red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Value 2: [optional] Opacity
    var opacity;
    var opacityErr;
    if (values.length == 2) {
      opacity = values[1];
      opacityErr = '"'.red + opacity.toString().red + '"'.red + ' is an invalid opacity option for ' + property[0].underline + '.';
    }
    // Check the array length for valid options
    if (values.length == 1) {
      if (bgColor == null) {
        h2Error(bgColorErr);
        throw 'Error';
      } else {
        if (bgColor.type == 'solid') {
          cssString = '{background-color: ' + bgColor.color + ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        } else if (bgColor.type == 'gradient') {
          cssString = '{background-color: ' + bgColor.fallback + ';background-image: ' + bgColor.color + ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        }
      }
    } else if (values.length == 2) {
      if (bgColor == null) {
        h2Error(bgColorErr);
        throw 'Error';
      } else if (opacity == null) {
        h2Error(opacityErr);
        throw 'Error';
      } else {
        if (bgColor.type == 'solid') {
          cssString = '{background-color: ' + bgColor.color + ';opacity: ' + opacity + ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        } else if (bgColor.type == 'gradient') {
          cssString = '{background-color: ' + bgColor.fallback + ';background-image: ' + bgColor.color + ';opacity: ' + opacity + ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        }
      }
    } else {
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " accepts 1 or 2 values, and you've specified " + values.length + '.';
      h2Error(errorMessage);
      throw 'Error';
    }
    // Assemble the CSS array
    var attributeCSS = [selector + cssString, selector + ' > * {position: relative;}'];
    // Return the array
    return attributeCSS;
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseOverlay,
};
