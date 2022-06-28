// Hydrogen: Container parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('../load-settings');
var { h2Error } = require('../logs');
const { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-container and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseContainer(property, selector, values) {
  try {
    // Set up the main variables
    var settings = loadSettings();
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] Alignment
    var alignmentCSSString = '';
    var alignment;
    if (values.length >= 1) {
      alignment = values[0];
      if (alignment == 'center' || alignment == 'middle') {
        alignmentCSSString = 'margin-right: auto;margin-left: auto;';
      } else if (alignment == 'left') {
        alignmentCSSString = 'margin-right: auto;margin-left: 0;';
      } else if (alignment == 'right') {
        alignmentCSSString = 'margin-right: 0;margin-left: auto;';
      } else {
        // The alignment value isn't valid
        var errorMessage =
          '"'.red +
          alignment.red +
          '"'.red +
          ' is not a valid alignment option for ' +
          property[0].underline +
          '.';
        h2Error(errorMessage);
        throw 'Error';
      }
    }
    // Value 2: [required] Container key or width
    var container;
    var containerErr;
    if (values.length >= 2) {
      container = values[1];
      // Check to see if the container value is a configured container key
      settings.containers.forEach(function (containerSetting) {
        if (container == containerSetting.key) {
          container = containerSetting.maxWidth;
        }
      });
      // Check to see if the container value has been altered based on a key
      if (container == values[1]) {
        // It hasn't so parse it as a whitespace multiplier just in case
        container = parseWhitespace(property, values[1]);
      }
      containerErr =
        '"'.red +
        container.red +
        '"'.red +
        ' is an invalid option for ' +
        property[0].underline +
        '.';
    }
    // Value 3: [optional] Horizontal padding
    var padding;
    var paddingErr;
    if (values.length >= 3) {
      padding = parseWhitespace(property, values[2]);
      paddingErr =
        '"'.red +
        padding.red +
        '"'.red +
        ' is an invalid option for ' +
        property[0].underline +
        '.';
    }
    // Check the array length for valid options and assemble the CSS
    if (values.length == 2) {
      if (container == null) {
        h2Error(containerErr);
      } else {
        cssString =
          '{' +
          alignmentCSSString +
          'max-width: ' +
          container +
          ';width: 100%;}';
      }
    } else if (values.length == 3) {
      if (container == null) {
        h2Error(containerErr);
      } else if (padding == null) {
        h2Error(paddingErr);
      } else {
        cssString =
          '{' +
          alignmentCSSString +
          'max-width: calc(' +
          container +
          ' + (' +
          padding +
          ' * 2));padding-right:' +
          padding +
          ';padding-left:' +
          padding +
          ';width: 100%;}';
      }
    } else {
      var errorMessage =
        '"data-h2-'.red +
        property[0].red +
        '"'.red +
        " accepts 2 or 3 values, and you've specified " +
        values.length +
        '.';
      h2Error(errorMessage);
      throw 'Error';
    }
    // Assemble the CSS array
    attributeCSS = [selector + cssString];
    // Return the array
    return attributeCSS;
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseContainer,
};
