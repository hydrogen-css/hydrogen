"use strict";

const { series, parallel, src, dest, watch } = require('gulp');
const del = require('del');
var footer = require('gulp-footer');
const fs = require('fs');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
var source = require('vinyl-source-stream');
const { conflicts } = require('yargs');
const { type } = require('os');

// Set the Sass compiler to Dart Sass.
sass.compiler = require('sass');

// Import the package's JSON file.
var nodePackage = JSON.parse(fs.readFileSync('./package.json'));
// Get the package's current version number.
const version = nodePackage.version;

// Import the default JSON config file.
var defaults = JSON.parse(fs.readFileSync('src/h2.default.json'));

// Import the user's JSON config file.
var config = JSON.parse(fs.readFileSync('./src/stage/h2.config.json'));

// Clean Stage
function cleanCache() {
  return del([config.styles.path + '/hydrogen']);
}

// Create the Hydrogen folder in the user's specified style path.
function createHydrogen(done) {
  fs.mkdirSync(config.styles.path + '/hydrogen');
  done();
}

// Cached H2
// This is required because each config setting needs to update a single instance of the Hydrogen file, otherwise they each create their own and overwrite the last.
function cacheHydrogen() {
  return src('src/styles/hydrogen.scss')
    .pipe(dest(config.styles.path + '/hydrogen'));
}

// Media
var mediaConfig = '';
var mediaStringStart = '$h2-map-media: ("base": "screen",';
var mediaStringContent = '';
var mediaStringEnd = ');';
var mediaSource;
if (config.media != null && config.media != undefined && config.media.length > 0) {
  mediaSource = config.media;
} else {
  mediaSource = defaults.media;
}
mediaSource.forEach(function(mediaQuery) {
  // console.log(mediaQuery);
var mediaString = '"' + mediaQuery.name + '": ' + '"screen and (min-width: ' + mediaQuery.value + ')",';
mediaStringContent = mediaStringContent.concat(mediaString);
  // console.log(mediaStringContent);
});
mediaConfig = mediaConfig.concat(mediaStringStart).concat(mediaStringContent).concat(mediaStringEnd);

function customMedia() {
  return src('src/styles/maps/_map-media.scss')
  .pipe(footer(mediaConfig))
  .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Color
var colorConfig = '';
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

var colorStringStart = '@use "sass:color"; $h2-map-color: (';
var colorStringContent = '';
var colorStringEnd = ');';
var colorSource;
if (config.colors != null && config.colors != undefined && config.colors.length > 0) {
  colorSource = config.colors;
} else {
  colorSource = defaults.colors;
}
colorSource.forEach(function(color) {
  var colorString = '"' + color.name + '": ' + color.color + ',';
  var colorLightString = '"[light]' + color.name + '": color.scale(' + color.color + ', $lightness: 25%),';
  var colorDarkString = '"[dark]' + color.name + '": color.scale(' + color.color + ', $lightness: -15%, $saturation: -10%),';
  var colorOpacityString = '';
  if (color.opacity != null && color.opacity != undefined && color.opacity == true) {
    for (let opacity in colorOpacityMap) {
      colorOpacityString = colorOpacityString + '"' + color.name + opacity + '": color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '),';
        // console.log('Color Opacity String: ', colorOpacityString);
      colorOpacityString = colorOpacityString + '"[light]' + color.name + opacity + '": color.scale(color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '), $lightness: 25%),';
      colorOpacityString = colorOpacityString + '"[dark]' + color.name + opacity + '": color.scale(color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '), $lightness: -15%, $saturation: -10%),';
    }
  }
  colorStringContent = colorStringContent.concat(colorString).concat(colorLightString).concat(colorDarkString);
});
colorConfig = colorConfig.concat(colorStringStart).concat(colorStringContent).concat(colorStringEnd);

function customColor() {
  return src('src/styles/maps/_map-color.scss')
  .pipe(footer(colorConfig))
  .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Gradients
var gradientConfig = '';

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
  gradientConfig = gradientStringStart + gradientStringContent + gradientStringEnd;
}

