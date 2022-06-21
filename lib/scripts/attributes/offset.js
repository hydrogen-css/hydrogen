// Hydrogen: Offset parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');
var { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-offset and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseOffset(property, selector, values) {
  try {
    // Set up the main variables
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] All, top-bottom, top
    var value1;
    var value1Err;
    if (values.length >= 1) {
      value1 = parseWhitespace(property, values[0]);
      value1Err = '"'.red + value1.red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Value 2: [optional] right-left, right
    var value2;
    var value2Err;
    if (values.length >= 2) {
      value2 = parseWhitespace(property, values[1]);
      value2Err = '"'.red + value2.toString().red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Value 3: [optional] bottom
    var value3;
    var value3Err;
    if (values.length >= 3) {
      value3 = parseWhitespace(property, values[2]);
      value3Err = '"'.red + value3.toString().red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Value 4: [optional] left
    var value4;
    var value4Err;
    if (values.length >= 4) {
      value4 = parseWhitespace(property, values[3]);
      value4Err = '"'.red + value4.toString().red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Check the array length for valid options
    if (values.length == 1) {
      if (value1 == null) {
        h2Error(value1Err);
        throw 'Error';
      } else {
        cssString = '{top: ' + value1 + ';right: ' + value1 + ';bottom: ' + value1 + ';left: ' + value1 + ';}';
      }
    } else if (values.length == 2) {
      if (value1 == null) {
        h2Error(value1Err);
        throw 'Error';
      } else if (value2 == null) {
        h2Error(value2Err);
        throw 'Error';
      } else {
        cssString = '{top: ' + value1 + ';right: ' + value2 + ';bottom: ' + value1 + ';left: ' + value2 + ';}';
      }
    } else if (values.length == 4) {
      if (value1 == null) {
        h2Error(value1Err);
        throw 'Error';
      } else if (value2 == null) {
        h2Error(value2Err);
        throw 'Error';
      } else if (value3 == null) {
        h2Error(value3Err);
        throw 'Error';
      } else if (value4 == null) {
        h2Error(value4Err);
        throw 'Error';
      } else {
        cssString = '{top: ' + value1 + ';right: ' + value2 + ';bottom: ' + value3 + ';left: ' + value4 + ';}';
      }
    } else {
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " accepts 1, 2, or 4 values, and you've specified " + values.length + '.';
      h2Error(errorMessage);
      throw 'Error';
    }
    // Assemble the CSS array
    var attributeCSS = ['[data-h2-position]' + selector + ',', '[data-h2-visibility]' + selector + ',', selector + cssString];
    // Return the array
    return attributeCSS;
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseOffset,
};
