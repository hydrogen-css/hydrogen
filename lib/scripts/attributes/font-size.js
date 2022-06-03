// Hydrogen: Font size parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');

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
      var fontSizeUnit;
      if (fontSize == null) {
        h2Error(fontSizeErr);
        throw 'Error';
      } else {
        if (fontSize == 'h1') {
          fontSizeUnit = 'var(--h2H1FontSize)';
          if (lineHeight == null) {
            lineHeight = 'var(--h2H1LineHeight)';
          }
        } else if (fontSize == 'h2') {
          fontSizeUnit = 'var(--h2H2FontSize)';
          if (lineHeight == null) {
            lineHeight = 'var(--h2H2LineHeight)';
          }
        } else if (fontSize == 'h3') {
          fontSizeUnit = 'var(--h2H3FontSize)';
          if (lineHeight == null) {
            lineHeight = 'var(--h2H3LineHeight)';
          }
        } else if (fontSize == 'h4') {
          fontSizeUnit = 'var(--h2H4FontSize)';
          if (lineHeight == null) {
            lineHeight = 'var(--h2H4LineHeight)';
          }
        } else if (fontSize == 'h5') {
          fontSizeUnit = 'var(--h2H5FontSize)';
          if (lineHeight == null) {
            lineHeight = 'var(--h2H5LineHeight)';
          }
        } else if (fontSize == 'h6') {
          fontSizeUnit = 'var(--h2H6FontSize)';
          if (lineHeight == null) {
            lineHeight = 'var(--h2H6LineHeight)';
          }
        } else if (fontSize == 'base' || fontSize == 'paragraph' || fontSize == 'normal' || fontSize == 'copy') {
          fontSizeUnit = 'var(--h2CopyFontSize)';
          if (lineHeight == null) {
            lineHeight = 'var(--h2CopyLineHeight)';
          }
        } else if (fontSize == 'label' || fontSize == 'caption') {
          fontSizeUnit = 'var(--h2CaptionFontSize)';
          if (lineHeight == null) {
            lineHeight = 'var(--h2CaptionLineHeight)';
          }
        } else {
          // They set manual values
          fontSizeUnit = fontSize;
          if (lineHeight == null) {
            lineHeight = 'var(--h2CopyLineHeight)';
          }
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
    h2Error(err);
    return null;
  }
}

module.exports = {
  parseFontSize,
};
