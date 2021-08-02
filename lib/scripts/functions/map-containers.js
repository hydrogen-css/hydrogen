// Hydrogen.css / Container Map Generation

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
function loadContainerMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var containerMapStringStart = '$h2-map-containers: ("full": "none",';
  var containerMapStringContent = '';
  var containerMapStringEnd = ');';
  var containerConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.containers != null && config.containers != undefined && config.containers.length > 0) {
    containerConfig = config.containers;
  } else {
    containerConfig = defaults.containers;
  }
  // Loop through each option and build the map.
  containerConfig.forEach(function(containers) {
    var containersString = '"' + containers.key + '": "' + containers.maxWidth + '",';
    containerMapStringContent = containerMapStringContent.concat(containersString);
  });
  // Assemble the map.
  var containerMap = containerMapStringStart + containerMapStringContent + containerMapStringEnd;
  // Return the map.
  return containerMap;
}

// Set the map.
function setContainerMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var containerMap = '';
  containerMap = loadContainerMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-containers.scss')
      .pipe(footer(containerMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-containers.scss')
      .pipe(footer(containerMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = setContainerMap;