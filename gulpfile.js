"use strict";

const { series, parallel, src, dest, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
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

// Load Hydrogen Modules
var loadMediaMap = require('./lib/scripts/functions/map-media');
var loadColorMap = require('./lib/scripts/functions/map-color');
var loadBorderWeightMap = require('./lib/scripts/functions/map-border-weight');
var loadContainerMap = require('./lib/scripts/functions/map-containers');
var setFontFaceCSS = require('./lib/scripts/functions/set-font-face');
var loadFontFamilyMap = require('./lib/scripts/functions/map-font-family');
var loadGradientMap = require('./lib/scripts/functions/map-gradients');
var loadRadiusMap = require('./lib/scripts/functions/map-radius');
var loadShadowMap = require('./lib/scripts/functions/map-shadows');
var loadWhitespaceMap = require('./lib/scripts/functions/map-whitespace');
var buildDevCSS = require('./lib/scripts/functions/build-development-css');

// Load the config files.
var defaults;
var config;

function loadConfig(done) {
  console.time('Compile Time');
  // Reset the variables.
  defaults = undefined;
  config = undefined;
  // Import the default JSON config file.
  defaults = JSON.parse(fs.readFileSync('./lib/hydrogen.default.json'));
  // Import the user's JSON config file.
  config = JSON.parse(fs.readFileSync('./lib/stage/hydrogen.config.json'));
  done();
}

// Clean Hydrogen
function cleanHydrogen() {
  return del('./' + config.folders.styles + '/hydrogen.css');
}

// Clean Cache
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
  return src('./lib/styles/core.scss')
    .pipe(dest('./' + config.folders.styles + '/hydrogen'));
}

function cacheHydrogenUtility() {
  return src('./lib/styles/utility.scss')
    .pipe(dest('./' + config.folders.styles + '/hydrogen'));
}

