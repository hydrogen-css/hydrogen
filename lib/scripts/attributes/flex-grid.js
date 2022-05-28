// Hydrogen: Flex grid parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');
var { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-flex-grid and return CSS
 * @param {array} argv Command line arguments, used to detect prod or dev environment
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseFlexGrid(argv, property, selector, values) {
  try {
    // Flex grids accept 3 or 4 values, so set the first 3 options and check for the array length
    var alignment = values[0];
    if (alignment == 'top') {
      alignment = 'flex-start';
    } else if (alignment == 'middle') {
      alignment = 'center';
    } else if (alignment == 'bottom') {
      alignment = 'flex-end';
    }
    var wrapperPadding = parseWhitespace(argv, property, values[1]);
    var wrapperPaddingErrorMessage = '"'.red + wrapperPadding.red + '"'.red + ' is not a valid space option for ' + property[0].underline + '.';
    var itemGutter = parseWhitespace(argv, property, values[2]);
    var itemGutterErrorMessage = '"'.red + itemGutter.red + '"'.red + ' is not a valid space option for ' + property[0].underline + '.';
    if (itemGutter == 0) {
      itemGutter = '0rem';
    }
    if (values.length == 3) {
      // Only alignment, grid wrapper, and unified gap have been specified
      if (wrapperPadding == null) {
        h2Error(wrapperPaddingErrorMessage);
        throw 'Error';
      } else if (itemGutter == null) {
        h2Error(itemGutterErrorMessage);
        throw 'Error';
      } else {
        // Set up the CSS string
        var cssString = '{align-items: ' + alignment + ';display: inline-flex;flex-wrap: wrap;--h2-column-gap: ' + itemGutter + ';--h2-row-gap: ' + itemGutter + ';margin:calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap));width:calc(100% + var(--h2-column-gap));padding: ' + wrapperPadding + ';}';
        // Assemble the CSS array
        var attributeCSS = [selector + cssString, selector + ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}'];
        // Return the array
        return attributeCSS;
      }
    } else if (values.length == 4) {
      // Alignment, grid wrapper, a column gap, and a row gap have been specified
      var rowGutter = parseWhitespace(argv, property, values[3]);
      var rowGutterErrorMessage = '"'.red + rowGutter.red + '"'.red + ' is not a valid space option for ' + property[0].underline + '.';
      if (rowGutter == 0) {
        rowGutter = '0rem';
      }
      if (wrapperPadding == null) {
        h2Error(wrapperPaddingErrorMessage);
        throw 'Error';
      } else if (itemGutter == null) {
        h2Error(itemGutterErrorMessage);
        throw 'Error';
      } else if (rowGutter == null) {
        h2Error(rowGutterErrorMessage);
        throw 'Error';
      } else {
        // Set up the CSS string
        var cssString = '{align-items: ' + alignment + ';display: inline-flex;flex-wrap: wrap;--h2-column-gap: ' + itemGutter + ';--h2-row-gap: ' + rowGutter + ';margin:calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap));width:calc(100% + var(--h2-column-gap));padding: ' + wrapperPadding + ';}';
        // Assemble the CSS array
        var attributeCSS = [selector + cssString, selector + ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}'];
        // Return the array
        return attributeCSS;
      }
    } else {
      // There were multiple options passed, so log and throw an error
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " accepts 3 or 4 values, and you've specified " + values.length + '.';
      h2Error(errorMessage);
      throw 'Error';
    }
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseFlexGrid,
};