function customGradient() {
  return src('src/styles/maps/_map-gradient.scss')
  .pipe(footer(gradientConfig))
  .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Radius
var radiusConfigSource;
var radiusMap = '$h2-map-radius: ("square": "0",';
var radiusMapStringStart = '';
var radiusMapStringContent = '';
var radiusMapStringEnd = ');';
if (config.radius != null && config.radius != undefined && config.radius.length > 0) {
  radiusConfigSource = config.radius;
} else {
  radiusConfigSource = defaults.radius;
}
radiusConfigSource.forEach(function(radius) {
  var radiusString = '"' + radius.name + '": "' + radius.value + '",';
  radiusMapStringContent = radiusMapStringContent.concat(radiusString);
});
radiusMap = radiusMap.concat(radiusMapStringStart).concat(radiusMapStringContent).concat(radiusMapStringEnd);

function buildRadius() {
  return src('src/styles/maps/_map-radius.scss')
  .pipe(footer(radiusMap))
  .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Shadow
var shadowConfig = '';
var shadowStringStart = '$h2-map-shadow: (';
var shadowStringContent = '';
var shadowStringEnd = ');';
var shadowSource;
if (config.shadows != null && config.shadows != undefined && config.shadows.length > 0) {
  shadowSource = config.shadows;
} else {
  shadowSource = defaults.shadows;
}
shadowSource.forEach(function(shadow) {
  var shadowString = '"' + shadow.name + '": "' + shadow.value + '",';
  shadowStringContent = shadowStringContent.concat(shadowString);
});
shadowConfig = shadowConfig.concat(shadowStringStart).concat(shadowStringContent).concat(shadowStringEnd);

function customShadow() {
  return src('src/styles/maps/_map-shadow.scss')
  .pipe(footer(shadowConfig))
  .pipe(dest(config.styles.path + '/hydrogen/maps'));
}

// Compile
function compile() {
  return src(config.styles.path + '/hydrogen/hydrogen.scss')
  .pipe(sass())
  .pipe(dest(config.styles.path + '/hydrogen/compiled'));
}

// Compress
function preCleanCompress() {
  return src(config.styles.path + '/hydrogen/compiled/hydrogen.css')
  .pipe(postcss([cssnano({
    preset: ['lite']
  })]))
  .pipe(dest(config.styles.path + '/hydrogen/compressed'));
}

// Get Markup
function getUserMarkup() {
  return src(config.markup.path + '/**/*.' + config.markup.type)
  .pipe(concat('markup.' + config.markup.type))
  // This destination will have to be the CSS folder the user specifies.
  .pipe(dest(config.styles.path + '/hydrogen/markup'))
}

// Remove Unwanted CSS
function cleanCSS(done) {
  // Get the Hydrogen markup from the user's folder.
  var markup = fs.readFileSync(config.styles.path + '/hydrogen/markup/markup.' + config.markup.type).toString();
  // Get all instances of Hydrogen data attributes (data-h2-*="*").
  var dataRegex = /data-h2-([^"]*)="([^"]*)"/g;
  // Get the utility portion of the attribute (data-h2-*).
  var utilityRegex = /data-h2-([^=]*)/g;
  // Get individual attribute values (x(y)).
  var valueRegex = /([^" ]*?)\(([^)]*)\)/g;
  // var valueRegex = /.\(.*\)/g;
  // Get the temporary compressed Hydrogen file, located in the user's specified location in the config.
  var hydrogenCSS = fs.readFileSync(config.styles.path + '/hydrogen/compressed/hydrogen.css').toString();
    // console.log('sampleCSS file: ', hydrogenCSS);
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
  // Set up a string variable for our final CSS file.
  var finalCSS = "";
  // We'll then have to parse through each one and break things apart by media query, and add the * selector...
  // e.g. data-h2-bg-color="b(red) m(yellow)" needs to become [data-h2-bg-color*="b(red)"] and [data-h2-bg-color*="m(yellow)"]
  var usedAttributes = markup.match(dataRegex);
    // console.log(usedAttributes);
  if (usedAttributes != null) {
    usedAttributes.forEach(function(attribute) {
        // console.log(attribute);
      var utility = attribute.match(utilityRegex);
      var values = attribute.match(valueRegex);
      values.forEach(function(value) {
        // Get the media query set for this particular value.
        var mediaValue = value.match(/^.*?(?=\()/g); // Returns media value: x
          // console.log("media query: ", mediaValue);
        // We have to build a RegEx to match the correct media query by checking against the list of available media queries and getting their screen value. Don't forget that "b" will always be an option, which has an empty value because it represents all "screen" queries.
        var queryValue;
        var defaultQueries = mediaConfig;
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
          var newRegEx = '\\[data-hydrogen=("*VARVERSION"*)\\] \\[' + utility + '\\*="' + value.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\]{([^}])*}'
            // console.log(value);
            // console.log(newRegEx);
          var cssRegex = new RegExp(newRegEx, 'g');
            // console.log('css specific regex: ', cssRegex);
            // console.log('test css regex: ', /\[data-h2-bg-color\*="b\(red\)"\]{([^}])*}/g);
          var cssMatch = hydrogenCSS.match(cssRegex); // Returns the full CSS selector: [data-hydrogen=VARVERSION] [data-h2-ATTRIBUTE*="MEDIA(VALUE)"]{CSS}
            // console.log('css match values: ', cssMatch);
          if (cssMatch != null) {
            // Transform the matched CSS to include its media query.
            // var CSSwithMedia = '@media ' + queryValue[0] + '{' + cssMatch + '}';
              // console.log(CSSwithMedia);
            // finalCSS = finalCSS.concat(CSSwithMedia);
              // console.log(queries);
            queries[mediaValue] = queries[mediaValue].concat(cssMatch);
              // console.log(queries);
          }
        } else {
          console.log('There\'s no matching media query in the media query map for the query "' + mediaValue[0] + '".');
        }
      });
    });
    // Loop through each media query array now that they're populated with CSS and concatenate them into the final file.
      // console.log(queries);
    for (let query in queries) {
      var queryValue;
      var defaultQueries = mediaConfig;
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
        queryValue = queryMatch[0].match(/[^"]([^"]*)[^"\s]/g); // Returns the media side of the media query: screen and...
      } else {
        console.log('There\'s no matching media query in the media query map for the query "' + query + '".');
      }
      // Append the media query to the CSS group.
      finalCSS = finalCSS + '@media ' + queryValue + '{';
      // Add the CSS to the media query.
      queries[query].forEach(function(item) {
          // console.log(item);
        finalCSS = finalCSS + item;
      })
      // Close the media query.
      finalCSS = finalCSS + '}';
    }
      // console.log('final css: ', finalCSS);
    // Create the cleaned folder and write the file.
    if (config.environment == "development") {
      fs.writeFile(config.styles.path + '/hydrogen/hydrogen.css', finalCSS, function(err) {
        if (err) {
          console.log('Uh oh: ', err);
        }
      });
    } else {
      fs.mkdirSync(config.styles.path + '/hydrogen/cleaned');
      fs.writeFile(config.styles.path + '/hydrogen/cleaned/hydrogen.css', finalCSS, function(err) {
        if (err) {
          console.log('Uh oh: ', err);
        }
      });
    }
  }
  done();
}

// Compress
function postCleanCompress(done) {
  if (config.environment == "production" || config.environment == null || config.environment == undefined) {
    return src(config.styles.path + '/hydrogen/cleaned/hydrogen.css')
      .pipe(postcss([cssnano()]))
      .pipe(dest(config.styles.path));
  }
  done();
}

// Delete the cache if debug isn't set to true.
function deleteCache(done) {
  if (config.debug == false || config.debug == null || config.debug == undefined) {
    return del([config.styles.path + '/hydrogen']);
  }
  done();
}

exports.test = series(cleanCache, createHydrogen, cacheHydrogen, customMedia, customColor, customGradient, buildRadius, customShadow, compile, preCleanCompress, getUserMarkup, cleanCSS, postCleanCompress, deleteCache);