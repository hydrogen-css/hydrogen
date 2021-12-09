// Hydrogen.css / Development Compile Script

'use strict';

// Import Gulp and its dependencies
const { series } = require('gulp');
var colors = require('colors');

// ---

// Import Hydrogen's configuration scripts
var {
  loadH2Config,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Import Hydrogen's utility modules
var {
  cleanH2,
  cleanH2Cache,
  createH2Cache,
  cleanH2Vars,
  createH2Vars,
  cacheH2Core,
  cacheStaticMaps,
  cacheH2Build,
  cacheH2Partials,
  compileCore,
  compileUtility,
  compressCompiledLibrary,
  deleteCache,
} = require('../functions/core');

var { generateH2Variables } = require('../functions/variable-generation');

// Import Hydrogen's style modules
var { setMediaMap } = require('../functions/map-media');
var { setColorMap } = require('../functions/map-color');
var { setBorderWeightMap } = require('../functions/map-border-weight');
var { setContainerMap } = require('../functions/map-containers');
var {
  setFontFamilyMap,
  setFontBaseSize,
  setCoreFontScale,
  setUtilityFontScale,
} = require('../functions/set-fonts');
var { setGradientMap } = require('../functions/map-gradients');
var { setOpacityMap } = require('../functions/map-opacity');
var { setRadiusMap } = require('../functions/map-radius');
var { setShadowMap } = require('../functions/map-shadows');
var {
  setWhitespaceScaleValue,
  setWhitespaceMap,
} = require('../functions/map-whitespace');
var { setWidthMap } = require('../functions/map-widths');

// Import Hydrogen's development compilation script
var buildDevCSS = require('../functions/build-development-css');

// ---

// Set the environment and task type
var env = 'prod';
var taskType = 'compile';

// ---

// Start Message
function compileStartMessage(done) {
  console.time(
    'Hydrogen ' + '[TIMELOG]'.magenta + ' Total build time was',
    'buildTime'
  );
  console.log(
    'Hydrogen',
    '[WORKING]'.blue,
    'Compiling the entire library. Expect this to take a while...'
  );
  done();
}

// NOTE: It's required to have these wrapper functions because there is some weird script order things happening with Gulp. Essentially, "loadH2Config" doesn't technically run until after the series, and so Gulp tries to run the series with the variables set to undefined and fails. By wrapping the functions with Gulp tasks, it includes them in the order properly, and so they receive the configs as expected. Not sure why this is... but it's necessary to include the loading of the config files inside its own function so that it can be called on things like watch.

function devCleanH2() {
  console.log('Hydrogen', '[WORKING]'.blue, 'Preparing workspace...');
  return cleanH2(env);
}
function devCleanH2Cache() {
  return cleanH2Cache(env);
}
function devCreateH2Cache() {
  return createH2Cache(env);
}
function devCacheH2Core() {
  console.log('Hydrogen', '[WORKING]'.blue, 'Caching files...');
  return cacheH2Core(env);
}
function devCacheStaticMaps() {
  return cacheStaticMaps(env);
}
function devCacheH2Build() {
  return cacheH2Build(env, taskType);
}
function devCacheH2Partials() {
  return cacheH2Partials(env);
}
function devSetMediaMap() {
  console.log(
    'Hydrogen',
    '[WORKING]'.blue,
    'Creating style maps from the config...'
  );
  return setMediaMap(env);
}
function devSetColorMap() {
  return setColorMap(env);
}
function devSetBorderWeightMap() {
  return setBorderWeightMap(env);
}
function devSetContainerMap() {
  return setContainerMap(env);
}
function devSetFontFamilyMap() {
  return setFontFamilyMap(env);
}
function devSetFontBaseSize() {
  return setFontBaseSize(env);
}
function devSetCoreFontScale() {
  return setCoreFontScale(env);
}
function devSetUtilityFontScale() {
  return setUtilityFontScale(env, taskType);
}
function devSetGradientMap() {
  return setGradientMap(env);
}
function devSetOpacityMap() {
  return setOpacityMap(env);
}
function devSetRadiusMap() {
  return setRadiusMap(env);
}
function devSetShadowMap() {
  return setShadowMap(env);
}
function devSetWhitespaceVariable() {
  return setWhitespaceScaleValue(env);
}
function devSetWhitespaceMap() {
  return setWhitespaceMap(env);
}
function devSetWidthMap() {
  return setWidthMap(env);
}
function devCompileCore() {
  console.log('Hydrogen', '[WORKING]'.blue, 'Compiling Sass...');
  return compileCore(env);
}
function devCompileUtility() {
  return compileUtility(env, taskType);
}
function devBuildDevCSS() {
  console.log('Hydrogen', '[WORKING]'.blue, 'Building the development CSS...');
  return buildDevCSS(env);
}
function devCompressCompiledLibrary() {
  console.log('Hydrogen', '[WORKING]'.blue, 'Compressing the library...');
  return compressCompiledLibrary(env);
}
function devDeleteCache() {
  return deleteCache(env, taskType);
}

// ---

// CSS variable generation
function gulpCleanH2CSSVars() {
  return cleanH2Vars(env, 'css');
}
function gulpCreateH2CSSVars() {
  return createH2Vars(env, 'css');
}
function gulpSetH2CSSVariables() {
  return generateH2Variables(env, 'css');
}

// Set the CSS variable series
const createCSSVars = series(
  gulpCleanH2CSSVars,
  gulpCreateH2CSSVars,
  gulpSetH2CSSVariables
);

async function gulpCreateCSSVariables() {
  var config = loadH2Config(env);
  if (config.variables && config.variables.css.enabled == 'true') {
    console.time(
      'Hydrogen ' + '[TIMELOG]'.magenta + ' CSS variable generation time was',
      'varBuildTime'
    );
    createCSSVars();
    console.timeEnd(
      'Hydrogen ' + '[TIMELOG]'.magenta + ' CSS variable generation time was',
      'varBuildTime'
    );
  } else {
    // console.log("Woops, vars aren't enabled!");
    // Do nothing.
  }
  await Promise.resolve('done?');
}

// Sass variable generation
function gulpCleanH2SassVars() {
  return cleanH2Vars(env, 'sass');
}
function gulpCreateH2SassVars() {
  return createH2Vars(env, 'sass');
}
function gulpSetH2SassVariables() {
  return generateH2Variables(env, 'sass');
}

// Set the Sass variable series
const createSassVars = series(
  gulpCleanH2SassVars,
  gulpCreateH2SassVars,
  gulpSetH2SassVariables
);

async function gulpCreateSassVariables() {
  var config = loadH2Config(env);
  if (config.variables && config.variables.sass.enabled == 'true') {
    console.time(
      'Hydrogen ' + '[TIMELOG]'.magenta + ' Sass variable generation time was',
      'varBuildTime'
    );
    createSassVars();
    console.timeEnd(
      'Hydrogen ' + '[TIMELOG]'.magenta + ' Sass variable generation time was',
      'varBuildTime'
    );
  } else {
    // console.log("Woops, vars aren't enabled!");
    // Do nothing.
  }
  await Promise.resolve('done?');
}

// ---

// Success Message
function successMessage(done) {
  try {
    var destRoot = getH2DestinationPath(env);
    var outputDir = getH2OutputDirectory(env);
    var destPath = destRoot + outputDir;
    console.timeEnd(
      'Hydrogen ' + '[TIMELOG]'.magenta + ' Total build time was',
      'buildTime'
    );
    console.log(
      'Hydrogen',
      '[SUCCESS]'.green,
      "You've successfully compiled a development version of Hydrogen in " +
        destPath.bold.green +
        '/'.bold.green +
        '.'
    );
    console.log(
      'Hydrogen',
      '[WARNING]'.yellow,
      'Please note that the full library should not be used in production. Please run npx h2-build to generate a production-ready file.'
    );
    done();
  } catch (ex) {
    console.error('Hydrogen', '[ERROR]'.red, ex);
    return false;
  }
}

// Exports
exports.compile = series(
  compileStartMessage,
  devCleanH2,
  gulpCreateCSSVariables,
  gulpCreateSassVariables,
  devCleanH2Cache,
  devCreateH2Cache,
  devCacheH2Core,
  devCacheStaticMaps,
  devCacheH2Build,
  devCacheH2Partials,
  devSetMediaMap,
  devSetColorMap,
  devSetBorderWeightMap,
  devSetContainerMap,
  devSetFontFamilyMap,
  devSetFontBaseSize,
  devSetCoreFontScale,
  devSetUtilityFontScale,
  devSetGradientMap,
  devSetOpacityMap,
  devSetRadiusMap,
  devSetShadowMap,
  devSetWhitespaceVariable,
  devSetWhitespaceMap,
  devSetWidthMap,
  devCompileCore,
  devCompileUtility,
  devBuildDevCSS,
  devCompressCompiledLibrary,
  devDeleteCache,
  successMessage
);
