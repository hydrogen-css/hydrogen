"use strict";

const { series, parallel, src, dest, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
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

// Load the config files.
var defaults;
var config;

function devLoadHydrogenConfig(done) {
  // Reset the variables.
  defaults = undefined;
  config = undefined;
  // Import the default JSON config file.
  defaults = JSON.parse(fs.readFileSync('src/hydrogen.default.json'));
  // Import the user's JSON config file.
  config = JSON.parse(fs.readFileSync('./src/stage/hydrogen.config.json'));
  done();
}

function loadHydrogenConfig(done) {
  // Reset the variables.
  defaults = undefined;
  config = undefined;
  // Import the default JSON config file.
  defaults = JSON.parse(fs.readFileSync('src/hydrogen.default.json'));
  console.log("Hydrogen: defaults loaded!");
  // Check to see if the user has a config file and load it.
  if (fs.existsSync('./hydrogen.config.json') == false) {
    console.log('Hydrogen: you do not have a hydrogen.config.json file in your project root. Please create one to continue.');
    return false;
  } else {
    // Import the user's JSON config file.
    config = JSON.parse(fs.readFileSync('./hydrogen.config.json'));
  }
  done();
}

// Clean Stage
function cleanHydrogenCache() {
  return del(config.styles.path + '/hydrogen');
}

// Create the Hydrogen folder in the user's specified style path.
function createHydrogenCache(done) {
  fs.mkdirSync(config.styles.path + '/hydrogen');
  done();
}

// Cached H2
// This is required because each config setting needs to update a single instance of the Hydrogen file, otherwise they each create their own and overwrite the last.
function cacheHydrogenCore() {
  return src('src/styles/core.scss')
    .pipe(dest(config.styles.path + '/hydrogen'));
}
function cacheHydrogenUtility() {
  return src('src/styles/utility.scss')
    .pipe(dest(config.styles.path + '/hydrogen'));
}

// Media
var mediaMap = '';

function buildMediaMap(done) {
  // Reset the variables.
  mediaMap = '';
  // Create string.
  var mediaMapStringStart = '$h2-map-media: ("base": "screen",';
  var mediaMapStringContent = '';
  var mediaMapStringEnd = ');';
  var mediaConfig;
  if (config.media != null && config.media != undefined && config.media.length > 0) {
    mediaConfig = config.media;
  } else {
    mediaConfig = defaults.media;
  }
  mediaConfig.forEach(function(mediaQuery) {
    // console.log(mediaQuery);
  var mediaString = '"' + mediaQuery.name + '": ' + '"screen and (min-width: ' + mediaQuery.value + ')",';
  mediaMapStringContent = mediaMapStringContent.concat(mediaString);
    // console.log(mediaMapStringContent);
  });
  mediaMap = mediaMap.concat(mediaMapStringStart).concat(mediaMapStringContent).concat(mediaMapStringEnd);
  done();
}

function setMediaMap() {
  return src('src/styles/maps/_map-media.scss')
    .pipe(footer(mediaMap))
    .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Color
var colorMap = '';
var colorOpacityMap = {
  '[1]': '1',
  '[.9]': '-.1',
  '[.8]': '-.2',
  '[.7]': '-.3',
  '[.6]': '-.4',
  '[.5]': '-.5',
  '[.4]': '-.6',
  '[.3]': '-.7',
  '[.2]': '-.8',
  '[.1]': '-.9',
  '[0]': '-1'
};

function buildColorMap(done) {
  // Reset the variables.
  colorMap = '';
  // Create string.
  var colorMapStringStart = '@use "sass:color"; $h2-map-color: (';
  var colorMapStringContent = '';
  var colorMapStringEnd = ');';
  var colorConfig;
  if (config.colors != null && config.colors != undefined && config.colors.length > 0) {
    colorConfig = config.colors;
  } else {
    colorConfig = defaults.colors;
  }
  colorConfig.forEach(function(color) {
    var colorString = '"' + color.name + '": ' + color.color + ',';
    var colorLightString = '"[light]' + color.name + '": color.scale(' + color.color + ', $lightness: 25%),';
    var colorDarkString = '"[dark]' + color.name + '": color.scale(' + color.color + ', $lightness: -15%, $saturation: -10%),';
    var colorOpacityString = '';
    if (color.opacity != null && color.opacity != undefined && color.opacity == true) {
      // console.log('Color:', color.name, 'has opacity set to true!');
      for (let opacity in colorOpacityMap) {
        colorOpacityString = colorOpacityString + '"' + color.name + opacity + '": color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '),';
          // console.log('Color Opacity String: ', colorOpacityString);
        colorOpacityString = colorOpacityString + '"[light]' + color.name + opacity + '": color.scale(color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '), $lightness: 25%),';
        colorOpacityString = colorOpacityString + '"[dark]' + color.name + opacity + '": color.scale(color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '), $lightness: -15%, $saturation: -10%),';
      }
    }
    colorMapStringContent = colorMapStringContent.concat(colorString).concat(colorLightString).concat(colorDarkString).concat(colorOpacityString);
  });
  colorMap = colorMap.concat(colorMapStringStart).concat(colorMapStringContent).concat(colorMapStringEnd);
  done();
}

