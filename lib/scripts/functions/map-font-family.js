"use strict";

// Loaded in the event we need to console.log.
var colors = require('colors');

function loadFontFamilyMap(defaults, config) {
  // Create the map string.
  var fontFamilyMapStringStart = '$h2-map-font-families: (';
  var fontFamilyMapStringContent = '';
  var fontFamilyMapStringEnd = ');';
  var fontFamilyConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.fonts != null && config.fonts != undefined && config.fonts.length > 0) {
    fontFamilyConfig = config.fonts;
  } else {
    fontFamilyConfig = defaults.fonts;
  }
  // Loop through each option and build the map.
  fontFamilyConfig.forEach(function(fontFamily) {
    var fontFamilyString = '"' + fontFamily.name + '": "' + fontFamily.value + '",';
    fontFamilyMapStringContent = fontFamilyMapStringContent.concat(fontFamilyString);
  });
  // Assemble the map.
  var fontFamilyMap = fontFamilyMapStringStart + fontFamilyMapStringContent + fontFamilyMapStringEnd;
  // Return the map.
  return fontFamilyMap;
}

// Export the map function for use.
module.exports = loadFontFamilyMap;