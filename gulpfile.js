"use strict";

const { series, parallel, src, dest, watch } = require('gulp');
const del = require('del');
var footer = require('gulp-footer');
const fs = require('fs');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
var source = require('vinyl-source-stream');
const { conflicts } = require('yargs');

// Set the Sass compiler to Dart Sass.
sass.compiler = require('sass');

// Import the package's JSON file.
var nodePackage = JSON.parse(fs.readFileSync('./package.json'));
// Get the package's current version number.
const version = nodePackage.version;

// Import the user's JSON config file.
var config = JSON.parse(fs.readFileSync("./src/stage/h2.config.json"));

// Cached H2
// This is required because each config setting needs to update a single instance of the Hydrogen file, otherwise they each create their own and overwrite the last.
function cacheH2() {
  return src('src/styles/hydrogen.scss')
  .pipe(dest('src/stage/cache'));
}

// Media
var media = false;
var mediaConfig = "";

if (config.media != null) {
  media = true;
  var mediaStringStart = '$h2-map-media: ("b": "screen",';
  var mediaStringContent = '';
  var mediaStringEnd = ');';
  for (let obj in config.media) {
    var mediaString = '"' + obj + '": ' + '"screen and (min-width: ' + config.media[obj] + ')",';
    mediaStringContent = mediaStringContent.concat(mediaString);
  }
  mediaConfig = mediaConfig.concat(mediaStringStart).concat(mediaStringContent).concat(mediaStringEnd);
}

function customMedia() {
  if (media == true) {
    return src('src/styles/maps/_map-media-user.scss')
    .pipe(footer(mediaConfig))
    .pipe(dest('src/stage/styles/maps'));
  } else {
    return src('src/styles/maps/_map-media-default.scss')
    .pipe(dest('src/stage/styles/maps'))
  }
}

function userMedia() {
  if (media == true) {
    return src('src/stage/cache/hydrogen.scss')
    .pipe(replace('map-media-default', 'map-media-user'))
    .pipe(dest('src/stage/cache'));
  } else {
    return src('src/stage/cache/hydrogen.scss')
    .pipe(dest('src/stage/cache'));
  }
}

// Color
var color = false;
var colorConfig = "";

if (config.colors != null) {
  color = true;
  var colorStringStart = '$h2-map-color: (';
  var colorStringContent = '';
  var colorStringEnd = ');';
  for (let obj in config.colors) {
    var colorString = '"' + obj + '": ' + config.colors[obj] + ',';
    colorStringContent = colorStringContent.concat(colorString);
  }
  colorConfig = colorConfig.concat(colorStringStart).concat(colorStringContent).concat(colorStringEnd);
}

function customColor() {
  if (color == true) {
    return src('src/styles/maps/_map-color-user.scss')
    .pipe(footer(colorConfig))
    .pipe(dest('src/stage/styles/maps'));
  } else {
    return src('src/styles/maps/_map-color-default.scss')
    .pipe(dest('src/stage/styles/maps'))
  }
}

function userColor() {
  if (color == true) {
    return src('src/stage/cache/hydrogen.scss')
    .pipe(replace('map-color-default', 'map-color-user'))
    .pipe(dest('src/stage/cache'));
  } else {
    return src('src/stage/cache/hydrogen.scss')
    .pipe(dest('src/stage/cache'));
  }
}

// Move Cached H2
// This moves the configured Hydrogen file to the stage to be compiled.
function moveCachedH2() {
  return src('src/stage/cache/hydrogen.scss')
  .pipe(dest('src/stage/styles'))
}

// Compile
function compile() {
  return src('src/stage/styles/hydrogen.scss')
  .pipe(sass())
  .pipe(dest('src/stage/styles/compiled'));
}

// Compress
function preCleanCompress() {
  return src('src/stage/styles/compiled/hydrogen.css')
  .pipe(postcss([cssnano({
    preset: ['default', {
      // preset options here, e.g...
      mergeRules: false
  }]
  })]))
  .pipe(dest('src/stage/styles/compressed'));
}