function setColorMap() {
  return src('src/styles/maps/_map-color.scss')
    .pipe(footer(colorMap))
    .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Border Weights
var borderWeightMap = '';

function buildBorderWeightMap(done) {
  // Reset the variables.
  borderWeightMap = '';
  // Create string.
  var borderWeightMapStringStart = '$h2-map-border-weight: (';
  var borderWeightMapStringContent = '';
  var borderWeightMapStringEnd = ');';
  var borderWeightConfig;
  if (config.borderWeights != null && config.borderWeights != undefined && config.borderWeights.length > 0) {
    borderWeightConfig = config.borderWeights;
  } else {
    borderWeightConfig = defaults.borderWeights;
  }
  borderWeightConfig.forEach(function(borderWeights) {
    var borderWeightsString = '"' + borderWeights.name + '": ' + borderWeights.weight + ',';
    borderWeightMapStringContent = borderWeightMapStringContent.concat(borderWeightsString);
  });
  borderWeightMap = borderWeightMap.concat(borderWeightMapStringStart).concat(borderWeightMapStringContent).concat(borderWeightMapStringEnd);
  done();
}

function setBorderWeightMap() {
  return src('src/styles/maps/_map-border-weight.scss')
    .pipe(footer(borderWeightMap))
    .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Containers
var containerMap = '';

function buildContainerMap(done) {
  // Reset the variables.
  containerMap = '';
  // Create string.
  var containerMapStringStart = '$h2-map-containers: ("full": "none",';
  var containerMapStringContent = '';
  var containerMapStringEnd = ');';
  var containerConfig;
  if (config.containers != null && config.containers != undefined && config.containers.length > 0) {
    containerConfig = config.containers;
  } else {
    containerConfig = defaults.containers;
  }
  containerConfig.forEach(function(containers) {
    var containersString = '"' + containers.name + '": "' + containers.maxWidth + '",';
    containerMapStringContent = containerMapStringContent.concat(containersString);
  });
  containerMap = containerMap.concat(containerMapStringStart).concat(containerMapStringContent).concat(containerMapStringEnd);
  done();
}

function setContainerMap() {
  return src('src/styles/maps/_map-containers.scss')
    .pipe(footer(containerMap))
    .pipe(dest(config.styles.path + '/hydrogen/maps'));
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
  if (config.flexgrid.columns != null && config.flexgrid.columns != undefined) {
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
    return src('src/styles/utilities/_core-flex-grid.scss')
      .pipe(dest(config.styles.path + '/hydrogen/utilities'));
  } else {
    done();
  }
}

// Modify the cached version of H2's core.
function enableFlexgridCore(done) {
  if (flexgridEnabled == true) {
    return src(config.styles.path + '/hydrogen/core.scss')
      .pipe(replace('// @use "utilities/core-flex-grid";', '@use "utilities/core-flex-grid";'))
      .pipe(dest(config.styles.path + '/hydrogen'));
  } else {
    done();
  }
}

// Move the flexgrid utility file.
function moveFlexgrid(done) {
  if (flexgridEnabled == true) {
    return src('src/styles/utilities/_utility-flex-grid.scss')
      // Set the column variable to the user's specification, or use the default.
      .pipe(replace('$h2GridColumns: 12;', '$h2GridColumns: ' + flexgridColumns + ';'))
      .pipe(dest(config.styles.path + '/hydrogen/utilities'));
  } else {
    done();
  }
}

// Modify the cached version of H2.
function enableFlexgrid(done) {
  if (flexgridEnabled == true) {
    return src(config.styles.path + '/hydrogen/utility.scss')
      .pipe(replace('// @use "utilities/utility-flex-grid";', '@use "utilities/utility-flex-grid";'))
      .pipe(dest(config.styles.path + '/hydrogen'));
  } else {
    done();
  }
}

// Font Family
var fontFaceCSS = '';
var fontFamilyMap = '';

function buildFontFamilyMap(done) {
  // Reset the variables.
  fontFaceCSS = '';
  fontFamilyMap = '';
  // Create string.
  var fontFamilyMapStringStart = '$h2-map-font-families: (';
  var fontFamilyMapStringContent = '';
  var fontFamilyMapStringEnd = ');';
  var fontFamilyConfig;
  if (config.fonts != null && config.fonts != undefined && config.fonts.length > 0) {
    fontFamilyConfig = config.fonts;
    // Font Face Styles
    fontFamilyConfig.forEach(function(fontFamily) {
      if (fontFamily.loadType == 'font-face' || fontFamily.loadType == 'fontFace') {
        var fontFaceCSSStringStart = '@font-face {';
        var fontFaceCSSStringContent = 'font-family: ' + fontFamily.name + '; src: url(' + fontFamily.url + ');';
        var fontFaceCSSStringEnd = '}';
        fontFaceCSS = fontFaceCSS.concat(fontFaceCSSStringStart).concat(fontFaceCSSStringContent).concat(fontFaceCSSStringEnd);
      }
    });
  } else {
    fontFamilyConfig = defaults.fonts;
  }
  // Font Family Generation
  fontFamilyConfig.forEach(function(fontFamily) {
    var fontFamilyString = '"' + fontFamily.name + '": "' + fontFamily.value + '",';
    fontFamilyMapStringContent = fontFamilyMapStringContent.concat(fontFamilyString);
  });
  fontFamilyMap = fontFamilyMap.concat(fontFamilyMapStringStart).concat(fontFamilyMapStringContent).concat(fontFamilyMapStringEnd);
  done();
}

function setFontFamilyMap() {
  return src('src/styles/maps/_map-font-families.scss')
    .pipe(footer(fontFamilyMap))
    .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Font Size
function setFontBaseSize() {
  if (config.fontBaseSize != null && config.fontBaseSize != undefined) {
    return src(config.styles.path + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-base-size: $H2FONTBASESIZE;', '$h2-font-base-size: ' + config.fontBaseSize + ';'))
      .pipe(dest(config.styles.path + '/hydrogen'));
  } else {
    return src(config.styles.path + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-base-size: $H2FONTBASESIZE;', '$h2-font-base-size: ' + defaults.fontBaseSize + ';'))
      .pipe(dest(config.styles.path + '/hydrogen'));
  }
}

// Font Scale
function setCoreFontScale() {
  if (config.fontScale != null && config.fontScale != undefined && config.fontScale > 0) {
    return src(config.styles.path + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + config.fontScale + ';'))
      .pipe(dest(config.styles.path + '/hydrogen'));
  } else {
    return src(config.styles.path + '/hydrogen/core.scss')
      .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + defaults.fontScale + ';'))
      .pipe(dest(config.styles.path + '/hydrogen'));
  }
}
function setUtilityFontScale() {
  if (config.fontScale != null && config.fontScale != undefined && config.fontScale > 0) {
    return src(config.styles.path + '/hydrogen/utility.scss')
      .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + config.fontScale + ';'))
      .pipe(dest(config.styles.path + '/hydrogen'));
  } else {
    return src(config.styles.path + '/hydrogen/utility.scss')
      .pipe(replace('$h2-font-scale: $H2FONTSCALE;', '$h2-font-scale: ' + defaults.fontScale + ';'))
      .pipe(dest(config.styles.path + '/hydrogen'));
  }
}

