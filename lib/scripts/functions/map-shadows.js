// Hydrogen.css / Shadow Map Generation

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

function loadShadowMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var shadowMapStringStart = '$h2-map-shadow: (';
  var shadowMapStringContent = '';
  var shadowMapStringEnd = ');';
  var shadowConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.shadows != null && config.shadows != undefined && config.shadows.length > 0) {
    shadowConfig = config.shadows;
  } else {
    shadowConfig = defaults.shadows;
  }
  // Loop through each option and build the map.
  shadowConfig.forEach(function(shadow) {
    var shadowString = '"' + shadow.key + '": "' + shadow.value + '",';
    shadowMapStringContent = shadowMapStringContent.concat(shadowString);
  });
  // Assemble the map.
  var shadowMap = shadowMapStringStart + shadowMapStringContent + shadowMapStringEnd;
  // Return the map.
  return shadowMap;
}

function setShadowMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var shadowMap = '';
  shadowMap = loadShadowMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-shadow.scss')
      .pipe(footer(shadowMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-shadow.scss')
      .pipe(footer(shadowMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = setShadowMap;