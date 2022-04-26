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

// Todo: add checks to ensure the correct minimum number of options have been passed to each attribute

// Todo: add CSS and Sass variable exports

// Todo: font family construction has been minimized, but should be built back up to properly construct working @fontface rules

// Todo: right now when the script finds an error in one of the values in an attribute, the whole attribute is discarded. It would be nice if only the value with the error was tossed intstead.

// Todo: gradient fallbacks for bg color, font color, and overlay should set the font color to the first color stop in the gradient - this will require a more complex gradient map that provides access to the fallback color.

// Todo: radial gradients should support keyword additives before the color stops

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
      console.error(
        'Hydrogen',
        '[ERROR]'.red,
        'Please ensure your input settings in hydrogen.config.json are an array ([])'
      );
      throw err;
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
          console.error(
            'Hydrogen',
            '[ERROR]'.red,
            'We didn\'t find any Hydrogen attributes in your files.'
          );
          throw err;
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
    // console.log(mediaArray);
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
    // Generate a reusable gradient object from the config
    var gradientMap = {};
    var userGradients = settings.gradients;
    if (userGradients != null || userGradients != undefined) {
      userGradients.forEach(function(gradient) {
          var colorStopString = '';
          gradient.colorStops.forEach(function (color, index, array) {
            if (index === array.length - 1) {
              colorStopString = colorStopString + color;
            } else {
              colorStopString = colorStopString + color + ',';
            }
          });
          if (gradient.type == 'radial') {
            gradientMap[gradient.key] = 'radial-gradient(' + colorStopString + ')';
          } else if (gradient.type == 'linear') {
            gradientMap[gradient.key] = 'linear-gradient(' + gradient.angle + ',' + colorStopString + ')';
          }
      });
    }
    // Generate whitespace values for reuse later
    var userLineHeight = settings.fontBaseLineHeight;
    var whitespaceMap = {
      'none': '0',
      'auto': 'auto',
      'x.25': userLineHeight * 0.25 + 'rem',
      'x.5': userLineHeight * 0.5 + 'rem',
      'x1': userLineHeight + 'rem',
      'x2': userLineHeight * 2 + 'rem',
      'x3': userLineHeight * 3 + 'rem',
      'x4': userLineHeight * 4 + 'rem',
      'x5': userLineHeight * 5 + 'rem',
      'x6': userLineHeight * 6 + 'rem',
      'x7': userLineHeight * 7 + 'rem',
      'x8': userLineHeight * 8 + 'rem',
      'x9': userLineHeight * 9 + 'rem',
      'x10': userLineHeight * 10 + 'rem',
    }
    var marginMap = {
      'none': '0',
      'auto': 'auto',
      'x.25': userLineHeight * 0.25 + 'rem',
      'x.5': userLineHeight * 0.5 + 'rem',
      'x1': userLineHeight + 'rem',
      'x2': userLineHeight * 2 + 'rem',
      'x3': userLineHeight * 3 + 'rem',
      'x4': userLineHeight * 4 + 'rem',
      'x5': userLineHeight * 5 + 'rem',
      'x6': userLineHeight * 6 + 'rem',
      'x7': userLineHeight * 7 + 'rem',
      'x8': userLineHeight * 8 + 'rem',
      'x9': userLineHeight * 9 + 'rem',
      'x10': userLineHeight * 10 + 'rem',
      '-x.25': (userLineHeight * 0.25) * -1 + 'rem',
      '-x.5': (userLineHeight * 0.5) * -1 + 'rem',
      '-x1': (userLineHeight) * -1 + 'rem',
      '-x2': (userLineHeight * 2) * -1 + 'rem',
      '-x3': (userLineHeight * 3) * -1 + 'rem',
      '-x4': (userLineHeight * 4) * -1 + 'rem',
      '-x5': (userLineHeight * 5) * -1 + 'rem',
      '-x6': (userLineHeight * 6) * -1 + 'rem',
      '-x7': (userLineHeight * 7) * -1 + 'rem',
      '-x8': (userLineHeight * 8) * -1 + 'rem',
      '-x9': (userLineHeight * 9) * -1 + 'rem',
      '-x10': (userLineHeight * 10) * -1 + 'rem',
    }
    // Loop through attributes that have been found
    hydrogenAttributes.forEach(function(attribute) {
      var falseAttribute = false;
      var propertyRegex = /(?<=data-h2-)(?:([^"'=\s]*)|([^\s]+))/g; // Gets the property name out of the attribute (e.g. bg-color from data-h2-bg-color="")
      var valueRegex = /([^"' ]*?)\(([^)]*)\)/g; // Gets all media query instances inside the attribute (e.g. b(primary) from data-h2-bg-color="b(primary)")
      var property = attribute.match(propertyRegex);
      var values = attribute.match(valueRegex);
      values.forEach(function(value) {
        // Get the media query and match it to the array to get the CSS query text
        var mediaQueryRegex = /^.[^:(]*/g;
        var mediaQuery = value.match(mediaQueryRegex);
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
          singleValues = internalValues[0].split(',');
        } else {
          singleValues = internalValues;
        }
        // Create a new array so we can parse the values, remove any preceding spaces, and assemble them for use
        var parsedValues = [];
        singleValues.forEach(function(singleValue) {
          if (singleValue[0] == ' ') {
            parsedValues = parsedValues.concat(singleValue.slice(1));
          } else {
            parsedValues = parsedValues.concat(singleValue);
          }
        });
        // Create the string and value variables for later use
        var cssString;
        var valueCSS;
        if (property == 'custom') {
          // This will be for assembling custom CSS Hydrogen groups in the config so that you can consolidate recurring styles behind one attribute, in the same way you would with a class
        } else if (property == 'align-content') {
          // Align content only accepts 1 value
            // parsedValues[0] = alignment
          // Assemble the CSS
          cssString = '{align-content: ' + parsedValues[0] + ';}';
          // Add the final CSS to the output file
          valueCSS = [
            cssSelector + cssString
          ];
        } else if (property == 'align-items') {
          // Align items only accepts 1 value
            // parsedValues[0] = alignment
          // Assemble the CSS
          cssString = '{align-items: ' + parsedValues[0] + ';}';
          // Add the final CSS to the output file
          valueCSS = [
            cssSelector + cssString
          ];
        } else if (property == 'align-self') {
          // Align self only accepts 1 value
            // parsedValues[0] = alignment
          // Assemble CSS
          cssString = '{align-self: ' + parsedValues[0] + ';}';
          // Add the final CSS to the output file
          valueCSS = [
            cssSelector + cssString
          ];
        } else if (property == 'bg-color') {
          // Background color only accepts 1 value
          var bgColor = singleValues[0];
          var editCatch = singleValues[0];
          // Remove any prefixed spaces
          if (bgColor[0] == ' ') {
            bgColor = bgColor.slice(1);
            editCatch = editCatch.slice(1);
          }
          // Set variable for later use
          var cssContent = '';
          // Check if value is from config or not
          var userColors = settings.colors;
          userColors.forEach(function(color) {
            if (bgColor == color.key) {
              bgColor = color.color;
              // Assemble CSS
              cssContent = '{background-color: ' + bgColor + ';transition: 0.2s ease all;}';
            }
          });
          for (const [key, value] of Object.entries(gradientMap)) {
            if (bgColor == key) {
              bgColor = value;
              // Assemble CSS
              cssContent = '{background-image: ' + bgColor + ';transition: 0.2s ease all;}';
            }
          }
          if (editCatch == bgColor) {
            // Assemble CSS
            cssContent = '{background-color: ' + bgColor + ';transition: 0.2s ease all;}';
          }
          // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'border') {
          // Border accepts either 2 or 4 values, where two values allow for side and custom CSS, while 4 values allow for side, width, style, and color
            // parsedValues[0] = sides
            // parsedValues[1] = CSS or width
            // parsedValues[2] = style
            // parsedValues[3] = color
          // Check for the correct number of values
          if (parsedValues.length == 1 || parsedValues.length == 3) {
            // 1 or 3 values should result in an error
            console.error(
              'Hydrogen',
              '[ERROR]'.red,
              property.bold.red,
              'requires 2 or 4 values. If supplying 2 values, the first should be the side(s) you want the border to apply to, and the second should be a valid border CSS string. If supplying 4 values, the first should be the side(s), the second should be the width, the third should be the border style, and finally, the fourth should be the color.'
            );
            falseAttribute = true;
          } else {
            if (parsedValues.length == 2) {
              // Assemble CSS based on only the side option and the CSS string provided
              if (parsedValues[0] == 'all') {
                // Build the string
                cssString = '{border: ' + parsedValues[1] + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'top-bottom' || parsedValues[0] == 'bottom-top') {
                // Build the string
                cssString = '{border-top: ' + parsedValues[1] + ';border-bottom: ' + parsedValues[1] + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'right-left' || parsedValues[0] == 'left-right') {
                // Build the string
                cssString = '{border-left: ' + parsedValues[1] + ';border-right: ' + parsedValues[1] + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'top') {
                // Build the string
                cssString = '{border-top: ' + parsedValues[1] + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'right') {
                // Build the string
                cssString = '{border-right: ' + parsedValues[1] + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(right-left"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(left-right"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'bottom') {
                // Build the string
                cssString = '{border-bottom: ' + parsedValues[1] + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'left') {
                // Build the string
                cssString = '{border-left: ' + parsedValues[1] + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(right-left"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(left-right"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              }
            } else {
              // Assemble CSS based on side, width, style, and color
              // Parse width and color to see if the value is a key value
              var borderWidth = null;
              for (const [key, value] of Object.entries(whitespaceMap)) {
                if (parsedValues[1] == key) {
                  borderWidth = value;
                }
              }
              if (borderWidth == null) {
                borderWidth = parsedValues[1];
              }
              var borderColor = null;
              settings.colors.forEach(function(color) {
                if (parsedValues[3] == color.key) {
                  borderColor = color.color;
                }
              });
              if (borderColor == null) {
                borderColor = parsedValues[3];
              }
              // Build the CSS
              if (parsedValues[0] == 'all') {
                // Build the string 1px solid black
                cssString = '{border: ' + borderWidth + ' ' + parsedValues[2] + ' ' + borderColor + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'top-bottom' || parsedValues[0] == 'bottom-top') {
                // Build the string
                cssString = '{border-top: ' + borderWidth + ' ' + parsedValues[2] + ' ' + borderColor + ';border-bottom: ' + borderWidth + ' ' + parsedValues[2] + ' ' + borderColor + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'right-left' || parsedValues[0] == 'left-right') {
                // Build the string
                cssString = '{border-left: ' + borderWidth + ' ' + parsedValues[2] + ' ' + borderColor + ';border-right: ' + borderWidth + ' ' + parsedValues[2] + ' ' + borderColor + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'top') {
                // Build the string
                cssString = '{border-top: ' + borderWidth + ' ' + parsedValues[2] + ' ' + borderColor + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'right') {
                // Build the string
                cssString = '{border-right: ' + borderWidth + ' ' + parsedValues[2] + ' ' + borderColor + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(right-left"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(left-right"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'bottom') {
                // Build the string
                cssString = '{border-bottom: ' + borderWidth + ' ' + parsedValues[2] + ' ' + borderColor + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              } else if (parsedValues[0] == 'left') {
                // Build the string
                cssString = '{border-left: ' + borderWidth + ' ' + parsedValues[2] + ' ' + borderColor + ';transition: all 0.2s ease;}';
                // Add the final CSS to the output file
                valueCSS = [
                  '[data-h2-border*="all"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(right-left"]' + cssSelector + ',',
                  '[data-h2-border*="' + mediaQuery + '(left-right"]' + cssSelector + ',',
                  cssSelector + cssString
                ];
              }
            }
          }
        } else if (property == 'container') {
          // Container accepts 2 values
          var alignment = singleValues[0];
          var container = singleValues[1];
          // Remove any prefixed spaces
          if (alignment[0] == ' ') {
            alignment = alignment.slice(1);
          }
          if (container[0] == ' ') {
            container = container.slice(1);
          }
          // Assemble custom alignment settings
          var alignmentCSSContent = '';
          if (alignment == "center") {
            alignmentCSSContent = 'margin-right: auto;margin-left: auto;';
          } else if (alignment == 'left') {
            alignmentCSSContent = 'margin-right: auto;margin-left: 0;';
          } else if (alignment == 'right') {
            alignmentCSSContent = 'margin-right: 0;margin-left: auto;';
          } else {
            console.error(
              'Hydrogen',
              '[WARNING]'.yellow,
              alignment.bold.yellow,
              'is an unsupported alignment option for containers. Please use center, left, or right.'
            );
            falseAttribute = true;
          }
          // Check if the container value is from config or not
          var userSetting = settings.containers;
          userSetting.forEach(function(containerSetting) {
            if (container == containerSetting.key) {
              container = containerSetting.maxWidth;
            }
          });
          // Assemble CSS
          var cssContent = '{' + alignmentCSSContent + 'max-width: ' + container + ';width: 100%;}';
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
        } else if (property == 'flex-direction') {
          // Flex direction only accepts 1 value
          var direction = singleValues[0];
          // Remove any prefixed spaces
          if (direction[0] == ' ') {
            direction = direction.slice(1);
          }
          // User can't set any config values for flex direction
          // Assemble CSS
          var cssContent = '{flex-direction: ' + direction + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'flex-wrap') {
          // Flex wrap only accepts 1 value
          var flexWrap = singleValues[0];
          // Remove any prefixed spaces
          if (flexWrap[0] == ' ') {
            flexWrap = flexWrap.slice(1);
          }
          // User can't set any config values for flex wrap
          // Assemble CSS
          var cssContent = '{flex-wrap: ' + flexWrap + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'font-color' || property == 'color') {
          // Font color only accepts 1 value
          var fontColor = singleValues[0];
          var editCatch = singleValues[0];
          // Remove any prefixed spaces
          if (fontColor[0] == ' ') {
            fontColor = fontColor.slice(1);
            editCatch = editCatch.slice(1);
          }
          // Set variable for later use
          var cssContent = '';
          // Check if value is from config or not
          var userColors = settings.colors;
          userColors.forEach(function(color) {
            if (fontColor == color.key) {
              fontColor = color.color;
              // Assemble CSS
              cssContent = cssContent + '{color: ' + fontColor + ';transition: 0.2s ease all;}';
            }
          });
          for (const [key, value] of Object.entries(gradientMap)) {
            if (fontColor == key) {
              fontColor = value;
              // Assemble CSS
              cssContent = cssContent + '{background-image: ' + fontColor + ';background-clip: text;color: rgba(0, 0, 0, 0);transition: 0.2s ease all;}';
            }
          }
          if (editCatch == fontColor) {
            // Assemble CSS
            cssContent = cssContent + '{color: ' + fontColor + ';transition: 0.2s ease all;}';
          }
          // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'font-family') {
          // Font family only accepts 1 value
          var family = singleValues[0];
          // Remove any prefixed spaces
          if (family[0] == ' ') {
            family = family.slice(1);
          }
          // Check if name is from config or not
          var userFonts = settings.fonts;
          userFonts.forEach(function(font) {
            if (family == font.key) {
              family = font.family;
            }
          });
          // Assemble CSS
          var cssContent = '{font-family: "' + family + '";}';
          // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'font-size') {
          // Font size accepts 2 values, the second being optional
          var fontSize = singleValues[0];
          var lineHeight = singleValues[1];
          // Remove any prefixed spaces
          if (fontSize[0] == ' ') {
            fontSize = fontSize.slice(1);
          }
          if (lineHeight != null || lineHeight != undefined) {
            if (lineHeight[0] == ' ') {
              lineHeight = lineHeight.slice(1);
            }
          }
          // Build the font scale if the user has entered a key
          var baseSize = 1;
          var fontScale  = settings.fontScale;
          var captionSize = baseSize / fontScale;
          var h6Size = baseSize * fontScale;
          var h5Size = h6Size * fontScale;
          var h4Size = h5Size * fontScale;
          var h3Size = h4Size * fontScale;
          var h2Size = h3Size * fontScale;
          var h1Size = h2Size * fontScale;
          var numericFontSize; // For later use when the user sets a custom value
          var fontSizeUnit; // For later use
          var fontUnit; // For later use when the user sets a custom value
          var baseLineHeight = settings.fontBaseLineHeight;
          if (fontSize == 'h1') {
            numericFontSize = h1Size;
            fontSizeUnit = numericFontSize + 'rem';
          } else if (fontSize == 'h2') {
            numericFontSize = h2Size;
            fontSizeUnit = numericFontSize + 'rem';
          } else if (fontSize == 'h3') {
            numericFontSize = h3Size;
            fontSizeUnit = numericFontSize + 'rem';
          } else if (fontSize == 'h4') {
            numericFontSize = h4Size;
            fontSizeUnit = numericFontSize + 'rem';
          } else if (fontSize == 'h5') {
            numericFontSize = h5Size;
            fontSizeUnit = numericFontSize + 'rem';
          } else if (fontSize == 'h6') {
            numericFontSize = h6Size;
            fontSizeUnit = numericFontSize + 'rem';
          } else if (fontSize == 'base' || fontSize == 'paragraph' || fontSize == 'normal' || fontSize == 'copy') {
            numericFontSize = baseSize;
            fontSizeUnit = numericFontSize + 'rem';
          } else if (fontSize == 'label' || fontSize == 'caption') {
            numericFontSize = captionSize;
            fontSizeUnit = numericFontSize + 'rem';
          } else {
            // Check for px or rem value (Hydrogen only supports these)
            if (fontSize.match(/(rem)|(px)/g) != null) {
              numericFontSize = fontSize.match(/[0-9]/g);
              fontUnit = fontSize.match(/(rem)|(px)/g);
              if (fontUnit == 'px' && lineHeight == null || fontUnit == 'px' && lineHeight == undefined) {
                lineHeight = baseLineHeight;
              }
              fontSizeUnit = fontSize;
            } else {
              console.log(
                'Hydrogen',
                '[WARNING]'.yellow,
                fontSize.bold.yellow,
                'is an unsupported value for font sizes Please use one of the font scale values, a px, or a rem value.'
              );
              falseAttribute = true;
            }
          }
          // Build the line height scale - note that this has to happen if they've chosen a key or entered a manual rem value, because the line height rhythm should be maintained no matter what; this means finding the multiple of the line height that is higher than their custom font size
          if (lineHeight == null || lineHeight == undefined) {
            var lineHeightMultiple = 0;
            var lineHeightCounter = 1;
            do {
              lineHeightMultiple = baseLineHeight * lineHeightCounter;
              if (lineHeightMultiple < numericFontSize) {
                lineHeightCounter = lineHeightCounter + 1;
              } else {
                lineHeight = lineHeightMultiple/numericFontSize;
              } 
            } while (lineHeightMultiple < numericFontSize);
          }
          // Assemble CSS
          var cssContent = '{font-size: ' + fontSizeUnit + ';line-height: ' + lineHeight + ';}';
          // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'font-style') {
          // Font style only accepts 1 value
          var fontStyle = singleValues[0];
          // Remove any prefixed spaces
          if (fontStyle[0] == ' ') {
            fontStyle = fontStyle.slice(1);
          }
          // User can't set any config values for font style
          // Assemble CSS
          var cssContent = '{font-style: ' + fontStyle + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'font-weight') {
          // Font weight only accepts 1 value
          var weight = singleValues[0];
          // Remove any prefixed spaces
          if (weight[0] == ' ') {
            weight = weight.slice(1);
          }
          // User can't set any config values for font weight
          // Assemble CSS
          var cssContent = '{font-weight: ' + weight + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'gap') {
          // Gap accepts 2 values
          var orientation = singleValues[0];
          var gap = singleValues[1];
          // Remove any prefixed spaces
          if (orientation[0] == ' ') {
            orientation = orientation.slice(1);
          }
          if (gap[0] == ' ') {
            gap = gap.slice(1);
          }
          // Check if value is a key value based on line gap
          for (const [key, value] of Object.entries(whitespaceMap)) {
            if (gap == key) {
              gap = value;
            }
          }
          // Assemble CSS
          var cssContent;
          if (orientation == 'all' || orientation == 'both') {
            cssContent = '{gap: ' + gap + ';transition: 0.2s ease all;}';
          } else if (orientation == 'row') {
            cssContent = '{row-gap: ' + gap + ';transition: 0.2s ease all;}';
          } else if (orientation == 'column') {
            cssContent = '{column-gap: ' + gap + ';transition: 0.2s ease all;}';
          } else {
            console.error(
              'Hydrogen',
              '[WARNING]'.yellow,
              orientation.bold.yellow,
              'is an unsupported orientation option for gap. Please use all, row, or column.'
            );
            falseAttribute = true;
          }
          // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'grid-template-columns') {
          // Templates only accept 1 value
          var template = singleValues[0];
          // Remove any prefixed spaces
          if (template[0] == ' ') {
            template = template.slice(1);
          }
          // User can't set any config values for templates
          // Assemble CSS
          var cssContent = '{grid-template-columns: ' + template + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'grid-template-rows') {
          // Templates only accept 1 value
          var template = singleValues[0];
          // Remove any prefixed spaces
          if (template[0] == ' ') {
            template = template.slice(1);
          }
          // User can't set any config values for templates
          // Assemble CSS
          var cssContent = '{grid-template-rows: ' + template + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'height') {
          // Height only accepts 1 value
          var height = singleValues[0];
          // Remove any prefixed spaces
          if (height[0] == ' ') {
            height = height.slice(1);
          }
          // Check if value is a key value based on line height
          for (const [key, value] of Object.entries(whitespaceMap)) {
            if (height == key) {
              height = value;
            }
          }
          // Assemble CSS
          var cssContent = '{height: ' + height + ';transition: 0.2s ease all;}';
          // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'justify-content') {
          // Justify content only accepts 1 value
          var justification = singleValues[0];
          // Remove any prefixed spaces
          if (justification[0] == ' ') {
            justification = justification.slice(1);
          }
          // User can't set any config values for justify content
          // Assemble CSS
          var cssContent = '{justify-content: ' + justification + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'layer') {
          // Layer accepts 2 values, with the second being optional
          var layer = singleValues[0];
          var position = singleValues[1];
          // Remove any prefixed spaces
          if (layer[0] == ' ') {
            layer = layer.slice(1);
          }
          if (position != null || position != undefined) {
            if (position[0] == ' ') {
              position = position.slice(1);
            }
          }
          // Assemble the CSS
          if (position == null || position == undefined) {
            cssString = '{z-index: ' + layer + ';}';
          } else {
            cssString = '{position: ' + position + ';z-index: ' + layer + ';}';
          }
          // Add the final CSS to the output file
          valueCSS = [
            '[data-h2-position]' + cssSelector + ',',
            '[data-h2-visibility]' + cssSelector + ',',
            cssSelector + cssString
          ];
        } else if (property == 'location') {
          // Location accepts 4 values, where each value follows the CSS order of top, right, bottom, left; auto can be used to retain a default value 
          var value1 = singleValues[0];
          var value2 = singleValues[1];
          var value3 = singleValues[2];
          var value4 = singleValues[3];
          // Remove any prefixed spaces
          if (value1[0] == ' ') {
            value1 = value1.slice(1);
          }
          if (value2[0] == ' ') {
            value2 = value2.slice(1);
          }
          if (value3[0] == ' ') {
            value3 = value3.slice(1);
          }
          if (value4[0] == ' ') {
            value4 = value4.slice(1);
          }
          // Check if value is a key value based on line height
          for (const [key, value] of Object.entries(whitespaceMap)) {
            if (value1 == key) {
              value1 = value;
            }
            if (value2 == key) {
              value2 = value;
            }
            if (value3 == key) {
              value3 = value;
            }
            if (value4 == key) {
              value4 = value;
            }
          }
          // Assemble CSS
          var cssContent = '{top: ' + value1 + ';right: ' + value2 + ';bottom: ' + value3 + ';left: ' + value4 + ';transition: all 0.2s ease;}';
          // Add the final CSS to the output file
          var valueCSS = [
            '[data-h2-position]' + cssSelector + ',',
            '[data-h2-visibility]' + cssSelector + ',',
            cssSelector + cssContent
          ];
        } else if (property == 'margin') {
          // Margin accepts up to 4 values, and handles 1 or 2 values the same way CSS does, where 1 value sets all 4 margins, 2 values sets top-bottom/left-right respectively, and 4 individual values set each side separately 
          var value1 = singleValues[0];
          var value2 = singleValues[1];
          var value3 = singleValues[2];
          var value4 = singleValues[3];
          // Remove any prefixed spaces
          if (value1[0] == ' ') {
            value1 = value1.slice(1);
          }
          if (value2 != null || value2 != undefined) {
            if (value2[0] == ' ') {
              value2 = value2.slice(1);
            }
          }
          if (value3 != null || value3 != undefined) {
            if (value3[0] == ' ') {
              value3 = value3.slice(1);
            }
          }
          if (value4 != null || value4 != undefined) {
            if (value4[0] == ' ') {
              value4 = value4.slice(1);
            }
          }
          // Check if value is a key value based on line height
          for (const [key, value] of Object.entries(marginMap)) {
            if (value1 == key) {
              value1 = value;
            }
            if (value2 == key) {
              value2 = value;
            }
            if (value3 == key) {
              value3 = value;
            }
            if (value4 == key) {
              value4 = value;
            }
          }
          // Assemble CSS
          var cssContent;
          if (value2 == null || value2 == undefined) {
            cssContent = '{margin: ' + value1 + ';transition: all 0.2s ease;}';
          } else if (value3 == null || value3 == undefined) {
            cssContent = '{margin-top: ' + value1 + ';margin-bottom: ' + value1 + ';margin-right: ' + value2 + ';margin-left: ' + value2 + ';transition: all 0.2s ease;}';
          } else {
            cssContent = '{margin-top: ' + value1 + ';margin-bottom: ' + value3 + ';margin-right: ' + value2 + ';margin-left: ' + value4 + ';transition: all 0.2s ease;}';
          }
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'opacity') {
          // Opacity only accepts 1 value
          var opacity = singleValues[0];
          // Remove any prefixed spaces
          if (opacity[0] == ' ') {
            opacity = opacity.slice(1);
          }
          // User can't set any config values for opacity
          // Assemble CSS
          var cssContent = '{opacity: ' + opacity + ';transition: all 0.2s ease;}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'order') {
          // Order only accepts 1 value
          var order = singleValues[0];
          // Remove any prefixed spaces
          if (order[0] == ' ') {
            order = order.slice(1);
          }
          // User can't set any config values for order
          // Assemble CSS
          var cssContent = '{order: ' + order + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'overflow') {
          // Overflow accepts 2 values
          var orientation = singleValues[0];
          var overflow = singleValues[1];
          // Remove any prefixed spaces
          if (orientation[0] == ' ') {
            orientation = orientation.slice(1);
          }
          if (overflow[0] == ' ') {
            overflow = overflow.slice(1);
          }
          // User can't set any config values for overflow
          // Assemble CSS
          var cssContent;
          if (orientation == 'all' || orientation == 'both') {
            cssContent = '{overflow: ' + overflow + ';transition: 0.2s ease all;}';
          } else if (orientation == 'x') {
            cssContent = '{overflow-x: ' + overflow + ';transition: 0.2s ease all;}';
          } else if (orientation == 'y') {
            cssContent = '{overflow-y: ' + overflow + ';transition: 0.2s ease all;}';
          } else {
            console.error(
              'Hydrogen',
              '[WARNING]'.yellow,
              orientation.bold.yellow,
              'is an unsupported orientation option for overflow. Please use all, x, or y.'
            );
            falseAttribute = true;
          }
          // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'overlay') {
          // Overlay only accepts 1 value
          var bgColor = singleValues[0];
          var editCatch = singleValues[0];
          // Remove any prefixed spaces
          if (bgColor[0] == ' ') {
            bgColor = bgColor.slice(1);
            editCatch = editCatch.slice(1);
          }
          // Set variable for later use
          var cssContent = '';
          // Check if value is from config or not
          var userColors = settings.colors;
          userColors.forEach(function(color) {
            if (bgColor == color.key) {
              bgColor = color.color;
              // Assemble CSS
              cssContent = '{background-color: ' + bgColor + ';content: \' \';display: block;height: 100%;position: absolute;top: 0;left: 0;transition: all 0.2s ease;width: 100%;transition: 0.2s ease all;}';
            }
          });
          for (const [key, value] of Object.entries(gradientMap)) {
            if (bgColor == key) {
              bgColor = value;
              // Assemble CSS
              cssContent = '{background-image: ' + bgColor + ';content: \' \';display: block;height: 100%;position: absolute;top: 0;left: 0;transition: all 0.2s ease;width: 100%;transition: 0.2s ease all;}';
            }
          }
          if (editCatch == bgColor) {
            // Assemble CSS
            cssContent = '{background-color: ' + bgColor + ';content: \' \';display: block;height: 100%;position: absolute;top: 0;left: 0;transition: all 0.2s ease;width: 100%;transition: 0.2s ease all;}';
          }
          // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
          // Add the final CSS to the output file
          var valueCSS = [
            cssSelector + cssContent,
            cssSelector + ' > * {position: relative;}'
          ];
        } else if (property == 'padding') {
          // Padding accepts up to 4 values, and handles 1 or 2 values the same way CSS does, where 1 value sets all 4 padding values, 2 values sets top-bottom/left-right respectively, and 4 individual values set each side separately 
          var value1 = singleValues[0];
          var value2 = singleValues[1];
          var value3 = singleValues[2];
          var value4 = singleValues[3];
          // Remove any prefixed spaces
          if (value1[0] == ' ') {
            value1 = value1.slice(1);
          }
          if (value2 != null || value2 != undefined) {
            if (value2[0] == ' ') {
              value2 = value2.slice(1);
            }
          }
          if (value3 != null || value3 != undefined) {
            if (value3[0] == ' ') {
              value3 = value3.slice(1);
            }
          }
          if (value4 != null || value4 != undefined) {
            if (value4[0] == ' ') {
              value4 = value4.slice(1);
            }
          }
          // Check if value is a key value based on line height
          for (const [key, value] of Object.entries(whitespaceMap)) {
            if (value1 == key) {
              value1 = value;
            }
            if (value2 == key) {
              value2 = value;
            }
            if (value3 == key) {
              value3 = value;
            }
            if (value4 == key) {
              value4 = value;
            }
          }
          // Assemble CSS
          var cssContent;
          if (value2 == null || value2 == undefined) {
            cssContent = '{padding: ' + value1 + ';transition: all 0.2s ease;}';
          } else if (value3 == null || value3 == undefined) {
            cssContent = '{padding-top: ' + value1 + ';padding-bottom: ' + value1 + ';padding-right: ' + value2 + ';padding-left: ' + value2 + ';transition: all 0.2s ease;}';
          } else {
            cssContent = '{padding-top: ' + value1 + ';padding-bottom: ' + value3 + ';padding-right: ' + value2 + ';padding-left: ' + value4 + ';transition: all 0.2s ease;}';
          }
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'position') {
          // Position only accepts 1 value
          var position = singleValues[0];
          // Remove any prefixed spaces
          if (position[0] == ' ') {
            position = position.slice(1);
          }
          // Assemble CSS
          cssString = '{position: ' + position + ';}';
          // Add the final CSS to the output file
          valueCSS = [
            '[data-h2-visibility]' + cssSelector + ',',
            cssSelector + cssString
          ];
        } else if (property == 'radius') {
          // Border radius accepts up to 4 values, and handles 1 or 2 values the same way CSS does, where 1 value sets all 4 radius values, 2 values sets top-bottom/left-right respectively, and 4 individual values set each side separately 
          var value1 = singleValues[0];
          var value2 = singleValues[1];
          var value3 = singleValues[2];
          var value4 = singleValues[3];
          // Remove any prefixed spaces
          if (value1[0] == ' ') {
            value1 = value1.slice(1);
          }
          if (value2 != null || value2 != undefined) {
            if (value2[0] == ' ') {
              value2 = value2.slice(1);
            }
          }
          if (value3 != null || value3 != undefined) {
            if (value3[0] == ' ') {
              value3 = value3.slice(1);
            }
          }
          if (value4 != null || value4 != undefined) {
            if (value4[0] == ' ') {
              value4 = value4.slice(1);
            }
          }
          // Check if value is a key value based on line height
          var userRadius = settings.radius;
          userRadius.forEach(function(option) {
            if (value1 == option.key) {
              value1 = option.radius;
            }
            if (value2 == option.key) {
              value2 = option.radius;
            }
            if (value3 == option.key) {
              value3 = option.radius;
            }
            if (value4 == option.key) {
              value4 = option.radius;
            }
          });
          // Assemble CSS
          var cssContent;
          if (value2 == null || value2 == undefined) {
            cssContent = '{border-radius: ' + value1 + ';transition: all 0.2s ease;}';
          } else if (value3 == null || value3 == undefined) {
            cssContent = '{border-top-left-radius: ' + value1 + ';border-bottom-right-radius: ' + value1 + ';border-top-right-radius: ' + value2 + ';border-bottom-left-radius: ' + value2 + ';transition: all 0.2s ease;}';
          } else {
            cssContent = '{border-top-left-radius: ' + value1 + ';border-top-right-radius: ' + value2 + ';border-bottom-right-radius: ' + value3 + ';border-bottom-left-radius: ' + value4 + ';transition: all 0.2s ease;}';
          }
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'shadow') {
          // Box shadow only accepts 1 value
          var shadow = singleValues[0];
          // Remove any prefixed spaces
          if (shadow[0] == ' ') {
            shadow = shadow.slice(1);
          }
          // Check if value is from config or not
          var userShadows = settings.shadows;
          userShadows.forEach(function(setShadow) {
            if (shadow == setShadow.key) {
              shadow = setShadow.shadow;
            }
          });
          // Assemble CSS
          var cssContent = '{box-shadow: ' + shadow + ';transition: 0.2s ease all;}';
          // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'text-align') {
          // Text align only accepts 1 value
          var txtAlign = singleValues[0];
          // Remove any prefixed spaces
          if (txtAlign[0] == ' ') {
            txtAlign = txtAlign.slice(1);
          }
          // User can't set any config values for text align
          // Assemble CSS
          var cssContent = '{text-align: ' + txtAlign + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'text-decoration') {
          // Text decoration only accepts 1 value
          var decoration = singleValues[0];
          // Remove any prefixed spaces
          if (decoration[0] == ' ') {
            decoration = decoration.slice(1);
          }
          // User can't set any config values for text decoration
          // Assemble CSS
          var cssContent = '{text-decoration: ' + decoration + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'text-transform') {
          // Text transform only accepts 1 value
          var txtTransform = singleValues[0];
          // Remove any prefixed spaces
          if (txtTransform[0] == ' ') {
            txtTransform = txtTransform.slice(1);
          }
          // User can't set any config values for text transform
          // Assemble CSS
          var cssContent = '{text-transform: ' + txtTransform + ';}';
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'visibility') {
          // Visibility only accepts 1 value
          var visibility = singleValues[0];
          // Remove any prefixed spaces
          if (visibility[0] == ' ') {
            visibility = visibility.slice(1);
          }
          // User can't set any config values for visibility
          // Assemble CSS
          var cssContent;
          if (visibility == 'invisible') {
            cssContent = '{height: 1px;overflow: hidden;position: absolute;top: 0;left: -100vw;width: 1px;}';
          } else if (visibility == 'hidden') {
            cssContent = '{display: none;visibility: hidden;}';
          } else if (visibility == 'visible') {
            cssContent = '{display: block;height: auto;overflow: auto;position: static;top: auto;left: auto;width: auto;visibility: visible;}';
          } else {
            console.error(
              'Hydrogen',
              '[WARNING]'.yellow,
              visibility.bold.yellow,
              'is an unsupported option for visiblity. Please use visible, hidden, or invisible.'
            );
            falseAttribute = true;
          }
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else if (property == 'width') {
          // Width only accepts 1 value
          var width = singleValues[0];
          // Remove any prefixed spaces
          if (width[0] == ' ') {
            width = width.slice(1);
          }
          // Check if value is a key value based on line height
          for (const [key, value] of Object.entries(whitespaceMap)) {
            if (width == key) {
              width = value;
            }
          }
          // Assemble CSS
          var cssContent = '{width: ' + width + ';transition: 0.2s ease all;}';
          // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
          // Add the final CSS to the output file
          var valueCSS = cssSelector + cssContent;
        } else {
          console.log(
            'Hydrogen',
            '[WARNING]'.yellow,
            property[0].bold.yellow,
            'is an unsupported Hydrogen attribute.'
          );
          falseAttribute = true;
        }
        if (falseAttribute == false) {
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
                  if (Array.isArray(valueCSS) == true) {
                    valueCSS.forEach(function(item) {
                      arrayQuery.cssString = arrayQuery.cssString + item;
                    });
                  } else {
                    arrayQuery.cssString = arrayQuery.cssString + valueCSS;
                  }
                } else {
                  if (Array.isArray(valueCSS) == true) {
                    valueCSS.forEach(function(item) {
                      arrayQuery.cssString = arrayQuery.cssString + '.h2-dark ' + item;
                    });
                  } else {
                    arrayQuery.cssString = arrayQuery.cssString + '.h2-dark ' + valueCSS;
                  }
                }
              } else if (lightStatus == true) {
                if (arrayQuery.lightToggle == false) {
                  if (Array.isArray(valueCSS) == true) {
                    valueCSS.forEach(function(item) {
                      arrayQuery.cssString = arrayQuery.cssString + item;
                    });
                  } else {
                    arrayQuery.cssString = arrayQuery.cssString + valueCSS;
                  }
                } else {
                  if (Array.isArray(valueCSS) == true) {
                    valueCSS.forEach(function(item) {
                      arrayQuery.cssString = arrayQuery.cssString + '.h2-light ' + item;
                    });
                  } else {
                    arrayQuery.cssString = arrayQuery.cssString + '.h2-light ' + valueCSS;
                  }
                }
              } else {
                if (arrayQuery.lightToggle == false) {
                  if (Array.isArray(valueCSS) == true) {
                    valueCSS.forEach(function(item) {
                      arrayQuery.cssString = arrayQuery.cssString + item;
                    });
                  } else {
                    arrayQuery.cssString = arrayQuery.cssString + valueCSS;
                  }
                }
              }
            }
          });
        }
      });
    });
    mediaQueryArray.forEach(function(media) {
      // console.log(media);
      hydrogen = hydrogen + media.cssString + '}';
    });
    if (fs.existsSync('./tests/styles/hydrogen.css') == true) {
      fs.unlinkSync('./tests/styles/hydrogen.css');
    }
    fs.writeFileSync(
      './tests/styles/hydrogen.css',
      hydrogen,
      function (err) {
        if (err) {
          console.log('Hydrogen', '[ERROR]'.red, err);
        }
      }
    );
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