// Gradients
var gradientMap = '';

function buildGradientMap(done) {
  // Reset the variables.
  gradientMap = '';
  // Create string.
  if (config.gradients != null && config.gradients != undefined && config.gradients.length > 0) {
    // The user has specified their own gradients. There is no default alternative to this, because Hydrogen doesn't ship with gradients by default.
    var gradientStringStart = '@use "sass:color"; $h2-map-gradient: (';
    var gradientStringContent = '';
    var gradientStringEnd = ');';
    config.gradients.forEach(function(gradient) {
      var gradientType = gradient.type; 
      if (gradientType == "radial") {
        var radialColorStopKeys = 'radial';
        var radialColorStopColors = '';
        gradient.colorStops.forEach(function(color, index, array) {
          radialColorStopKeys = radialColorStopKeys + '[' + color.name + ']';
          if (index === array.length -1) {
            radialColorStopColors = radialColorStopColors + color.color;
          } else {
            radialColorStopColors = radialColorStopColors + color.color + ',';
          }
        });
        gradientStringContent = gradientStringContent + '"' + radialColorStopKeys + '": "radial-gradient(' + radialColorStopColors + ')",'
      } else if (gradientType == "linear") {
        var linearColorStopKeys = 'linear';
        var linearColorStopColors = '';
        gradient.colorStops.forEach(function(color, index, array) {
          linearColorStopKeys = linearColorStopKeys + '[' + color.name + ']';
          if (index === array.length -1) {
            linearColorStopColors = linearColorStopColors + color.color;
          } else {
            linearColorStopColors = linearColorStopColors + color.color + ',';
          }
        });
        if (gradient.angle == null || gradient.angle == undefined) {
          console.log("Hydrogen: Please specify an angle (45deg) value for all linear gradients defined in your Hydrogen configuration file.");
        } else {
          gradientStringContent = gradientStringContent + '"' + linearColorStopKeys + '": "linear-gradient(' + gradient.angle + ',' + linearColorStopColors + ')",'
        }
      } else {
        console.log("Hydrogen: Please specify a gradient type in your Hydrogen configuration file.");
      }
    });
    gradientMap = gradientStringStart + gradientStringContent + gradientStringEnd;
  }
  done();
}

