// Hydrogen: Position parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2_error } = require('../logs');

/**
 * Parse data-h2-position and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parsePosition(property, selector, values) {
  try {
    // Set up the main variables
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] CSS position
    var position;
    var positionErr;
    if (values.length >= 1) {
      position = values[0];
      positionErr =
        '"'.red +
        position.red +
        '"'.red +
        ' is an invalid option for ' +
        property[0].underline +
        '.';
    }
    // Check the array length for valid options
    if (values.length == 1) {
      if (position == null) {
        h2_error(positionErr);
        throw 'Error';
      } else {
        cssString = '{position: ' + position + ';}';
      }
    } else {
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
    // Assemble the CSS array
    var attributeCSS = [
      '[data-h2-visibility]' + selector + ',',
      selector + cssString,
    ];
    // Return the array
    return attributeCSS;
  } catch (err) {
    return null;
  }
}

module.exports = {
  parsePosition,
};