function cacheHydrogenPartials() {
  return src([
    './lib/styles/utilities/_utility-align-content.scss',
    './lib/styles/utilities/_utility-align-items.scss',
    './lib/styles/utilities/_utility-align-self.scss',
    './lib/styles/utilities/_utility-bg-color.scss',
    './lib/styles/utilities/_utility-border.scss',
    './lib/styles/utilities/_utility-container.scss',
    './lib/styles/utilities/_utility-display.scss',
    './lib/styles/utilities/_utility-flex-direction.scss',
    './lib/styles/utilities/_utility-flex-wrap.scss',
    './lib/styles/utilities/_utility-font-color.scss',
    './lib/styles/utilities/_utility-font-family.scss',
    './lib/styles/utilities/_utility-font-size.scss',
    './lib/styles/utilities/_utility-font-style.scss',
    './lib/styles/utilities/_utility-font-weight.scss',
    './lib/styles/utilities/_utility-justify-content.scss',
    './lib/styles/utilities/_utility-location.scss',
    './lib/styles/utilities/_utility-margin.scss',
    './lib/styles/utilities/_utility-overflow.scss',
    './lib/styles/utilities/_utility-padding.scss',
    './lib/styles/utilities/_utility-position.scss',
    './lib/styles/utilities/_utility-radius.scss',
    './lib/styles/utilities/_utility-shadow.scss',
    './lib/styles/utilities/_utility-text-align.scss',
    './lib/styles/utilities/_utility-visibility.scss'
  ])
    .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
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
  return src('./lib/styles/maps/_map-media.scss')
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
  return src('./lib/styles/maps/_map-color.scss')
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
  return src('./lib/styles/maps/_map-border-weight.scss')
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
  return src('./lib/styles/maps/_map-containers.scss')
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
    return src('./lib/styles/utilities/_core-flex-grid.scss')
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
    return src('./lib/styles/utilities/_utility-flex-grid.scss')
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
      .pipe(replace('// @use "utilities/utility-flex-grid" as flexGridStyles;', '@use "utilities/utility-flex-grid" as flexGridStyles;'))
      .pipe(replace('// @include flexGridStyles.h2-utility-flex-grid($mediaKey: "MEDIAKEY");', '@include flexGridStyles.h2-utility-flex-grid($mediaKey: "MEDIAKEY");'))
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
  return src('./lib/styles/maps/_map-font-families.scss')
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
  return src('./lib/styles/maps/_map-gradient.scss')
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
  return src('./lib/styles/maps/_map-radius.scss')
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
  return src('./lib/styles/maps/_map-shadow.scss')
    .pipe(footer(shadowMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
}

// Whitespace
// This map is used by both margins and padding in the Sass file.
var whitespaceMap = '';

function buildWhitespaceMap() {
  // Reset the variables.
  whitespaceMap = '';
  // Get the whitespace map.
  whitespaceMap = loadWhitespaceMap(defaults, config);
  var whitespaceScaleConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.whitespaceScale != null && config.whitespaceScale != undefined && config.whitespaceScale.length > 0) {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-whitespace-scale: $H2WHITESPACESCALE;', '$h2-whitespace-scale: ' + config.whitespaceScale + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  } else {
    whitespaceScaleConfig = defaults.whitespaceScale;
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-whitespace-scale: $H2WHITESPACESCALE;', '$h2-whitespace-scale: ' + defaults.whitespaceScale + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  }
}

function setWhitespaceMap() {
  return src('./lib/styles/maps/_map-whitespace.scss')
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

function createDevelopmentCSS(done) {
  // Build the CSS.
  buildDevCSS(config, fontFaceCSS);
  // Signal completion.
  done();
}

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
    // console.timeLog('Compile Time');
    done();
  } else {
    markupArray = markupArray.concat('./' + config.folders.markup + '/**/*');
    // console.timeLog('Compile Time');
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
          var mediaVariable = value.replace(mediaValue, "MEDIAKEY");
          // console.log(value, mediaValue, mediaVariable);
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
            // newRegEx = '[^{}]*\\[' + utility + '\\*="' + value.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\][^{]*{[^}]*}';
            newRegEx = '[^{}]*?\\[' + utility + '\\*="' + mediaVariable.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\][^{]*{[^}]*}';
            // console.log(value);
            // console.log(newRegEx);
            var cssRegex = new RegExp(newRegEx, 'g');
            // console.log('css specific regex: ', cssRegex);
            // console.log('test css regex: ', /\[data-h2-bg-color\*="b\(red\)"\]{([^}])*}/g);
            var cssMatch = hydrogenUtilityCSS.match(cssRegex); // Returns the full CSS selector: [data-hydrogen=VARVERSION] [data-h2-ATTRIBUTE*="MEDIA(VALUE)"]***{CSS}
            // console.log('css match values: ', cssMatch);
            // console.log("CSSMATCH:".green, cssMatch);
            if (cssMatch != null) {
              // var cssFinal = cssMatch[0].replace("MEDIAKEY", mediaValue);
              var cssFinal = [];
              cssMatch.forEach(function(match) {
                cssFinal = cssFinal.concat(match.replace("MEDIAKEY", mediaValue));
              });
              // Transform the matched CSS to include its media query.
              // var CSSwithMedia = '@media ' + queryValue[0] + '{' + cssMatch + '}';
              // console.log(CSSwithMedia);
              // hydrogen = hydrogen.concat(CSSwithMedia);
              // console.log(queries);
              // console.log(queries[mediaValue]);
              queries[mediaValue] = queries[mediaValue].concat(cssFinal);
              // console.log(queries);
            }
          } else {
            if (config.mediaWarnings != false) {
              console.log('[WARNING]'.yellow, 'Hydrogen: there is a media query being used in your markup', '('.yellow + mediaValue[0].yellow + ')'.yellow, 'that hasn\'t been defined in the media section of your configuration file.');
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
          console.log('[WARNING]'.yellow, 'Hydrogen: there is a media query being used in your markup', '('.yellow + mediaValue[0].yellow + ')'.yellow, 'that hasn\'t been defined in the media section of your configuration file.');
        }
      }
      // Append the media query to the CSS group.
      hydrogen = hydrogen + '@media' + queryValue[0].replace(/["']/g, "") + ' {';
      // Add the CSS to the media query.
      // console.log(queries[query]);
      queries[query].forEach(function(item) {
        // console.log(item);
        hydrogen = hydrogen + item;
      })
      // console.log(hydrogen);
      // Close the media query.
      hydrogen = hydrogen + '}';
    }
    // console.log('final css: ', hydrogen);
    // Create the cleaned folder and write the file.
    fs.mkdirSync('./' + config.folders.styles + '/hydrogen/cleaned');
    fs.writeFile('./' + config.folders.styles + '/hydrogen/cleaned/hydrogen.css', hydrogen, function(err) {
      if (err) {
        console.log('[ERROR]'.red, 'Hydrogen: ', err);
      }
    });
  } else {
    console.error('[ERROR]'.red, 'Hydrogen: we couldn\'t find any Hydrogen attributes in your markup so the build failed.');
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

function watchSuccessMessage(done) {
  // console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - ");
  console.log('[WATCHING]'.blue, 'Hydrogen: you\'ve successfully compiled Hydrogen. We\'re now watching for changes to your configuration file and markup.');
  console.timeEnd('Compile Time');
  done();
}

function compileSuccessMessage(done) {
  console.log('[SUCCESS]'.green, 'Hydrogen: you\'ve successfully compiled a development version of Hydrogen in the ' + config.folders.styles.green + '/'.green + ' folder.');
  done();
}

function buildSuccessMessage(done) {
  console.log('[SUCCESS]'.green, 'Hydrogen: you\'ve successfully built a production version of Hydrogen in the ' + config.folders.styles.green + '/'.green + ' folder.');
  done();
}

function watchCleanStartMessage(done) {
  console.log('[WORKING]'.blue, 'Hydrogen: we noticed some changes, so we\'re compiling...');
  done();
}

// Generic Tasks
const buildScripts = series(
  loadConfig, 
  cleanHydrogen,
  cleanHydrogenCache, 
  createHydrogenCache, 
  cacheHydrogenCore, 
  cacheHydrogenUtility, 
  cacheHydrogenPartials,
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
  postCleanCompress
)

const devWatchCleanSeries = series(
  watchCleanStartMessage,
  cleanUserMarkup,
  cleanCleanedFolder,
  getUserMarkup, createUserMarkup,
  createCleanCSS, 
  postCleanCompress,
  watchSuccessMessage
);

// Dev Prep Task
const devWatchSeries = series(
  buildScripts,
  createDevelopmentCSS,
  watchSuccessMessage
);

exports.compile = series(devWatchSeries, compileSuccessMessage);

// Watch the config files for changes.
function devWatchConfig() {
  watch('./lib/stage/hydrogen.config.json', series(devWatchSeries));
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
  watch(watchMarkupArray, series(devWatchCleanSeries));
}

exports.watch = series(
  devWatchSeries,
  parallel(devWatchConfig)
);

exports.build = series(
  buildScripts, 
  buildSuccessMessage
);