function setGradientMap() {
  return src('src/styles/maps/_map-gradient.scss')
  .pipe(footer(gradientMap))
  .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Radius
var radiusMap = '';

function buildRadiusMap(done) {
  // Reset the variables.
  radiusMap = '';
  // Create string.
  var radiusMapStringStart = '$h2-map-radius: ("square": "0",';
  var radiusMapStringContent = '';
  var radiusMapStringEnd = ');';
  var radiusConfig;
  if (config.radius != null && config.radius != undefined && config.radius.length > 0) {
    radiusConfig = config.radius;
  } else {
    radiusConfig = defaults.radius;
  }
  radiusConfig.forEach(function(radius) {
    var radiusString = '"' + radius.name + '": "' + radius.value + '",';
    radiusMapStringContent = radiusMapStringContent.concat(radiusString);
  });
  radiusMap = radiusMap.concat(radiusMapStringStart).concat(radiusMapStringContent).concat(radiusMapStringEnd);
  done();
}

function setRadiusMap() {
  return src('src/styles/maps/_map-radius.scss')
    .pipe(footer(radiusMap))
    .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Shadow
var shadowMap = '';

function buildShadowMap(done) {
  // Reset the variables.
  shadowMap = '';
  // Create string.
  var shadowMapStringStart = '$h2-map-shadow: (';
  var shadowMapStringContent = '';
  var shadowMapStringEnd = ');';
  var shadowConfig;
  if (config.shadows != null && config.shadows != undefined && config.shadows.length > 0) {
    shadowConfig = config.shadows;
  } else {
    shadowConfig = defaults.shadows;
  }
  shadowConfig.forEach(function(shadow) {
    var shadowString = '"' + shadow.name + '": "' + shadow.value + '",';
    shadowMapStringContent = shadowMapStringContent.concat(shadowString);
  });
  shadowMap = shadowMap.concat(shadowMapStringStart).concat(shadowMapStringContent).concat(shadowMapStringEnd);
  done();
}

function setShadowMap() {
  return src('src/styles/maps/_map-shadow.scss')
    .pipe(footer(shadowMap))
    .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Whitespace
// This map is used by both margins and padding in the Sass file.
var whitespaceMap = '';

function buildWhitespaceMap(done) {
  // Reset the variables.
  whitespaceMap = '';
  // Create string.
  var whitespaceMapStringStart = '$h2-map-whitespace: ("none": 0,';
  var whitespaceMapStringContent = '';
  var whitespaceMapStringEnd = ');';
  var whitespaceScaleConfig;
  if (config.whitespaceScale != null && config.whitespaceScale != undefined && config.whitespaceScale.length > 0) {
    whitespaceScaleConfig = config.whitespaceScale;
  } else {
    whitespaceScaleConfig = defaults.whitespaceScale;
  }
  var smallest = '"smallest": ' + (1 / whitespaceScaleConfig) / whitespaceScaleConfig + 'rem,';
  var smaller = '"smaller": ' + 1 / whitespaceScaleConfig + 'rem,';
  var small = '"small": 1rem,';
  var medium = '"medium": ' + 1 * whitespaceScaleConfig + 'rem,';
  var large = '"large": ' + (1 * whitespaceScaleConfig) * whitespaceScaleConfig + 'rem,';
  var larger = '"larger": ' + ((1 * whitespaceScaleConfig) * whitespaceScaleConfig) * whitespaceScaleConfig + 'rem,';
  var largest = '"largest": ' + (((1 * whitespaceScaleConfig) * whitespaceScaleConfig) * whitespaceScaleConfig) * whitespaceScaleConfig + 'rem,';
  whitespaceMapStringContent = whitespaceMapStringContent + smallest + smaller + small + medium + large + larger + largest;
  whitespaceMap = whitespaceMap.concat(whitespaceMapStringStart).concat(whitespaceMapStringContent).concat(whitespaceMapStringEnd);
  done();
}

function setWhitespaceMap() {
  return src('src/styles/maps/_map-whitespace.scss')
    .pipe(footer(whitespaceMap))
    .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Compile
function compileCore() {
  return src(config.styles.path + '/hydrogen/core.scss')
    .pipe(sass())
    .pipe(dest(config.styles.path + '/hydrogen/compiled'));
}
function compileUtility() {
  return src(config.styles.path + '/hydrogen/utility.scss')
    .pipe(sass())
    .pipe(dest(config.styles.path + '/hydrogen/compiled'));
}

// Build the development CSS file.
// Get normalize.css
var normalizeCSS = fs.readFileSync('./node_modules/normalize.css/normalize.css').toString();

var devHydrogen = '';

function createDevelopmentCSS(done) {
  // Reset the variables.
  devHydrogen = '';
  // Get the temporary core Hydrogen.
  var compiledHydrogenCoreCSS = fs.readFileSync(config.styles.path + '/hydrogen/compiled/core.css').toString();
  // Get the temporary compiled Hydrogen file, located in the user's specified location in the config.
  var compiledHydrogenUtilityCSS = fs.readFileSync(config.styles.path + '/hydrogen/compiled/utility.css').toString();
  devHydrogen = normalizeCSS + fontFaceCSS + compiledHydrogenCoreCSS + compiledHydrogenUtilityCSS;
  fs.writeFile(config.styles.path + '/hydrogen.css', devHydrogen, function(err) {
    if (err) {
      console.log('Hydrogen: ', err);
    }
  });
  done();
}

// function moveDevelopmentCSS() {
//   return src(config.styles.path + '/hydrogen/development/')
// }

// function cleanDevelopmentCSS() {

// }

// Compress
function compressCore() {
  return src(config.styles.path + '/hydrogen/compiled/core.css')
    .pipe(postcss([cssnano()]))
    .pipe(dest(config.styles.path + '/hydrogen/compressed'));
}
function preCleanCompress() {
  return src(config.styles.path + '/hydrogen/compiled/utility.css')
    .pipe(postcss([cssnano({
      preset: ['lite']
    })]))
    .pipe(dest(config.styles.path + '/hydrogen/compressed'));
}

// Get Markup
function getUserMarkup() {
  return src(config.markup.path + '/**/*')
    .pipe(concat('markup.txt'))
    // This destination will have to be the CSS folder the user specifies.
    .pipe(dest(config.styles.path + '/hydrogen/markup'))
}

// Remove Unwanted CSS
var hydrogen = '';

function createCleanCSS(done) {
  // Reset the variables.
  hydrogen = '';
  // Get the Hydrogen markup from the user's folder.
  var markup = fs.readFileSync(config.styles.path + '/hydrogen/markup/markup.txt').toString();
  // Get all instances of Hydrogen data attributes (data-h2-*="*").
  // var dataRegex = /data-h2-([^"]*)="([^"]*)"/g;
  var dataRegex = /data-h2-([^=\s]+)(?:(\s)|=["'{](.*)["'}]|.*)/g;
  // Get the utility portion of the attribute (data-h2-*).
  // var utilityRegex = /data-h2-([^=]*)/g;
  var utilityRegex = /data-h2-(?:([^=\s]*)|([^\s]+))/g;
  // Get individual attribute values (x(y)).
  var valueRegex = /([^" ]*?)\(([^)]*)\)/g;
  // var valueRegex = /.\(.*\)/g;
  // Get the temporary core Hydrogen.
  var hydrogenCoreCSS = fs.readFileSync(config.styles.path + '/hydrogen/compressed/core.css').toString();
  // Get the temporary compressed Hydrogen file, located in the user's specified location in the config.
  var hydrogenUtilityCSS = fs.readFileSync(config.styles.path + '/hydrogen/compressed/utility.css').toString();
    // console.log('sampleCSS file: ', hydrogenUtilityCSS);
  // Set up a variable list of arrays for each media query in the config. Thanks Chris Wiseman!
  let queries = {
    base: []
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
  // Set up a string variable for our final CSS file and assemble normalize, font face, and the core.
  hydrogen = '' + normalizeCSS + fontFaceCSS + hydrogenCoreCSS;
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
              newRegEx = '\\[data-hydrogen=("*VARVERSION"*)\\] \\[data-h2-flex-grid\\] > \\[' + utility + '\\*="' + value.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\]([^{])*{([^}])*}';
            } else if (utility[0] == "data-h2-flex-item-content") {
              // Do nothing.
            } else {
              newRegEx = '\\[data-hydrogen=("*VARVERSION"*)\\] \\[' + utility + '\\*="' + value.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\]([^{])*{([^}])*}';
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
              queries[mediaValue] = queries[mediaValue].concat(cssMatch);
                // console.log(queries);
            }
          } else {
            console.log('Hydrogen: there\'s no matching media query in the media query map for the query "' + mediaValue[0] + '".');
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
        console.log('Hydrogen: there\'s no matching media query in the media query map for the query "' + query + '".');
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
    fs.mkdirSync(config.styles.path + '/hydrogen/cleaned');
    fs.writeFile(config.styles.path + '/hydrogen/cleaned/hydrogen.css', hydrogen, function(err) {
      if (err) {
        console.log('Hydrogen: ', err);
      }
    });
  }
  done();
}

// Compress
function postCleanCompress() {
  return src(config.styles.path + '/hydrogen/cleaned/hydrogen.css')
    .pipe(postcss([cssnano()]))
    .pipe(dest(config.styles.path));
}

// Delete the cache if debug isn't set to true.
function deleteCache(done) {
  if (config.debug == false || config.debug == null || config.debug == undefined) {
    return del(config.styles.path + '/hydrogen');
  }
  done();
}

// Generic Tasks
const buildScripts = series(
  cleanHydrogenCache, 
  createHydrogenCache, 
  cacheHydrogenCore, 
  cacheHydrogenUtility, 
  buildMediaMap, setMediaMap, 
  buildColorMap, setColorMap, 
  buildBorderWeightMap, setBorderWeightMap, 
  buildContainerMap, setContainerMap, 
  setFlexgridConfig, moveFlexgridCore, enableFlexgridCore, moveFlexgrid, enableFlexgrid, 
  buildFontFamilyMap, setFontFamilyMap, setFontBaseSize, setCoreFontScale, setUtilityFontScale, 
  buildGradientMap, setGradientMap, 
  buildRadiusMap, setRadiusMap, 
  buildShadowMap, setShadowMap, 
  buildWhitespaceMap, setWhitespaceMap, 
  compileCore, 
  compileUtility
)

// Dev Prep Task
const devWatchSeries = series(
  devLoadHydrogenConfig, 
  buildScripts,
  createDevelopmentCSS
);

exports.devDev = series(devWatchSeries);

// Watch the config files for changes.
function devWatchConfig() {
  watch(['./src/stage/hydrogen.config.json'], series(devWatchSeries));
}

exports.devWatch = series(
  devWatchSeries,
  parallel(devWatchConfig)
);

exports.devCompile = series(
  devLoadHydrogenConfig, 
  buildScripts, 
  compressCore, 
  preCleanCompress, 
  getUserMarkup, 
  createCleanCSS, 
  postCleanCompress
);

// Prod Prep Task
const watchSeries = series(
  loadHydrogenConfig, 
  buildScripts,
  createDevelopmentCSS
);

// Watch the config files for changes.
function watchConfig() {
  watch(['./hydrogen.config.json'], series(watchSeries));
}

exports.dev = series(watchSeries);

exports.watch = series(
  watchSeries,
  parallel(watchConfig)
);

exports.compile = series(
  loadHydrogenConfig, 
  buildScripts, 
  compressCore, 
  preCleanCompress, 
  getUserMarkup, 
  createCleanCSS, 
  postCleanCompress,
  deleteCache
);