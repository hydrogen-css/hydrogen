// Hydrogen
'use strict';

// Helper functions
const { flourish } = require('./scripts/console-logging/log-styles');
const { log_message } = require('./scripts/console-logging/log-message');
const { create_config } = require('./scripts/create-config');

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
    description: colors.magenta('Input path') + colors.white(' (e.g. src/templates):'),
  },
  {
    name: 'output',
    type: 'string',
    required: true,
    description: colors.magenta('Output path') + colors.white(' (e.g. src/styles):'),
  },
];

// Create the configuration variables
let input = [];
let output = '';

/**
 * Collects the user's input and output data to create a configuration file in the root of their project.
 * @returns {boolean}
 */
function hydrogen_init() {
  try {
    // Start off by checking to see if a configuration file exists in the current working directory - if it does, end the script and log an error
    if (fs.existsSync(path.join(process.cwd() + '/hydrogen.config.json')) == false) {
      // Log the introduction
      log_message({
        type: 'system',
        step: 'Creating settings file',
        message:
          "Welcome to Hydrogen! To generate your configuration file, we need to ask for two directories: your input and output folders. Each of these folders should be relative to the root of your project. The input folder is where you store your project's markup; Hydrogen will look here for the attributes you use to build your CSS file. The output folder is where you want Hydrogen to put the final CSS file it produces.",
        buffers: {
          bottom: true,
        },
      });
      // Trigger a prompt so the user can specify their input and output directories
      prompt.start();
      // Process the prompt
      prompt.get(properties, function (err, result) {
        if (err) {
          // There was an error in collecting the input
          throw err;
        } else {
          // The prompt was collected properly, start by sanitizing the input array
          let sanitized_input = result.input;
          // Check for prefixed / and remove it
          if (sanitized_input.slice(0, 1) == '/' || sanitized_input.slice(0, 1) == '\\') {
            sanitized_input = sanitized_input.substring(1);
          }
          // Check for suffixed / and remove it
          if (sanitized_input.slice(-1) == '/' || sanitized_input.slice(-1) == '\\') {
            sanitized_input = sanitized_input.slice(0, -1);
          }
          // Sanitize the output
          let sanitized_output = result.output;
          // Check for prefixed / and remove it
          if (sanitized_output.slice(0, 1) == '/' || sanitized_output.slice(0, 1) == '\\') {
            sanitized_output = sanitized_output.substring(1);
          }
          // Check for suffixed / and remove it
          if (sanitized_output.slice(-1) == '/' || sanitized_output.slice(-1) == '\\') {
            sanitized_output = sanitized_output.slice(0, -1);
          }
          // Append the sanitized content to the input and output variables
          input = input.concat(sanitized_input);
          output = sanitized_output;
          // Create the config file
          create_config(input, output);
          // Return success
          return true;
        }
      });
    } else {
      throw new Error(
        'It looks like you already have a Hydrogen configuration file in your project root. Please use that file instead.'
      );
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      log_message({
        type: 'error',
        step: error.step,
        error: error.error,
        buffers: {
          bottom: true,
        },
      });
      throw error.error;
    } else {
      log_message({
        type: 'error',
        step: 'Hydrogen initialization',
        error: error,
        buffers: {
          bottom: true,
        },
      });
      throw error;
    }
  }
}

module.exports = {
  hydrogen_init,
};
