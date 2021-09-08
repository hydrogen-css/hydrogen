// Hydrogen.css / Development Init Script

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
const prompt = require('prompt');
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

prompt.message = colors.white('H2 ') + colors.blue('[PROMPT]');
prompt.delimiter = colors.white(':');

const properties = [
  {
    name: 'markupFolder',
    required: true,
    description: colors.white(' please enter the path to your main markup from the root of your project (e.g. src/templates or html). If your project has multiple markup folders, you can add them to an array in the hydrogen.config.json file afterwards. Learn more in the Hydrogen docs. Markup folder path')
  },
  {
    name: 'scriptFolder',
    required: true,
    description: colors.white(' please enter the path to your main scripts folder from the root of your project (e.g. src/scripts or js). If your project has multiple scripts folders, you can add them to an array in the hydrogen.config.json file afterwards. Learn more in the Hydrogen docs. Scripts folder path')
  },
  {
    name: 'styleFolder',
    required: true,
    description: colors.white(' please enter the path to your styles folder from the root of your project (e.g. src/styles or css). Styles folder path')
  }
];

var markup = '';
var scripts = '';
var styles = '';
var hydrogenInit = '';

function setFolders(done) {
  // console.log(fs.existsSync('./hydrogen.config.json'));
  if (fs.existsSync('./hydrogen.config.json') == false) {
    prompt.start();
    prompt.get(properties, function (err, result) {
      markup = result.markupFolder;
      scripts = result.scriptFolder;
      styles = result.styleFolder;
      done();
    });
  } else {
    console.log('H2', '[ERROR]'.red, 'It looks like you already have a Hydrogen configuration file in your project root. Please use that file instead.');
    done('Error');
  }
}

function createHydrogenInit(done) {
  if (fs.existsSync('./' + markup) == true) {
    if (fs.existsSync('./' + scripts) == true ) {
      if (fs.existsSync('./' + styles) == true) {
        var defaults = loadH2Defaults('prod');
        defaults.folders.markup = markup;
        defaults.folders.scripts = scripts;
        defaults.folders.styles = styles;
        // Reset the variables.
        // hydrogenInit = '{\n  "folders": {\n    "markup": "' + markup + '",\n    "scripts": "' + scripts + '",\n    "styles": "' + styles + '"\n  }\n}';
        // Write the file.
        fs.writeFile('./hydrogen.config.json', JSON.stringify(defaults, null, 2), function(err) {
          if (err) {
            console.log('H2', '[ERROR]'.red, err);
            done('Error');
          }
        });
        done();
      } else {
        console.log('H2', '[ERROR]'.red, 'The styles folder specified in your Hydrogen configuration file doesn\'t seem to exist yet. Set it up and try again.');
        done('Error');
      }
    } else {
      console.log('H2', '[ERROR]'.red, 'The scripts folder specified in your Hydrogen configuration file doesn\'t seem to exist yet. Set it up and try again.');
        done('Error');
    }
  } else {
    console.log('H2', '[ERROR]'.red, 'The markup folder specified in your Hydrogen configuration file doesn\'t seem to exist yet. Set it up and try again.');
    done('Error');
  }
}

function initSuccess(done) {
  console.log('H2', '[SUCCESS]'.green, 'You\'ve successfully created a Hydrogen configuration file. All the defaults have been added, but you can see all available configuration options at https://hydrogen.design');
  done();
}

exports.init = series(setFolders, createHydrogenInit, initSuccess);