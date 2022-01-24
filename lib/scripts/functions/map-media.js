// Hydrogen.css / Media Map Generation

// =============================================================================

'use strict';

// Requirements
const { src, dest } = require('gulp');
const path = require('path');
var footer = require('gulp-footer');

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// Load Hydrogen modules
var { createUtilityArray } = require('../functions/utility-generation');

// =============================================================================

// Set the utility's string values.
var utilityConfigKey = 'media';

// Legacy defaults
var utilityDefaults = [];

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
  mediaQueryVariables = mediaQueryVariables.concat(
    '$h2-media-query-b: "screen";\n'
  );
  // Loop through each config option and build the list.
  mediaQueryConfig.forEach(function (query) {
    var mediaQueryVariable =
      '$h2-media-query-' +
      query.key +
      ': "screen and (min-width: ' +
      query.value +
      ')";\n';
    mediaQueryVariables = mediaQueryVariables.concat(mediaQueryVariable);
  });
  // Return the variable set.
  return mediaQueryVariables;
}

// Set the variables in the variable file.
function setMediaQuerySassVariables(env) {
  // Load the user's config file.
  var config = loadH2Config(env);
  // Fetch the variable list.
  var mediaQueryVars = createMediaQuerySassVariables(env);
  // Add the generated variables to the Sass file.
  if (env == 'dev') {
    return src(
      './lib/stage/' + config.folders.styles + '/hydrogen-variables.scss'
    )
      .pipe(footer(mediaQueryVars))
      .pipe(dest('./lib/stage/' + config.folders.styles));
  } else if (env == 'prod') {
    return src('./' + config.folders.styles + '/hydrogen-variables.scss')
      .pipe(footer(mediaQueryVars))
      .pipe(dest('./' + config.folders.styles));
  }
}

// Exporting a Sass Map Based on User Config -----------------------------------

function loadMediaMap(env) {
  // Create string.
  var mediaMapStringStart = '$h2-map-media: ("b": "screen",';
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
      '"' +
      mediaQuery.key +
      '": ' +
      '"screen and (min-width: ' +
      mediaQuery.value +
      ')",';
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
  var config = loadH2Config(env);
  var mediaMap = '';
  mediaMap = loadMediaMap(env);
  if (env == 'dev') {
    return src(path.resolve(__dirname, '../../styles/maps/_map-media.scss'))
      .pipe(footer(mediaMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == 'prod') {
    return src(
      path.resolve(__dirname, '../../styles/maps/_map-media.scss')
    )
      .pipe(footer(mediaMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

module.exports = {
  setMediaQuerySassVariables,
  loadMediaMap,
  setMediaMap,
};
