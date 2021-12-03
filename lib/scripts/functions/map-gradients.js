// Hydrogen.css / Gradient Map Generation

//

'use strict';

// Requirements
const { src, dest } = require('gulp');
var footer = require('gulp-footer');

// Load Hydrogen's Configuration
var {
  loadH2Defaults,
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

//

// Exporting Variables Based on User Config

// Generate a list of Sass variables from the config files.
function createGradientSassVariables(env) {
  // Load the config files, along with the defaults.
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Set the string and prefix it with a helpful comment.
  var gradientVariables = '// Gradients\n';
  // Set an empty variable for the config to be populated based on whether the user has set their own settings.
  var gradientConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (
    config.gradients != null &&
    config.gradients != undefined &&
    config.gradients.length > 0
  ) {
    gradientConfig = config.gradients;
  } else {
    gradientConfig = defaults.gradients;
  }
  // Loop through each config option and build the list.
  gradientConfig.forEach(function (gradient) {
    var gradientVariable;
    var colorStopKeys = '';
    var colorStopColors = '';
    if (
      gradient.key != null &&
      gradient.key != undefined &&
      gradient.key.length > 0
    ) {
      colorStopKeys = colorStopKeys + gradient.key;
      gradient.colorStops.forEach(function (color, index, array) {
        if (index === array.length - 1) {
          colorStopColors = colorStopColors + color.color;
        } else {
          colorStopColors = colorStopColors + color.color + ',';
        }
      });
    } else {
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
    // Aiming for: $h2-linear-gradient-45-blue-red: linear-gradient(45deg, blue, red);
    if (gradient.type == 'linear') {
      var angleRegEx = /.*[^deg]/g;
      var angleValue = gradient.angle.match(angleRegEx);
      if (
        gradient.key != null &&
        gradient.key != undefined &&
        gradient.key.length > 0
      ) {
        gradientVariable =
          '$h2-linear-gradient-' +
          colorStopKeys +
          ': linear-gradient(' +
          gradient.angle +
          ',' +
          colorStopColors +
          ');\n';
      } else {
        gradientVariable =
          '$h2-linear-gradient-' +
          angleValue +
          '-' +
          colorStopKeys +
          ': linear-gradient(' +
          gradient.angle +
          ',' +
          colorStopColors +
          ');\n';
      }
    } else {
      // Aiming for: $h2-radial-gradient-blue-red: radial-gradient(blue, red);
      gradientVariable =
        '$h2-radial-gradient-' +
        colorStopKeys +
        ': radial-gradient(' +
        colorStopColors +
        ');\n';
    }
    gradientVariables = gradientVariables.concat(gradientVariable);
  });
  // Return the variable set.
  return gradientVariables;
}

// Set the variables in the variable file.
function setGradientSassVariables(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  // Fetch the variable list.
  var gradientVars = createGradientSassVariables(env);
  // Add the generated variables to the Sass file.
  return src(destPath + '/hydrogen-variables.scss')
    .pipe(footer(gradientVars))
    .pipe(dest(destPath));
}

// Exporting a Sass Map Based on User Config -----------------------------------

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
    // Loop through the user's gradients.
    config.gradients.forEach(function (gradient) {
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
          radialColorStopKeys = 'radial-' + gradient.key;
          gradient.colorStops.forEach(function (color, index, array) {
            if (index === array.length - 1) {
              radialColorStopColors = radialColorStopColors + color.color;
            } else {
              radialColorStopColors = radialColorStopColors + color.color + ',';
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
          linearColorStopKeys = 'linear-' + gradient.key;
          gradient.colorStops.forEach(function (color, index, array) {
            if (index === array.length - 1) {
              linearColorStopColors = linearColorStopColors + color.color;
            } else {
              linearColorStopColors = linearColorStopColors + color.color + ',';
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
            'Hydrogen'.gray,
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
          'Hydrogen'.gray,
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

function setGradientMap(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var gradientMap = '';
  gradientMap = loadGradientMap(env);
  return src(sourceDir + 'lib/styles/maps/_map-gradient.scss')
    .pipe(footer(gradientMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

module.exports = {
  setGradientSassVariables,
  setGradientMap,
};
