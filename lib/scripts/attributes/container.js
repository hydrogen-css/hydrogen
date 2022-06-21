// Hydrogen: Container parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('../load-settings');
var { h2Error } = require('../logs');

/**
 * Parse data-h2-container and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseContainer(property, selector, values) {
  try {
    // Container accepts 2 options, so check for the array length
    if (values.length == 2) {
      var settings = loadSettings();
      var alignment = values[0];
      var container = values[1];
      // Check the alignment value and set the margins
      var alignmentString = '';
      if (alignment == 'center') {
        alignmentString = 'margin-right: auto;margin-left: auto;';
      } else if (alignment == 'left') {
        alignmentString = 'margin-right: auto;margin-left: 0;';
      } else if (alignment == 'right') {
        alignmentString = 'margin-right: 0;margin-left: auto;';
      } else {
        // The alignment value isn't valid
        var errorMessage = '"'.red + alignment.red + '"'.red + ' is not a valid alignment option for ' + property[0].underline + '.';
        h2Error(errorMessage);
        throw 'Error';
      }
      // Check to see if the container value is a key from the user's settings
      settings.containers.forEach(function (containerSetting) {
        if (container == containerSetting.key) {
          container = containerSetting.maxWidth;
        }
      });
      // Assemble the CSS string
      var cssString = '{' + alignmentString + 'max-width: ' + container + ';width: 100%;}';
      // Assemble the CSS array
      var containerCSS = [selector + cssString];
      // Return the array
      return containerCSS;
    } else {
      // There were multiple options passed, so log and throw an error
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " accepts 2 values, and you've specified " + values.length + '.';
      h2Error(errorMessage);
      throw 'Error';
    }
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseContainer,
};
