// Hydrogen.css / Gradient Map Generation

'use strict';

// Import Gulp and its dependencies
const { src, dest } = require('gulp');
var footer = require('gulp-footer');

// ---

// Import Hydrogen's configuration scripts
var {
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Import Hydrogen's utility modules
var { createUtilityArray } = require('../functions/utility-generation');

// ---

// Set the utility's name values
var utilityConfigKey = 'gradients';

// ---

// Default settings
var utilityDefaults = [];

// ---

/**
 * Calls a custom utility array for colors and gradients to generate a unique list of variables for either CSS or Sass
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} format Either 'css' or 'sass'
 * @returns {string} Returns a string of usable variables that are to be appended to the final variable file
 */
function setGradientVariables(env, format) {
  try {
    // To do: create a centralized, custom utility array script for colors and gradients that detects and removes duplicates.
    var gradientConfig = createUtilityArray(
      env,
      'vars',
      utilityConfigKey,
      utilityDefaults
    );
    var gradientVariables = '/* Gradients */\n';
    // Set the variable prefix depending on the format requested
    var formatPrefix = '';
    if (format == 'css') {
      formatPrefix = '--';
    } else if (format == 'sass') {
      formatPrefix = '$';
    } else {
      throw "You haven't specified a format for your variable export.";
    }
    // Loop through each config option and build the list
    gradientConfig.forEach(function (gradient) {
      var gradientVariable;
      var colorStopKeys = '';
      var colorStopColors = '';
      // Check to see if the user is using the most recent key syntax.
      if (
        gradient.key != null &&
        gradient.key != undefined &&
        gradient.key.length > 0
      ) {
        // Set the legacy color stop key as the new user-set key
        colorStopKeys = colorStopKeys + gradient.key;
        // Loop through and get each color stop
        gradient.colorStops.forEach(function (color, index, array) {
          // Check for old key/color object.
          if (typeof color === 'object') {
            if (index === array.length - 1) {
              colorStopColors = colorStopColors + color.color;
            } else {
              colorStopColors = colorStopColors + color.color + ',';
            }
          } else {
            // Use the updated array syntax.
            if (index === array.length - 1) {
              colorStopColors = colorStopColors + color;
            } else {
              colorStopColors = colorStopColors + color + ',';
            }
          }
        });
      } else {
        // The user is using the old syntax, meaning the key needs to be generated from the color stops
        gradient.colorStops.forEach(function (color, index, array) {
          if (index === array.length - 1) {
            colorStopKeys = colorStopKeys + color.key;
            colorStopColors = colorStopColors + color.color;
          } else {
            colorStopKeys = colorStopKeys + color.key + '-';
            colorStopColors = colorStopColors + color.color + ',';
          }
        });
      }
      // Check the gradient type (i.e. linear vs. radial)
      if (gradient.type == 'linear') {
        // The gradient is linear
        // Note that the final variable should look like $h2-linear-gradient-45-blue-red: linear-gradient(45deg, blue, red);
        var angleRegEx = /.*[^deg]/g;
        var angleValue = gradient.angle.match(angleRegEx);
        // Check to see if the user is using the most recent key syntax
        if (
          gradient.key != null &&
          gradient.key != undefined &&
          gradient.key.length > 0
        ) {
          // Build the variable
          gradientVariable =
            formatPrefix +
            'h2-gradient-' +
            colorStopKeys +
            ': linear-gradient(' +
            gradient.angle +
            ',' +
            colorStopColors +
            ');\n';
        } else {
          // They're using the legacy syntax, so maintain the variable format for legacy support
          gradientVariable =
            formatPrefix +
            'h2-linear-gradient-' +
            angleValue +
            '-' +
            colorStopKeys +
            ': linear-gradient(' +
            gradient.angle +
            ',' +
            colorStopColors +
            ');\n';
        }
      } else if (gradient.type == 'radial') {
        // The gradient is radial
        if (
          gradient.key != null &&
          gradient.key != undefined &&
          gradient.key.length > 0
        ) {
          // Aiming for: $h2-radial-gradient-blue-red: radial-gradient(blue, red);
          gradientVariable =
            formatPrefix +
            'h2-gradient-' +
            colorStopKeys +
            ': radial-gradient(' +
            colorStopColors +
            ');\n';
        } else {
          // Aiming for: $h2-radial-gradient-blue-red: radial-gradient(blue, red);
          gradientVariable =
            formatPrefix +
            'h2-radial-gradient-' +
            colorStopKeys +
            ': radial-gradient(' +
            colorStopColors +
            ');\n';
        }
      } else {
        throw "You haven't specified a type for your gradient.";
      }
      gradientVariables = gradientVariables.concat(gradientVariable);
    });
    // Return the variable set
    return gradientVariables;
  } catch (err) {
    return err;
  }
}

// ---

function loadGradientMap(env) {
  var config = loadH2Config(env);
  var gradientMap = '';
  // Check to see if the user has set any gradients, and if not, create an empty gradient map, because by default the system doesn't offer them.
  if (
    config.gradients != null &&
    config.gradients != undefined &&
    config.gradients.length > 0
  ) {
    // The user has specified their own gradients. There is no default alternative to this, because Hydrogen doesn't ship with gradients by default.
    var gradientStringStart = '@use "sass:color"; $h2-map-gradient: (';
    var gradientStringContent = '';
    var gradientStringEnd = ');';
    var gradientConfig = createUtilityArray(
      env,
      'maps',
      utilityConfigKey,
      utilityDefaults
    );
    // Loop through the user's gradients.
    gradientConfig.forEach(function (gradient) {
      var gradientType = gradient.type;
      if (gradientType == 'radial') {
        var radialColorStopKeys = '';
        var radialColorStopColors = '';
        if (
          gradient.key != null &&
          gradient.key != undefined &&
          gradient.key.length > 0
        ) {
          // Use the new syntax.
          radialColorStopKeys = gradient.key;
          gradient.colorStops.forEach(function (color, index, array) {
            // Check for old key/color object.
            if (typeof color === 'object') {
              if (index === array.length - 1) {
                radialColorStopColors = radialColorStopColors + color.color;
              } else {
                radialColorStopColors =
                  radialColorStopColors + color.color + ',';
              }
            } else {
              // Use the updated array syntax.
              if (index === array.length - 1) {
                radialColorStopColors = radialColorStopColors + color;
              } else {
                radialColorStopColors = radialColorStopColors + color + ',';
              }
            }
          });
        } else {
          // use the deprecated syntax.
          radialColorStopKeys = radialColorStopKeys + 'radial';
          gradient.colorStops.forEach(function (color, index, array) {
            radialColorStopKeys = radialColorStopKeys + '[' + color.key + ']';
            if (index === array.length - 1) {
              radialColorStopColors = radialColorStopColors + color.color;
            } else {
              radialColorStopColors = radialColorStopColors + color.color + ',';
            }
          });
        }
        gradientStringContent =
          gradientStringContent +
          '"' +
          radialColorStopKeys +
          '": "radial-gradient(' +
          radialColorStopColors +
          ')",';
      } else if (gradientType == 'linear') {
        var angleRegEx = /.*[^deg]/g;
        var angleValue = gradient.angle.match(angleRegEx);
        // console.log(gradient.angle, angleValue);
        var linearColorStopKeys = '';
        var linearColorStopColors = '';
        if (
          gradient.key != null &&
          gradient.key != undefined &&
          gradient.key.length > 0
        ) {
          // Use the new syntax.
          linearColorStopKeys = gradient.key;
          gradient.colorStops.forEach(function (color, index, array) {
            // Check for old key/color object.
            if (typeof color === 'object') {
              if (index === array.length - 1) {
                linearColorStopColors = linearColorStopColors + color.color;
              } else {
                linearColorStopColors =
                  linearColorStopColors + color.color + ',';
              }
            } else {
              // Use the updated array syntax.
              if (index === array.length - 1) {
                linearColorStopColors = linearColorStopColors + color;
              } else {
                linearColorStopColors = linearColorStopColors + color + ',';
              }
            }
          });
        } else {
          // use the deprecated syntax.
          linearColorStopKeys = linearColorStopKeys + 'linear-' + angleValue;
          gradient.colorStops.forEach(function (color, index, array) {
            linearColorStopKeys = linearColorStopKeys + '[' + color.key + ']';
            if (index === array.length - 1) {
              linearColorStopColors = linearColorStopColors + color.color;
            } else {
              linearColorStopColors = linearColorStopColors + color.color + ',';
            }
          });
        }
        if (gradient.angle == null || gradient.angle == undefined) {
          console.log(
            'Hydrogen',
            '[ERROR]'.red,
            'Please specify an angle (45deg) value for all linear gradients defined in your configuration file.'
          );
          return false;
        } else {
          gradientStringContent =
            gradientStringContent +
            '"' +
            linearColorStopKeys +
            '": "linear-gradient(' +
            gradient.angle +
            ',' +
            linearColorStopColors +
            ')",';
        }
      } else {
        console.log(
          'Hydrogen',
          '[ERROR]'.red,
          'One of the gradients in your configuration file is missing a type.'
        );
        return false;
      }
    });
    gradientMap =
      gradientStringStart + gradientStringContent + gradientStringEnd;
  } else {
    gradientMap = '@use "sass:color"; $h2-map-gradient: ();';
  }
  // Pass the gradient map.
  return gradientMap;
}

// ---

/**
 * Generate the utility Sass map
 * @param {string} env Either 'dev' or 'prod'
 * @returns Gulp src() - the utility's Sass map file
 */
function setGradientMap(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var gradientMap = loadGradientMap(env);
  return src(sourceDir + 'lib/styles/maps/_map-gradient.scss')
    .pipe(footer(gradientMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

module.exports = {
  setGradientVariables,
  setGradientMap,
};
