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
    //
    // Set up initial variables ================================================
    //
    var settings;
    //
    // Load the settings as JSON ===============================================
    //
    if (
      //
      // Look for config in CWD ------------------------------------------------
      //
      fs.existsSync(path.resolve(process.cwd(), 'hydrogen.config.json')) ===
      true
    ) {
      settings = JSON.parse(
        fs.readFileSync(path.resolve(process.cwd(), 'hydrogen.config.json'))
      );
    } else if (
      //
      // Look for config in ../CWD ---------------------------------------------
      //
      fs.existsSync(
        path.resolve(process.cwd(), '..', 'hydrogen.config.json')
      ) === true
    ) {
      settings = JSON.parse(
        fs.readFileSync(
          path.resolve(process.cwd(), '..', 'hydrogen.config.json')
        )
      );
    } else {
      //
      // Throw an error --------------------------------------------------------
      // This should never happen, because the validation script should catch this situation before it happens.
      h2_error_detail(
        'configuration',
        null,
        [
          path.resolve(process.cwd(), 'hydrogen.config.json'),
          path.resolve(process.cwd(), '..', 'hydrogen.config.json'),
        ],
        "It looks like you don't have a hydrogen.config.json file in this directory or its parent. Please run npx h2-init to create one."
      );
      return false;
    }
    //
    // Return the settings =====================================================
    //
    return settings;
  } catch (error) {
    //
    // Catch any errors ========================================================
    //
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
