// Hydrogen.css / Media Map Generation

'use strict';

// Import Gulp and its dependencies
const { src, dest } = require('gulp');
var footer = require('gulp-footer');

// ---

// Import Hydrogen's configuration scripts
var {
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Import Hydrogen's utility modules
var { createUtilityArray } = require('../functions/utility-generation');

// ---

// Set the utility's name values
var utilityConfigKey = 'media';

// Default settings
var utilityDefaults = [
  {
    key: 'b',
    value: 'screen',
  },
];

// ---

function setMediaQueryVariables(env, format) {
  try {
    // Set an empty variable for the config to be populated based on whether the user has set their own settings.
    var mediaQueryConfig = createUtilityArray(
      env,
      'vars',
      utilityConfigKey,
      utilityDefaults
    );
    // Set the string and prefix it with a helpful comment.
    var mediaQueryVariables = '/* Media Queries */\n';
    // Set the variable prefix depending on the format requested
    var formatPrefix = '';
    if (format == 'css') {
      formatPrefix = '--';
    } else if (format == 'sass') {
      formatPrefix = '$';
    } else {
      throw "You haven't specified a format for your variable export.";
    }
    // Loop through each config option and build the list.
    mediaQueryConfig.forEach(function (query) {
      var mediaQueryVariable =
        formatPrefix +
        'h2-media-query-' +
        query.key +
        ': "' +
        query.value +
        '";\n';
      mediaQueryVariable =
        mediaQueryVariable +
        formatPrefix +
        'h2-media-query-' +
        query.key +
        '-dark: "' +
        query.value +
        ' and (prefers-color-scheme: dark)";\n';
      mediaQueryVariables = mediaQueryVariables.concat(mediaQueryVariable);
    });
    // Return the variable set.
    return mediaQueryVariables;
  } catch (err) {
    return err;
  }
}

// ---

/**
 * Generates a Sass map based on user configuration
 * @param {string} env Either 'dev' or 'prod'
 * @returns {string} A string containing the utility Sass map
 */
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
  });
  var mediaMap =
    mediaMapStringStart + mediaMapStringContent + mediaMapStringEnd;
  // Pass the media map.
  return mediaMap;
}

/**
 * Generate the utility Sass map
 * @param {string} env Either 'dev' or 'prod'
 * @returns Gulp src() - the utility's Sass map file
 */
function setMediaMap(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var mediaMap = loadMediaMap(env);
  return src(sourceDir + 'lib/styles/maps/_map-media.scss')
    .pipe(footer(mediaMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

// Export the utility's scripts for use
module.exports = {
  setMediaQueryVariables,
  loadMediaMap,
  setMediaMap,
};
