// Hydrogen: Build variables

// Third party dependencies
var colors = require('colors');
var Color = require('color');
var fs = require('fs');

// Local dependencies
var { parseENV } = require('./parse-env');
var { loadSettings } = require('./load-settings');
var { lightenBy, darkenBy } = require('./parse-color');
var { generateGradientMap } = require('./generate-gradient-map');
var { calculateLineHeight } = require('./calculate-line-height');

function buildVariables(argv, format) {
  try {
    // Start the timer
    console.time(
      '⌚ [' + 'Hydrogen'.magenta + '] ' +
      format.toUpperCase() +
      ' var file build time',
      'CSSVarTime'
    );
    // Get the environment and the user settings
    var envObject = parseENV(argv);
    var envState = envObject.state;
    var envSrc = envObject.src;
    var settings = loadSettings(argv);
    // Set up the variable
    var variableString = '';
    // Set up the variable prefix value based on the format
    var variablePrefix;
    if (format == 'css') {
      variablePrefix = '--';
    } else if (format == 'scss') {
      variablePrefix = '$';
    }
    // Set up the CSS root if compiling the CSS variables
    if (format == 'css') {
      variableString = variableString + ':root {\n'
    }
    // Colors & gradients
    variableString = variableString + '/* Colors */\n'
    if (
      settings.colors != null || 
      settings.colors != undefined || 
      settings.colors != []) {
      settings.colors.forEach(function(userColor) {
        variableString = variableString + variablePrefix + 'h2-color-' + userColor.key + ': ' + userColor.color + ';\n';
        if (userColor.scale.light == 'auto' || userColor.scale.light == null || userColor.scale.light == undefined) {
          var workingColor = lightenBy(Color(userColor.color), 0.25);
          var rgbColor = Color(workingColor).rgb().string();
          variableString = variableString + variablePrefix + 'h2-color-light-' + userColor.key + ': ' + rgbColor + ';\n';
        } else {
          variableString = variableString + variablePrefix + 'h2-color-light-' + userColor.key + ': ' + userColor.scale.light + ';\n';
        }
        if (userColor.scale.lighter == 'auto' || userColor.scale.lighter == null || userColor.scale.lighter == undefined) {
          var workingColor = lightenBy(Color(userColor.color), 0.5);
          var rgbColor = Color(workingColor).rgb().string();
          variableString = variableString + variablePrefix + 'h2-color-lighter-' + userColor.key + ': ' + rgbColor + ';\n';
        } else {
          variableString = variableString + variablePrefix + 'h2-color-lighter-' + userColor.key + ': ' + userColor.scale.lighter + ';\n';
        }
        if (userColor.scale.lightest == 'auto' || userColor.scale.lightest == null || userColor.scale.lightest == undefined) {
          var workingColor = lightenBy(Color(userColor.color), 0.75);
          var rgbColor = Color(workingColor).rgb().string();
          variableString = variableString + variablePrefix + 'h2-color-lightest-' + userColor.key + ': ' + rgbColor + ';\n';
        } else {
          variableString = variableString + variablePrefix + 'h2-color-lightest-' + userColor.key + ': ' + userColor.scale.lightest + ';\n';
        }
        if (userColor.scale.dark == 'auto' || userColor.scale.dark == null || userColor.scale.dark == undefined) {
          var workingColor = darkenBy(Color(userColor.color), 0.25);
          var rgbColor = Color(workingColor).rgb().string();
          variableString = variableString + variablePrefix + 'h2-color-dark-' + userColor.key + ': ' + rgbColor + ';\n';
        } else {
          variableString = variableString + variablePrefix + 'h2-color-dark-' + userColor.key + ': ' + userColor.scale.dark + ';\n';
        }
        if (userColor.scale.darker == 'auto' || userColor.scale.darker == null || userColor.scale.darker == undefined) {
          var workingColor = darkenBy(Color(userColor.color), 0.5);
          var rgbColor = Color(workingColor).rgb().string();
          variableString = variableString + variablePrefix + 'h2-color-darker-' + userColor.key + ': ' + rgbColor + ';\n';
        } else {
          variableString = variableString + variablePrefix + 'h2-color-darker-' + userColor.key + ': ' + userColor.scale.darker + ';\n';
        }
        if (userColor.scale.darkest == 'auto' || userColor.scale.darkest == null || userColor.scale.darkest == undefined) {
          var workingColor = darkenBy(Color(userColor.color), 0.75);
          var rgbColor = Color(workingColor).rgb().string();
          variableString = variableString + variablePrefix + 'h2-color-darkest-' + userColor.key + ': ' + rgbColor + ';\n';
        } else {
          variableString = variableString + variablePrefix + 'h2-color-darkest-' + userColor.key + ': ' + userColor.scale.darkest + ';\n';
        }
      })
    }
    var gradientMap = generateGradientMap(argv);
    variableString = variableString + '/* Gradients */\n'
    for (const [key, value] of Object.entries(gradientMap)) {
      variableString = variableString + variablePrefix + 'h2-gradient-' + key + ': ' + value + ';\n';
    }
    // Containers
    variableString = variableString + '/* Containers */\n'
    if (
      settings.containers != null || 
      settings.containers != undefined || 
      settings.containers != []) {
      settings.containers.forEach(function(containerSetting) {
        variableString = variableString + variablePrefix + 'h2-container-' + containerSetting.key + ': ' + containerSetting.maxWidth + ';\n';
      });
    }
    // Font size
    variableString = variableString + '/* Font sizes */\n'
    var baseSize = 1;
    var fontScale  = settings.typeScale;
    var captionSize = baseSize / fontScale;
    variableString = variableString + variablePrefix + 'h2-font-size-caption: ' + captionSize + 'rem;\n';
    variableString = variableString + variablePrefix + 'h2-font-size-copy: ' + baseSize + 'rem;\n';
    var h6Size = baseSize * fontScale;
    variableString = variableString + variablePrefix + 'h2-font-size-h6: ' + h6Size + 'rem;\n';
    var h5Size = h6Size * fontScale;
    variableString = variableString + variablePrefix + 'h2-font-size-h5: ' + h5Size + 'rem;\n';
    var h4Size = h5Size * fontScale;
    variableString = variableString + variablePrefix + 'h2-font-size-h4: ' + h4Size + 'rem;\n';
    var h3Size = h4Size * fontScale;
    variableString = variableString + variablePrefix + 'h2-font-size-h3: ' + h3Size + 'rem;\n';
    var h2Size = h3Size * fontScale;
    variableString = variableString + variablePrefix + 'h2-font-size-h2: ' + h2Size + 'rem;\n';
    var h1Size = h2Size * fontScale;
    variableString = variableString + variablePrefix + 'h2-font-size-h1: ' + h1Size + 'rem;\n';
    // Line height
    variableString = variableString + '/* Line heights */\n'
    variableString = variableString + variablePrefix + 'h2-line-height-caption: ' + calculateLineHeight(argv, captionSize) + ';\n';
    variableString = variableString + variablePrefix + 'h2-line-height-copy: ' + settings.baseLineHeight + ';\n';
    variableString = variableString + variablePrefix + 'h2-line-height-h6: ' + calculateLineHeight(argv, h6Size) + ';\n';
    variableString = variableString + variablePrefix + 'h2-line-height-h5: ' + calculateLineHeight(argv, h5Size) + ';\n';
    variableString = variableString + variablePrefix + 'h2-line-height-h4: ' + calculateLineHeight(argv, h4Size) + ';\n';
    variableString = variableString + variablePrefix + 'h2-line-height-h3: ' + calculateLineHeight(argv, h3Size) + ';\n';
    variableString = variableString + variablePrefix + 'h2-line-height-h2: ' + calculateLineHeight(argv, h2Size) + ';\n';
    variableString = variableString + variablePrefix + 'h2-line-height-h1: ' + calculateLineHeight(argv, h1Size) + ';\n';
    // Media queries (if scss)
    if (format == 'scss') {
      variableString = variableString + '/* Media queries */\n'
      settings.media.forEach(function(mediaSetting) {
        variableString = variableString + variablePrefix + 'h2-media-query-' + mediaSetting.key + ': "' + mediaSetting.query + '";\n';
      });
    }
    // Radius
    variableString = variableString + '/* Radius */\n'
    if (
      settings.radius != null || 
      settings.radius != undefined || 
      settings.radius != []) {
      settings.radius.forEach(function(radiusSetting) {
        variableString = variableString + variablePrefix + 'h2-radius-' + radiusSetting.key + ': ' + radiusSetting.radius + ';\n';
      });
    }
    // Shadows
    variableString = variableString + '/* Shadows */\n'
    if (
      settings.shadows != null || 
      settings.shadows != undefined || 
      settings.shadows != []) {
      settings.shadows.forEach(function(shadowSetting) {
        variableString = variableString + variablePrefix + 'h2-shadow-' + shadowSetting.key + ': ' + shadowSetting.shadow + ';\n';
      });
    }
    // Whitespace
    variableString = variableString + '/* Whitespace */\n';
    if (format == 'css') {
      variableString = variableString + '/* You can use this whitespace unit and calc functions to match any multiplier used in Hydrogen attributes. */\n/* e.g. if you want the x2 multipler, simply write calc(var(--h2-whitespace-unit) * 2) */\n'
    } else if (format == 'scss') {
      variableString = variableString + '/* You can use this whitespace unit and calc functions to match any multiplier used in Hydrogen attributes. */\n/* e.g. if you want the x2 multipler, simply write calc(#{$h2-whitespace-unit} * 2) */\n'
    }
    variableString = variableString + variablePrefix + 'h2-whitespace-unit: ' + settings.baseLineHeight + 'rem;\n';
    // Close the CSS root if compiling the CSS variables
    if (format == 'css') {
      variableString = variableString + '}'
    }
    // Check to see if the file exists, and if it does, delete it
    if (fs.existsSync(envSrc + settings.output + '/hydrogen.vars.' + format) == true) {
      fs.unlinkSync(envSrc + settings.output + '/hydrogen.vars.' + format);
    }
    // Write the file
    fs.writeFileSync(
      envSrc + settings.output + '/hydrogen.vars.' + format,
      variableString,
      function (err) {
        if (err) {
          console.log('Hydrogen', '[ERROR]'.red, err);
        }
      }
    );
    // End the timer
    console.timeEnd(
      '⌚ [' + 'Hydrogen'.magenta + '] ' +
      format.toUpperCase() +
      ' var file build time',
      'CSSVarTime'
    );
  } catch (err) {
    console.log('Hydrogen', '[ERROR]'.red, err);
    return err;
  }
}

module.exports = {
  buildVariables
}