// Hydrogen: Build Hydrogen

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');

// Local dependencies
var { parseENV } = require('./parse-env');
var { loadSettings } = require('./load-settings');
var { parseAttributes } = require('./parse-attributes');
var { generateCoreCSS } = require('./generate-core-css');
var { generateMediaQueryArray } = require('./generate-media-query-array');
var { buildVariables } = require('./build-variables');
var { parseColor } = require('./parse-color');
var { calculateLineHeight } = require('./calculate-line-height');

function buildHydrogen(argv) {
  try {
    var envObject = parseENV(argv);
    var envState = envObject.state;
    var envSrc = envObject.src;
    console.time(
      'Hydrogen ' + '[LOGGING]'.magenta + ' Hydrogen\'s total build time was',
      'totalTime'
    );
    var settings = loadSettings(argv);
    var hydrogenAttributes = parseAttributes(argv);
    var hydrogen = generateCoreCSS(argv);
    var mediaQueryArray = generateMediaQueryArray(argv);
    // Generate whitespace values for reuse later
    var userLineHeight = settings.baseLineHeight;
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
    // Generate CSS/Sass variable files if the user has enabled them
    if (settings.variables.css == true) {
      buildVariables(argv, 'css', marginMap);
    }
    if (settings.variables.sass == true) {
      buildVariables(argv, 'scss', marginMap);
    }
    console.time(
      'Hydrogen ' + '[LOGGING]'.magenta + ' CSS contruction time was',
      'buildTime'
    );
    // Loop through attributes that have been found
    hydrogenAttributes.forEach(function(attribute) {
      var falseAttribute = false;
      var propertyRegex = /(?<=data-h2-)(?:([^"'=\s]*)|([^\s]+))/g; // Gets the property name out of the attribute (e.g. bg-color from data-h2-bg-color="")
      var valueRegex = /([^"' ]*?)\(([^)]*)\)/g; // Gets all media query instances inside the attribute (e.g. b(primary) from data-h2-bg-color="b(primary)")
      var property = attribute.match(propertyRegex);
      var values = attribute.match(valueRegex);
      if (values != null) {
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
              // parsedValues[0] = color
            // Set variable for later use
            var cssString;
            // Get the color or gradient
            var finalColor = parseColor(argv, property, parsedValues[0]);
            // Log an error if the color comes back wrong, otherwise build the CSS
            if (finalColor == null || finalColor == undefined) {
              console.log(
                'Hydrogen',
                '[ERROR]'.red,
                parsedValues[0].bold.red,
                'is an unsupported color for background colors.'
              );
              falseAttribute = true;
            } else {
              if (finalColor.type == 'solid') {
                cssString = '{background-color: ' + finalColor.color + ';transition: 0.2s ease all;}';
              } else if (finalColor.type == 'gradient') {
                cssString = '{background-image: ' + finalColor.color + ';transition: 0.2s ease all;}';
              }
            }
            // Add the final CSS to the output file
            var valueCSS = cssSelector + cssString;
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
                '[ERROR]'.red,
                alignment.bold.red,
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
          } else if (property == 'flex-grid') {
            // Flex grids accept 3 values
              // parsedValues[0] = item alignment
              // parsedValues[1] = wrapper padding
              // parsedValues[2] = item gap/gutter
            // Assemble CSS
            // Item alignment
            var itemAlignment = parsedValues[0];
            if (parsedValues[0] == 'top') {
              itemAlignment = 'flex-start';
            } else if (parsedValues[0] == 'middle') {
              itemAlignment = 'center';
            } else if (parsedValues[0] == 'bottom') {
              itemAlignment = 'flex-end';
            }
            // Wrapper padding
            var wrapperPadding = 'padding: ' + parsedValues[1] + ';';
            for (const [key, value] of Object.entries(whitespaceMap)) {
              if (parsedValues[1] == key) {
                wrapperPadding = 'padding: ' + value + ';';
              }
            }
            if (parsedValues[1] == 'flush') {
              wrapperPadding = '';
            }
            // Item gap/gutter
            var itemGap = parsedValues[2];
            for (const [key, value] of Object.entries(whitespaceMap)) {
              if (parsedValues[2] == key) {
                itemGap = value;
              }
            }
            if (parsedValues[2] == '0' || 
            parsedValues[2] == 'none' ||
            parsedValues[2] == '0px' ||
            parsedValues[2] == '0rem') {
              itemGap = '0rem';
            }
            // Produce CSS string
            cssString = '{align-items: ' + itemAlignment + ';display: flex;flex-wrap: wrap; --h2-grid-gap: ' + itemGap + ';gap: var(--h2-grid-gap);' + wrapperPadding + '}';
            // Add the final CSS to the output file
            valueCSS = [
              cssSelector + cssString
            ];
          } else if (property == 'flex-item') {
            // Flex item only accepts 1 value
              // parseValues[0] = XofY
            // Assemble CSS
            if (parsedValues[0] == 'auto') {
              cssString = '{flex: auto;max-width: 100%;min-width: 0;}';
            } else if (parsedValues[0] == 'content' || parsedValues[0] == 'initial') {
              cssString = '{flex: initial;max-width: 100%;min-width: 0;}';
            } else if (parsedValues[0] == 'fill' || parsedValues[0] == '1') {
              cssString = '{flex: 1;max-width: 100%;min-width: 0;}';
            } else {
              var firstColumn = parsedValues[0].match(/^[0-9]+/g);
              var secondColumn = parsedValues[0].match(/(?<=of)[0-9]+/g);
              if (firstColumn != null && secondColumn != null) {
                cssString = '{flex: 0 0 calc((' + firstColumn + ' / ' + secondColumn + ' * 100%) - (((' + secondColumn + ' - 1) * var(--h2-grid-gap)) / ' + secondColumn + '));max-width: calc(' + firstColumn + ' / ' + secondColumn + ' * 100%);min-width: 0;}';
              } else {
                console.error(
                  'Hydrogen',
                  '[ERROR]'.red,
                  parsedValues[0].bold.red,
                  'is an unsupported option for flex items. Please specify XofY for columns, auto, initial, or fill.'
                );
                falseAttribute = true;
              }
            }
            // Add the final CSS to the output file
            valueCSS = [
              '[data-h2-flex-grid] > ' + cssSelector + cssString
            ];
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
              // parsedValues[0] = color
            // Set variable for later use
            var cssString;
            // Get the color or gradient
            var finalColor = parseColor(argv, property, parsedValues[0]);
            // Log an error if the color comes back wrong, otherwise build the CSS
            if (finalColor == null || finalColor == undefined) {
              console.log(
                'Hydrogen',
                '[ERROR]'.red,
                parsedValues[0].bold.red,
                'is an unsupported color for background colors.'
              );
              falseAttribute = true;
            } else {
              if (finalColor.type == 'solid') {
                cssString = '{color: ' + finalColor.color + ';transition: 0.2s ease all;}';
              } else if (finalColor.type == 'gradient') {
                cssString = '{background-image: ' + finalColor.color + ';background-clip: text;color: rgba(0, 0, 0, 0);transition: 0.2s ease all;}';
              }
            }
            // Add the final CSS to the output file
            var valueCSS = cssSelector + cssString;
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
            // Build the type scale
            var baseSize = 1;
            var fontScale  = settings.typeScale;
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
            var baseLineHeight = settings.baseLineHeight;
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
              lineHeight = calculateLineHeight(argv, numericFontSize);
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
                '[ERROR]'.red,
                orientation.bold.red,
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
                '[ERROR]'.red,
                orientation.bold.red,
                'is an unsupported orientation option for overflow. Please use all, x, or y.'
              );
              falseAttribute = true;
            }
            // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
            // Add the final CSS to the output file
            var valueCSS = cssSelector + cssContent;
          } else if (property == 'overlay') {
            // Overlay only accepts 1 value
              // parsedValues[0] = color
            // Set variable for later use
            var cssString;
            // Get the color or gradient
            var finalColor = parseColor(argv, property, parsedValues[0]);
            // Log an error if the color comes back wrong, otherwise build the CSS
            if (finalColor == null || finalColor == undefined) {
              console.log(
                'Hydrogen',
                '[ERROR]'.red,
                parsedValues[0].bold.red,
                'is an unsupported color for overlays.'
              );
              falseAttribute = true;
            } else {
              if (finalColor.type == 'solid') {
                cssString = '{background-color: ' + finalColor.color + ';content: \' \';display: block;height: 100%;position: absolute;top: 0;left: 0;transition: all 0.2s ease;width: 100%;transition: 0.2s ease all;}';
              } else if (finalColor.type == 'gradient') {
                cssString = '{background-image: ' + finalColor.color + ';content: \' \';display: block;height: 100%;position: absolute;top: 0;left: 0;transition: all 0.2s ease;width: 100%;transition: 0.2s ease all;}';
              }
            }
            // Add the final CSS to the output file
            var valueCSS = [
              cssSelector + cssString,
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
                '[ERROR]'.red,
                visibility.bold.red,
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
              '[ERROR]'.red,
              property[0].bold.red,
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
      } else {
        console.log(
          'Hydrogen',
          '[ERROR]'.red,
          property[0].bold.red,
          'is empty and has no options passed to it, so it has been ignored.'
        );
      }
    });
    mediaQueryArray.forEach(function(media) {
      if (media.closingBracket == true) {
        hydrogen = hydrogen + media.cssString + '}';
      } else {
        hydrogen = hydrogen + media.cssString;
      }
    });
    fs.writeFileSync(
      envSrc + settings.output + '/hydrogen.raw.css',
      hydrogen,
      function (err) {
        if (err) {
          console.log('Hydrogen', '[ERROR]'.red, err);
        }
      }
    );
    console.timeEnd(
      'Hydrogen ' + '[LOGGING]'.magenta + ' CSS contruction time was',
      'buildTime'
    );
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  buildHydrogen
}