// Hydrogen.css / Core Scripts

// =============================================================================

'use strict';

// Requirements
const { src, dest } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var del = require('del');
const fs = require('fs');
const path = require('path');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
var sass = require('gulp-sass')(require('sass'));

// Load Hydrogen's Configuration
var {
  loadH2Defaults,
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Load the Flex Grid Configuration
var {
  getFlexgridStatus,
  getFlexgridColumns,
} = require('../functions/set-flex-grid');

// Load the layer configuration.
var { getLayerCount } = require('../functions/set-layer-count');

// =============================================================================

// Clean Hydrogen.css.
function cleanH2(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  return del(destPath + '/hydrogen.css');
}

// Remove the Hydrogen cache folder.
function cleanH2Cache(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  return del(destPath + '/hydrogen', { force: true });
}

// Create the Hydrogen cache folder.
async function createH2Cache(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  if (fs.existsSync(destPath + '/hydrogen') == true) {
    // Do nothing.
  } else {
    fs.mkdirSync(destPath + '/hydrogen');
  }
  await Promise.resolve('done?');
}

// ---

/**
 * Deletes any existing variable files to prepare for the new one
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} format Either 'css' or 'sass'
 * @returns Del - force deletes any existing Hydrogen CSS variable files
 */
function cleanH2Vars(env, format) {
  try {
    var destRoot = getH2DestinationPath(env);
    var outputDir = getH2OutputDirectory(env);
    var destPath = destRoot + outputDir;
    var fileExtension = '';
    if (format == 'css') {
      fileExtension = 'css';
    } else if (format == 'sass') {
      fileExtension = 'scss';
    } else {
      throw "You haven't specified what kind of format of variable file you want to delete.";
    }
    return del(destPath + '/hydrogen-variables.' + fileExtension, {
      force: true,
    });
  } catch (err) {
    return err;
  }
}

/**
 * Async - Uses fs.writeFileSync to create an empty variable file to be populated
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} format Either 'css' or 'sass'
 */
async function createH2Vars(env, format) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var fileExtension = '';
  var prefix = '';
  if (format == 'css') {
    fileExtension = 'css';
    prefix = ':root {\n';
  } else if (format == 'sass') {
    fileExtension = 'scss';
  }
  if (
    fs.existsSync(destPath + '/hydrogen-variables.' + fileExtension) == true
  ) {
    // Do nothing.
  } else {
    fs.writeFileSync(destPath + '/hydrogen-variables.' + fileExtension, prefix);
  }
  await Promise.resolve('done');
}

// ---

// Cache Hydrogen's files. These functions are passed a parameter than indicates whether the function is being called for Hydrogen's test stage, or production. Caching Hydrogen during the build process is required because the script needs to update the same cache file over and over to ensure changes to the file persist.
function cacheH2Core(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var flexgridEnabled = getFlexgridStatus(env);
  if (flexgridEnabled == true) {
    return src(path.resolve(__dirname, '../../styles/core.scss'))
      .pipe(
        replace(
          '// @use "utilities/core-flex-grid";',
          '@use "utilities/core-flex-grid";'
        )
      )
      .pipe(dest(destPath + '/hydrogen'));
  } else {
    return src(path.resolve(__dirname, '../../styles/core.scss')).pipe(
      dest(destPath + '/hydrogen')
    );
  }
}

function cacheStaticMaps(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  return src([
    path.resolve(__dirname, '../../styles/maps/_map-font-size.scss'),
    path.resolve(__dirname, '../../styles/maps/_map-sides.scss'),
    path.resolve(__dirname, '../../styles/maps/_map-states.scss'),
  ]).pipe(dest(destPath + '/hydrogen/maps'));
}

