// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/config-data').Config} Config
 */
/**
 * @typedef {import('../../data/media-array-data').MediaArray} MediaArray
 * @typedef {import('../../data/media-array-data').QueryData} QueryData
 */

// Data imports
let { get_default_config } = require('../../data/config-data');

// Local functions

// Helper functions
const { log_message } = require('../console-logging/log-message');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script ==========================================================================================

/**
 * Takes input and output values and produces a default Hydrogen configuration file in the location the command was run.
 *
 * @param {string[]} input
 * @param {string} output
 * @returns {boolean} A Hydrogen configuration file
 */
function create_config(input, output) {
  try {
    /** @type {Config} */
    let defaults = get_default_config();
    // Check to see if the input folder exists, and if it doesn't, create it
    if (fs.existsSync(path.join(process.cwd() + '/' + input[0])) == false) {
      fs.mkdirSync(path.join(process.cwd() + '/' + input[0]), {
        recursive: true,
      });
      log_message({
        type: 'system',
        step: 'Creating config file',
        message: "The input folder you specified didn't exist yet, so Hydrogen created it for you.",
      });
    }
    // Check to see if the output folder exists, and if it doesn't, create it
    if (fs.existsSync(path.join(process.cwd() + '/' + output)) == false) {
      fs.mkdirSync(path.join(process.cwd() + '/' + output), {
        recursive: true,
      });
      log_message({
        type: 'system',
        step: 'Creating config file',
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
      step: 'Creating config file',
      message:
        'A configuration file was successfully created in the root of your project. It contains all the default settings you need to get started, as well as a helpful list of links to learn more about using and configuring Hydrogen.',
      files: [path.resolve(process.cwd() + '/hydrogen.config.json')],
      buffers: {
        bottom: true,
      },
    });
    return true;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Creating config file',
        error: error,
      };
    }
  }
}

module.exports = {
  create_config,
};
