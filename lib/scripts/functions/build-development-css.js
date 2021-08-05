// Hydrogen.css / Build Development Ready CSS

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

// Load the Font Face Function
var { setFontFaceCSS } = require('../functions/set-fonts');

// =============================================================================

async function buildDevCSS(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  console.timeEnd('H2 ' + '[TIMELOG]'.magenta + ' Sass compile time was', 'sassTime');
  var fontFaceCSS = setFontFaceCSS(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  // Get the temporary core Hydrogen.
  var compiledHydrogenCoreCSS = fs.readFileSync(path + config.folders.styles + '/hydrogen/compiled/core.css').toString();
  var compiledHydrogenUtilityCSS = fs.readFileSync(path + config.folders.styles + '/hydrogen/compiled/compile.css').toString();
  // Assemble the string.
  var devHydrogen = fontFaceCSS + compiledHydrogenCoreCSS + compiledHydrogenUtilityCSS;
  // Write the file.
  fs.mkdirSync(path + config.folders.styles + '/hydrogen/cleaned');
  fs.writeFile(path + config.folders.styles + '/hydrogen/cleaned/hydrogen.css', devHydrogen, function(err) {
    if (err) {
      console.log('H2', '[ERROR]'.red, err);
    }
  });
  await Promise.resolve('done?');
}

module.exports = buildDevCSS;