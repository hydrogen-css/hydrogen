// Hydrogen: Experimental scripting

'use strict';

var colors = require('colors');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

// Load settings
// Create input glob based on settings
// Loop through each file and store regex matches in an array
// Parse each match and get the attribute
// Pass the config and build attribute specific CSS

function loadHydrogenSettings() {
  try {
    var settings = JSON.parse(fs.readFileSync('./tests/hydrogen.config.json'));
    return settings;
  } catch (err) {
    return err;
  }
}

function loadInput() {
  try {
    var settings = loadHydrogenSettings();
    if (Array.isArray(settings.input) == true) {
      var inputData = '{';
      settings.input.forEach(function (inputPath, index, array) {
        inputData = inputData + './tests/' + inputPath + '/**/*,';
      });
      inputData = inputData + '}';
      return inputData;
    } else {
      throw 'Please ensure your input settings in hydrogen.config.json are an array.'
    }
  } catch (err) {
    return err;
  }
}

function scrapeFiles() {
  try {
    var inputData = loadInput();
    var files = glob.sync(inputData);
    var hydrogenRegex = /data-h2-([^=\s'"]+)(\s|(=|["']+:+ ?)(\\)?["'{]([^"'}]*)["'}]{1})/g;
    var hydrogenAttributes = [];
    for (let item in files) {
      if (fs.lstatSync(files[item]).isDirectory() == false) {
        var fileData = fs.readFileSync(files[item]).toString();
        var attributes = fileData.match(hydrogenRegex);
        if (attributes != null) {
          hydrogenAttributes = hydrogenAttributes.concat(attributes);
        } else {
          throw 'Hydrogen didn\'t find any attributes in use in your files.'
        }
      }
    }
    function uniq(a) {
      return Array.from(new Set(a));
    }
    var cleanAttributes = uniq(hydrogenAttributes); // Cleans duplicates
    return cleanAttributes;
  } catch (err) {
    return err;
  }
}

function getMediaQueryArray(settings) {
  try {
    // Get media settings and assemble a CSS-ready media query from them
    var mediaArray = [];
    settings.forEach(function(query) {
      // Default styles
      var keyObject = {};
      keyObject.key = query.key;
      keyObject.darkMedia = false;
      keyObject.darkToggle = false;
      keyObject.lightToggle = false;
      keyObject.query = query.query;
      keyObject.cssString = '@media ' + query.query + ' {';
      mediaArray = mediaArray.concat(keyObject);
      // Preference based dark mode styles
      var darkKeyObject = {};
      darkKeyObject.key = query.key;
      darkKeyObject.darkMedia = true;
      darkKeyObject.darkToggle = false;
      darkKeyObject.lightToggle = false;
      darkKeyObject.query = query.query;
      darkKeyObject.cssString = '@media ' + query.query + ' and (prefers-color-scheme: dark)' + ' {';
      mediaArray = mediaArray.concat(darkKeyObject);
      // Toggle light mode styles (only need to be added if they are siblings to a matching media query that has :dark)
      var lightToggleKeyObject = {};
      lightToggleKeyObject.key = query.key;
      lightToggleKeyObject.darkMedia = false;
      lightToggleKeyObject.darkToggle = false;
      lightToggleKeyObject.lightToggle = true;
      lightToggleKeyObject.query = query.query;
      lightToggleKeyObject.cssString = '@media ' + query.query + ' {';
      mediaArray = mediaArray.concat(lightToggleKeyObject);
      // Toggle dark mode styles (have to be last so that they override all other styles)
      var darkToggleKeyObject = {};
      darkToggleKeyObject.key = query.key;
      darkToggleKeyObject.darkMedia = true;
      darkToggleKeyObject.darkToggle = true;
      darkToggleKeyObject.lightToggle = false;
      darkToggleKeyObject.query = query.query;
      darkToggleKeyObject.cssString = '@media ' + query.query + ' {';
      mediaArray = mediaArray.concat(darkToggleKeyObject);
    });
    return mediaArray;
  } catch (err) {
    return err
  }
}

