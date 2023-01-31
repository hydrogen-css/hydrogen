// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('./data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('./data/media-model-definition').MediaObject} MediaObject
 */

// Data imports
let { get_settings_data } = require('../../data/settings-model');

// Logging
const { log_message } = require('../logging/log-message');

// Functions

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script
/**
 * Takes input and output values and produces a default Hydrogen configuration file in the location the command was run
 * @param {string[]} input
 * @param {string} output
 * @returns {boolean} A Hydrogen configuration file
 */
function run_hydrogen_config(input, output) {
  try {
    let defaults = get_settings_data();
    // Check to see if the input folder exists, and if it doesn't, create it
    if (fs.existsSync(path.join(process.cwd() + '/' + input[0])) == false) {
      fs.mkdirSync(path.join(process.cwd() + '/' + input[0]), {
        recursive: true,
      });
      log_message({
        type: 'system',
        step: 'Creating settings file',
        message:
          "The input folder you specified didn't exist yet, so Hydrogen created it for you.",
      });
    }
    // Check to see if the output folder exists, and if it doesn't, create it
    if (fs.existsSync(path.join(process.cwd() + '/' + output)) == false) {
      fs.mkdirSync(path.join(process.cwd() + '/' + output), {
        recursive: true,
      });
      log_message({
        type: 'system',
        step: 'Creating settings file',
        message:
          "The output folder you specified didn't exist yet, so Hydrogen created it for you.",
      });
    }
    // Set the input and output values within the defaults
    defaults.input = input;
    defaults.output = output;
    // Write the configuration file
    fs.writeFileSync(
      path.join(process.cwd() + '/hydrogen.config.json'),
      JSON.stringify(defaults, null, 2)
    );
    log_message({
      type: 'success',
      step: 'Creating settings file',
      message:
        'A configuration file was successfully created in the root of your project. It contains all the default settings you need to get started, as well as a helpful list of links to learn more about using and configuring Hydrogen.',
      files: [path.resolve(process.cwd() + '/hydrogen.config.json')],
      buffers: {
        bottom: true,
      },
    });
    return true;
  } catch (error) {
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Creating configuration file',
        error: error,
      };
    }
  }
}

module.exports = {
  run_hydrogen_config,
};
