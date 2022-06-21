// Hydrogen: Overflow parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');

/**
 * Parse data-h2-overflow and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseOverflow(property, selector, values) {
  try {
    // Set up the main variables
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] CSS overflow
    var overflow;
    var overflowErr;
    if (values.length >= 1) {
      overflow = values[0];
      overflowErr = '"'.red + overflow.red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Value 2: [optional] all, x, or y
    var position;
    var positionErr;
    if (values.length == 2) {
      position = values[1];
      positionErr = '"'.red + position.toString().red + '"'.red + ' is an invalid option for ' + property[0].underline + '. Please use all, x, or y.';
    }
    // Check the array length for valid options
    if (values.length == 1) {
      if (overflow == null) {
        h2Error(overflowErr);
        throw 'Error';
      } else {
        cssString = '{overflow: ' + overflow + ';}';
      }
    } else if (values.length == 2) {
      if (overflow == null) {
        h2Error(overflowErr);
        throw 'Error';
      } else if (position == null) {
        h2Error(positionErr);
        throw 'Error';
      } else {
        if (position == 'all' || position == 'both') {
          cssString = '{overflow: ' + overflow + ';}';
        } else if (position == 'x') {
          cssString = '{overflow-x: ' + overflow + ';}';
        } else if (position == 'y') {
          cssString = '{overflow-y: ' + overflow + ';}';
        } else {
          h2Error(positionErr);
          throw 'Error';
        }
      }
    } else {
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " accepts 1 or 2 values, and you've specified " + values.length + '.';
      h2Error(errorMessage);
      throw 'Error';
    }
    // Assemble the CSS array
    var attributeCSS = ['[data-h2-visibility]' + selector + ',', selector + cssString];
    // Return the array
    return attributeCSS;
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseOverflow,
};
