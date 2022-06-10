// Hydrogen: Build Hydrogen

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');

// Local dependencies
var { validateConfig } = require('./validate-config');
var { getUserOutput } = require('./generate-paths');
var { loadSettings } = require('./load-settings');
var { h2Error, h2Timer } = require('./logs');
var { parseAttributes } = require('./parse-attributes');
var { generateCoreCSS } = require('./generate-core-css');
var { generateMediaQueryArray } = require('./generate-media-query-array');
var { buildVariables } = require('./build-variables');
var { processCSS } = require('./process-css');

// Attribute dependencies
var { parseSimpleAttribute } = require('./attributes/generic');
var { parseBackgroundColor } = require('./attributes/bg-color');
var { parseBorder } = require('./attributes/border');
var { parseContainer } = require('./attributes/container');
var { parseFlexGrid } = require('./attributes/flex-grid');
var { parseFlexItem } = require('./attributes/flex-item');
var { parseFontColor } = require('./attributes/font-color');
var { parseFontFamily } = require('./attributes/font-family');
var { parseFontSize } = require('./attributes/font-size');
var { parseGap } = require('./attributes/gap');
var { parseGridTemplate } = require('./attributes/grid-template');
var { parseLayer } = require('./attributes/layer');
var { parseOffset } = require('./attributes/offset');
var { parseOverflow } = require('./attributes/overflow');
var { parseOverlay } = require('./attributes/overlay');
var { parsePosition } = require('./attributes/position');
var { parseRadius } = require('./attributes/radius');
var { parseShadow } = require('./attributes/shadow');
var { parseSize } = require('./attributes/size');
var { parseSpace } = require('./attributes/space');
var { parseTransition } = require('./attributes/transition');
var { parseVisibility } = require('./attributes/visibility');

function getQueries(attribute, property) {
  var propertyRegex = new RegExp('data-h2-' + property + '="', 'g');
  attribute = attribute.replace(propertyRegex, '');
  attribute = attribute.slice(0, -1);
  var result = [];
  var open_bracket = 0;
  var curr_attribute = '';
  for (var i = 0; i < attribute.length; ++i) {
    if (attribute.charAt(i) === '(') open_bracket++;
    if (attribute.charAt(i) === ')') open_bracket--;

    if (attribute.charAt(i) == ' ') {
      if (open_bracket == 0 && curr_attribute != '') {
        result.push(curr_attribute);
        curr_attribute = '';
      } else if (open_bracket > 0) {
        curr_attribute += attribute.charAt(i);
      }
    } else {
      curr_attribute += attribute.charAt(i);
    }
  }
  result.push(curr_attribute); // to include the last matched token.
  return result;
}