function buildCSS() {
  try {
    console.time(
      'Hydrogen ' + '[TIMELOG]'.magenta + ' Total build time was',
      'buildTime'
    );
    var hydrogen = '';
    var hydrogenAttributes = scrapeFiles();
    var settings = loadHydrogenSettings();
    var mediaQueries = settings.media;
    var mediaQueryArray = getMediaQueryArray(mediaQueries);
    hydrogenAttributes.forEach(function(attribute) {
      var propertyRegex = /(?<=data-h2-)(?:([^"'=\s]*)|([^\s]+))/g; // Gets the property name out of the attribute (e.g. bg-color from data-h2-bg-color="")
      var valueRegex = /([^"' ]*?)\(([^)]*)\)/g; // Gets all media query instances inside the attribute (e.g. b(primary) from data-h2-bg-color="b(primary)")
      var property = attribute.match(propertyRegex);
      var values = attribute.match(valueRegex);
      values.forEach(function(value) {
        // Get light/dark state and handle it accordingly
        var modeRegex = /:dark|:light/g;
        var mode = value.match(modeRegex);
        var darkStatus = false;
        if (mode != null) {
          darkStatus = true;
        }
        // Get state and handle it accordingly
        var stateRegex = /:hover|:active|:disabled|:focus/g;
        var state = value.match(stateRegex);
        // Build the css selector
        var cssSelector;
        if (state == null) {
          cssSelector = '[data-h2-' + property + '*="' + value + '"]'; // Constructs the glob CSS selector (e.g. [data-h2-bg-color*="b(primary)"])
        } else {
          cssSelector = '[data-h2-' + property + '*="' + value + '"]' + state; // Constructs the glob CSS selector (e.g. [data-h2-bg-color*="b(primary)"])
        }
        var internalValuesRegex = /(?<=.*\().*[^\)]/g; // Gets the internal values of the media query (e.g. red, all from b(red, all))
        var internalValues = value.match(internalValuesRegex);
        var singleValues;
        if (internalValues[0].indexOf(',') > -1) { 
          singleValues = internalValues[0].split(',') 
        } else {
          singleValues = internalValues;
        }
        if (property == 'bg-color') {
          // Background color only accepts 1 value
          var bgColor = singleValues[0];
          // Remove any prefixed spaces
          if (bgColor[0] == ' ') {
            bgColor = bgColor.slice(1);
          }
          // Check if value is from config or not
          var userColors = settings.colors;
          userColors.forEach(function(color) {
            if (bgColor == color.key) {
              bgColor = color.color;
            }
          });
          // Assemble CSS
          var cssContent = '{background-color: ' + bgColor + ';transition: 0.2s ease all;}';
          // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'display') {
          // Display only accepts 1 value
          var display = singleValues[0];
          // Remove any prefixed spaces
          if (display[0] == ' ') {
            display = display.slice(1);
          }
          // User can't set any config values for display
          // Assemble CSS
          var cssContent = '{display: ' + display + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else {
          console.log(
            'Hydrogen',
            '[WARNING]'.yellow,
            property[0].bold.yellow,
            'is an unsupported Hydrogen attribute.'
          );
        }
        // Get the media query and match it to the array to get the CSS query text
        var mediaQueryRegex = /^.[^:(]*/g;
        var mediaQuery = value.match(mediaQueryRegex);
        // Check for dark siblings
        var lightStatus = false;
        values.forEach(function(thing) {
          var thingMedia = thing.match(mediaQueryRegex);
          if (mediaQuery[0] == thingMedia[0]) {
            var thingDarkStatus = thing.match(modeRegex);
            if (thingDarkStatus != null) {
              lightStatus = true;
            }
          }
        });
        // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
        mediaQueryArray.forEach(function(arrayQuery) {
          if (mediaQuery == arrayQuery.key && darkStatus == arrayQuery.darkMedia) {
            if (darkStatus == true) {
              if (arrayQuery.darkToggle == false) {
                arrayQuery.cssString = arrayQuery.cssString + valueCSS;
              } else {
                arrayQuery.cssString = arrayQuery.cssString + '.h2-dark ' + valueCSS;
              }
            } else if (lightStatus == true) {
              if (arrayQuery.lightToggle == false) {
                arrayQuery.cssString = arrayQuery.cssString + valueCSS;
              } else {
                arrayQuery.cssString = arrayQuery.cssString + '.h2-light ' + valueCSS;
              }
            } else {
              if (arrayQuery.lightToggle == false) {
                arrayQuery.cssString = arrayQuery.cssString + valueCSS;
              }
            }
          }
        });
      });
    });
    mediaQueryArray.forEach(function(media) {
      hydrogen = hydrogen + media.cssString + '}';
    });
    // console.log(hydrogen);
    console.timeEnd(
      'Hydrogen ' + '[TIMELOG]'.magenta + ' Total build time was',
      'buildTime'
    );
  } catch (err) {
    return err;
  }
}

function hydrogen() {
  buildCSS();
}

exports.test = hydrogen();
