// Hydrogen.css / Gradient Map Generation

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

function loadGradientMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var gradientMap = '';
  // Check to see if the user has set any gradients, and if not, create an empty gradient map, because by default the system doesn't offer them.
  if (config.gradients != null && config.gradients != undefined && config.gradients.length > 0) {
    // The user has specified their own gradients. There is no default alternative to this, because Hydrogen doesn't ship with gradients by default.
    var gradientStringStart = '@use "sass:color"; $h2-map-gradient: (';
    var gradientStringContent = '';
    var gradientStringEnd = ');';
    // Loop through the user's gradients.
    config.gradients.forEach(function(gradient) {
      var gradientType = gradient.type; 
      if (gradientType == "radial") {
        var radialColorStopKeys = 'radial';
        var radialColorStopColors = '';
        gradient.colorStops.forEach(function(color, index, array) {
          radialColorStopKeys = radialColorStopKeys + '[' + color.key + ']';
          if (index === array.length -1) {
            radialColorStopColors = radialColorStopColors + color.color;
          } else {
            radialColorStopColors = radialColorStopColors + color.color + ',';
          }
        });
        gradientStringContent = gradientStringContent + '"' + radialColorStopKeys + '": "radial-gradient(' + radialColorStopColors + ')",'
      } else if (gradientType == "linear") {
        var angleRegEx = /.*[^deg]/g;
        var angleValue = gradient.angle.match(angleRegEx);
        // console.log(gradient.angle, angleValue);
        var linearColorStopKeys = 'linear-' + angleValue;
        var linearColorStopColors = '';
        gradient.colorStops.forEach(function(color, index, array) {
          linearColorStopKeys = linearColorStopKeys + '[' + color.key + ']';
          if (index === array.length -1) {
            linearColorStopColors = linearColorStopColors + color.color;
          } else {
            linearColorStopColors = linearColorStopColors + color.color + ',';
          }
        });
        if (gradient.angle == null || gradient.angle == undefined) {
          console.log("[ERROR] Hydrogen: Please specify an angle (45deg) value for all linear gradients defined in your configuration file.".red);
          return false;
        } else {
          gradientStringContent = gradientStringContent + '"' + linearColorStopKeys + '": "linear-gradient(' + gradient.angle + ',' + linearColorStopColors + ')",'
        }
      } else {
        console.log("[ERROR] Hydrogen: one of the gradients in your configuration file is missing a type.".red);
        return false;
      }
    });
    gradientMap = gradientStringStart + gradientStringContent + gradientStringEnd;
  } else {
    gradientMap = '@use "sass:color"; $h2-map-gradient: ();';
  }
  // Pass the whitespace map.
  return gradientMap;
}

function setGradientMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var gradientMap = '';
  gradientMap = loadGradientMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-gradient.scss')
      .pipe(footer(gradientMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-gradient.scss')
      .pipe(footer(gradientMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

module.exports = setGradientMap;