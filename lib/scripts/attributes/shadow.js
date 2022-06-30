// Hydrogen: Shadow parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2_load_settings } = require('../load-settings');
var { h2_error } = require('../logs');

/**
 * Parse data-h2-shadow and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseShadow(property, selector, values) {
  try {
    // Set up the main variables
    var settings = h2_load_settings();
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] Configured key, CSS shadow
    var shadow;
    var shadowString = '';
    var shadowErr;
    if (values.length >= 1) {
      values.forEach(function (value, index) {
        shadow = value;
        if (settings.shadows != null) {
          settings.shadows.forEach(function (shadowSetting) {
            if (shadow == shadowSetting.key) {
              shadow = shadowSetting.shadow;
            }
          });
        }
        if (index === values.length - 1) {
          shadowString = shadowString + shadow;
        } else {
          shadowString = shadowString + shadow + ',';
        }
      });
      shadowErr =
        '"'.red +
        shadowString.red +
        '"'.red +
        ' is an invalid option for ' +
        property[0].underline +
        '.';
    }
    // Check the array length for valid options
    if (values.length >= 1) {
      if (shadowString == null) {
        h2_error(shadowErr);
        throw 'Error';
      } else {
        cssString = '{box-shadow: ' + shadowString + ';}';
      }
    } else {
      var errorMessage =
        '"data-h2-'.red +
        property[0].red +
        '"'.red +
        " accepts 1 or more values, and you've specified " +
        values.length +
        ' ('.red +
        values.toString().red +
        ')'.red +
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
  parseShadow,
};
