// Hydrogen: Font size parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2_error } = require('../logs');

/**
 * Parse data-h2-font-size and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseFontSize(property, selector, values) {
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
      fontSizeErr =
        '"'.red +
        fontSize.red +
        '"'.red +
        ' is an invalid option for ' +
        property[0].underline +
        '.';
    }
    // Value 2: [optional] Line height
    var line_height;
    var line_height_error;
    if (values.length >= 2) {
      line_height = values[1];
      line_height_error =
        '"'.red +
        line_height.toString().red +
        '"'.red +
        ' is an invalid option for ' +
        property[0].underline +
        '.';
    }
    // Check the array length for valid options
    if (values.length == 1 || values.length == 2) {
      var fontSizeUnit;
      if (fontSize == null) {
        h2_error(fontSizeErr);
        throw 'Error';
      } else {
        if (fontSize == 'h1') {
          fontSizeUnit = 'var(--h2-font-size-h1)';
          if (line_height == null) {
            line_height = 'var(--h2-line-height-h1)';
          }
        } else if (fontSize == 'h2') {
          fontSizeUnit = 'var(--h2-font-size-h2)';
          if (line_height == null) {
            line_height = 'var(--h2-line-height-h2)';
          }
        } else if (fontSize == 'h3') {
          fontSizeUnit = 'var(--h2-font-size-h3)';
          if (line_height == null) {
            line_height = 'var(--h2-line-height-h3)';
          }
        } else if (fontSize == 'h4') {
          fontSizeUnit = 'var(--h2-font-size-h4)';
          if (line_height == null) {
            line_height = 'var(--h2-line-height-h4)';
          }
        } else if (fontSize == 'h5') {
          fontSizeUnit = 'var(--h2-font-size-h5)';
          if (line_height == null) {
            line_height = 'var(--h2-line-height-h5)';
          }
        } else if (fontSize == 'h6') {
          fontSizeUnit = 'var(--h2-font-size-h6)';
          if (line_height == null) {
            line_height = 'var(--h2-line-height-h6)';
          }
        } else if (
          fontSize == 'base' ||
          fontSize == 'paragraph' ||
          fontSize == 'normal' ||
          fontSize == 'copy'
        ) {
          fontSizeUnit = 'var(--h2-font-size-copy)';
          if (line_height == null) {
            line_height = 'var(--h2-line-height-copy)';
          }
        } else if (fontSize == 'label' || fontSize == 'caption') {
          fontSizeUnit = 'var(--h2-font-size-caption)';
          if (line_height == null) {
            line_height = 'var(--h2-line-height-caption)';
          }
        } else {
          // They set manual values
          fontSizeUnit = fontSize;
          if (line_height == null) {
            line_height = 'var(--h2-line-height-copy)';
          }
        }
        // Write the CSS string
        cssString =
          '{font-size: ' + fontSizeUnit + ';line-height: ' + line_height + ';}';
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
    h2_error(err);
    return null;
  }
}

module.exports = {
  parseFontSize,
};