// Remove Unwanted CSS
function cleanCSS(done) {
  var sampleHTML = '<div data-h2-bg-color="b(green) s(red)"> <div data-h2-bg-color="l(green[.3])"> <div data-h2-bg-color="s(red[.5])>" <div data-h2-alignment="b(center)"></div> <div       data-h2-bg-color="b(green-light) s(red-dark[.9])">';
  // Get all instances of Hydrogen data attributes (data-h2-*="*").
  var dataRegex = /data-h2-([^"]*)="([^"]*)"/g;
  // Get the utility portion of the attribute (data-h2-*).
  var utilityRegex = /data-h2-([^=]*)/g;
  // Get individual attribute values (x(y)).
  var valueRegex = /.\(([^)]*)\)/g;
  // var valueRegex = /.\(.*\)/g;
  // Get the temporary compressed Hydrogen file, located in the user's specified location in the config.
  var sampleCSS = fs.readFileSync('src/stage/styles/compressed/hydrogen.css').toString();
    // console.log('sampleCSS file: ', sampleCSS);
  var finalCSS = "";
  // We'll then have to parse through each one and break things apart by media query, and add the * selector...
  // e.g. data-h2-bg-color="b(red) m(yellow)" needs to become [data-h2-bg-color*="b(red)"] and [data-h2-bg-color*="m(yellow)"]
  var usedAttributes = sampleHTML.match(dataRegex);
    // console.log(usedAttributes);
  if (usedAttributes != null) {
    usedAttributes.forEach(function(attribute) {
        // console.log(attribute);
      var utility = attribute.match(utilityRegex);
      var values = attribute.match(valueRegex);
      values.forEach(function(value) {
        // Get the media query set for this particular value.
        var mediaValue = value.match(/^.*?(?=\()/g);
          // console.log("media query: ", mediaValue);
        // We have to build a RegEx to match the correct media query by checking against the list of available media queries can getting their screen value. Don't forget that "b" will always be an option, which has an empty value because it represents all "screen" queries.
        var queryValue;
        var defaultQueries;
        if (media == false) {
          // The user is using Hydrogen's default media queries.
          defaultQueries = fs.readFileSync('src/styles/maps/_map-media-default.scss').toString();
        } else if (media == true) {
          // The user has defined their own media queries.
          defaultQueries = mediaConfig;
        }
        // Construct the query RegEx.
        var queryRegEx = `"` + mediaValue + `": ".*?(?:")`;
        // Create the RegEx.
        var createQueryRegEx = new RegExp(queryRegEx, 'g');
        // Search the default queries for the value.
        var queryMatch = defaultQueries.match(createQueryRegEx);
          // console.log(queryMatch);
        // Isolate the query itself so it can be used as text.
        if (queryMatch != null) {
            // console.log("queryMatch: ", queryMatch[0]);
          queryValue = queryMatch[0].match(/[^"]([^"]*)[^"\s]/g);
          // console.log("final media query: ", queryValue);
          var newRegEx = '\\[data-hydrogen-VARVERSION\\] \\[' + utility + '\\*="' + value.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\]{([^}])*}'
            // console.log(value);
          var cssRegex = new RegExp(newRegEx, 'g');
            // console.log('css specific regex: ', cssRegex);
            // console.log('test css regex: ', /\[data-h2-bg-color\*="b\(red\)"\]{([^}])*}/g);
          var cssMatch = sampleCSS.match(cssRegex);
            // console.log('css match values: ', cssMatch);
          if (cssMatch != null) {
            // Transform the matched CSS to include its media query.
            var CSSwithMedia = '@media ' + queryValue[0] + '{' + cssMatch + '}';
              // console.log(CSSwithMedia);
            finalCSS = finalCSS.concat(CSSwithMedia);
          }
        } else {
          console.log('There\'s no matching media query in the media query map for the query "' + mediaValue[0] + '".');
        }
      });
    });
      // console.log('final css: ', finalCSS);
    fs.mkdirSync('src/stage/styles/cleaned');
    fs.writeFile('src/stage/styles/cleaned/hydrogen.css', finalCSS, function(err) {
      if (err) {
        console.log('Uh oh: ', err);
      }
    });
  }
  done();
}

// Clean Stage
function cleanStage() {
  return del(['src/stage/**/*', '!src/stage/h2.config.json', '!src/stage/index.html', '!src/stage/styles/cleaned']);
}

exports.test = series(cleanStage, cacheH2, customMedia, userMedia, customColor, userColor, moveCachedH2, compile, preCleanCompress, cleanCSS);