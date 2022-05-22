// Hydrogen: Font family parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('../load-settings');
var { h2Error } = require('../logs');

/**
 * Parse data-h2-font-family and return CSS
 * @param {array} argv Command line arguments, used to detect prod or dev environment
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseFontFamily(argv, property, selector, values) {
  try {
    // Set up the main variables
    var settings = loadSettings(argv);
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] Configured key, system font
    var fontFamily;
    var fontFamilyErr;
    if (values.length >= 1) {
      fontFamily = values[0];
      settings.fonts.forEach(function (fontFamilySetting) {
        if (fontFamily == fontFamilySetting.key) {
          fontFamily = fontFamilySetting.family;
        }
      });
      fontFamilyErr = '"'.red + fontFamily.red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Check the array length for valid options
    if (values.length == 1) {
      if (fontFamily == null) {
        h2Error(fontFamilyErr);
        throw 'Error';
      } else {
        cssString = '{font-family: "' + fontFamily + '";}';
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
    console.log(err);
    return null;
  }
}

module.exports = {
  parseFontFamily,
};
