// Hydrogen: Shadow parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('../load-settings');
var { h2Error } = require('../logs');

/**
 * Parse data-h2-shadow and return CSS
 * @param {array} argv Command line arguments, used to detect prod or dev environment
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseShadow(argv, property, selector, values) {
  try {
    // Set up the main variables
    var settings = loadSettings(argv);
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] Configured key, CSS shadow
    var shadow;
    var shadowErr;
    if (values.length >= 1) {
      shadow = values[0];
      settings.shadows.forEach(function (shadowSetting) {
        if (shadow == shadowSetting.key) {
          shadow = shadowSetting.shadow;
        }
      });
      shadowErr = '"'.red + shadow.red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Check the array length for valid options
    if (values.length == 1) {
      if (shadow == null) {
        h2Error(shadowErr);
        throw 'Error';
      } else {
        cssString = '{box-shadow: ' + shadow + ';transition: 0.2s ease all;}';
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
    return null;
  }
}

module.exports = {
  parseShadow,
};