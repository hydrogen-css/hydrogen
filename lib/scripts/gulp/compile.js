// Hydrogen.css / Development Compile Script

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

// Load Hydrogen Core Scripts
var { cleanH2, cleanH2Cache, createH2Cache, cacheH2Core, cacheH2Utility, cacheH2Partials, compileCore, compileUtility } = require('../functions/core');

// Load Hydrogen Modules
var { setMediaMap } = require('../functions/map-media');
var setColorMap = require('../functions/map-color');
var setBorderWeightMap = require('../functions/map-border-weight');
var setContainerMap = require('../functions/map-containers');
var { moveFlexgridCore, enableFlexgridCore, moveFlexgrid, enableFlexgrid } = require('../functions/set-flex-grid');
var { setFontFamilyMap, setFontBaseSize, setCoreFontScale, setUtilityFontScale } = require('../functions/set-fonts');
var setGradientMap = require('../functions/map-gradients');
var setRadiusMap = require('../functions/map-radius');
var setShadowMap = require('../functions/map-shadows');
var { setWhitespaceVariable, setWhitespaceMap } = require('../functions/map-whitespace');
var buildDevCSS = require('../functions/build-development-css');

// =============================================================================

// Start Message
function compileStartMessage(done) {
  console.time('Hydrogen: Sass Compile Time');
  console.time('Hydrogen: Total Build Time');
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Compiling the library...');
  done();
}

// NOTE: It's required to have these wrapper functions because there is some weird script order things happening with Gulp. Essentially, "loadH2Config" doesn't technically run until after the series, and so Gulp tries to run the series with the variables set to undefined and fails. By wrapping the functions with Gulp tasks, it includes them in the order properly, and so they receive the configs as expected. Not sure why this is... but it's necessary to include the loading of the config files inside its own function so that it can be called on things like watch.

function testcleanH2() {
  return cleanH2("dev");
}
function testcleanH2Cache() {
  return cleanH2Cache("dev");
}
function testcreateH2Cache() {
  return createH2Cache("dev");
}
function testcacheH2Core() {
  return cacheH2Core("dev");
}
function testcacheH2Utility() {
  return cacheH2Utility("dev", "compile");
}
function testcacheH2Partials() {
  return cacheH2Partials("dev");
}
function testsetMediaMap() {
  return setMediaMap("dev");
}
function testsetColorMap() {
  return setColorMap("dev");
}
function testsetBorderWeightMap() {
  return setBorderWeightMap("dev");
}
function testsetContainerMap() {
  return setContainerMap("dev");
}
function testmoveFlexgridCore() {
  return moveFlexgridCore("dev");
}
function testmoveFlexgrid() {
  return moveFlexgrid("dev");
}
function testenableFlexgridCore() {
  return enableFlexgridCore("dev");
}
function testenableFlexgrid() {
  return enableFlexgrid("dev", "compile");
}
function testsetFontFamilyMap() {
  return setFontFamilyMap("dev");
}
function testsetFontBaseSize() {
  return setFontBaseSize("dev");
}
function testsetCoreFontScale() {
  return setCoreFontScale("dev");
}
function testsetUtilityFontScale() {
  return setUtilityFontScale("dev", "compile");
}
function testsetGradientMap() {
  return setGradientMap("dev");
}
function testsetRadiusMap() {
  return setRadiusMap("dev");
}
function testsetShadowMap() {
  return setShadowMap("dev");
}
function testsetWhitespaceVariable() {
  return setWhitespaceVariable("dev");
}
function testsetWhitespaceMap() {
  return setWhitespaceMap("dev");
}
function testcompileCore() {
  return compileCore("dev");
}
function testcompileUtility() {
  return compileUtility("dev", "compile");
}
function testbuildDevCSS() {
  return buildDevCSS("dev", "compile");
}

// Success Message
function successMessage(done) {
  var defaults = loadH2Defaults("dev");
  var config = loadH2Config("dev");
  console.timeEnd('Hydrogen: Total Build Time');
  console.log('[SUCCESS]'.green, 'Hydrogen: you\'ve successfully compiled a development version of Hydrogen in the ' + config.folders.styles.green + '/'.green + ' folder.');
  done();
}

// Exports
exports.compile = series(
  compileStartMessage, 
  testcleanH2,
  testcleanH2Cache,
  testcreateH2Cache,
  testcacheH2Core, 
  testcacheH2Utility, 
  testcacheH2Partials,
  testsetMediaMap, 
  testsetColorMap, 
  testsetBorderWeightMap, 
  testsetContainerMap, 
  testmoveFlexgridCore, 
  testenableFlexgridCore, 
  testmoveFlexgrid, 
  testenableFlexgrid, 
  testsetFontFamilyMap, 
  testsetFontBaseSize, 
  testsetCoreFontScale, 
  testsetUtilityFontScale, 
  testsetGradientMap, 
  testsetRadiusMap, 
  testsetShadowMap, 
  testsetWhitespaceVariable, 
  testsetWhitespaceMap, 
  testcompileCore, 
  testcompileUtility,
  testbuildDevCSS,
  successMessage
);