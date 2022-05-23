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
    if (userGradients != null || userGradients != undefined || userGradients != []) {
      userGradients.forEach(function (gradientSetting) {
        gradientMap[gradientSetting.key] = gradientSetting.gradient;
      });
    }
    return gradientMap;
  } catch (err) {
    console.log('⛔ [' + 'Hydrogen'.magenta + ']', err);
    return err;
  }
}

module.exports = {
  generateGradientMap,
};
