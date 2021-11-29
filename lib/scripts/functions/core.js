// Hydrogen.css / Core Scripts

// =============================================================================

'use strict';

// Requirements
const { src, dest } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var del = require('del');
const fs = require('fs');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
var sass = require('gulp-sass')(require('sass'));

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

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
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  return del(path + config.folders.styles + '/hydrogen.css');
}

// Remove the Hydrogen cache folder.
function cleanH2Cache(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  return del(path + config.folders.styles + '/hydrogen', { force: true });
}

// Create the Hydrogen cache folder.
async function createH2Cache(env) {
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  if (fs.existsSync(path + config.folders.styles + '/hydrogen') == true) {
    // Do nothing.
  } else {
    fs.mkdirSync(path + config.folders.styles + '/hydrogen');
  }
  await Promise.resolve('done?');
}

// Remove the Hydrogen variable file.
function cleanH2Vars(env) {
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  return del(path + config.folders.styles + '/hydrogen-variables.scss', {
    force: true,
  });
}

// Create Hydrogen Vars
async function createH2Vars(env) {
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  if (
    fs.existsSync(path + config.folders.styles + '/hydrogen-variables.scss') ==
    true
  ) {
    // Do nothing.
  } else {
    fs.writeFileSync(
      path + config.folders.styles + '/hydrogen-variables.scss',
      ''
    );
  }
  await Promise.resolve('done?');
}

// Cache Hydrogen's files. These functions are passed a parameter than indicates whether the function is being called for Hydrogen's test stage, or production. Caching Hydrogen during the build process is required because the script needs to update the same cache file over and over to ensure changes to the file persist.
function cacheH2Core(env) {
  var config = loadH2Config(env);
  var flexgridEnabled = getFlexgridStatus(env);
  if (env == 'dev') {
    if (flexgridEnabled == true) {
      return src('./lib/styles/core.scss')
        .pipe(
          replace(
            '// @use "utilities/core-flex-grid";',
            '@use "utilities/core-flex-grid";'
          )
        )
        .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen'));
    } else {
      return src('./lib/styles/core.scss').pipe(
        dest('./lib/stage/' + config.folders.styles + '/hydrogen')
      );
    }
  } else if (env == 'prod') {
    if (flexgridEnabled == true) {
      return src(
        './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/core.scss'
      )
        .pipe(
          replace(
            '// @use "utilities/core-flex-grid";',
            '@use "utilities/core-flex-grid";'
          )
        )
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    } else {
      return src(
        './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/core.scss'
      ).pipe(dest('./' + config.folders.styles + '/hydrogen'));
    }
  }
}

function cacheStaticMaps(env) {
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
    return src([
      './lib/styles/maps/_map-font-size.scss',
      './lib/styles/maps/_map-sides.scss',
      './lib/styles/maps/_map-states.scss',
    ]).pipe(dest(path + config.folders.styles + '/hydrogen/maps'));
  } else if (env == 'prod') {
    path = './';
    return src([
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-font-size.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-sides.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-states.scss',
    ]).pipe(dest(path + config.folders.styles + '/hydrogen/maps'));
  }
}

function cacheH2Build(env, task) {
  var config = loadH2Config(env);
  var flexgridEnabled = getFlexgridStatus(env);
  if (env == 'dev') {
    if (task == 'compile') {
      if (flexgridEnabled == true) {
        return src('./lib/styles/compile.scss')
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
          .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen'));
      } else {
        return src('./lib/styles/compile.scss').pipe(
          dest('./lib/stage/' + config.folders.styles + '/hydrogen')
        );
      }
    } else if (task == 'build') {
      if (flexgridEnabled == true) {
        return src('./lib/styles/build/**/*').pipe(
          dest('./lib/stage/' + config.folders.styles + '/hydrogen/build')
        );
      } else {
        return src([
          './lib/styles/build/**/*',
          '!./lib/styles/build/flex-grid.scss',
          '!./lib/styles/build/order.scss',
        ]).pipe(
          dest('./lib/stage/' + config.folders.styles + '/hydrogen/build')
        );
      }
    }
  } else if (env == 'prod') {
    if (task == 'compile') {
      if (flexgridEnabled == true) {
        return src(
          './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/compile.scss'
        )
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
          .pipe(dest('./' + config.folders.styles + '/hydrogen'));
      } else {
        return src(
          './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/compile.scss'
        ).pipe(dest('./' + config.folders.styles + '/hydrogen'));
      }
    } else if (task == 'build') {
      if (flexgridEnabled == true) {
        return src(
          './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/build/**/*'
        ).pipe(dest('./' + config.folders.styles + '/hydrogen/build'));
      } else {
        return src([
          './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/build/**/*',
          '!./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/build/flex-grid.scss',
          '!./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/build/order.scss',
        ]).pipe(dest('./' + config.folders.styles + '/hydrogen/build'));
      }
    }
  }
}

