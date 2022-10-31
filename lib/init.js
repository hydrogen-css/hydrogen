// Hydrogen: Init script
'use strict';

// Hydrogen type imports
let Settings = require('./data/settings-model-definition');
/**
 * @typedef {import('./data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
let settings_data = require('./data/settings-model');
// Hydrogen function imports
const { flourish } = require('./scripts/logs/log-labels');
const { log_message } = require('./scripts/logs/log-message');
// Vendor imports
var colors = require('colors');
var fs = require('fs');
var path = require('path');
var prompt = require('prompt');

// Set prompt settings
prompt.message = flourish;
prompt.delimiter = '';

// Set prompt questions
const properties = [
  {
    name: 'input',
    type: 'string',
    required: true,
    description:
      colors.magenta('Input path') + colors.white(' (e.g. src/templates):'),
  },
  {
    name: 'output',
    type: 'string',
    required: true,
    description:
      colors.magenta('Output path') + colors.white(' (e.g. src/styles):'),
  },
];

// Create the configuration variables
let input = [];
let output = '';

/**
 * Collects the user's input and output data to produce the configuration file
 * @returns {boolean} A Hydrogen configuration file
 */
function set_folders() {
  try {
    // Start off by checking to see if a configuration file exists in the current working directory - if it does, end the script and log an error
    if (
      fs.existsSync(path.join(process.cwd() + '/hydrogen.config.json')) == false
    ) {
      // Log the introduction
      log_message({
        type: 'system',
        step: 'Creating settings file',
        message:
          "Welcome to Hydrogen! To generate your configuration file, we need to ask for two directories: your input and output folders. Each of these folders should be relative to the root of your project. The input folder is where you store your project's markup; Hydrogen will look here for the attributes you use to build your CSS file. The output folder is where you want Hydrogen to put the final CSS file it produces.",
      });
      // Trigger a prompt so the user can specify their input and output directories
      prompt.start();
      // Process the prompt
      prompt.get(properties, function (err, result) {
        if (err) {
          // There was an error in collecting the input
          log_message({
            type: 'error',
            step: 'Creating settings file',
            message: err,
          });
          return false;
        } else {
          // The prompt was collected properly, start by sanitizing the input array
          let sanitized_input = result.input;
          // Check for prefixed / and remove it
          if (
            sanitized_input.slice(0, 1) == '/' ||
            sanitized_input.slice(0, 1) == '\\'
          ) {
            sanitized_input = sanitized_input.substring(1);
          }
          // Check for suffixed / and remove it
          if (
            sanitized_input.slice(-1) == '/' ||
            sanitized_input.slice(-1) == '\\'
          ) {
            sanitized_input = sanitized_input.slice(0, -1);
          }
          // Sanitize the output
          let sanitized_output = result.output;
          // Check for prefixed / and remove it
          if (
            sanitized_output.slice(0, 1) == '/' ||
            sanitized_output.slice(0, 1) == '\\'
          ) {
            sanitized_output = sanitized_output.substring(1);
          }
          // Check for suffixed / and remove it
          if (
            sanitized_output.slice(-1) == '/' ||
            sanitized_output.slice(-1) == '\\'
          ) {
            sanitized_output = sanitized_output.slice(0, -1);
          }
          // Append the sanitized content to the input and output variables
          input = input.concat(sanitized_input);
          output = sanitized_output;
          // Create the config file
          let create_file = create_config_file(input, output);
          if (create_file === false) {
            return false;
          } else {
            return true;
          }
        }
      });
    } else {
      log_message({
        type: 'error',
        step: 'Creating settings file',
        message:
          'It looks like you already have a Hydrogen configuration file in your project root. Please use that file instead.',
      });
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Creating settings file',
      message: error,
    });
    return false;
  }
}

/**
 * Takes input and output values and produces a default Hydrogen configuration file in the location the command was run
 * @param {string[]} input
 * @param {string} output
 * @returns {boolean} A Hydrogen configuration file
 */
function create_config_file(input, output) {
  try {
    let defaults = settings_data;
    // Check to see if the input folder exists, and if it doesn't, create it
    if (fs.existsSync(path.join(process.cwd() + '/' + input[0])) == false) {
      fs.mkdirSync(path.join(process.cwd() + '/' + input[0]));
      log_message({
        type: 'system',
        step: 'Creating settings file',
        message:
          "The input folder you specified didn't exist yet, so Hydrogen created it for you.",
      });
    }
    // Check to see if the output folder exists, and if it doesn't, create it
    if (fs.existsSync(path.join(process.cwd() + '/' + output)) == false) {
      fs.mkdirSync(path.join(process.cwd() + '/' + output));
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
    fs.writeFile(
      path.join(process.cwd() + '/hydrogen.config.json'),
      JSON.stringify(defaults, null, 2),
      function (error) {
        if (error) {
          throw error;
        }
      }
    );
    log_message({
      type: 'success',
      step: 'Creating settings file',
      message:
        'A configuration file was successfully created in the root of your project. It contains all the default settings you need to get started, as well as a helpful list of links to learn more about using and configuring Hydrogen.',
      files: [path.resolve(process.cwd() + '/hydrogen.config.json')],
    });
    return true;
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Creating settings file',
      message: error,
    });
    return false;
  }
}

function h2_configure_hydrogen() {
  set_folders();
}

module.exports = {
  h2_configure_hydrogen,
};
