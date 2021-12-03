// Hydrogen.css / Media Map Generation

// =============================================================================

'use strict';

// Requirements
const { src, dest } = require('gulp');
var footer = require('gulp-footer');

// Load Hydrogen's Configuration
var {
  loadH2Defaults,
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Load Hydrogen modules
var { createUtilityArray } = require('../functions/utility-generation');

// =============================================================================

// Set the utility's string values.
var utilityConfigKey = 'media';

// Legacy defaults
var utilityDefaults = [
  {
    key: 'b',
    value: 'screen',
  },
];

// Exporting Variables Based on User Config ------------------------------------

// Generate a list of Sass variables from the config files.
function createMediaQuerySassVariables(env) {
  // Set the string and prefix it with a helpful comment.
  var mediaQueryVariables = '// Media Queries (e.g. #{$query})\n';
  // Set an empty variable for the config to be populated based on whether the user has set their own settings.
  var mediaQueryConfig = createUtilityArray(
    env,
    'vars',
    utilityConfigKey,
    utilityDefaults
  );
  // console.log(mediaQueryConfig);
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  // if (
  //   config.media != null &&
  //   config.media != undefined &&
  //   config.media.length > 0
  // ) {
  //   mediaQueryConfig = config.media;
  // } else {
  //   mediaQueryConfig = defaults.media;
  // }
  // TBD Deprecated Legacy Defaults
  mediaQueryVariables = mediaQueryVariables.concat();
  // Loop through each config option and build the list.
  mediaQueryConfig.forEach(function (query) {
    var mediaQueryVariable =
      '$h2-media-query-' + query.key + ': "' + query.value + '";\n';
    mediaQueryVariable =
      mediaQueryVariable +
      '$h2-media-query-' +
      query.key +
      '-dark: "' +
      query.value +
      ' and (prefers-color-scheme: dark)";\n';
    mediaQueryVariables = mediaQueryVariables.concat(mediaQueryVariable);
  });
  // Return the variable set.
  return mediaQueryVariables;
}

// Set the variables in the variable file.
function setMediaQuerySassVariables(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  // Fetch the variable list.
  var mediaQueryVars = createMediaQuerySassVariables(env);
  // Add the generated variables to the Sass file.
  return src(destPath + '/hydrogen-variables.scss')
    .pipe(footer(mediaQueryVars))
    .pipe(dest(destPath));
}

// Exporting a Sass Map Based on User Config -----------------------------------

function loadMediaMap(env) {
  // Create string.
  var mediaMapStringStart = '$h2-map-media: (';
  var mediaMapStringContent = '';
  var mediaMapStringEnd = ');';
  var mediaQueryConfig = createUtilityArray(
    env,
    'maps',
    utilityConfigKey,
    utilityDefaults
  );
  // Loop through the media options and add them to the media map.
  mediaQueryConfig.forEach(function (mediaQuery) {
    // console.log(mediaQuery);
    var mediaString =
      '"' + mediaQuery.key + '": ' + '"' + mediaQuery.value + '",';
    mediaString =
      mediaString +
      '"' +
      mediaQuery.key +
      ':dark": ' +
      '"' +
      mediaQuery.value +
      ' and (prefers-color-scheme: dark)",';
    mediaMapStringContent = mediaMapStringContent.concat(mediaString);
    // console.log(mediaMapStringContent);
  });
  var mediaMap =
    mediaMapStringStart + mediaMapStringContent + mediaMapStringEnd;
  // console.log(mediaMap);
  // Pass the media map.
  return mediaMap;
}

function setMediaMap(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var mediaMap = '';
  mediaMap = loadMediaMap(env);
  return src(sourceDir + 'lib/styles/maps/_map-media.scss')
    .pipe(footer(mediaMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

module.exports = {
  setMediaQuerySassVariables,
  loadMediaMap,
  setMediaMap,
};
