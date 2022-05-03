// Hydrogen: Generate gradient map

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');

function generateGradientMap(argv) {
  try {
    var gradientMap = {};
    var settings = loadSettings(argv);
    var userGradients = settings.gradients;
    if (
      userGradients != null || 
      userGradients != undefined ||
      userGradients != []) {
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
    return gradientMap;
  } catch(err) {
    console.log(
      '⛔ [' + 'Hydrogen'.magenta + ']',
      err
    );
    return err;
  }
}

module.exports = {
  generateGradientMap
}