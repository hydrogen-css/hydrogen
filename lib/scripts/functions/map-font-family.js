// Hydrogen.css / Font Family Map Generation

// =============================================================================

'use strict';

// Load Hydrogen modules
var { createUtilityArray } = require('../functions/utility-generation');

// =============================================================================

// Set the utility's string values.
var utilityConfigKey = 'fonts';

// Legacy defaults
var utilityDefaults = [];

// Load the map.
function loadFontFamilyMap(env) {
  // Create the map string.
  var fontFamilyMapStringStart = '$h2-map-font-families: (';
  var fontFamilyMapStringContent = '';
  var fontFamilyMapStringEnd = ');';
  var fontFamilyConfig = createUtilityArray(
    env,
    'maps',
    utilityConfigKey,
    utilityDefaults
  );
  // Loop through each option and build the map.
  fontFamilyConfig.forEach(function (fontFamily) {
    var fontFamilyString =
      '"' + fontFamily.key + '": "' + fontFamily.value + '",';
    fontFamilyMapStringContent =
      fontFamilyMapStringContent.concat(fontFamilyString);
  });
  // Assemble the map.
  var fontFamilyMap =
    fontFamilyMapStringStart +
    fontFamilyMapStringContent +
    fontFamilyMapStringEnd;
  // Return the map.
  return fontFamilyMap;
}

// Export the map function for use.
module.exports = loadFontFamilyMap;
