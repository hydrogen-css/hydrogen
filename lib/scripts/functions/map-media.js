// Hydrogen.css / Media Map Generation

// =============================================================================

"use strict";

// Requirements
const { series, parallel, src, dest, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
var colors = require('colors');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const del = require('del');
var footer = require('gulp-footer');
const fs = require('fs');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');

// Set the Sass compiler to Dart Sass.
sass.compiler = require('sass');

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// =============================================================================

function loadMediaMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create string.
  var mediaMapStringStart = '$h2-map-media: ("b": "screen",';
  var mediaMapStringContent = '';
  var mediaMapStringEnd = ');';
  var mediaConfig;
  // console.log(config.media);
  // console.log(defaults.media);
  // Check to see if the user has set media options in their config, and if not, load the defaults.
  if (config.media != null && config.media != undefined && config.media.length > 0) {
    mediaConfig = config.media;
  } else {
    mediaConfig = defaults.media;
  }
  // Loop through the media options and add them to the media map.
  mediaConfig.forEach(function(mediaQuery) {
    // console.log(mediaQuery);
    var mediaString = '"' + mediaQuery.key + '": ' + '"screen and (min-width: ' + mediaQuery.value + ')",';
    mediaMapStringContent = mediaMapStringContent.concat(mediaString);
    // console.log(mediaMapStringContent);
  });
  var mediaMap = mediaMapStringStart + mediaMapStringContent + mediaMapStringEnd;
  // console.log(mediaMap);
  // Pass the media map.
  return mediaMap;
}

function setMediaMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var mediaMap = '';
  mediaMap = loadMediaMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-media.scss')
      .pipe(footer(mediaMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-media.scss')
      .pipe(footer(mediaMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

module.exports = {
  loadMediaMap,
  setMediaMap
}