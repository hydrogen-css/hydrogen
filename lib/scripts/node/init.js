// Hydrogen.css / Development Init Script

'use strict';

// Requirements
const { series } = require('gulp');
var colors = require('colors');
const fs = require('fs');
const prompt = require('prompt');

// Load Hydrogen's configuration
var {
  loadH2Defaults,
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Set the environment
var env = 'prod';

// Set Prompt settings
prompt.message = colors.gray('Hydrogen ') + colors.blue('[SETUP]');
prompt.delimiter = colors.white(':');

// Set Prompt questions
const properties = [
  {
    name: 'input',
    type: 'string',
    required: true,
    description: colors.white(' Input path (e.g. src/templates)'),
  },
  {
    name: 'output',
    type: 'string',
    required: true,
    description: colors.white(' Output path (e.g. src/styles)'),
  },
];

// Create the configuration variables
var input = '';
var output = '';

/**
 * Prompts the user to set their configuration folders.
 * @param {*} done
 * @returns The folder setup for the Prompt call.
 */
function setFolders(done) {
  try {
    // console.log(fs.existsSync('./hydrogen.config.json'));
    console.log('Hydrogen'.gray, '[SETUP]'.blue, 'Welcome to Hydrogen! ☀️');
    console.log(
      'Hydrogen'.gray,
      '[SETUP]'.blue,
      "To generate your configuration file, we need to ask for two directories: your input and output folders. Each of these folders should be relative to the root of your project. The input folder is where you store your project's markup; Hydrogen will look here for the attributes you use to build your CSS file. The output folder is where you want Hydrogen to put the final CSS file it produces."
    );
    if (fs.existsSync('./lib/stage/hydrogen.config.json') == false) {
      prompt.start();
      prompt.get(properties, function (err, result) {
        input = result.input;
        output = result.output;
        done();
      });
    } else {
      throw 'It looks like you already have a Hydrogen configuration file in your project root. Please use that file instead.';
    }
  } catch (ex) {
    console.error('Hydrogen'.gray, '[ERROR]'.red, ex);
    return false;
  }
}

/**
 * Takes the settings from the prompt and creates a configuration file for the user.
 * @param {*} done
 * @returns A configuration file written to the user's project root.
 */
function createHydrogenInit(done) {
  try {
    var destRoot = getH2DestinationPath(env);
    if (fs.existsSync(destRoot + input) == false) {
      fs.mkdirSync(destRoot + input);
      console.log(
        'Hydrogen'.gray,
        '[SETUP]'.blue,
        "The input folder you specified didn't exist yet, so we created it for you."
      );
    }
    if (fs.existsSync(destRoot + output) == false) {
      fs.mkdirSync(destRoot + output);
      console.log(
        'Hydrogen'.gray,
        '[SETUP]'.blue,
        "The output folder you specified didn't exist yet, so we created it for you."
      );
    }
    var defaults = loadH2Defaults('dev');
    defaults.input = input;
    defaults.output = output;
    // Write the file.
    fs.writeFile(
      destRoot + 'hydrogen.config.json',
      JSON.stringify(defaults, null, 2),
      function (err) {
        if (err) {
          throw err;
        }
      }
    );
    done();
  } catch (ex) {
    console.error('Hydrogen'.gray, '[ERROR]'.red, ex);
    return false;
  }
}

/**
 * Logs a success message when the configuration file has been successfully created.
 * @param {*} done
 */
function initSuccess(done) {
  console.log(
    'Hydrogen'.gray,
    '[SUCCESS]'.green,
    "You've successfully created a Hydrogen configuration file. All the defaults have been added, and you can see available configuration options at https://hydrogen.design"
  );
  done();
}

exports.init = series(setFolders, createHydrogenInit, initSuccess);
