// Hydrogen: Build Hydrogen

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');

// Local dependencies
var { parseENV } = require('./parse-env');
var { loadSettings } = require('./load-settings');
var { h2Error } = require('./logs');
var { parseAttributes } = require('./parse-attributes');
var { generateCoreCSS } = require('./generate-core-css');
var { generateMediaQueryArray } = require('./generate-media-query-array');
var { buildVariables } = require('./build-variables');
var { parseColor } = require('./parse-color');
var { parseWhitespace } = require('./parse-whitespace');
var { calculateLineHeight } = require('./calculate-line-height');

// Attribute dependencies
var { parseSimpleAttribute } = require('./attributes/generic');
var { parseBackgroundColor } = require('./attributes/bg-color');
var { parseBorder } = require('./attributes/border');
var { parseSize } = require('./attributes/size');

function buildHydrogen(argv) {
  try {
    var envObject = parseENV(argv);
    var envState = envObject.state;
    var envSrc = envObject.src;
    console.time(
      '⌚ [' + 'Hydrogen'.magenta + '] ' +
      'Total Hydrogen build time',
      'totalTime'
    );
    var settings = loadSettings(argv);
    var hydrogenAttributes = parseAttributes(argv);
    var hydrogen = generateCoreCSS(argv);
    var mediaQueryArray = generateMediaQueryArray(argv);
    // Generate whitespace values for reuse later
    var userLineHeight = settings.baseLineHeight;
    // Generate CSS/Sass variable files if the user has enabled them
    if (settings.variables.css == true) {
      buildVariables(argv, 'css');
    }
    if (settings.variables.sass == true) {
      buildVariables(argv, 'scss');
    }
    console.time(
      '⌚ [' + 'Hydrogen'.magenta + '] ' + 
      'CSS contruction time',
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
          // console.log(attribute);
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
          } else if (property == 'bg-color') {
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
                '⛔ [' + 'Hydrogen'.magenta + ']',
                '"'.red +
                alignment.red +
                '"'.red,
                'is an invalid alignment option for ' + 'container'.underline + '. Please use center, left, or right.'
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
            // Flex grids accept 3 or 4 values
            var alignment = parsedValues[0];
            if (alignment == 'top') {
              alignment = 'flex-start';
            } else if (alignment == 'middle') {
              alignment = 'center';
            } else if (alignment == 'bottom') {
              alignment = 'flex-end';
            }
            var wrapperPadding = parseWhitespace(argv, property, parsedValues[1]);
            var itemGutter = parseWhitespace(argv, property, parsedValues[2]);
            if (parsedValues.length == 3) {
              if (
                wrapperPadding == null ||
                itemGutter == null) {
                // It was a bad unit value, trigger an error
                falseAttribute = true;
              } else {
                cssString = '{align-items: ' + alignment + ';display: flex;flex-wrap: wrap; --h2-grid-gap: ' + itemGutter + ';gap: var(--h2-grid-gap);padding: ' + wrapperPadding + ';}';
              }
            } else if (parsedValues.length == 4) {
              var rowGutter = parseWhitespace(argv, property, parsedValues[3]);
              if (
                wrapperPadding == null ||
                itemGutter == null ||
                rowGutter == null) {
                // It was a bad unit value, trigger an error
                falseAttribute = true;
              } else {
                cssString = '{align-items: ' + alignment + ';display: flex;flex-wrap: wrap; --h2-grid-gap: ' + itemGutter + ';column-gap: var(--h2-grid-gap);row-gap: ' + rowGutter + ';padding: ' + wrapperPadding + ';}';
              }
            } else {
              // 1, 2, 4 or more values are not possible for flex-grid
              var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' requires 3, or 4 values, and you\'ve specified ' + parsedValues.length + '.'
              h2Error(errorMessage);
              falseAttribute = true;
            }
            // Construct the final CSS selector
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
                  '⛔ [' + 'Hydrogen'.magenta + ']',
                  '"'.red +
                  parsedValues[0].red +
                  '"'.red,
                  'is an invalid option for ' + 'flex-item'.underline + '. Please specify XofY for columns, auto, initial, or fill.'
                );
                falseAttribute = true;
              }
            }
            // Add the final CSS to the output file
            valueCSS = [
              '[data-h2-flex-grid] > ' + cssSelector + cssString
            ];
          } else if (property == 'flex-wrap') {
            valueCSS = parseSimpleAttribute(argv, property, cssSelector, parsedValues);
            if (valueCSS == null) {
              falseAttribute = true;
            }
          } else if (property == 'font-color' || property == 'color') {
            // Font color only accepts 1 value
              // parsedValues[0] = color
            // Set variable for later use
            var cssString;
            // Get the color or gradient
            var finalColor = parseColor(argv, property, parsedValues[0]);
            // Log an error if the color comes back wrong, otherwise build the CSS
            if (finalColor == null || finalColor == undefined) {
              console.error(
                '⛔ [' + 'Hydrogen'.magenta + ']',
                '"'.red +
                parsedValues[0].red +
                '"'.red,
                'is an invalid color for ' + 'font-color'.underline + '.'
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
                console.error(
                  '⛔ [' + 'Hydrogen'.magenta + ']',
                  '"'.red +
                  fontSize.red +
                  '"'.red,
                  'is an invalid option for ' + 'font-size'.underline + '. Please use one of the font scale values, a px, or a rem value.'
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
            // Gap accepts 1 or 2 values the first of which should be a space unit, and therefore should be parsed for multipliers, while the second is optional, and defines columns or rows
            var gap = parseWhitespace(argv, property, parsedValues[0]);
            if (parsedValues.length == 1) {
              if (gap == null) {
                // It was a bad unit value, trigger an error
                falseAttribute = true;
              } else {
                // The user only specified a unit for gap, so it should apply to both
                cssString = '{gap: ' + gap + ';transition: 0.2s ease all;}';
              }
            } else if (parsedValues.length == 2) {
              var orientation = parsedValues[1];
              if (
                gap == null ||
                orientation == null) {
                // It was a bad unit value, trigger an error
                falseAttribute = true;
              } else {
                // The user a unit for gap and an orientation
                if (orientation == 'all' || orientation == 'both') {
                  cssString = '{gap: ' + gap + ';transition: 0.2s ease all;}';
                } else if (orientation == 'row') {
                  cssString = '{row-gap: ' + gap + ';transition: 0.2s ease all;}';
                } else if (orientation == 'column') {
                  cssString = '{column-gap: ' + gap + ';transition: 0.2s ease all;}';
                } else {
                  var errorMessage = '"'.red + orientation.red + '"'.red + ' is an invalid orientation option for ' + 'gap'.underline + '. Please use all, row, or column.';
                  h2Error(errorMessage);
                  falseAttribute = true;
                }
              }
            } else {
              // 3 or more values are not allowed for gaps
              var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' requires 1, or 2 values, and you\'ve specified ' + parsedValues.length + '.'
              h2Error(errorMessage);
              falseAttribute = true;
            }
            // Construct the final CSS selector
            valueCSS = cssSelector + cssString;
          } else if (property == 'grid-template-columns') {
            // Templates only accept 1 value
            var template = parsedValues[0];
            if (parsedValues.length == 1) {
              // Break the value into individual items so that we can check for multipliers and replace them with the correct value
              var singleTemplates = [];
              if (template.indexOf(' ') > -1) { 
                singleTemplates = template.split(/ +/);
                for (const newTemplate of singleTemplates) {
                  newTemplate.trim();
                }
              } else {
                singleTemplates = singleTemplates.concat(template);
              }
              // Loop through the options and check for multipliers
              for (const [i, el] of singleTemplates.entries()) {
                var parsedItem = parseWhitespace(argv, property, el);
                singleTemplates[i] = parsedItem;
              }
              var finalTemplate = singleTemplates.join(' ');
              // Build the final CSS string
              cssString = '{grid-template-columns: ' + finalTemplate + ';}';
            } else {
              // Grid template columns only accepts 1 value
              var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' only accepts 1 value, and you\'ve specified ' + parsedValues.length + '.'
              h2Error(errorMessage);
              falseAttribute = true;
            }
            // Construct the final CSS selector
            valueCSS = cssSelector + cssString;
          } else if (property == 'grid-template-rows') {
            // Templates only accept 1 value
            var template = parsedValues[0];
            if (parsedValues.length == 1) {
              // Break the value into individual items so that we can check for multipliers and replace them with the correct value
              var singleTemplates = [];
              if (template.indexOf(' ') > -1) { 
                singleTemplates = template.split(/ +/);
                for (const newTemplate of singleTemplates) {
                  newTemplate.trim();
                }
              } else {
                singleTemplates = singleTemplates.concat(template);
              }
              // Loop through the options and check for multipliers
              for (const [i, el] of singleTemplates.entries()) {
                var parsedItem = parseWhitespace(argv, property, el);
                singleTemplates[i] = parsedItem;
              }
              var finalTemplate = singleTemplates.join(' ');
              // Build the final CSS string
              cssString = '{grid-template-rows: ' + finalTemplate + ';}';
            } else {
              // Grid template rows only accepts 1 value
              var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' only accepts 1 value, and you\'ve specified ' + parsedValues.length + '.'
              h2Error(errorMessage);
              falseAttribute = true;
            }
            // Construct the final CSS selector
            valueCSS = cssSelector + cssString;
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
          } else if (property == 'location' || property == 'offset') {
            // Location accepts 4 values, where each value follows the CSS order of top, right, bottom, left; auto can be used to retain a default value 
            if (parsedValues.length == 4) {
              var value1 = parseWhitespace(argv, property, parsedValues[0]);
              var value2 = parseWhitespace(argv, property, parsedValues[1]);
              var value3 = parseWhitespace(argv, property, parsedValues[2]);
              var value4 = parseWhitespace(argv, property, parsedValues[3]);
              // Check to make sure the unit was parsed as something viable
              if (
                value1 == null ||
                value2 == null ||
                value3 == null ||
                value4 == null ) {
                // It was a bad unit value, trigger an error
                falseAttribute = true;
              } else {
                // It was something viable, assemble the CSS
                cssString = '{top: ' + value1 + ';right: ' + value2 + ';bottom: ' + value3 + ';left: ' + value4 + ';transition: all 0.2s ease;}';
              }
            } else {
              // Location needs 4 values
              var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' requires 4 values, and you\'ve specified ' + parsedValues.length + '.'
              h2Error(errorMessage);
              falseAttribute = true;
            }
            // Construct the final CSS selector
            valueCSS = [
              '[data-h2-position]' + cssSelector + ',',
              '[data-h2-visibility]' + cssSelector + ',',
              cssSelector + cssString
            ];
          } else if (property == 'margin') {
            // Margin accepts up to 4 values, and handles 1 or 2 values the same way CSS does, where 1 value sets all 4 margin values, 2 values sets top-bottom/left-right respectively, and 4 individual values set each side separately 
            var value1 = parseWhitespace(argv, property, parsedValues[0]);
            if (parsedValues.length == 1) {
              // Check to make sure the unit was parsed as something viable
              if (value1 == null) {
                // It was a bad unit value, trigger an error
                falseAttribute = true;
              } else {
                // It was something viable, assemble the CSS
                cssString = '{margin: ' + value1 + ';transition: all 0.2s ease;}';
              }
            } else if (parsedValues.length == 2) {
              var value2 = parseWhitespace(argv, property, parsedValues[1]);
              // Check to make sure the unit was parsed as something viable
              if (
                value1 == null ||
                value2 == null) {
                // It was a bad unit value, trigger an error
                falseAttribute = true;
              } else {
                // It was something viable, assemble the CSS
                cssString = '{margin-top: ' + value1 + ';margin-bottom: ' + value1 + ';margin-right: ' + value2 + ';margin-left: ' + value2 + ';transition: all 0.2s ease;}';
              }
            } else if (parsedValues.length == 3) {
              // 3 values are not allowed for margins
              var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' requires 1, 2, or 4 values, and you\'ve specified 3.'
              h2Error(errorMessage);
              falseAttribute = true;
            } else if (parsedValues.length == 4) {
              var value2 = parseWhitespace(argv, property, parsedValues[1]);
              var value3 = parseWhitespace(argv, property, parsedValues[2]);
              var value4 = parseWhitespace(argv, property, parsedValues[3]);
              // Check to make sure the unit was parsed as something viable
              if (
                value1 == null ||
                value2 == null ||
                value3 == null ||
                value4 == null) {
                // It was a bad unit value, trigger an error
                falseAttribute = true;
              } else {
                // It was something viable, assemble the CSS
                cssString = '{margin-top: ' + value1 + ';margin-bottom: ' + value3 + ';margin-right: ' + value2 + ';margin-left: ' + value4 + ';transition: all 0.2s ease;}';
              }
            } else {
              // 5 or more values are not allowed for margins
              var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' requires 1, 2, or 4 values, and you\'ve specified ' + parsedValues.length + '.'
              h2Error(errorMessage);
              falseAttribute = true;
            }
            // Construct the final CSS selector
            valueCSS = cssSelector + cssString;
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
                '⛔ [' + 'Hydrogen'.magenta + ']',
                '"'.red +
                orientation.red +
                '"'.red,
                'is an invalid orientation option for ' + 'overflow'.underline + '. Please use all, x, or y.'
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
              console.error(
                '⛔ [' + 'Hydrogen'.magenta + ']',
                '"'.red +
                parsedValues[0].red +
                '"'.red,
                'is an invalid color for ' + 'overlays'.underline + '.'
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
            var value1 = parseWhitespace(argv, property, parsedValues[0]);
            if (parsedValues.length == 1) {
              // Check to make sure the unit was parsed as something viable
              if (value1 == null) {
                // It was a bad unit value, trigger an error
                falseAttribute = true;
              } else {
                // It was something viable, assemble the CSS
                cssString = '{padding: ' + value1 + ';transition: all 0.2s ease;}';
              }
            } else if (parsedValues.length == 2) {
              var value2 = parseWhitespace(argv, property, parsedValues[1]);
              // Check to make sure the unit was parsed as something viable
              if (
                value1 == null ||
                value2 == null) {
                // It was a bad unit value, trigger an error
                falseAttribute = true;
              } else {
                // It was something viable, assemble the CSS
                cssString = '{padding-top: ' + value1 + ';padding-bottom: ' + value1 + ';padding-right: ' + value2 + ';padding-left: ' + value2 + ';transition: all 0.2s ease;}';
              }
            } else if (parsedValues.length == 3) {
              // 3 values are not allowed for padding
              var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' requires 1, 2, or 4 values, and you\'ve specified 3.'
              h2Error(errorMessage);
              falseAttribute = true;
            } else if (parsedValues.length == 4) {
              var value2 = parseWhitespace(argv, property, parsedValues[1]);
              var value3 = parseWhitespace(argv, property, parsedValues[2]);
              var value4 = parseWhitespace(argv, property, parsedValues[3]);
              // Check to make sure the unit was parsed as something viable
              if (
                value1 == null ||
                value2 == null ||
                value3 == null ||
                value4 == null) {
                // It was a bad unit value, trigger an error
                falseAttribute = true;
              } else {
                // It was something viable, assemble the CSS
                cssString = '{padding-top: ' + value1 + ';padding-bottom: ' + value3 + ';padding-right: ' + value2 + ';padding-left: ' + value4 + ';transition: all 0.2s ease;}';
              }
            } else {
              // 5 or more values are not allowed for padding
              var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' requires 1, 2, or 4 values, and you\'ve specified ' + parsedValues.length + '.'
              h2Error(errorMessage);
              falseAttribute = true;
            }
            // Construct the final CSS selector
            valueCSS = cssSelector + cssString;
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
                '⛔ [' + 'Hydrogen'.magenta + ']',
                '"'.red +
                visibility.red +
                '"'.red,
                'is an invalid option for ' + 'visiblity'.underline + '. Please use visible, hidden, or invisible.'
              );
              falseAttribute = true;
            }
            // Add the final CSS to the output file
            var valueCSS = cssSelector + cssContent;
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
        var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' is empty and has no options passed to it, so it has been ignored.';
        h2Error(errorMessage);
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
          h2Error(err);
        }
      }
    );
    console.timeEnd(
      '⌚ [' + 'Hydrogen'.magenta + '] ' + 
      'CSS contruction time',
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