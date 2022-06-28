// Hydrogen: Build Hydrogen

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');
var path = require('path');

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
  var propertyRegex = new RegExp(
    'data-h2-' + property + '(=|"(\\s)?:|\'(\\s)?:)\\s?["\']',
    'g'
  );
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
  if (curr_attribute != '') {
    result.push(curr_attribute); // to include the last matched token.
  }
  return result;
}

function lintParens(query) {
  var brackets = 0;
  for (var i = 0; i < query.length; ++i) {
    if (query.charAt(i) === '(') brackets++;
    if (query.charAt(i) === ')') brackets--;
  }
  if (brackets > 0 || brackets < 0) {
    return false;
  } else {
    return true;
  }
}

function buildHydrogen() {
  try {
    // Start total build timer
    const totalBuildTimerStart = process.hrtime.bigint();
    // Set up environment vars for debugging
    var debug = false;
    // Validate the configuration file
    var validation = validateConfig();
    // Only run if the config passes
    if (validation === true) {
      // Load user settings
      var settings = loadSettings();
      // Check for the debug state
      if (settings.debug != null && settings.debug === true) {
        debug = true;
      }
      // Parse the project markup for attributes
      var hydrogenAttributes = parseAttributes();
      // Debug: write attribute list to JSON
      if (debug) {
        var tempAttributes = [];
        hydrogenAttributes.forEach(function (item) {
          tempAttributes = tempAttributes.concat(item);
        });
        fs.writeFileSync(
          path.join(getUserOutput('string') + '/hydrogen.logs.attributes.json'),
          JSON.stringify(tempAttributes)
        );
      }
      // Build the core CSS
      var hydrogen = generateCoreCSS();
      // Set the pseudo class array ** Note that this array needs to be reflected in the media validation
      var pseudoArray = [
        'hover',
        'active',
        'disabled',
        'focus',
        'visited',
        'checked',
        'link',
        'enabled',
        'valid',
        'required',
        'optional',
      ];
      // Build the media query array
      var mediaQueryArray = generateMediaQueryArray(pseudoArray);
      // Generate CSS/Sass variable files if the user has enabled them
      if (settings.variables == true) {
        buildVariables();
      }
      // Start CSS construction timer
      const CSSTimerStart = process.hrtime.bigint();
      // Loop through attributes that have been found
      var debugValueArray = [];
      hydrogenAttributes.forEach(function (attribute) {
        var falseAttribute = false;
        var propertyRegex = /(?<=data-h2-)(?:([^"'=\s]*)|([^\s]+))/g; // Gets the property name out of the attribute (e.g. bg-color from data-h2-bg-color="")
        var property = attribute.match(propertyRegex);
        // Get the values from the attribute
        var values = getQueries(attribute, property);
        // Create a new debug value set
        var newDebugValueSet = {
          attribute: attribute,
          valuesArray: values,
          values: [],
        };
        // Loop through the values
        if (values != null && values.length != 0 && values[0].length != 0) {
          values.forEach(function (value) {
            // Add the value to the debug array
            var newDebugValue = {
              value: value,
            };
            // Lint for extra parentheses
            if (lintParens(value) == false) {
              var error =
                '"'.red +
                property[0].red +
                '"'.red +
                ' contains a query (' +
                value.red +
                ') that appears to have an extra parenthesis. This might be a typo.';
              h2Error(error);
              falseAttribute = true;
            } else {
              // Get the front of the query
              var queryRegex = /^[^(]+/g;
              var mediaQuery = value.match(queryRegex);
              // Get the individual queries by splitting at : characters
              var mediaModifiers = mediaQuery[0].split(':');
              // Add the media modifiers to the debug array
              newDebugValue.mediaModifiers = mediaModifiers;
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
              // Add the final parsed query elements to the debug array
              newDebugValue.finalQuery = finalQuery;
              newDebugValue.finalMode = finalMode;
              newDebugValue.finalPseudo = finalPseudo;
              // Check to see if the media query was valid, and if was, continue
              if (finalQuery != null) {
                // Check if siblings have dark specified
                var lightStatus = false;
                if (finalMode != 'dark') {
                  // The value was a light mode value, copy the values array
                  var darkCheckValues = JSON.parse(JSON.stringify(values));
                  // Add the copied array to the debug array
                  newDebugValue.copiedValues = darkCheckValues;
                  // Copy the array again so that the current value can be removed from it
                  var cleanedDarkCheckValues = JSON.parse(
                    JSON.stringify(values)
                  );
                  cleanedDarkCheckValues = cleanedDarkCheckValues.filter(
                    (item) => item !== value
                  );
                  // Add the cleaned array to the debug array
                  newDebugValue.cleanedValuesArray = cleanedDarkCheckValues;
                  // Create a new individual value array for debugging
                  newDebugValue.cleanedValues = [];
                  // Loop through the cleaned array items
                  if (
                    cleanedDarkCheckValues != null &&
                    cleanedDarkCheckValues.length != 0 &&
                    cleanedDarkCheckValues[0].length != 0
                  ) {
                    cleanedDarkCheckValues.forEach(function (checkValue) {
                      // Get the front of the query
                      var darkmediaQuery = checkValue.match(queryRegex);
                      // Get the individual queries by splitting at : characters
                      var darkmediaModifiers = darkmediaQuery[0].split(':');
                      // Add the individual value's media modifiers to the debug array
                      var cleanedValue = {
                        darkMediaModifiers: darkmediaModifiers,
                      };
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
                      // Set the individual value's media modifiers in the debug array
                      cleanedValue.darkFinalQuery = darkFinalQuery;
                      cleanedValue.darkFinalMode = darkFinalMode;
                      cleanedValue.darkFinalPseudo = darkFinalPseudo;
                      // Add the full value object to the debug array
                      newDebugValue.cleanedValues =
                        newDebugValue.cleanedValues.concat(cleanedValue);
                      // Set the light status to true if it turns out there's an equivalent dark mode query
                      if (
                        darkFinalQuery == finalQuery &&
                        darkFinalMode == 'dark' &&
                        darkFinalPseudo == finalPseudo
                      ) {
                        lightStatus = true;
                      }
                    });
                  }
                }
                // Add the final light status to the debug array
                newDebugValue.lightState = lightStatus;
                // Add the final value's total object to the debug array
                newDebugValueSet.values =
                  newDebugValueSet.values.concat(newDebugValue);
                // Build the css selector
                var cssSelector;
                if (finalPseudo == null) {
                  cssSelector = '[data-h2-' + property + '*="' + value + '"]'; // Constructs the glob CSS selector (e.g. [data-h2-bg-color*="b(primary)"])
                } else {
                  cssSelector =
                    '[data-h2-' +
                    property +
                    '*="' +
                    value +
                    '"]:' +
                    finalPseudo; // Constructs the glob CSS selector (e.g. [data-h2-bg-color*="b(primary)"])
                }
                var internalValuesRegex = /(?<=\().*(?=\))/g; // Gets the internal values of the media query (e.g. red, all from b(red, all))
                var internalValues = value.match(internalValuesRegex);
                // Check to see if the query was empty (e.g. b() vs b(things))
                if (
                  internalValues != null &&
                  internalValues.length != 0 &&
                  internalValues[0].length != 0
                ) {
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
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'align-items') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'align-self') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (
                    property == 'background-color' ||
                    property == 'bg-color'
                  ) {
                    valueCSS = parseBackgroundColor(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'border') {
                    valueCSS = parseBorder(
                      property,
                      mediaQuery,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'container') {
                    valueCSS = parseContainer(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'cursor') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'display') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'flex-basis') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'flex-direction') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'flex-grid') {
                    valueCSS = parseFlexGrid(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'flex-item') {
                    valueCSS = parseFlexItem(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'flex-wrap') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'font-color' || property == 'color') {
                    valueCSS = parseFontColor(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'font-family') {
                    valueCSS = parseFontFamily(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'font-size') {
                    valueCSS = parseFontSize(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'font-style') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'font-weight') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'gap') {
                    valueCSS = parseGap(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'grid-column') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'grid-row') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'grid-template-columns') {
                    valueCSS = parseGridTemplate(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'grid-template-rows') {
                    valueCSS = parseGridTemplate(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'height') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'justify-content') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'layer') {
                    valueCSS = parseLayer(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'list-style') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'offset' || property == 'location') {
                    valueCSS = parseOffset(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'margin') {
                    valueCSS = parseSpace(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'margin-top') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'margin-right') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'margin-bottom') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'margin-left') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'max-height') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'max-width') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'min-height') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'min-width') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'opacity') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'order') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'overflow') {
                    valueCSS = parseOverflow(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'overlay') {
                    valueCSS = parseOverlay(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'padding') {
                    valueCSS = parseSpace(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'padding-top') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'padding-right') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'padding-bottom') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'padding-left') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'position') {
                    valueCSS = parsePosition(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'radius') {
                    valueCSS = parseRadius(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'shadow') {
                    valueCSS = parseShadow(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'text-align') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'text-decoration') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'text-transform') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'transition') {
                    valueCSS = parseTransition(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'vertical-align') {
                    valueCSS = parseSimpleAttribute(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'visibility') {
                    valueCSS = parseVisibility(
                      property,
                      cssSelector,
                      parsedValues
                    );
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else if (property == 'width') {
                    valueCSS = parseSize(property, cssSelector, parsedValues);
                    if (valueCSS == null) {
                      falseAttribute = true;
                    }
                  } else {
                    var errorMessage =
                      '"data-h2-'.red +
                      property[0].red +
                      '"'.red +
                      ' is not a valid Hydrogen attribute.';
                    h2Error(errorMessage);
                    falseAttribute = true;
                  }
                } else {
                  falseAttribute = true;
                }
              } else {
                falseAttribute = true;
                var error =
                  '"'.red +
                  mediaQuery[0].red +
                  '"'.red +
                  " contains an invalid media query. Please ensure you're using queries defined in your configuration.";
                h2Error(error);
              }
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
                            query.queryString =
                              query.queryString + '.h2-light' + item;
                            query.queryString =
                              query.queryString + '.h2-light ' + item;
                          });
                        } else {
                          query.queryString =
                            query.queryString + '.h2-light' + valueCSS;
                          query.queryString =
                            query.queryString + '.h2-light ' + valueCSS;
                        }
                      } else if (
                        lightStatus == true &&
                        query.state == 'default'
                      ) {
                        // Default, with light mode needed, default setting
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + item;
                          });
                        } else {
                          query.queryString = query.queryString + valueCSS;
                        }
                      } else if (
                        lightStatus == false &&
                        query.state == 'default'
                      ) {
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
                            query.queryString =
                              query.queryString + '.h2-light' + item;
                            query.queryString =
                              query.queryString + '.h2-light ' + item;
                          });
                        } else {
                          query.queryString =
                            query.queryString + '.h2-light' + valueCSS;
                          query.queryString =
                            query.queryString + '.h2-light ' + valueCSS;
                        }
                      } else if (
                        lightStatus == true &&
                        query.state == 'default'
                      ) {
                        // Default with pseudo with light mode needed, default setting
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString = query.queryString + item;
                          });
                        } else {
                          query.queryString = query.queryString + valueCSS;
                        }
                      } else if (
                        lightStatus == false &&
                        query.state == 'default'
                      ) {
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
                            query.queryString =
                              query.queryString + '.h2-dark' + item;
                            query.queryString =
                              query.queryString + '.h2-dark ' + item;
                          });
                        } else {
                          query.queryString =
                            query.queryString + '.h2-dark' + valueCSS;
                          query.queryString =
                            query.queryString + '.h2-dark ' + valueCSS;
                        }
                      } else if (finalPseudo == query.pseudo) {
                        // Pseudo class was included
                        if (Array.isArray(valueCSS) == true) {
                          valueCSS.forEach(function (item) {
                            query.queryString =
                              query.queryString + '.h2-dark' + item;
                            query.queryString =
                              query.queryString + '.h2-dark ' + item;
                          });
                        } else {
                          query.queryString =
                            query.queryString + '.h2-dark' + valueCSS;
                          query.queryString =
                            query.queryString + '.h2-dark ' + valueCSS;
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
          var errorMessage =
            '"data-h2-'.red +
            property[0].red +
            '"'.red +
            ' is empty and has no options passed to it, so it has been ignored.';
          h2Error(errorMessage);
        }
        // Add the whole attribute value set to the debug array
        debugValueArray = debugValueArray.concat(newDebugValueSet);
      });
      // Write the values debug file
      if (debug) {
        fs.writeFileSync(
          getUserOutput('string') + '/hydrogen.logs.values.json',
          JSON.stringify(debugValueArray)
        );
      }
      // Add each query string to the Hydrogen string and close the media query bracket if necessary
      mediaQueryArray.forEach(function (query) {
        if (query.bracket == true) {
          hydrogen = hydrogen + query.queryString + '}';
        } else {
          hydrogen = hydrogen + query.queryString;
        }
      });
      if (debug) {
        // Write a dump of the media array
        fs.writeFileSync(
          path.join(getUserOutput('string') + '/hydrogen.logs.media.json'),
          JSON.stringify(mediaQueryArray)
        );
      }
      // Delete any existing raw CSS files
      if (
        fs.existsSync(
          path.join(getUserOutput('string') + '/hydrogen.raw.css')
        ) == true
      ) {
        fs.unlinkSync(path.join(getUserOutput('string') + '/hydrogen.raw.css'));
      }
      // Write the new file
      fs.writeFileSync(
        path.join(getUserOutput('string') + '/hydrogen.raw.css'),
        hydrogen
      );
      // End CSS construction timer
      const CSSTimerEnd = process.hrtime.bigint();
      h2Timer('CSS contruction time was', CSSTimerStart, CSSTimerEnd);
      // Run Autoprefixer and CSS Nano
      var processStatus = processCSS();
      if (processStatus === true) {
        // End total build timer
        const totalBuildTimerEnd = process.hrtime.bigint();
        h2Timer(
          'Total Hydrogen build time was',
          totalBuildTimerStart,
          totalBuildTimerEnd
        );
        // Log that debug logs were created if debug is set
        if (debug) {
          console.log(
            '🔔 [' + 'Hydrogen'.magenta + ']',
            "You've set Hydrogen to generate output logs and retain a pre-processed CSS file in " +
              path.resolve(getUserOutput('string')).green +
              ' for debugging purposes.'
          );
        }
        // Log success
        console.log(
          '✅ [' + 'Hydrogen'.magenta + ']',
          'A CSS file was successfully built in ' +
            path.resolve(getUserOutput('string')).green
        );
      }
    }
  } catch (error) {
    h2Error(error);
    return false;
  }
}

module.exports = {
  buildHydrogen,
};