function cacheH2Partials(env) {
  var config = loadH2Config(env);
  var flexgridEnabled = getFlexgridStatus(env);
  var flexgridColumns = getFlexgridColumns(env);
  var layerCount = getLayerCount(env);
  if (env == 'dev') {
    if (flexgridEnabled == true) {
      return src('./lib/styles/utilities/**/*')
        .pipe(
          replace(
            '$h2GridColumns: 12;',
            '$h2GridColumns: ' + flexgridColumns + ';'
          )
        )
        .pipe(
          replace('$h2LayerCount: 5;', '$h2LayerCount: ' + layerCount + ';')
        )
        .pipe(
          dest('./lib/stage/' + config.folders.styles + '/hydrogen/utilities')
        );
    } else {
      return src([
        './lib/styles/utilities/**/*',
        '!./lib/styles/utilities/_core-flex-grid.scss',
        '!./lib/styles/utilities/_utility-flex-grid.scss',
        '!./lib/styles/utilities/_utility-order.scss',
      ]).pipe(
        dest('./lib/stage/' + config.folders.styles + '/hydrogen/utilities')
      );
    }
  } else if (env == 'prod') {
    if (flexgridEnabled == true) {
      return src(
        './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/**/*'
      )
        .pipe(
          replace(
            '$h2GridColumns: 12;',
            '$h2GridColumns: ' + flexgridColumns + ';'
          )
        )
        .pipe(
          replace('$h2LayerCount: 5;', '$h2LayerCount: ' + layerCount + ';')
        )
        .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
    } else {
      return src([
        './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/**/*',
        '!./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_core-flex-grid.scss',
        '!./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-flex-grid.scss',
        '!./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-order.scss',
      ]).pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
    }
  }
}

// Compile
function compileCore(env) {
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  return src(path + config.folders.styles + '/hydrogen/core.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(path + config.folders.styles + '/hydrogen/compiled'));
}

function compileUtility(env, task) {
  var config = loadH2Config(env);
  var path;
  console.time(
    'H2 ' + '[TIMELOG]'.magenta + ' Sass compile time was',
    'sassTime'
  );
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  if (task == 'build') {
    return src(path + config.folders.styles + '/hydrogen/build/*.scss')
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(dest(path + config.folders.styles + '/hydrogen/compiled'));
  } else if (task == 'compile') {
    return src(path + config.folders.styles + '/hydrogen/compile.scss')
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(dest(path + config.folders.styles + '/hydrogen/compiled'));
  }
}

// Compress
function compressCore(env) {
  var config = loadH2Config(env);
  var path;
  console.timeEnd(
    'H2 ' + '[TIMELOG]'.magenta + ' Sass compile time was',
    'sassTime'
  );
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  return src(path + config.folders.styles + '/hydrogen/compiled/core.css')
    .pipe(postcss([cssnano()]))
    .pipe(dest(path + config.folders.styles + '/hydrogen/compressed'));
}

// Compress
function preCleanCompress(env) {
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  return src(path + config.folders.styles + '/hydrogen/compiled/**/*')
    .pipe(
      postcss([
        cssnano({
          preset: ['lite'],
        }),
      ])
    )
    .pipe(dest(path + config.folders.styles + '/hydrogen/compressed'));
}

function postCleanCompress(env) {
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  return src(path + config.folders.styles + '/hydrogen/cleaned/hydrogen.css')
    .pipe(postcss([cssnano()]))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(path + config.folders.styles));
}

function cleanCleanedFolder(env) {
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  return del(path + config.folders.styles + '/hydrogen/cleaned');
}

function compressCompiledLibrary(env) {
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  return src(path + config.folders.styles + '/hydrogen/cleaned/hydrogen.css')
    .pipe(postcss([cssnano()]))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(path + config.folders.styles));
}

// Delete the cache if debug isn't set to true.
async function deleteCache(env) {
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  if (
    config.debug == false ||
    config.debug == null ||
    config.debug == undefined
  ) {
    return del(path + config.folders.styles + '/hydrogen');
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
