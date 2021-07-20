// Hydrogen.css / Development Build Script

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
var { cleanH2, cleanH2Cache, createH2Cache, cacheH2Core, cacheH2Utility, cacheH2Partials, compileCore, compileUtility, compressCore, preCleanCompress, postCleanCompress, deleteCache } = require('../functions/core');

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
var { createUserMarkup } = require('../functions/set-markup');
var createCleanCSS = require('../functions/clean-css');

// =============================================================================

// Start Message
function compileStartMessage(done) {
  console.time('Hydrogen: Sass Compile Time');
  console.time('Hydrogen: Total Build Time');
  console.time('Hydrogen: Custom Reduction Time');
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Building the production file...');
  done();
}

// NOTE: It's required to have these wrapper functions because there is some weird script order things happening with Gulp. Essentially, "loadH2Config" doesn't technically run until after the series, and so Gulp tries to run the series with the variables set to undefined and fails. By wrapping the functions with Gulp tasks, it includes them in the order properly, and so they receive the configs as expected. Not sure why this is... but it's necessary to include the loading of the config files inside its own function so that it can be called on things like watch.

function devCleanH2() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Preparing workspace...');
  return cleanH2('dev');
}
function devCleanH2Cache() {
  return cleanH2Cache('dev');
}
function devCreateH2Cache() {
  return createH2Cache('dev');
}
function devCacheH2Core() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Caching files...');
  return cacheH2Core('dev');
}
function devCacheH2Utility() {
  return cacheH2Utility('dev', 'build');
}
function devCacheH2Partials() {
  return cacheH2Partials('dev');
}
function devSetMediaMap() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Creating utility maps...');
  return setMediaMap('dev');
}
function devSetColorMap() {
  return setColorMap('dev');
}
function devSetBorderWeightMap() {
  return setBorderWeightMap('dev');
}
function devSetContainerMap() {
  return setContainerMap('dev');
}
function devMoveFlexgridCore() {
  return moveFlexgridCore('dev');
}
function devMoveFlexgrid() {
  return moveFlexgrid('dev');
}
function devEnableFlexgridCore() {
  return enableFlexgridCore('dev');
}
function devEnableFlexgrid() {
  return enableFlexgrid('dev', 'build');
}
function devSetFontFamilyMap() {
  return setFontFamilyMap('dev');
}
function devSetFontBaseSize() {
  return setFontBaseSize('dev');
}
function devSetCoreFontScale() {
  return setCoreFontScale('dev');
}
function devSetUtilityFontScale() {
  return setUtilityFontScale('dev', 'build');
}
function devSetGradientMap() {
  return setGradientMap('dev');
}
function devSetRadiusMap() {
  return setRadiusMap('dev');
}
function devSetShadowMap() {
  return setShadowMap('dev');
}
function devSetWhitespaceVariable() {
  return setWhitespaceVariable('dev');
}
function devSetWhitespaceMap() {
  return setWhitespaceMap('dev');
}
function devCompileCore() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Compiling Sass...');
  return compileCore('dev');
}
function devCompileUtility() {
  return compileUtility('dev', 'build');
}
function devCompressCore() {
  return compressCore('dev', 'build');
}
function devPreCleanCompress() {
  return preCleanCompress('dev', 'build');
}
function devCreateUserMarkup() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Scanning markup...');
  return createUserMarkup('dev');
}
function devCreateCleanCSS() {
  return createCleanCSS('dev');
}
function devPostCleanCompress() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Compressing final CSS...');
  return postCleanCompress('dev', 'build');
}
function devDeleteCache() {
  return deleteCache('dev', 'build');
}

// Success Message
function successMessage(done) {
  var defaults = loadH2Defaults('dev');
  var config = loadH2Config('dev');
  console.timeEnd('Hydrogen: Total Build Time');
  console.log('[SUCCESS]'.green, 'Hydrogen: you\'ve successfully built a production version of Hydrogen in the ' + config.folders.styles.green + '/'.green + ' folder.');
  done();
}

// Exports
exports.build = series(
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
  devCompressCore,
  devPreCleanCompress,
  devCreateUserMarkup,
  devCreateCleanCSS,
  devPostCleanCompress,
  devDeleteCache,
  successMessage
);