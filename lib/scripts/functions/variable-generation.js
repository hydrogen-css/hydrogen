// Hydrogen.css / Variable Generation Scripts

'use strict';

// Import Gulp and its dependencies
const { src, dest } = require('gulp');
var footer = require('gulp-footer');
var colors = require('colors');

// ---

// Import Hydrogen's configuration scripts
var {
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Import Hydrogen's style modules
var { setMediaQueryVariables } = require('../functions/map-media');
var { setBorderWeightVariables } = require('../functions/map-border-weight');
var { setColorVariables } = require('../functions/map-color');
var { setContainerVariables } = require('../functions/map-containers');
var { setFontScaleVariables } = require('../functions/set-fonts');
var { setGradientVariables } = require('../functions/map-gradients');
var { setHeightVariables } = require('../functions/map-heights');
var { setMarginVariables } = require('../functions/map-margin');
var { setOpacityVariables } = require('../functions/map-opacity');
var { setRadiusVariables } = require('../functions/map-radius');
var { setShadowVariables } = require('../functions/map-shadows');
var { setWhitespaceVariables } = require('../functions/map-whitespace');
var { setWidthVariables } = require('../functions/map-widths');

// ---

function generateH2Variables(env, format) {
  try {
    // Get the correct pathing based on the environment
    var destRoot = getH2DestinationPath(env);
    var outputDir = getH2OutputDirectory(env);
    var destPath = destRoot + outputDir;
    // Set file extension
    var formatExtension = '';
    if (format == 'css') {
      formatExtension = 'css';
    } else if (format == 'sass') {
      formatExtension = 'scss';
    }
    // Collect the utility variables
    var borderVars = setBorderWeightVariables(env, format);
    var colorVars = setColorVariables(env, format);
    var containerVars = setContainerVariables(env, format);
    var fontScaleVars = setFontScaleVariables(env, format);
    var gradientVars = setGradientVariables(env, format);
    var heightVars = setHeightVariables(env, format);
    var marginVars = setMarginVariables(env, format);
    var mediaVars = '';
    if (format == 'sass') {
      mediaVars = setMediaQueryVariables(env, format);
    }
    var opacityVars = setOpacityVariables(env, format);
    var whitespaceVars = setWhitespaceVariables(env, format);
    var radiusVars = setRadiusVariables(env, format);
    var shadowVars = setShadowVariables(env, format);
    var widthVars = setWidthVariables(env, format);
    // Concatenate them into one string
    var utilityVars =
      borderVars +
      colorVars +
      containerVars +
      fontScaleVars +
      gradientVars +
      heightVars +
      marginVars + 
      mediaVars +
      opacityVars +
      whitespaceVars +
      radiusVars +
      shadowVars +
      widthVars;
    if (format == 'css') {
      utilityVars = utilityVars + '}';
    }
    // Tack them onto the file
    return src(destPath + '/hydrogen-variables.' + formatExtension)
      .pipe(footer(utilityVars))
      .pipe(dest(destPath));
  } catch (err) {
    return err;
  }
}

// Export the variable script for use
module.exports = {
  generateH2Variables,
};
