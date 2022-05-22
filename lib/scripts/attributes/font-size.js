// Hydrogen: Font size parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('../load-settings');
var { h2Error } = require('../logs');
var { calculateLineHeight } = require('../calculate-line-height');

/**
 * Parse data-h2-font-size and return CSS
 * @param {array} argv Command line arguments, used to detect prod or dev environment
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseFontSize(argv, property, selector, values) {
  try {
    // Set up the main variables
    var settings = loadSettings(argv);
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] Heading scale, px, or rem value
    var fontSize;
    var fontSizeErr;
    if (values.length >= 1) {
      fontSize = values[0];
      fontSizeErr = '"'.red + fontSize.red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Value 2: [optional] Line height
    var lineHeight;
    var lineHeightErr;
    if (values.length >= 2) {
      lineHeight = values[1];
      lineHeightErr = '"'.red + lineHeight.toString().red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Check the array length for valid options
    if (values.length == 1 || values.length == 2) {
      if (fontSize == null) {
        h2Error(fontSizeErr);
        throw 'Error';
      } else {
        // Build the type scale
        var baseSize = 1;
        var fontScale = settings.typeScale;
        var captionSize = baseSize / fontScale;
        var h6Size = baseSize * fontScale;
        var h5Size = h6Size * fontScale;
        var h4Size = h5Size * fontScale;
        var h3Size = h4Size * fontScale;
        var h2Size = h3Size * fontScale;
        var h1Size = h2Size * fontScale;
        var numericFontSize; // For later use when the user sets a custom value
        var fontSizeUnit; // For later use
        var fontUnit; // For later use when the user sets a custom value
        var baseLineHeight = settings.baseLineHeight;
        if (fontSize == 'h1') {
          numericFontSize = h1Size;
          fontSizeUnit = numericFontSize + 'rem';
        } else if (fontSize == 'h2') {
          numericFontSize = h2Size;
          fontSizeUnit = numericFontSize + 'rem';
        } else if (fontSize == 'h3') {
          numericFontSize = h3Size;
          fontSizeUnit = numericFontSize + 'rem';
        } else if (fontSize == 'h4') {
          numericFontSize = h4Size;
          fontSizeUnit = numericFontSize + 'rem';
        } else if (fontSize == 'h5') {
          numericFontSize = h5Size;
          fontSizeUnit = numericFontSize + 'rem';
        } else if (fontSize == 'h6') {
          numericFontSize = h6Size;
          fontSizeUnit = numericFontSize + 'rem';
        } else if (fontSize == 'base' || fontSize == 'paragraph' || fontSize == 'normal' || fontSize == 'copy') {
          numericFontSize = baseSize;
          fontSizeUnit = numericFontSize + 'rem';
        } else if (fontSize == 'label' || fontSize == 'caption') {
          numericFontSize = captionSize;
          fontSizeUnit = numericFontSize + 'rem';
        } else {
          // Check for px or rem value (Hydrogen only supports these)
          if (fontSize.match(/(rem)|(px)/g) != null) {
            numericFontSize = fontSize.match(/[0-9]/g);
            fontUnit = fontSize.match(/(rem)|(px)/g);
            if ((fontUnit == 'px' && lineHeight == null) || (fontUnit == 'px' && lineHeight == undefined)) {
              lineHeight = baseLineHeight;
            }
            fontSizeUnit = fontSize;
          } else {
            var errorMessage = '"'.red + fontSize.red + '"'.red + 'is an invalid option for ' + 'font-size'.underline + '. Please use one of the font scale values, a px, or a rem value.';
            h2Error(errorMessage);
            throw 'Error';
          }
        }
        // Build the line height scale - note that this has to happen if they've chosen a key or entered a manual rem value, because the line height rhythm should be maintained no matter what; this means finding the multiple of the line height that is higher than their custom font size
        if (lineHeight == null) {
          lineHeight = calculateLineHeight(argv, numericFontSize);
        }
        // Write the CSS string
        cssString = '{font-size: ' + fontSizeUnit + ';line-height: ' + lineHeight + ';}';
      }
    } else {
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " accepts 1 or 2 values, and you've specified " + values.length + '.';
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
  parseFontSize,
};
