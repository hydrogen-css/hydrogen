// Hydrogen.css / Development Init Script

'use strict';

// Third party dependencies
var { argv } = require('process');
var colors = require('colors');
var fs = require('fs');
var path = require('path');
var prompt = require('prompt');

// Local dependencies
var { parseENV } = require('./scripts/parse-env');

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

function setFolders(argv) {
  try {
    var envObject = parseENV(argv);
    var envState = envObject.state;
    var envSrc = envObject.src;
    if (fs.existsSync(envSrc + 'hydrogen.config.json') == false) {
      console.log('👋 [' + 'Hydrogen'.magenta + ']', 'Welcome to Hydrogen! ☀️');
      console.log('👋 [' + 'Hydrogen'.magenta + ']', "To generate your configuration file, we need to ask for two directories: your input and output folders. Each of these folders should be relative to the root of your project. The input folder is where you store your project's markup; Hydrogen will look here for the attributes you use to build your CSS file. The output folder is where you want Hydrogen to put the final CSS file it produces.");
      prompt.start();
      prompt.get(properties, function (err, result) {
        input = input.concat(result.input);
        output = result.output;
        createHydrogenInit(argv);
      });
    } else {
      throw 'It looks like you already have a Hydrogen configuration file in your project root. Please use that file instead.';
    }
  } catch (err) {
    console.error('⛔ [' + 'Hydrogen'.magenta + ']', err);
    return false;
  }
}

function createHydrogenInit(argv) {
  try {
    var envObject = parseENV(argv);
    var envState = envObject.state;
    var envSrc = envObject.src;
    var defaults = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data/hydrogen.defaults.json')));
    if (fs.existsSync(envSrc + input) == false) {
      fs.mkdirSync(envSrc + input);
      console.log('👋 [' + 'Hydrogen'.magenta + ']', "The input folder you specified didn't exist yet, so we created it for you.");
    }
    if (fs.existsSync(envSrc + output) == false) {
      fs.mkdirSync(envSrc + output);
      console.log('👋 [' + 'Hydrogen'.magenta + ']', "The output folder you specified didn't exist yet, so we created it for you.");
    }
    defaults.input = input;
    defaults.output = output;
    // Write the file.
    fs.writeFile(envSrc + 'hydrogen.config.json', JSON.stringify(defaults, null, 2), function (err) {
      if (err) {
        throw err;
      }
    });
    console.log('✅ [' + 'Hydrogen'.magenta + ']', "You've successfully created a Hydrogen configuration file. All the defaults have been added, and you can see available configuration options at https://hydrogen.design.");
  } catch (err) {
    console.log('⛔ [' + 'Hydrogen'.magenta + ']', err);
    return false;
  }
}

function configureHydrogen() {
  setFolders(argv);
}

exports.init = configureHydrogen();
