// Hydrogen.css / Development Watch Script

'use strict';

// Import Gulp and its dependencies
const { src, dest, series, parallel, watch } = require('gulp');
var footer = require('gulp-footer');
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
  compressCore,
  preCleanCompress,
  postCleanCompress,
} = require('../functions/core');

var { generateH2Variables } = require('../functions/variable-generation');

// Import Hydrogen's style modules
var { setMediaMap } = require('../functions/map-media');
var { setBorderWeightMap } = require('../functions/map-border-weight');
var { setColorMap } = require('../functions/map-color');
var { setContainerMap } = require('../functions/map-containers');
var {
  setFontFamilyMap,
  setFontBaseSize,
  setCoreFontScale,
  setUtilityFontScale,
} = require('../functions/set-fonts');
var { setGradientMap } = require('../functions/map-gradients');
var { setHeightMap } = require('../functions/map-heights');
var { setOpacityMap } = require('../functions/map-opacity');
var { setRadiusMap } = require('../functions/map-radius');
var { setShadowMap } = require('../functions/map-shadows');
var {
  setWhitespaceScaleValue,
  setWhitespaceMap,
} = require('../functions/map-whitespace');
var { setWidthMap } = require('../functions/map-widths');
var createCleanCSS = require('../functions/clean-css');

// ---

// Set the environment and task type
var env = 'dev';
var taskType = 'build';

// ---

// Start Message
function compileStartMessage(done) {
  console.time(
    'Hydrogen ' + '[TIMELOG]'.magenta + ' Total build time was',
    'buildTime'
  );
  console.log('Hydrogen', '[WORKING]'.blue, 'Building the production file...');
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
function devSetHeightMap() {
  return setHeightMap(env);
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
function devCompressCore() {
  return compressCore(env, taskType);
}
function devPreCleanCompress() {
  return preCleanCompress(env, taskType);
}
function devCreateCleanCSS() {
  console.log(
    'Hydrogen',
    '[WORKING]'.blue,
    'Scraping code and building CSS...'
  );
  return createCleanCSS(env);
}
function devPostCleanCompress() {
  console.log('Hydrogen', '[WORKING]'.blue, 'Compressing final CSS...');
  return postCleanCompress(env, taskType);
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
  if (
    (config.variables && config.variables.css.enabled == 'true') ||
    (config.variables && config.variables.css.enabled == true)
  ) {
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
  if (
    (config.variables && config.variables.sass.enabled == 'true') ||
    (config.variables && config.variables.sass.enabled == true)
  ) {
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
      'A production-ready CSS file was built in ' +
        destPath.bold.green +
        '/'.bold.green +
        '.'
    );
    console.log('Hydrogen is now watching for changes to your code...'.dim);
    done();
  } catch (ex) {
    console.error('Hydrogen', '[ERROR]'.red, ex);
    return false;
  }
}

const buildSeries = series(
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
  devSetHeightMap,
  devSetOpacityMap,
  devSetRadiusMap,
  devSetShadowMap,
  devSetWhitespaceVariable,
  devSetWhitespaceMap,
  devSetWidthMap,
  devCompileCore,
  devCompileUtility,
  devCompressCore,
  devPreCleanCompress,
  devCreateCleanCSS,
  devPostCleanCompress,
  successMessage
);

const watchSeries = series(
  compileStartMessage,
  devCreateCleanCSS,
  devPostCleanCompress,
  successMessage
);

// Watch the config files for changes.
function enableWatch() {
  var config = loadH2Config(env);
  var envPath = '';
  if (env == 'dev') {
    envPath = 'lib/stage/';
  }
  watch(['./' + envPath + 'hydrogen.config.json'], series(buildSeries));
  var codeArray = [];
  function getWatchUserMarkup() {
    if (Array.isArray(config.input) == true) {
      config.input.forEach(function (path, index, array) {
        codeArray = codeArray.concat('./' + envPath + path + '/**/*');
      });
    } else if (config.input != null && config.input != undefined) {
      codeArray = codeArray.concat('./' + envPath + config.input + '/**/*');
    } else {
      if (Array.isArray(config.folders.markup) == true) {
        config.folders.markup.forEach(function (path, index, array) {
          codeArray = codeArray.concat('./' + envPath + path + '/**/*');
        });
      } else {
        codeArray = codeArray.concat(
          './' + envPath + config.folders.markup + '/**/*'
        );
      }
      if (Array.isArray(config.folders.scripts) == true) {
        config.folders.scripts.forEach(function (path, index, array) {
          codeArray = codeArray.concat('./' + envPath + path + '/**/*');
        });
      } else {
        codeArray = codeArray.concat(
          './' + envPath + config.folders.scripts + '/**/*'
        );
      }
    }
  }
  getWatchUserMarkup();
  // console.log(codeArray);
  watch(codeArray, series(watchSeries));
}

exports.watch = series(buildSeries, parallel(enableWatch));
