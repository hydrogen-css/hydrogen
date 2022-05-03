// Hydrogen: Generate media query array

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');

/**
 * TBD
 * @returns {array} Returns a modified array containing an ordered grouping of media queries based on the user's configuration file
 */
function generateMediaQueryArray(argv) {
  try {
    // Get media settings and assemble a CSS-ready media query from them
    var mediaArray = [];
    var settings = loadSettings(argv);
    settings.media.forEach(function(query) {
      // Default styles
      var keyObject = {};
      keyObject.key = query.key;
      keyObject.darkMedia = false;
      keyObject.darkToggle = false;
      keyObject.lightToggle = false;
      if (query.query == null) {
        keyObject.closingBracket = false;
        keyObject.query = null;
        keyObject.cssString = '';
      } else {
        keyObject.closingBracket = true;
        keyObject.query = query.query;
        keyObject.cssString = '@media ' + query.query + ' {';
      }
      mediaArray = mediaArray.concat(keyObject);
      // Preference based dark mode styles
      var darkKeyObject = {};
      darkKeyObject.key = query.key;
      darkKeyObject.darkMedia = true;
      darkKeyObject.darkToggle = false;
      darkKeyObject.lightToggle = false;
      if (query.query == null) {
        darkKeyObject.closingBracket = true;
        darkKeyObject.query = null;
        darkKeyObject.cssString = '@media (prefers-color-scheme: dark)' + ' {';
      } else {
        darkKeyObject.closingBracket = true;
        darkKeyObject.query = query.query;
        darkKeyObject.cssString = '@media ' + query.query + ' and (prefers-color-scheme: dark)' + ' {';
      }
      mediaArray = mediaArray.concat(darkKeyObject);
      // Toggle light mode styles (only need to be added if they are siblings to a matching media query that has :dark)
      var lightToggleKeyObject = {};
      lightToggleKeyObject.key = query.key;
      lightToggleKeyObject.darkMedia = false;
      lightToggleKeyObject.darkToggle = false;
      lightToggleKeyObject.lightToggle = true;
      if (query.query == null) {
        lightToggleKeyObject.closingBracket = false;
        lightToggleKeyObject.query = null;
        lightToggleKeyObject.cssString = '';
      } else {
        lightToggleKeyObject.closingBracket = true;
        lightToggleKeyObject.query = query.query;
        lightToggleKeyObject.cssString = '@media ' + query.query + ' {';
      }
      mediaArray = mediaArray.concat(lightToggleKeyObject);
      // Toggle dark mode styles (have to be last so that they override all other styles)
      var darkToggleKeyObject = {};
      darkToggleKeyObject.key = query.key;
      darkToggleKeyObject.darkMedia = true;
      darkToggleKeyObject.darkToggle = true;
      darkToggleKeyObject.lightToggle = false;
      if (query.query == null) {
        darkToggleKeyObject.closingBracket = false;
        darkToggleKeyObject.query = null;
        darkToggleKeyObject.cssString = '';
      } else {
        darkToggleKeyObject.closingBracket = true;
        darkToggleKeyObject.query = query.query;
        darkToggleKeyObject.cssString = '@media ' + query.query + ' {';
      }
      mediaArray = mediaArray.concat(darkToggleKeyObject);
    });
    // console.log(mediaArray);
    return mediaArray;
  } catch (err) {
    console.log(
      '⛔ [' + 'Hydrogen'.magenta + ']',
      err
    );
    return false
  }
}

module.exports = {
  generateMediaQueryArray
};