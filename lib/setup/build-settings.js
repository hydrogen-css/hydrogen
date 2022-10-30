// Hydrogen: Build development configuration file
'use strict';

// Hydrogen data models

// Hydrogen data imports
let settings = require('../data/settings-model');

// Vendor dependencies
var fs = require('fs');
var path = require('path');

// Hydrogen dependencies
const { log_message } = require('../scripts/logs/log-message');

/**
 * Loads Hydrogen's default settings and manipulates them to produce a customized settings output
 * @param {string} script setup | test
 * @param {string} environment The name of the environment
 * @param {function} modification A function that modifies the settings object based on the needs of the environment
 * @returns {boolean} true | false
 */
function build_development_config(environment, modification) {
  try {
    // Log the test is being set up
    log_message({
      type: 'system',
      step: environment,
      message: 'Setting up...',
    });
    // Manipulate the settings for this environment
    let environment_settings = modification(settings);
    // Write the configuration file
    fs.writeFile(
      path.resolve(process.cwd() + '/hydrogen.config.json'),
      JSON.stringify(environment_settings, null, 2),
      function (error) {
        if (error) {
          throw error;
        } else {
          log_message({
            type: 'success',
            step: environment,
            message: 'Successfully created a custom configuration file.',
          });
          return true;
        }
      }
    );
  } catch (error) {
    // Catch any errors
    console.log(error);
    return false;
  }
}

module.exports = {
  build_development_config,
};
