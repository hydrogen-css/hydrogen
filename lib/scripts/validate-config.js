// Hydrogen: Validate config

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');
var { h2Error } = require('./logs');

function validateConfig(argv) {
  try {
    var settings = loadSettings(argv);
    if (settings.input == null || Array.isArray(settings.input) == false) {
      // Validate input
      var error = "Hydrogen requires an 'input' option be set in your configuration that is an array, containing paths to your markup as strings.";
      h2Error(error);
      return false;
    } else if (settings.output == null || typeof settings.output != 'string') {
      // Validate output
      var error = "Hydrogen requires an 'output' option be set in your configuration that contains a path to the output folder you'd like your CSS to appear in.";
      h2Error(error);
      return false;
    }
    // Validate variables
    // Check to see if it exists and is an object
    // Check to see if it contains css and sass
    // Check to see if css and sass are boolean values
    // Validate reset styles
    // Validate colors
    // Validate containers
    // Validate fonts
    // Validate gradients
    // Validate media
    // Validate radius
    // Validate shadows
    // Validate transitions
    // Validate typography
  } catch (error) {
    h2Error(error);
    return error;
  }
}

module.exports = {
  validateConfig,
};
