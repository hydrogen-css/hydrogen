// Hydrogen: Gap parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2_error } = require('../logs');
var { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-gap and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseGap(property, selector, values) {
  try {
    // Set up the main variables
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] space unit
    var gap;
    var gapErr;
    if (values.length >= 1) {
      gap = parseWhitespace(property, values[0]);
      gapErr =
        '"'.red +
        gap.red +
        '"'.red +
        ' is an invalid option for ' +
        property[0].underline +
        '.';
    }
    // Value 2: [optional] all, column, row
    var orientation;
    var orientationErr;
    if (values.length == 2) {
      orientation = values[1];
      orientationErr =
        '"'.red +
        orientation.toString().red +
        '"'.red +
        ' is an invalid option for ' +
        property[0].underline +
        '.';
    }
    // Check the array length for valid options
    if (values.length == 1) {
      if (gap == null) {
        h2_error(gapErr);
        throw 'Error';
      } else {
        cssString = '{gap: ' + gap + ';}';
      }
    } else if (values.length == 2) {
      if (gap == null) {
        h2_error(gapErr);
        throw 'Error';
      } else if (orientation == null) {
        h2_error(orientationErr);
        throw 'Error';
      } else {
        if (orientation == 'all' || orientation == 'both') {
          cssString = '{gap: ' + gap + ';}';
        } else if (orientation == 'row') {
          cssString = '{row-gap: ' + gap + ';}';
        } else if (orientation == 'column') {
          cssString = '{column-gap: ' + gap + ';}';
        } else {
          var errorMessage =
            '"'.red +
            orientation.red +
            '"'.red +
            ' is an invalid orientation option for ' +
            property[0].underline +
            '. Please use all, row, or column.';
          h2_error(errorMessage);
          falseAttribute = true;
        }
      }
    } else {
      var errorMessage =
        '"data-h2-'.red +
        property[0].red +
        '"'.red +
        " accepts 1 or 2 values, and you've specified " +
        values.length +
        '.';
      h2_error(errorMessage);
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
  parseGap,
};
