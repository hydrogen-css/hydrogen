// Hydrogen: Load settings
'use strict';

// Vendor dependencies
var fs = require('fs');
var path = require('path');

// Hydrogen dependencies
var { h2_error_detail } = require('./logs');

/**
 * This script will load the user's settings from their hydrogen.config.json file and pass those settings on.
 * @returns {object} Settings object from the user's configuration file
 */
function h2_load_settings() {
  try {
    // =========================================================================
    // Load the settings as JSON
    var settings = JSON.parse(
      fs.readFileSync(path.join(process.cwd() + '/hydrogen.config.json'))
    );
    // =========================================================================
    // Return the loaded settings
    return settings;
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error_detail(
      'internal',
      null,
      path.join(process.cwd() + '/hydrogen.config.json'),
      error
    );
    return false;
  }
}

module.exports = {
  h2_load_settings,
};