function cacheH2Build(env, task) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var flexgridEnabled = getFlexgridStatus(env);
  if (task == 'compile') {
    if (flexgridEnabled == true) {
      return src(path.resolve(__dirname, '../../styles/compile.scss'))
        .pipe(
          replace(
            '// @use "utilities/utility-flex-grid" as flexGridStyles;',
            '@use "utilities/utility-flex-grid" as flexGridStyles;'
          )
        )
        .pipe(
          replace(
            '// @include flexGridStyles.h2-utility-flex-grid($mediaKey: $mediaKey);',
            '@include flexGridStyles.h2-utility-flex-grid($mediaKey: $mediaKey);'
          )
        )
        .pipe(
          replace(
            '// @use "utilities/utility-order" as orderStyles;',
            '@use "utilities/utility-order" as orderStyles;'
          )
        )
        .pipe(
          replace(
            '// @include orderStyles.h2-utility-order($mediaKey: $mediaKey);',
            '@include orderStyles.h2-utility-order($mediaKey: $mediaKey);'
          )
        )
        .pipe(dest(destPath + '/hydrogen'));
    } else {
      return src(path.resolve(__dirname, '../../styles/compile.scss')).pipe(
        dest(destPath + '/hydrogen')
      );
    }
  } else if (task == 'build') {
    if (flexgridEnabled == true) {
      return src(path.resolve(__dirname, '../../styles/build/**/*')).pipe(
        dest(destPath + '/hydrogen/build')
      );
    } else {
      return src([
        path.resolve(__dirname, '../../styles/build/**/*'),
        '!' + path.resolve(__dirname, '../../styles/build/flex-grid.scss'),
        '!' + path.resolve(__dirname, '../../styles/build/order.scss'),
      ]).pipe(dest(destPath + '/hydrogen/build'));
    }
  }
}

function cacheH2Partials(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var flexgridEnabled = getFlexgridStatus(env);
  var flexgridColumns = getFlexgridColumns(env);
  var layerCount = getLayerCount(env);
  if (flexgridEnabled == true) {
    return src(path.resolve(__dirname, '../../styles/utilities/**/*'))
      .pipe(
        replace(
          '$h2GridColumns: 12;',
          '$h2GridColumns: ' + flexgridColumns + ';'
        )
      )
      .pipe(replace('$h2LayerCount: 5;', '$h2LayerCount: ' + layerCount + ';'))
      .pipe(dest(destPath + '/hydrogen/utilities'));
  } else {
    return src([
      path.resolve(__dirname, '../../styles/utilities/**/*'),
      '!' + path.resolve(__dirname, '../../styles/utilities/_core-flex-grid.scss'),
      '!' + path.resolve(__dirname, '../../styles/utilities/_utility-flex-grid.scss'),
      '!' + path.resolve(__dirname, '../../styles/utilities/_utility-order.scss'),
    ]).pipe(dest(destPath + '/hydrogen/utilities'));
  }
}

// Compile
function compileCore(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  return src(destPath + '/hydrogen/core.scss')
    .pipe(sass.sync())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(destPath + '/hydrogen/compiled'));
}

function compileUtility(env, task) {
  console.time(
    'Hydrogen ' + '[TIMELOG]'.magenta + ' Sass compile time was',
    'sassTime'
  );
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  if (task == 'build') {
    return src(destPath + '/hydrogen/build/*.scss')
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(dest(destPath + '/hydrogen/compiled'));
  } else if (task == 'compile') {
    return src(destPath + '/hydrogen/compile.scss')
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(dest(destPath + '/hydrogen/compiled'));
  }
}

// Compress
function compressCore(env) {
  console.timeEnd(
    'Hydrogen ' + '[TIMELOG]'.magenta + ' Sass compile time was',
    'sassTime'
  );
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  return src(destPath + '/hydrogen/compiled/core.css')
    .pipe(postcss([cssnano()]))
    .pipe(dest(destPath + '/hydrogen/compressed'));
}

// Compress
function preCleanCompress(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  return src(destPath + '/hydrogen/compiled/**/*')
    .pipe(
      postcss([
        cssnano({
          preset: ['lite'],
        }),
      ])
    )
    .pipe(dest(destPath + '/hydrogen/compressed'));
}

function postCleanCompress(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  return src(destPath + '/hydrogen/cleaned/hydrogen.css')
    .pipe(postcss([cssnano()]))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(destPath));
}

function cleanCleanedFolder(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  return del(destPath + '/hydrogen/cleaned');
}

function compressCompiledLibrary(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  return src(destPath + '/hydrogen/cleaned/hydrogen.css')
    .pipe(postcss([cssnano()]))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(destPath));
}

// Delete the cache if debug isn't set to true.
async function deleteCache(env) {
  var config = loadH2Config(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  if (
    config.debug == false ||
    config.debug == null ||
    config.debug == undefined
  ) {
    return del(destPath + '/hydrogen');
  } else {
    // Do nothing
  }
  await Promise.resolve('done?');
}

module.exports = {
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
  cleanCleanedFolder,
  compressCompiledLibrary,
  deleteCache,
};
