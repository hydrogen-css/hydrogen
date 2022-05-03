// Hydrogen: Load settings

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');

// Local dependencies
var { loadSettings } = require('./load-settings');

/**
 * This script accepts a rem-based unitless font size and returns an appropriate line height that is a multiple of the user's vertical rhythm
 * @param {number} fontSize A unitless rem font size value
 * @returns {number} Returns a line height value
 */
function calculateLineHeight(argv, fontSize) {
  try {
    var settings = loadSettings(argv);
    var lineHeightMultiple = 0;
    var lineHeightCounter = 1;
    var baseLineHeight = settings.baseLineHeight;
    var lineHeight;
    do {
      lineHeightMultiple = baseLineHeight * lineHeightCounter;
      if (lineHeightMultiple < fontSize) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        lineHeight = lineHeightMultiple/fontSize;
        return lineHeight;
      } 
    } while (lineHeightMultiple < fontSize);
  } catch(err) {
    console.log(
      '⛔ [' + 'Hydrogen'.magenta + ']',
      err
    );
    return err;
  }
}

module.exports = {
  calculateLineHeight
}