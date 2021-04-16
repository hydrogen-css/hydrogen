"use strict";

// Loaded in the event we need to console.log.
var colors = require('colors');

function setFontFaceCSS(defaults, config) {
  var fontFaceCSSStringStart = '@font-face {';
  var fontFaceCSSStringContent = '';
  var fontFaceCSSStringEnd = '}';
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.fonts != null && config.fonts != undefined && config.fonts.length > 0) {
    var fontFamilyConfig = config.fonts;
    // Font Face Styles
    fontFamilyConfig.forEach(function(fontFamily) {
      if (fontFamily.loadType == 'font-face' || fontFamily.loadType == 'fontFace') {
        fontFaceCSSStringContent = 'font-family: ' + fontFamily.name + '; src: url(' + fontFamily.url + ');';
      }
    });
  } else {
    // Leave it empty.
  }
  // Assemble the variable.
  var fontFaceCSS = fontFaceCSSStringStart + fontFaceCSSStringContent + fontFaceCSSStringEnd;
  // Return the map.
  return fontFaceCSS;
}

// Export the map function for use.
module.exports = setFontFaceCSS;