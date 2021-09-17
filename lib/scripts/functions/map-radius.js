// Hydrogen.css / Radius Map Generation

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

function loadRadiusMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var radiusMapStringStart = '$h2-map-radius: (';
  var radiusMapStringContent = '';
  var radiusMapStringEnd = ');';
  var radiusConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.radius != null && config.radius != undefined && config.radius.length > 0) {
    radiusConfig = config.radius;
  } else {
    radiusConfig = defaults.radius;
  }
  // Loop through each option and build the map.
  radiusConfig.forEach(function(radius) {
    var radiusString = '"' + radius.key + '": "' + radius.value + '",';
    radiusMapStringContent = radiusMapStringContent.concat(radiusString);
  });
  // Assemble the map.
  var radiusMap = radiusMapStringStart + radiusMapStringContent + radiusMapStringEnd;
  // Return the map.
  return radiusMap;
}

function setRadiusMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var radiusMap = '';
  radiusMap = loadRadiusMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-radius.scss')
      .pipe(footer(radiusMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps')); 
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-radius.scss')
      .pipe(footer(radiusMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = setRadiusMap;