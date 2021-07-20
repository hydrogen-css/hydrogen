// Hydrogen.css / Production Compile Script

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

function devCleanH2() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Preparing workspace...');
  return cleanH2('prod');
}
function devCleanH2Cache() {
  // console.log('[WORKING]'.blue, 'clean h2 cache');
  return cleanH2Cache('prod');
}
function devCreateH2Cache() {
  // console.log('[WORKING]'.blue, 'create h2 cache');
  return createH2Cache('prod');
}
function devCacheH2Core() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Caching files...');
  return cacheH2Core('prod');
}
function devCacheH2Utility() {
  // console.log('[WORKING]'.blue, 'cache h2 utilities');
  return cacheH2Utility('prod', 'compile');
}
function devCacheH2Partials() {
  // console.log('[WORKING]'.blue, 'cache h2 partials');
  return cacheH2Partials('prod');
}
function devSetMediaMap() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Creating utility maps...');
  return setMediaMap('prod');
}
function devSetColorMap() {
  // console.log('[WORKING]'.blue, 'set color map');
  return setColorMap('prod');
}
function devSetBorderWeightMap() {
  // console.log('[WORKING]'.blue, 'set border weight map');
  return setBorderWeightMap('prod');
}
function devSetContainerMap() {
  // console.log('[WORKING]'.blue, 'set container map');
  return setContainerMap('prod');
}
function devMoveFlexgridCore() {
  // console.log('[WORKING]'.blue, 'move flexgrid core');
  return moveFlexgridCore('prod');
}
function devMoveFlexgrid() {
  // console.log('[WORKING]'.blue, 'move flexgrid');
  return moveFlexgrid('prod');
}
function devEnableFlexgridCore() {
  // console.log('[WORKING]'.blue, 'enable flexgrid core');
  return enableFlexgridCore('prod');
}
function devEnableFlexgrid() {
  // console.log('[WORKING]'.blue, 'enable flexgrid');
  return enableFlexgrid('prod', 'compile');
}
function devSetFontFamilyMap() {
  // console.log('[WORKING]'.blue, 'set font family map');
  return setFontFamilyMap('prod');
}
function devSetFontBaseSize() {
  // console.log('[WORKING]'.blue, 'set font base size');
  return setFontBaseSize('prod');
}
function devSetCoreFontScale() {
  // console.log('[WORKING]'.blue, 'set core font scale');
  return setCoreFontScale('prod');
}
function devSetUtilityFontScale() {
  // console.log('[WORKING]'.blue, 'set utility font scale');
  return setUtilityFontScale('prod', 'compile');
}
function devSetGradientMap() {
  // console.log('[WORKING]'.blue, 'set gradient map');
  return setGradientMap('prod');
}
function devSetRadiusMap() {
  // console.log('[WORKING]'.blue, 'set radius map');
  return setRadiusMap('prod');
}
function devSetShadowMap() {
  // console.log('[WORKING]'.blue, 'set shadow map');
  return setShadowMap('prod');
}
function devSetWhitespaceVariable() {
  // console.log('[WORKING]'.blue, 'set whitespace variable');
  return setWhitespaceVariable('prod');
}
function devSetWhitespaceMap() {
  // console.log('[WORKING]'.blue, 'set whitespace map');
  return setWhitespaceMap('prod');
}
function devCompileCore() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Compiling Sass...');
  return compileCore('prod');
}
function devCompileUtility() {
  // console.log('[WORKING]'.blue, 'compile utility');
  return compileUtility('prod', 'compile');
}
function devBuildDevCSS() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Building development CSS...');
  return buildDevCSS('prod', 'compile');
}

// Success Message
function successMessage(done) {
  var defaults = loadH2Defaults('prod');
  var config = loadH2Config('prod');
  console.timeEnd('Hydrogen: Total Build Time');
  console.log('[SUCCESS]'.green, 'Hydrogen: you\'ve successfully compiled a development version of Hydrogen in the ' + config.folders.styles.green + '/'.green + ' folder.');
  done();
}

// Exports
exports.compile = series(
  compileStartMessage, 
  devCleanH2,
  devCleanH2Cache,
  devCreateH2Cache,
  devCacheH2Core, 
  devCacheH2Utility, 
  devCacheH2Partials,
  devSetMediaMap, 
  devSetColorMap, 
  devSetBorderWeightMap, 
  devSetContainerMap, 
  devMoveFlexgridCore, 
  devEnableFlexgridCore, 
  devMoveFlexgrid, 
  devEnableFlexgrid, 
  devSetFontFamilyMap, 
  devSetFontBaseSize, 
  devSetCoreFontScale, 
  devSetUtilityFontScale, 
  devSetGradientMap, 
  devSetRadiusMap, 
  devSetShadowMap, 
  devSetWhitespaceVariable, 
  devSetWhitespaceMap, 
  devCompileCore, 
  devCompileUtility,
  devBuildDevCSS,
  successMessage
);