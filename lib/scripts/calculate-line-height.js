// Hydrogen: Calculate line height

'use strict';

// Third party dependencies

// Local dependencies
var { loadSettings } = require('./load-settings');
var { h2Error } = require('./logs');

/**
 * This script accepts a rem-based unitless font size and returns an appropriate line height that is a multiple of the user's vertical rhythm
 * @param {number} fontSize A unitless rem font size value
 * @returns {number} Returns a line height value
 */
function calculateLineHeight(fontSize) {
  try {
    var settings = loadSettings();
    var lineHeightMultiple = 0;
    var lineHeightCounter = 1;
    var baseLineHeight = settings.baseLineHeight;
    var lineHeight;
    do {
      lineHeightMultiple = baseLineHeight * lineHeightCounter;
      if (lineHeightMultiple < fontSize) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        lineHeight = lineHeightMultiple / fontSize;
        return lineHeight;
      }
    } while (lineHeightMultiple < fontSize);
  } catch (error) {
    h2Error(error);
    return error;
  }
}

module.exports = {
  calculateLineHeight,
};