function buildHydrogen(argv) {
  try {
    // Start total build timer
    const totalBuildTimerStart = process.hrtime.bigint();
    // Validate the configuration file
    var validation = validateConfig(argv);
    // Only run if the config passes
    if (validation === true) {
      // Load user settings
      var settings = loadSettings(argv);
      // Parse the project markup for attributes
      var hydrogenAttributes = parseAttributes(argv);
      // Build the core CSS
      var hydrogen = generateCoreCSS(argv);
      // Build the media query array
      var mediaQueryArray = generateMediaQueryArray(argv);
      // Generate CSS/Sass variable files if the user has enabled them
      if (settings.variables.css == true) {
        buildVariables(argv, 'css');
      }
      if (settings.variables.sass == true) {
        buildVariables(argv, 'scss');
      }
      // Start CSS construction timer
      const CSSTimerStart = process.hrtime.bigint();
      // Loop through attributes that have been found
      hydrogenAttributes.forEach(function (attribute) {
        var falseAttribute = false;
        var propertyRegex = /(?<=data-h2-)(?:([^"'=\s]*)|([^\s]+))/g; // Gets the property name out of the attribute (e.g. bg-color from data-h2-bg-color="")
        var property = attribute.match(propertyRegex);
        var values = getQueries(attribute, property);
        if (values != null && values[0].length != 0) {
          values.forEach(function (value) {
            // console.log(value);
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
            var stateRegex = /:hover|:active|:disabled|:focus|:visited|:checked|:link|:enabled|:valid|:required|:optional/g;
            var state = value.match(stateRegex);
            // Build the css selector
            var cssSelector;
            if (state == null) {
              cssSelector = '[data-h2-' + property + '*="' + value + '"]'; // Constructs the glob CSS selector (e.g. [data-h2-bg-color*="b(primary)"])
            } else {
              cssSelector = '[data-h2-' + property + '*="' + value + '"]' + state; // Constructs the glob CSS selector (e.g. [data-h2-bg-color*="b(primary)"])
            }
            var internalValuesRegex = /(?<=\().*(?=\))/g; // Gets the internal values of the media query (e.g. red, all from b(red, all))
            var internalValues = value.match(internalValuesRegex);
            // console.log(internalValues);
            var singleValueRegex = /[^,]*\([^)]*\)|[^,]+/g; // Gets comma separated values, minus commas, but also checks for xyz(a, ..), to account for rgba/hsl values
            var singleValues = internalValues[0].match(singleValueRegex);
            // Create a new array so we can parse the values, remove any preceding spaces, and assemble them for use
            var parsedValues = [];
            singleValues.forEach(function (singleValue) {
              if (singleValue[0] == ' ') {
                parsedValues = parsedValues.concat(singleValue.slice(1));
              } else {
                parsedValues = parsedValues.concat(singleValue);
              }
            });
            // Create the string and value variables for later use
            var valueCSS;
            if (property == 'custom') {
              // This will be for assembling custom CSS Hydrogen groups in the config so that you can consolidate recurring styles behind one attribute, in the same way you would with a class
            } else if (property == 'align-content') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'align-items') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'align-self') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'background-color' || property == 'bg-color') {
              valueCSS = parseBackgroundColor(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'border') {
              valueCSS = parseBorder(argv, property, mediaQuery, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'container') {
              valueCSS = parseContainer(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'flex-basis') {
              valueCSS = parseSpace(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'display') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'flex-direction') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'flex-grid') {
              valueCSS = parseFlexGrid(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'flex-item') {
              valueCSS = parseFlexItem(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'flex-wrap') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'font-color' || property == 'color') {
              valueCSS = parseFontColor(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'font-family') {
              valueCSS = parseFontFamily(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'font-size') {
              valueCSS = parseFontSize(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'font-style') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'font-weight') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'gap') {
              valueCSS = parseGap(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'grid-template-columns') {
              valueCSS = parseGridTemplate(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'grid-template-rows') {
              valueCSS = parseGridTemplate(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'height') {
              valueCSS = parseSize(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'justify-content') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'layer') {
              valueCSS = parseLayer(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'offset' || property == 'location') {
              valueCSS = parseOffset(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'margin') {
              valueCSS = parseSpace(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'max-height') {
              valueCSS = parseSpace(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'max-width') {
              valueCSS = parseSpace(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'opacity') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'order') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'overflow') {
              valueCSS = parseOverflow(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'overlay') {
              valueCSS = parseOverlay(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'padding') {
              valueCSS = parseSpace(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'position') {
              valueCSS = parsePosition(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'radius') {
              valueCSS = parseRadius(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'shadow') {
              valueCSS = parseShadow(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'text-align') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'text-decoration') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'text-transform') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'transition') {
              valueCSS = parseTransition(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'vertical-align') {
              valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'visibility') {
              valueCSS = parseVisibility(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else if (property == 'width') {
              valueCSS = parseSize(argv, property, cssSelector, parsedValues);
              if (valueCSS == null) {
                falseAttribute = true;
              }
            } else {
              var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' is not a valid Hydrogen attribute.';
              h2Error(errorMessage);
              falseAttribute = true;
            }
            if (falseAttribute == false) {
              // Check for dark siblings
              var lightStatus = false;
              values.forEach(function (thing) {
                var thingMedia = thing.match(mediaQueryRegex);
                if (mediaQuery[0] == thingMedia[0]) {
                  var thingDarkStatus = thing.match(modeRegex);
                  if (thingDarkStatus != null) {
                    lightStatus = true;
                  }
                }
              });
              // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
              mediaQueryArray.forEach(function (arrayQuery) {
                if (mediaQuery == arrayQuery.key && darkStatus == arrayQuery.darkMedia) {
                  if (darkStatus == true) {
                    if (arrayQuery.darkToggle == false) {
                      if (Array.isArray(valueCSS) == true) {
                        valueCSS.forEach(function (item) {
                          arrayQuery.cssString = arrayQuery.cssString + item;
                        });
                      } else {
                        arrayQuery.cssString = arrayQuery.cssString + valueCSS;
                      }
                    } else {
                      if (Array.isArray(valueCSS) == true) {
                        valueCSS.forEach(function (item) {
                          arrayQuery.cssString = arrayQuery.cssString + '.h2-dark ' + item;
                          arrayQuery.cssString = arrayQuery.cssString + '.h2-dark' + item;
                        });
                      } else {
                        arrayQuery.cssString = arrayQuery.cssString + '.h2-dark ' + valueCSS;
                        arrayQuery.cssString = arrayQuery.cssString + '.h2-dark' + valueCSS;
                      }
                    }
                  } else if (lightStatus == true) {
                    if (arrayQuery.lightToggle == false) {
                      if (Array.isArray(valueCSS) == true) {
                        valueCSS.forEach(function (item) {
                          arrayQuery.cssString = arrayQuery.cssString + item;
                        });
                      } else {
                        arrayQuery.cssString = arrayQuery.cssString + valueCSS;
                      }
                    } else {
                      if (Array.isArray(valueCSS) == true) {
                        valueCSS.forEach(function (item) {
                          arrayQuery.cssString = arrayQuery.cssString + '.h2-light ' + item;
                          arrayQuery.cssString = arrayQuery.cssString + '.h2-light' + item;
                        });
                      } else {
                        arrayQuery.cssString = arrayQuery.cssString + '.h2-light ' + valueCSS;
                        arrayQuery.cssString = arrayQuery.cssString + '.h2-light' + valueCSS;
                      }
                    }
                  } else {
                    if (arrayQuery.lightToggle == false) {
                      if (Array.isArray(valueCSS) == true) {
                        valueCSS.forEach(function (item) {
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
        } else {
          var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' is empty and has no options passed to it, so it has been ignored.';
          h2Error(errorMessage);
        }
      });
      mediaQueryArray.forEach(function (media) {
        if (media.closingBracket == true) {
          hydrogen = hydrogen + media.cssString + '}';
        } else {
          hydrogen = hydrogen + media.cssString;
        }
      });
      // Write the raw CSS file
      fs.writeFileSync(getUserOutput(argv, 'string') + '/hydrogen.raw.css', hydrogen);
      // End CSS construction timer
      const CSSTimerEnd = process.hrtime.bigint();
      h2Timer('CSS contruction time was', CSSTimerStart, CSSTimerEnd);
      // Run Autoprefixer and CSS Nano
      processCSS(argv);
      // End total build timer
      const totalBuildTimerEnd = process.hrtime.bigint();
      h2Timer('Total Hydrogen build time was', totalBuildTimerStart, totalBuildTimerEnd);
      // Log success
      console.log('✅ [' + 'Hydrogen'.magenta + ']', 'A CSS file was successfully built in ' + getUserOutput(argv, 'string').green + '/'.green);
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  buildHydrogen,
};
