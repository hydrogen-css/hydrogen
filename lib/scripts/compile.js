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

// Load the config files.
var defaults;
var config;

function loadHydrogenConfig(done) {
  // Reset the variables.
  defaults = undefined;
  config = undefined;
  // Import the default JSON config file.
  defaults = JSON.parse(fs.readFileSync('./node_modules/@hydrogen-design-system/hydrogen.css/lib/hydrogen.default.json'));
  // console.log("Hydrogen: defaults loaded!");
  // Check to see if the user has a config file and load it.
  if (fs.existsSync('./hydrogen.config.json') == false) {
    console.error('[ERROR] Hydrogen: you do not have a hydrogen.config.json file in your project root. Please create one to continue.'.red);
    return false;
  } else {
    // Import the user's JSON config file.
    config = JSON.parse(fs.readFileSync('./hydrogen.config.json'));
  }
  if (config.folders == null || config.folders == undefined || config.folders == "" || config.folders.styles == null || config.folders.styles == undefined || config.folders.styles == "") {
    console.error('[ERROR] Hydrogen: please ensure you define a style path in your configuration file before continuing.'.red);
    return false;
  }
  if (config.folders == null || config.folders == undefined || config.folders == "" || config.folders.markup == null || config.folders.markup == undefined || config.folders.markup == "") {
    console.error('[ERROR] Hydrogen: please ensure you define a markup path in your configuration file before continuing.'.red);
    return false;
  }
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
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-media.scss')
    .pipe(footer(mediaMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
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
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-color.scss')
    .pipe(footer(colorMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
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
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-border-weight.scss')
    .pipe(footer(borderWeightMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
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
          console.log("[ERROR] Hydrogen: Please specify an angle (45deg) value for all linear gradients defined in your configuration file.".red);
          return false;
        } else {
          gradientStringContent = gradientStringContent + '"' + linearColorStopKeys + '": "linear-gradient(' + gradient.angle + ',' + linearColorStopColors + ')",'
        }
      } else {
        console.log("[ERROR] Hydrogen: one of the gradients in your configuration file is missing a type.".red);
        return false;
      }
    });
    gradientMap = gradientStringStart + gradientStringContent + gradientStringEnd;
  } else {
    gradientMap = '@use "sass:color"; $h2-map-gradient: ();';
  }
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
  return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-radius.scss')
    .pipe(footer(radiusMap))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
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
// Get normalize.css
var normalizeCSS = fs.readFileSync('./node_modules/normalize.css/normalize.css').toString();

var devHydrogen = '';

function createDevelopmentCSS(done) {
  // Reset the variables.
  devHydrogen = '';
  // Get the temporary core Hydrogen.
  var compiledHydrogenCoreCSS = fs.readFileSync('./' + config.folders.styles + '/hydrogen/compiled/core.css').toString();
  // Get the temporary compiled Hydrogen file, located in the user's specified location in the config.
  var compiledHydrogenUtilityCSS = fs.readFileSync('./' + config.folders.styles + '/hydrogen/compiled/utility.css').toString();
  devHydrogen = normalizeCSS + fontFaceCSS + compiledHydrogenCoreCSS + compiledHydrogenUtilityCSS;
  fs.writeFile('./' + config.folders.styles + '/hydrogen.css', devHydrogen, function(err) {
    if (err) {
      console.log('Hydrogen: ', err);
    }
  });
  console.log('[SUCCESS] Hydrogen: you\'ve successfully compiled a development version of Hydrogen in the '.green + config.folders.styles + '/' + ' folder.'.green);
  done();
}

// Prod Prep Task
const compileSeries = series(
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
  buildFontFamilyMap, setFontFamilyMap, setFontBaseSize, setCoreFontScale, setUtilityFontScale, 
  buildGradientMap, setGradientMap, 
  buildRadiusMap, setRadiusMap, 
  buildShadowMap, setShadowMap, 
  buildWhitespaceMap, setWhitespaceMap, 
  compileCore, 
  compileUtility,
  createDevelopmentCSS
);

exports.compile = series(compileSeries);