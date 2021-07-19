"use strict";

const { series, parallel, src, dest, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
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

var loadFontFamilyMap = require('map-font-family');

function setFontFaceCSS(defaults, config) {
  var fontFaceCSSStringStart = '@font-face {';
  var fontFaceCSSStringContent = '';
  var fontFaceCSSStringEnd = '}';
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.fonts != null && config.fonts != undefined && config.fonts.length > 0) {
    var fontFamilyConfig = config.fonts;
    // Font Face Styles
    fontFamilyConfig.forEach(function(fontFamily) {
      if (fontFamily.loadType == 'font-face' || fontFamily.loadType == 'fontFace') {
        fontFaceCSSStringContent = 'font-family: ' + fontFamily.name + '; src: url(' + fontFamily.url + ');';
      }
    });
  } else {
    // Leave it empty.
  }
  // Assemble the variable.
  var fontFaceCSS = fontFaceCSSStringStart + fontFaceCSSStringContent + fontFaceCSSStringEnd;
  // Return the map.
  return fontFaceCSS;
}

function setFontFamilyMap(defaults, config, env) {
  var fontFamilyMap = loadFontFamilyMap(defaults, config);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-font-families.scss')
      .pipe(footer(fontFamilyMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-font-families.scss')
      .pipe(footer(fontFamilyMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Font Size
function setFontBaseSize(defaults, config) {
  if (config.fontBaseSize != null && config.fontBaseSize != undefined) {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-base-size: $H2FONTBASESIZE;', '$h2-font-base-size: ' + config.fontBaseSize + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  } else {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-base-size: $H2FONTBASESIZE;', '$h2-font-base-size: ' + defaults.fontBaseSize + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  }
}

// Font Scale
function setCoreFontScale(defaults, config) {
  if (config.fontScale != null && config.fontScale != undefined && config.fontScale > 0) {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + config.fontScale + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  } else {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + defaults.fontScale + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  }
}

function setUtilityFontScale(defaults, config, task) {
  if (task == "build") {
    if (config.fontScale != null && config.fontScale != undefined && config.fontScale > 0) {
      return src('./' + config.folders.styles + '/hydrogen/utility.scss')
        .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + config.fontScale + ';'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    } else {
      return src('./' + config.folders.styles + '/hydrogen/utility.scss')
        .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + defaults.fontScale + ';'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    }
  } else if (task == "compile") {
    if (config.fontScale != null && config.fontScale != undefined && config.fontScale > 0) {
      return src('./' + config.folders.styles + '/hydrogen/compile.scss')
        .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + config.fontScale + ';'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    } else {
      return src('./' + config.folders.styles + '/hydrogen/compile.scss')
        .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + defaults.fontScale + ';'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    }
  }
}

module.exports = {
  setFontFaceCSS,
  setFontFamilyMap,
  setFontBaseSize,
  setCoreFontScale,
  setUtilityFontScale
}