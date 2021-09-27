// Hydrogen.css / Font Family Map Generation

// =============================================================================

"use strict";

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// =============================================================================

// Load the map.
function loadFontFamilyMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
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
    var fontFamilyString = '"' + fontFamily.key + '": "' + fontFamily.value + '",';
    fontFamilyMapStringContent = fontFamilyMapStringContent.concat(fontFamilyString);
  });
  // Assemble the map.
  var fontFamilyMap = fontFamilyMapStringStart + fontFamilyMapStringContent + fontFamilyMapStringEnd;
  // Return the map.
  return fontFamilyMap;
}

// Export the map function for use.
module.exports = loadFontFamilyMap;