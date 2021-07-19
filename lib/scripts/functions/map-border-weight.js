// Hydrogen.css / Border Weight Map Generation

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

// Generate the map.
function loadBorderWeightMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var borderWeightMapStringStart = '$h2-map-border-weight: (';
  var borderWeightMapStringContent = '';
  var borderWeightMapStringEnd = ');';
  var borderWeightConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.borderWeights != null && config.borderWeights != undefined && config.borderWeights.length > 0) {
    borderWeightConfig = config.borderWeights;
  } else {
    borderWeightConfig = defaults.borderWeights;
  }
  // Loop through each option and build the map.
  borderWeightConfig.forEach(function(borderWeights) {
    var borderWeightsString = '"' + borderWeights.key + '": ' + borderWeights.weight + ',';
    borderWeightMapStringContent = borderWeightMapStringContent.concat(borderWeightsString);
  });
  // Assemble the map.
  var borderWeightMap = borderWeightMapStringStart + borderWeightMapStringContent + borderWeightMapStringEnd;
  // Return the map.
  return borderWeightMap;
}

// Set the map.
function setBorderWeightMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var borderWeightMap = '';
  borderWeightMap = loadBorderWeightMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-border-weight.scss')
      .pipe(footer(borderWeightMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-border-weight.scss')
      .pipe(footer(borderWeightMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = setBorderWeightMap;