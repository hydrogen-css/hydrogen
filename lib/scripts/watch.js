"use strict";

const { series, parallel, src, dest, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
var colors = require('colors');
const del = require('del');
var footer = require('gulp-footer');
const fs = require('fs');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');

// Set the Sass compiler to Dart Sass.
sass.compiler = require('sass');

// Load Hydrogen Modules
var loadDefaultConfig = require('./functions/config-default');
var loadUserConfig = require('./functions/config-user');
var loadMediaMap = require('./functions/map-media');
var loadColorMap = require('./functions/map-color');
var loadBorderWeightMap = require('./functions/map-border-weight');
var loadContainerMap = require('./functions/map-containers');
var setFontFaceCSS = require('./functions/set-font-face');
var loadFontFamilyMap = require('./functions/map-font-family');
var loadGradientMap = require('./functions/map-gradients');
var loadRadiusMap = require('./functions/map-radius');
var loadShadowMap = require('./functions/map-shadows');
var loadWhitespaceMap = require('./functions/map-whitespace');
var buildDevCSS = require('./functions/build-development-css');

// Signal task start.
function watchStartMessage(done) {
  console.log('Hydrogen: starting the compile...'.white);
  done();
}

// Load the config files.
var defaults;
var config;

function loadHydrogenConfig(done) {
  // Reset the variables.
  defaults = '';
  config = '';
  // Load the configs.
  defaults = loadDefaultConfig();
  config = loadUserConfig();
  // Signal completion.
  done();
}

// Clean Hydrogen
function cleanHydrogen() {
  return del('./' + config.folders.styles + '/hydrogen.css');
}

// Clean Stage
function cleanHydrogenCache() {
  return del('./' + config.folders.styles + '/hydrogen');
}

// Create the Hydrogen folder in the user's specified style path.
function createHydrogenCache(done) {
  fs.mkdirSync('./' + config.folders.styles + '/hydrogen');
  done();
}

// Cached H2
// This is required because each config setting needs to update a single instance of the Hydrogen file, otherwise they each create their own and overwrite the last.
function cacheHydrogenCore() {
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/core.scss')
    .pipe(dest('./' + config.folders.styles + '/hydrogen'));
}

function cacheHydrogenUtility() {
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utility.scss')
    .pipe(dest('./' + config.folders.styles + '/hydrogen'));
}

// Media
var mediaMap = '';

function buildMediaMap(done) {
  // Reset the variables.
  mediaMap = '';
  // Load the media map.
  mediaMap = loadMediaMap(defaults, config);
  // Signal completion.
  done();
}

function setMediaMap() {
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-media.scss')
    .pipe(footer(mediaMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
}

// Color
var colorMap = '';

function buildColorMap(done) {
  // Reset the variables.
  colorMap = '';
  // Load the color map.
  colorMap = loadColorMap(defaults, config);
  // Signal completion.
  done();
}

function setColorMap() {
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-color.scss')
    .pipe(footer(colorMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
}

// Border Weights
var borderWeightMap = '';

function buildBorderWeightMap(done) {
  // Reset the variables.
  borderWeightMap = '';
  // Load the border weight map.
  borderWeightMap = loadBorderWeightMap(defaults, config);
  // Signal completion.
  done();
}

function setBorderWeightMap() {
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-border-weight.scss')
    .pipe(footer(borderWeightMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
}

// Containers
var containerMap = '';

function buildContainerMap(done) {
  // Reset the variables.
  containerMap = '';
  // Load the map.
  containerMap = loadContainerMap(defaults, config);
  // Signal completion.
  done();
}

function setContainerMap() {
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-containers.scss')
    .pipe(footer(containerMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
}

// Flex Grid
var flexgridEnabled = false;
var flexgridColumns;

function setFlexgridConfig(done) {
  // Reset the variables.
  flexgridEnabled = false;
  flexgridColumns = undefined;
  // Set the options.
  if (config.flexgrid != null && config.flexgrid != undefined && config.flexgrid.enabled == true) {
    // console.log('Hydrogen: you\'ve successfully enabled flexgrid!');
    flexgridEnabled = true;
  }
  if (config.flexgrid != null && config.flexgrid != undefined && config.flexgrid.columns != null && config.flexgrid.columns != undefined) {
    // console.log('Hydrogen: you\'ve set a custom grid column value!');
    flexgridColumns = config.flexgrid.columns;
  } else {
    flexgridColumns = defaults.flexgrid.columns;
  }
  done();
}

// Move the flexgrid core file.
function moveFlexgridCore(done) {
  if (flexgridEnabled == true) {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_core-flex-grid.scss')
      .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
  } else {
    done();
  }
}

// Modify the cached version of H2's core.
function enableFlexgridCore(done) {
  if (flexgridEnabled == true) {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('// @use "utilities/core-flex-grid";', '@use "utilities/core-flex-grid";'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  } else {
    done();
  }
}

// Move the flexgrid utility file.
function moveFlexgrid(done) {
  if (flexgridEnabled == true) {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-flex-grid.scss')
      // Set the column variable to the user's specification, or use the default.
      .pipe(replace('$h2GridColumns: 12;', '$h2GridColumns: ' + flexgridColumns + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
  } else {
    done();
  }
}

// Modify the cached version of H2.
function enableFlexgrid(done) {
  if (flexgridEnabled == true) {
    return src('./' + config.folders.styles + '/hydrogen/utility.scss')
      .pipe(replace('// @use "utilities/utility-flex-grid";', '@use "utilities/utility-flex-grid";'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  } else {
    done();
  }
}

// Font Family
var fontFaceCSS = '';
var fontFamilyMap = '';

function buildFontFaceCSS(done) {
  // Reset the variables.
  fontFaceCSS = '';
  // Load the CSS.
  fontFaceCSS = setFontFaceCSS(defaults, config);
  // Signal completion.
  done();  
}

function buildFontFamilyMap(done) {
  // Reset the variables.
  fontFamilyMap = '';
  // Load the map.
  fontFamilyMap = loadFontFamilyMap(defaults, config);
  // Signal completion.
  done();
}

function setFontFamilyMap() {
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-font-families.scss')
    .pipe(footer(fontFamilyMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
}

// Font Size
function setFontBaseSize() {
  if (config.fontBaseSize != null && config.fontBaseSize != undefined) {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-base-size: $H2FONTBASESIZE;', '$h2-font-base-size: ' + config.fontBaseSize + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  } else {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-base-size: $H2FONTBASESIZE;', '$h2-font-base-size: ' + defaults.fontBaseSize + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  }
}

// Font Scale
function setCoreFontScale() {
  if (config.fontScale != null && config.fontScale != undefined && config.fontScale > 0) {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + config.fontScale + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  } else {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + defaults.fontScale + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  }
}
function setUtilityFontScale() {
  if (config.fontScale != null && config.fontScale != undefined && config.fontScale > 0) {
    return src('./' + config.folders.styles + '/hydrogen/utility.scss')
      .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + config.fontScale + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  } else {
    return src('./' + config.folders.styles + '/hydrogen/utility.scss')
      .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + defaults.fontScale + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  }
}

// Gradients
var gradientMap = '';

function buildGradientMap(done) {
  // Reset the variables.
  gradientMap = '';
  // Load the gradient map.
  gradientMap = loadGradientMap(defaults, config);
  // Signal completion.
  done();
}

function setGradientMap() {
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-gradient.scss')
  .pipe(footer(gradientMap))
  .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
}

// Radius
var radiusMap = '';

function buildRadiusMap(done) {
  // Reset the variables.
  radiusMap = '';
  // Load the map.
  radiusMap = loadRadiusMap(defaults, config)
  // Signal completion.
  done();
}

function setRadiusMap() {
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-radius.scss')
    .pipe(footer(radiusMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
}

// Shadow
var shadowMap = '';

function buildShadowMap(done) {
  // Reset the variables.
  shadowMap = '';
  // Load the shadow map.
  shadowMap = loadShadowMap(defaults, config);
  // Signal completion.
  done();
}

function setShadowMap() {
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-shadow.scss')
    .pipe(footer(shadowMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
}

// Whitespace
// This map is used by both margins and padding in the Sass file.
var whitespaceMap = '';

function buildWhitespaceMap(done) {
  // Reset the variables.
  whitespaceMap = '';
  // Get the whitespace map.
  whitespaceMap = loadWhitespaceMap(defaults, config);
  // Signal completion.
  done();
}

function setWhitespaceMap() {
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-whitespace.scss')
    .pipe(footer(whitespaceMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
}

// Compile
function compileCore() {
  return src('./' + config.folders.styles + '/hydrogen/core.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/compiled'));
}

function compileUtility() {
  return src('./' + config.folders.styles + '/hydrogen/utility.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/compiled'));
}

// Build the development CSS file.

// Compress
function compressCore() {
  return src('./' + config.folders.styles + '/hydrogen/compiled/core.css')
    .pipe(postcss([cssnano()]))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/compressed'));
}
function preCleanCompress() {
  return src('./' + config.folders.styles + '/hydrogen/compiled/utility.css')
    .pipe(postcss([cssnano({
      preset: ['lite']
    })]))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/compressed'));
}

// Get Markup

var markupArray = [];

function getUserMarkup(done) {
  if (Array.isArray(config.folders.markup) == true) {
    config.folders.markup.forEach(function(path, index, array) {
      markupArray = markupArray.concat('./' + path + '/**/*');
    });
    // console.log(markupString);
    done();
  } else {
    markupArray = markupArray.concat('./' + config.folders.markup + '/**/*');
    done();
  }
}

function createUserMarkup() {
  return src(markupArray)
  // return src(['./lib/stage/markup/**/*', './lib/stage/multimarkup/**/*'])
    .pipe(concat('markup.txt'))
    // This destination will have to be the CSS folder the user specifies.
    .pipe(dest('./' + config.folders.styles + '/hydrogen/markup'));
}

function cleanUserMarkup() {
  return del('./' + config.folders.styles + '/hydrogen/markup/**/*');
}

function cleanCleanedFolder() {
  return del('./' + config.folders.styles + '/hydrogen/cleaned');
}

// Remove Unwanted CSS
var hydrogen = '';

function createCleanCSS(done) {
  // Reset the variables.
  hydrogen = '';
  // Get the Hydrogen markup from the user's folder.
  var markup = fs.readFileSync('./' + config.folders.styles + '/hydrogen/markup/markup.txt').toString();
  // Get all instances of Hydrogen data attributes (data-h2-*="*").
  // var dataRegex = /data-h2-([^"]*)="([^"]*)"/g;
  var dataRegex = /data-h2-([^=\s]+)(?:(\s)|=["'{]([^"'}]*)["'}]{1}|.*)/g;
  // Get the utility portion of the attribute (data-h2-*).
  // var utilityRegex = /data-h2-([^=]*)/g;
  var utilityRegex = /data-h2-(?:([^=\s]*)|([^\s]+))/g;
  // Get individual attribute values (x(y)).
  var valueRegex = /([^"' ]*?)\(([^)]*)\)/g;
  // var valueRegex = /.\(.*\)/g;
  // Get the temporary core Hydrogen.
  var hydrogenCoreCSS = fs.readFileSync('./' + config.folders.styles + '/hydrogen/compressed/core.css').toString();
  // Get the temporary compressed Hydrogen file, located in the user's specified location in the config.
  var hydrogenUtilityCSS = fs.readFileSync('./' + config.folders.styles + '/hydrogen/compressed/utility.css').toString();
    // console.log('sampleCSS file: ', hydrogenUtilityCSS);
  // Set up a variable list of arrays for each media query in the config. Thanks Chris Wiseman!
  let queries = {
    b: []
  };
  if (config.media != null && config.media != undefined && config.media.length > 0) {
    config.media.forEach(function(mediaQuery) {
      queries[mediaQuery.name] = [];
    }); 
  } else {
    defaults.media.forEach(function(mediaQuery) {
      queries[mediaQuery.name] = [];
    }); 
  }
    // console.log(queries);
  // Set up a string variable for our final CSS file and assemble font face, and the core.
  hydrogen = '' + fontFaceCSS + hydrogenCoreCSS;
  // We'll then have to parse through each one and break things apart by media query, and add the * selector...
  // e.g. data-h2-bg-color="b(red) m(yellow)" needs to become [data-h2-bg-color*="b(red)"] and [data-h2-bg-color*="m(yellow)"]
  var usedAttributes = markup.match(dataRegex);
  // console.log(usedAttributes);
  if (usedAttributes != null) {
    usedAttributes.forEach(function(attribute) {
        // console.log(attribute);
      var utility = attribute.match(utilityRegex);
      var values = attribute.match(valueRegex);
        // console.log("Utility:", utility[0]);
        // console.log('Values inside each attribute:', values);
      if (values != null) {
        values.forEach(function(value) {
          // Get the media query set for this particular value.
          var mediaValue = value.match(/^.*?(?=\()/g); // Returns media value: x
            // console.log("media query: ", mediaValue);
          // We have to build a RegEx to match the correct media query by checking against the list of available media queries and getting their screen value. Don't forget that "b" will always be an option, which has an empty value because it represents all "screen" queries.
          var queryValue;
          var defaultQueries = mediaMap;
          // Construct the query RegEx.
          var queryRegEx = `"` + mediaValue + `": ".*?(?:")`;
          // Create the RegEx.
          var createQueryRegEx = new RegExp(queryRegEx, 'g');
          // Search the default queries for the value.
          var queryMatch = defaultQueries.match(createQueryRegEx); // Returns media query: "x": "screen and..."
            // console.log(queryMatch);
          // Isolate the query itself so it can be used as text.
          if (queryMatch != null) {
              // console.log("queryMatch: ", queryMatch[0]);
            queryValue = queryMatch[0].match(/[^"]([^"]*)[^"\s]/g); // Returns the media side of the media query: screen and...
              // console.log("final media query: ", queryValue);
            // This if statement is required to work around the nested nature of the flex-grid CSS. All of the grid CSS is applied to the file at the end of the build every time until this can be solved.
            var newRegEx;
            if (utility[0] == "data-h2-flex-item") {
                // console.log("There's a flex item here.");
              newRegEx = '\\[data-h2-flex-grid\\] > \\[' + utility + '\\*="' + value.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\]([^{])*{([^}])*}';
            } else if (utility[0] == "data-h2-flex-item-content") {
              // Do nothing.
            } else {
              newRegEx = '\\[' + utility + '\\*="' + value.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\]([^{])*{([^}])*}';
            }
              // console.log(value);
              // console.log(newRegEx);
            var cssRegex = new RegExp(newRegEx, 'g');
              // console.log('css specific regex: ', cssRegex);
              // console.log('test css regex: ', /\[data-h2-bg-color\*="b\(red\)"\]{([^}])*}/g);
            var cssMatch = hydrogenUtilityCSS.match(cssRegex); // Returns the full CSS selector: [data-hydrogen=VARVERSION] [data-h2-ATTRIBUTE*="MEDIA(VALUE)"]***{CSS}
              // console.log('css match values: ', cssMatch);
            if (cssMatch != null) {
              // Transform the matched CSS to include its media query.
              // var CSSwithMedia = '@media ' + queryValue[0] + '{' + cssMatch + '}';
                // console.log(CSSwithMedia);
              // hydrogen = hydrogen.concat(CSSwithMedia);
                // console.log(queries);
                // console.log(queries[mediaValue]);
              queries[mediaValue] = queries[mediaValue].concat(cssMatch);
                // console.log(queries);
            }
          } else {
            if (config.mediaWarnings != false) {
              console.log('[WARNING] Hydrogen: there\'s no matching media query in the media query map for the query '.yellow + mediaValue[0] + '.'.yellow);
            }
          }
        }); 
      }
    });
    // Loop through each media query array now that they're populated with CSS and concatenate them into the final file.
      // console.log(queries);
    for (let query in queries) {
      var queryValue;
        // console.log(queryValue);
      var defaultQueries = mediaMap;
      // Construct the query RegEx.
      var queryRegEx = `"` + query + `": ".*?(?:")`;
      // Create the RegEx.
      var createQueryRegEx = new RegExp(queryRegEx, 'g');
      // Search the default queries for the value.
      var queryMatch = defaultQueries.match(createQueryRegEx); // Returns media query: "x": "screen and..."
        // console.log(queryMatch);
      // Isolate the query itself so it can be used as text.
      if (queryMatch != null) {
          // console.log("queryMatch: ", queryMatch[0]);
        queryValue = queryMatch[0].match(/ "([^"])*"/g); // Returns the media side of the media query: screen and...
      } else {
        if (config.mediaWarnings != false) {
          console.log('[WARNING] Hydrogen: there\'s no matching media query in the media query map for the query '.yellow + mediaValue[0] + '.'.yellow);
        }
      }
      // Append the media query to the CSS group.
      hydrogen = hydrogen + '@media' + queryValue[0].replace(/["']/g, "") + ' {';
      // Add the CSS to the media query.
      queries[query].forEach(function(item) {
          // console.log(item);
        hydrogen = hydrogen + item;
      })
      // Close the media query.
      hydrogen = hydrogen + '}';
    }
      // console.log('final css: ', hydrogen);
    // Create the cleaned folder and write the file.
    fs.mkdirSync('./' + config.folders.styles + '/hydrogen/cleaned');
    fs.writeFile('./' + config.folders.styles + '/hydrogen/cleaned/hydrogen.css', hydrogen, function(err) {
      if (err) {
        console.log('Hydrogen: ', err);
      }
    });
  } else {
    console.error('[ERROR] Hydrogen: we couldn\'t find any Hydrogen attributes in your markup so the build failed.'.red);
    return false;
  }
  done();
}

// Compress
function postCleanCompress() {
  return src('./' + config.folders.styles + '/hydrogen/cleaned/hydrogen.css')
    .pipe(postcss([cssnano()]))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(dest('./' + config.folders.styles));
}

function successMessage(done) {
  console.log('[SUCCESS] Hydrogen: you\'ve successfully compiled Hydrogen. Hydrogen is watching for changes to your hydrogen.config.json file, as well as your markup.'.green);
  done();
}
function watchCleanStartMessage(done) {
  console.log('Hydrogen: changes detected to your markup... compiling...');
  done();
}

// Prod Prep Task
const watchSeries = series(
  watchStartMessage,
  loadHydrogenConfig, 
  cleanHydrogen,
  cleanHydrogenCache, 
  createHydrogenCache, 
  cacheHydrogenCore, 
  cacheHydrogenUtility, 
  buildMediaMap, setMediaMap, 
  buildColorMap, setColorMap, 
  buildBorderWeightMap, setBorderWeightMap, 
  buildContainerMap, setContainerMap, 
  setFlexgridConfig, moveFlexgridCore, enableFlexgridCore, moveFlexgrid, enableFlexgrid, 
  buildFontFaceCSS, buildFontFamilyMap, setFontFamilyMap, setFontBaseSize, setCoreFontScale, setUtilityFontScale, 
  buildGradientMap, setGradientMap, 
  buildRadiusMap, setRadiusMap, 
  buildShadowMap, setShadowMap, 
  buildWhitespaceMap, setWhitespaceMap, 
  compileCore, 
  compileUtility,
  compressCore, 
  preCleanCompress, 
  getUserMarkup, createUserMarkup,
  createCleanCSS, 
  postCleanCompress,
  successMessage
);

const watchCleanSeries = series(
  watchCleanStartMessage,
  cleanUserMarkup,
  cleanCleanedFolder,
  getUserMarkup, createUserMarkup,
  createCleanCSS, 
  postCleanCompress,
  successMessage
);

// Watch the config files for changes.
function watchConfig() {
  watch(['./hydrogen.config.json'], series(watchSeries));
  var watchMarkupArray = [];
  function getWatchUserMarkup() {
    if (Array.isArray(config.folders.markup) == true) {
      config.folders.markup.forEach(function(path, index, array) {
        watchMarkupArray = watchMarkupArray.concat('./' + path + '/**/*');
      });
    } else {
      watchMarkupArray = watchMarkupArray.concat('./' + config.folders.markup + '/**/*');
    }
  }
  getWatchUserMarkup();
  // console.log(watchMarkupArray);
  watch(watchMarkupArray, series(watchCleanSeries));
}

exports.watch = series(
  watchSeries,
  parallel(watchConfig)
);