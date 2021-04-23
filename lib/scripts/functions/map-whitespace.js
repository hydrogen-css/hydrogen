"use strict";

function loadWhitespaceMap(defaults, config) {
  // Create the map string.
  var whitespaceMapStringStart = '$h2-map-whitespace: ("none": 0,';
  var whitespaceMapStringContent = '';
  var whitespaceMapStringEnd = ');';
  var whitespaceScaleConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.whitespaceScale != null && config.whitespaceScale != undefined && config.whitespaceScale.length > 0) {
    whitespaceScaleConfig = config.whitespaceScale;
  } else {
    whitespaceScaleConfig = defaults.whitespaceScale;
  }
  // Create the whitespace values.
  var smallest = '"xxs": ' + (1 / whitespaceScaleConfig) / whitespaceScaleConfig + 'rem,';
  var smaller = '"xs": ' + 1 / whitespaceScaleConfig + 'rem,';
  var small = '"s": 1rem,';
  var medium = '"m": ' + 1 * whitespaceScaleConfig + 'rem,';
  var large = '"l": ' + (1 * whitespaceScaleConfig) * whitespaceScaleConfig + 'rem,';
  var larger = '"xl": ' + ((1 * whitespaceScaleConfig) * whitespaceScaleConfig) * whitespaceScaleConfig + 'rem,';
  var largest = '"xxl": ' + (((1 * whitespaceScaleConfig) * whitespaceScaleConfig) * whitespaceScaleConfig) * whitespaceScaleConfig + 'rem,';
  whitespaceMapStringContent = whitespaceMapStringContent + smallest + smaller + small + medium + large + larger + largest;
  // Assemble the map.
  var whitespaceMap = whitespaceMapStringStart + whitespaceMapStringContent + whitespaceMapStringEnd;
  // Return the map.
  return whitespaceMap;
}

module.exports = loadWhitespaceMap;