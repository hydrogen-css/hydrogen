// Hydrogen: Build development configuration file
'use strict';

// Hydrogen data models

// Hydrogen data imports
const { get_settings_data } = require('../data/settings-model');

// Vendor dependencies
var fs = require('fs');
var path = require('path');

// Hydrogen dependencies
const { log_message } = require('../scripts/logging/log-message');

/**
 * Loads Hydrogen's default settings and manipulates them to produce a customized settings output
 * @param {string} test The name of the test
 * @param {} modification A function that modifies the settings object based on the needs of the environment
 * @returns {boolean}
 */
function create_test_config(test, modification) {
  try {
    // Log the test is being set up
    log_message({
      type: 'system',
      step: 'Creating settings file...',
      test: test,
    });
    // Generate the settings
    let settings = get_settings_data();
    // Manipulate the settings for this environment
    let modified_settings = modification(settings);
    // Write the configuration file
    fs.writeFileSync(
      path.resolve(process.cwd(), 'hydrogen.config.json'),
      JSON.stringify(modified_settings, null, 2)
    );
    log_message({
      type: 'success',
      step: 'Creating settings',
      test: test,
      message:
        'Successfully created a custom configuration file for this test.',
    });
    return true;
  } catch (error) {
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Creating settings',
        error: error,
      };
    }
  }
}

module.exports = {
  create_test_config,
};
