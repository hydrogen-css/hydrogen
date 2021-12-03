// Hydrogen.css / Development Watch Script

// =============================================================================

'use strict';

// Requirements
const { series, parallel, watch } = require('gulp');
var colors = require('colors');

// Load Hydrogen's Configuration
var {
  loadH2Defaults,
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Load Hydrogen Core Scripts
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

// Load Hydrogen Modules
var {
  setMediaQuerySassVariables,
  setMediaMap,
} = require('../functions/map-media');
var { setColorVariables, setColorMap } = require('../functions/map-color');
var {
  setBorderWeightSassVariables,
  setBorderWeightMap,
} = require('../functions/map-border-weight');
var {
  setContainerSassVariables,
  setContainerMap,
} = require('../functions/map-containers');
var {
  setFontScaleSassVariables,
  setFontFamilyMap,
  setFontBaseSize,
  setCoreFontScale,
  setUtilityFontScale,
} = require('../functions/set-fonts');
var {
  setGradientSassVariables,
  setGradientMap,
} = require('../functions/map-gradients');
var {
  setOpacitySassVariables,
  setOpacityMap,
} = require('../functions/map-opacity');
var {
  setRadiusSassVariables,
  setRadiusMap,
} = require('../functions/map-radius');
var {
  setShadowSassVariables,
  setShadowMap,
} = require('../functions/map-shadows');
var {
  setWhitespaceSassVariables,
  setWhitespaceVariable,
  setWhitespaceMap,
} = require('../functions/map-whitespace');
var { setWidthSassVariables, setWidthMap } = require('../functions/map-widths');
var createCleanCSS = require('../functions/clean-css');

// Set Environment
var env = 'dev';
var taskType = 'build';

// =============================================================================

// Start Message
function compileStartMessage(done) {
  console.time(
    'Hydrogen '.gray + '[TIMELOG]'.magenta + ' Total build time was',
    'buildTime'
  );
  console.log(
    'Hydrogen'.gray,
    '[WORKING]'.blue,
    'Building the production file...'
  );
  done();
}

// NOTE: It's required to have these wrapper functions because there is some weird script order things happening with Gulp. Essentially, "loadH2Config" doesn't technically run until after the series, and so Gulp tries to run the series with the variables set to undefined and fails. By wrapping the functions with Gulp tasks, it includes them in the order properly, and so they receive the configs as expected. Not sure why this is... but it's necessary to include the loading of the config files inside its own function so that it can be called on things like watch.

function devCleanH2() {
  console.log('Hydrogen'.gray, '[WORKING]'.blue, 'Preparing workspace...');
  return cleanH2(env);
}
function devCleanH2Cache() {
  return cleanH2Cache(env);
}
function devCreateH2Cache() {
  return createH2Cache(env);
}
function devCacheH2Core() {
  console.log('Hydrogen'.gray, '[WORKING]'.blue, 'Caching files...');
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
    'Hydrogen'.gray,
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
  return setWhitespaceVariable(env);
}
function devSetWhitespaceMap() {
  return setWhitespaceMap(env);
}
function devSetWidthMap() {
  return setWidthMap(env);
}
function devCompileCore() {
  console.log('Hydrogen'.gray, '[WORKING]'.blue, 'Compiling Sass...');
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
    'Hydrogen'.gray,
    '[WORKING]'.blue,
    'Scraping code and building CSS...'
  );
  return createCleanCSS(env);
}
function devPostCleanCompress() {
  console.log('Hydrogen'.gray, '[WORKING]'.blue, 'Compressing final CSS...');
  return postCleanCompress(env, taskType);
}

// Variable Generation
function gulpCleanH2SassVars() {
  return cleanH2Vars(env);
}
function gulpCreateH2SassVars() {
  return createH2Vars(env);
}
function gulpSetH2ColorSassVars() {
  return setColorVariables(env);
}
function gulpSetH2BorderWeightSassVars() {
  return setBorderWeightSassVariables(env);
}
function gulpSetH2ContainerWidthSassVars() {
  return setContainerSassVariables(env);
}
function gulpSetH2FontScaleSassVars() {
  return setFontScaleSassVariables(env);
}
function gulpSetH2GradientSassVars() {
  return setGradientSassVariables(env);
}
function gulpSetH2MediaQuerySassVars() {
  return setMediaQuerySassVariables(env);
}
function gulpSetH2OpacitySassVars() {
  return setOpacitySassVariables(env);
}
function gulpSetH2RadiusSassVars() {
  return setRadiusSassVariables(env);
}
function gulpSetH2ShadowSassVars() {
  return setShadowSassVariables(env);
}
function gulpSetH2WhitespaceSassVars() {
  return setWhitespaceSassVariables(env);
}
function gulpSetH2WidthSassVars() {
  return setWidthSassVariables(env);
}
const createVars = series(
  gulpCleanH2SassVars,
  gulpCreateH2SassVars,
  gulpSetH2BorderWeightSassVars,
  gulpSetH2ColorSassVars,
  gulpSetH2ContainerWidthSassVars,
  gulpSetH2FontScaleSassVars,
  gulpSetH2GradientSassVars,
  gulpSetH2MediaQuerySassVars,
  gulpSetH2OpacitySassVars,
  gulpSetH2RadiusSassVars,
  gulpSetH2ShadowSassVars,
  gulpSetH2WhitespaceSassVars,
  gulpSetH2WidthSassVars
);

async function devCreateVars() {
  var config = loadH2Config(env);
  if (config.variables && config.variables.sass.enabled == 'true') {
    console.time(
      'Hydrogen '.gray +
        '[TIMELOG]'.magenta +
        ' Sass variable generation time was',
      'varBuildTime'
    );
    createVars();
    console.timeEnd(
      'Hydrogen '.gray +
        '[TIMELOG]'.magenta +
        ' Sass variable generation time was',
      'varBuildTime'
    );
  } else {
    // console.log("Woops, vars aren't enabled!");
    // Do nothing.
  }
  await Promise.resolve('done?');
}

// Success Message
function successMessage(done) {
  try {
    var destRoot = getH2DestinationPath(env);
    var outputDir = getH2OutputDirectory(env);
    var destPath = destRoot + outputDir;
    console.timeEnd(
      'Hydrogen '.gray + '[TIMELOG]'.magenta + ' Total build time was',
      'buildTime'
    );
    console.log(
      'Hydrogen'.gray,
      '[SUCCESS]'.green,
      "You've successfully built a production version of Hydrogen in " +
        destPath.bold.green +
        '/'.bold.green +
        '.'
    );
    console.log('Hydrogen is now watching for changes to your code...'.dim);
    done();
  } catch (ex) {
    console.error('Hydrogen'.gray, '[ERROR]'.red, ex);
    return false;
  }
}

const buildSeries = series(
  compileStartMessage,
  devCleanH2,
  devCreateVars,
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
  getWatchUserMarkup();
  // console.log(codeArray);
  watch(codeArray, series(watchSeries));
}

exports.watch = series(buildSeries, parallel(enableWatch));
