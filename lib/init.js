// Hydrogen.css / Development Init Script

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');
var path = require('path');
var prompt = require('prompt');

// Local dependencies
var { h2_error } = require('./scripts/logs');

// Set Prompt settings
prompt.message = '👋 [' + colors.magenta('Hydrogen') + ']';
prompt.delimiter = '';

// Set Prompt questions
const properties = [
  {
    name: 'input',
    type: 'string',
    required: true,
    description: colors.white(' Input path (e.g. src/templates):'),
  },
  {
    name: 'output',
    type: 'string',
    required: true,
    description: colors.white(' Output path (e.g. src/styles):'),
  },
];

// Create the configuration variables
var input = [];
var output = '';

function h2_set_folders() {
  try {
    if (
      fs.existsSync(path.join(process.cwd() + '/hydrogen.config.json')) == false
    ) {
      console.log('👋 [' + 'Hydrogen'.magenta + ']', 'Welcome to Hydrogen! ☀️');
      console.log(
        '👋 [' + 'Hydrogen'.magenta + ']',
        "To generate your configuration file, we need to ask for two directories: your input and output folders. Each of these folders should be relative to the root of your project. The input folder is where you store your project's markup; Hydrogen will look here for the attributes you use to build your CSS file. The output folder is where you want Hydrogen to put the final CSS file it produces."
      );
      prompt.start();
      prompt.get(properties, function (err, result) {
        var sanitizedInput = result.input;
        // Check for prefixed / and remove it
        if (
          sanitizedInput.slice(0, 1) == '/' ||
          sanitizedInput.slice(0, 1) == '\\'
        ) {
          sanitizedInput = sanitizedInput.substring(1);
        }
        // Check for suffixed / and remove it
        if (
          sanitizedInput.slice(-1) == '/' ||
          sanitizedInput.slice(-1) == '\\'
        ) {
          sanitizedInput = sanitizedInput.slice(0, -1);
        }
        var sanitizedOutput = result.output;
        // Check for prefixed / and remove it
        if (
          sanitizedOutput.slice(0, 1) == '/' ||
          sanitizedOutput.slice(0, 1) == '\\'
        ) {
          sanitizedOutput = sanitizedOutput.substring(1);
        }
        // Check for suffixed / and remove it
        if (
          sanitizedOutput.slice(-1) == '/' ||
          sanitizedOutput.slice(-1) == '\\'
        ) {
          sanitizedOutput = sanitizedOutput.slice(0, -1);
        }
        input = input.concat(sanitizedInput);
        output = sanitizedOutput;
        h2_create_hydrogen_configuration(input, output);
      });
    } else {
      throw 'It looks like you already have a Hydrogen configuration file in your project root. Please use that file instead.';
    }
  } catch (error) {
    h2_error(error);
    return false;
  }
}

function h2_create_hydrogen_configuration(input, output) {
  try {
    var defaults = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'data/hydrogen.defaults.json'))
    );
    if (fs.existsSync(path.join(process.cwd() + '/' + input[0])) == false) {
      fs.mkdirSync(path.join(process.cwd() + '/' + input[0]));
      console.log(
        '👋 [' + 'Hydrogen'.magenta + ']',
        "The input folder you specified didn't exist yet, so we created it for you."
      );
    }
    if (fs.existsSync(path.join(process.cwd() + '/' + output)) == false) {
      fs.mkdirSync(path.join(process.cwd() + '/' + output));
      console.log(
        '👋 [' + 'Hydrogen'.magenta + ']',
        "The output folder you specified didn't exist yet, so we created it for you."
      );
    }
    defaults.input = input;
    defaults.output = output;
    // Write the file.
    fs.writeFile(
      path.join(process.cwd() + '/hydrogen.config.json'),
      JSON.stringify(defaults, null, 2),
      function (error) {
        if (error) {
          throw error;
        }
      }
    );
    console.log(
      '✅ [' + 'Hydrogen'.magenta + ']',
      "You've successfully created a Hydrogen configuration file. All the defaults have been added, and you can see available configuration options at https://hydrogen.design."
    );
  } catch (error) {
    h2_error(error);
    return false;
  }
}

function h2_configure_hydrogen() {
  h2_set_folders();
}

module.exports = {
  h2_configure_hydrogen,
};
