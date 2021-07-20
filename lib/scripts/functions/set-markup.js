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

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// Get Markup

function getUserMarkup(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var markupArray = [];
  if (Array.isArray(config.folders.markup) == true) {
    config.folders.markup.forEach(function(path, index, array) {
      markupArray = markupArray.concat('./' + path + '/**/*');
    });
    // console.log('1', config.folders.markup);
    // console.log('2', markupArray);
    return markupArray;
    // console.timeLog('Compile Time');
  } else {
    markupArray = markupArray.concat('./' + config.folders.markup + '/**/*');
    // console.log(config.folders.markup);
    // console.log(markupArray);
    // console.timeLog('Compile Time');
    return markupArray;
  }
}

function createUserMarkup(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var markupArray = getUserMarkup(env);
  return src(markupArray)
  // return src(['./lib/stage/markup/**/*', './lib/stage/multimarkup/**/*'])
    .pipe(concat('markup.txt'))
    // This destination will have to be the CSS folder the user specifies.
    .pipe(dest('./' + config.folders.styles + '/hydrogen/markup'));
}

function cleanUserMarkup(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  return del('./' + config.folders.styles + '/hydrogen/markup/**/*');
}

module.exports = {
  createUserMarkup,
  cleanUserMarkup
}