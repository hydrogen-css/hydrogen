// Hydrogen: Build Hydrogen

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');

// Local dependencies
var { validateConfig } = require('./validate-config');
var { parseENV } = require('./parse-env');
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
  var propertyRegex = new RegExp('data-h2-' + property + '(=|"(\\s)?:|\'(\\s)?:)\\s?["\']', 'g');
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
    // Set up environment vars for debugging
    var debug = false;
    var envObject = parseENV(argv);
    var envState = envObject.state;
    if (envState == 'dev') {
      debug = false;
    }
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
      // Set the pseudo class array ** Note that this array needs to be reflected in the media validation
      var pseudoArray = ['hover', 'active', 'disabled', 'focus', 'visited', 'checked', 'link', 'enabled', 'valid', 'required', 'optional'];
      // Build the media query array
      var mediaQueryArray = generateMediaQueryArray(argv, pseudoArray);
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

        if (debug) {
          console.log('NEW VALUE SET\n'.red + attribute);
        }
        if (debug) {
          console.log(values);
        }

        if (values != null && values.length != 0 && values[0].length != 0) {
          values.forEach(function (value) {
            if (debug) {
              console.log('');
            }
            if (debug) {
              console.log('NEW VALUE'.yellow);
            }
            if (debug) {
              console.log(value);
            }
            // Get the front of the query
            var queryRegex = /^[^(]+/g;
            var mediaQuery = value.match(queryRegex);
            // Get the individual queries by splitting at : characters
            var mediaModifiers = mediaQuery[0].split(':');
            if (debug) {
              console.log(mediaModifiers);
            }
            // Set the working variables
            var finalQuery = null;
            var finalMode = null;
            var finalPseudo = null;
            mediaModifiers.forEach(function (modifier) {
              settings.media.forEach(function (query) {
                if (query.key == modifier) {
                  finalQuery = modifier;
                }
              });
              if (modifier == 'dark') {
                finalMode = modifier;
              }
              pseudoArray.forEach(function (pseudo) {
                if (pseudo == modifier) {
                  finalPseudo = modifier;
                }
              });
            });
            if (debug) {
              console.log('True final query:', finalQuery);
            }
            if (debug) {
              console.log('True final mode:', finalMode);
            }
            if (debug) {
              console.log('True final pseudo:', finalPseudo);
            }
            // Check if siblings have dark specified
            var lightStatus = false;
            if (finalMode != 'dark') {
              var darkCheckValues = JSON.parse(JSON.stringify(values));
              if (debug) {
                console.log('Copied values array:', darkCheckValues);
              }
              var index = darkCheckValues.indexOf(value);
              if (index > -1) {
                darkCheckValues.splice(index, 1);
              }
              if (debug) {
                console.log('Cleaned values array:', darkCheckValues);
              }
              if (darkCheckValues != null && darkCheckValues.length != 0 && darkCheckValues[0].length != 0) {
                darkCheckValues.forEach(function (checkValue) {
                  // Get the front of the query
                  var darkmediaQuery = checkValue.match(queryRegex);
                  // Get the individual queries by splitting at : characters
                  var darkmediaModifiers = darkmediaQuery[0].split(':');
                  if (debug) {
                    console.log(darkmediaModifiers);
                  }
                  // Set the working variables
                  var darkFinalQuery = null;
                  var darkFinalMode = null;
                  var darkFinalPseudo = null;
                  darkmediaModifiers.forEach(function (darkmodifier) {
                    settings.media.forEach(function (darkquery) {
                      if (darkquery.key == darkmodifier) {
                        darkFinalQuery = darkmodifier;
                      }
                    });
                    if (darkmodifier == 'dark') {
                      darkFinalMode = darkmodifier;
                    }
                    pseudoArray.forEach(function (darkpseudo) {
                      if (darkpseudo == darkmodifier) {
                        darkFinalPseudo = darkmodifier;
                      }
                    });
                  });
                  if (debug) {
                    console.log('Dark check final query:', darkFinalQuery);
                  }
                  if (debug) {
                    console.log('Dark check final mode:', darkFinalMode);
                  }
                  if (debug) {
                    console.log('Dark check final pseudo:', darkFinalPseudo);
                  }
                  if (darkFinalQuery == finalQuery && darkFinalMode == 'dark' && darkFinalPseudo == finalPseudo) {
                    lightStatus = true;
                  }
                });
              }
            }
            if (debug) {
              console.log('Light status:', lightStatus);
            }
            if (debug) {
              console.log('\n\n');
            }
            // Build the css selector
            var cssSelector;
            if (finalPseudo == null) {
              cssSelector = '[data-h2-' + property + '*="' + value + '"]'; // Constructs the glob CSS selector (e.g. [data-h2-bg-color*="b(primary)"])
            } else {
              cssSelector = '[data-h2-' + property + '*="' + value + '"]:' + finalPseudo; // Constructs the glob CSS selector (e.g. [data-h2-bg-color*="b(primary)"])
            }
            var internalValuesRegex = /(?<=\().*(?=\))/g; // Gets the internal values of the media query (e.g. red, all from b(red, all))
            var internalValues = value.match(internalValuesRegex);
            // Check to see if the query was empty (e.g. b() vs b(things))
            if (internalValues != null && internalValues.length != 0 && internalValues[0].length != 0) {
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
              } else if (property == 'cursor') {
                valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'display') {
                valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'flex-basis') {
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
              } else if (property == 'grid-column') {
                valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'grid-row') {
                valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
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
              } else if (property == 'list-style') {
                valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
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
              } else if (property == 'margin-top') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'margin-right') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'margin-bottom') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'margin-left') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'max-height') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'max-width') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'min-height') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'min-width') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
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
              } else if (property == 'padding-top') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'padding-right') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'padding-bottom') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
                if (valueCSS == null) {
                  falseAttribute = true;
                }
              } else if (property == 'padding-left') {
                valueCSS = parseSize(argv, property, cssSelector, parsedValues);
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
            } else {
              falseAttribute == true;
            }
            // Check to see if the attribute passed as valid
            if (falseAttribute == false) {
              // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
              mediaQueryArray.forEach(function (query) {
                if (finalQuery == query.key) {
                  if (finalMode == null) {
                    if (finalPseudo == null && query.pseudo == 'default') {
                      // Pseudo not included
                      if (lightStatus == true && query.state == 'classLight') {
                        // Default with light mode needed, light class setting
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + '.h2-light' + item;
                            query.queryString = query.queryString + '.h2-light ' + item;
                          });
                        } else {
                          query.queryString = query.queryString + '.h2-light' + valueCSS;
                          query.queryString = query.queryString + '.h2-light ' + valueCSS;
                        }
                      } else if (lightStatus == true && query.state == 'default') {
                        // Default, with light mode needed, default setting
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + item;
                          });
                        } else {
                          query.queryString = query.queryString + valueCSS;
                        }
                      } else if (lightStatus == false && query.state == 'default') {
                        // Default, no dark mode sibling
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + item;
                          });
                        } else {
                          query.queryString = query.queryString + valueCSS;
                        }
                      }
                    } else if (finalPseudo == query.pseudo) {
                      // Pseudo class was included
                      if (lightStatus == true && query.state == 'classLight') {
                        // Default with pseudo with light mode needed, light class setting
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + '.h2-light' + item;
                            query.queryString = query.queryString + '.h2-light ' + item;
                          });
                        } else {
                          query.queryString = query.queryString + '.h2-light' + valueCSS;
                          query.queryString = query.queryString + '.h2-light ' + valueCSS;
                        }
                      } else if (lightStatus == true && query.state == 'default') {
                        // Default with pseudo with light mode needed, default setting
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + item;
                          });
                        } else {
                          query.queryString = query.queryString + valueCSS;
                        }
                      } else if (lightStatus == false && query.state == 'default') {
                        // Default with pseudo, no dark mode sibling
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + item;
                          });
                        } else {
                          query.queryString = query.queryString + valueCSS;
                        }
                      }
                    }
                  } else if (finalMode == 'dark') {
                    if (query.state == 'classDark') {
                      if (finalPseudo == null && query.pseudo == 'default') {
                        // Pseudo not included
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + '.h2-dark' + item;
                            query.queryString = query.queryString + '.h2-dark ' + item;
                          });
                        } else {
                          query.queryString = query.queryString + '.h2-dark' + valueCSS;
                          query.queryString = query.queryString + '.h2-dark ' + valueCSS;
                        }
                      } else if (finalPseudo == query.pseudo) {
                        // Pseudo class was included
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + '.h2-dark' + item;
                            query.queryString = query.queryString + '.h2-dark ' + item;
                          });
                        } else {
                          query.queryString = query.queryString + '.h2-dark' + valueCSS;
                          query.queryString = query.queryString + '.h2-dark ' + valueCSS;
                        }
                      }
                    } else if (query.state == 'preferenceDark') {
                      if (finalPseudo == null && query.pseudo == 'default') {
                        // Pseudo not included
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + item;
                          });
                        } else {
                          query.queryString = query.queryString + valueCSS;
                        }
                      } else if (finalPseudo == query.pseudo) {
                        // Pseudo class was included
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + item;
                          });
                        } else {
                          query.queryString = query.queryString + valueCSS;
                        }
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
      // Add each query string to the Hydrogen string and close the media query bracket if necessary
      mediaQueryArray.forEach(function (query) {
        if (query.bracket == true) {
          hydrogen = hydrogen + query.queryString + '}';
        } else {
          hydrogen = hydrogen + query.queryString;
        }
      });
      if (envState == 'dev') {
        // Write a dump of the media array
        fs.writeFileSync(getUserOutput(argv, 'string') + '/hydrogen.media.json', JSON.stringify(mediaQueryArray));
      }
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
