// Hydrogen.css / Production Init Script

// =============================================================================

'use strict';

// Requirements
const { series } = require('gulp');
var colors = require('colors');
const fs = require('fs');
const prompt = require('prompt');

// Load Hydrogen's Configuration
var { loadH2Defaults } = require('../functions/config-load');

// =============================================================================

prompt.message = colors.white('H2 ') + colors.blue('[PROMPT]');
prompt.delimiter = colors.white(':');

const properties = [
  {
    name: 'markupFolder',
    required: true,
    description: colors.white(
      ' please enter the path to your main markup from the root of your project (e.g. src/templates or html). If your project has multiple markup folders, you can add them to an array in the hydrogen.config.json file afterwards. Learn more in the Hydrogen docs. Markup folder path'
    ),
  },
  {
    name: 'scriptFolder',
    required: true,
    description: colors.white(
      ' please enter the path to your main scripts folder from the root of your project (e.g. src/scripts or js). If your project has multiple scripts folders, you can add them to an array in the hydrogen.config.json file afterwards. Learn more in the Hydrogen docs. Scripts folder path'
    ),
  },
  {
    name: 'styleFolder',
    required: true,
    description: colors.white(
      ' please enter the path to your styles folder from the root of your project (e.g. src/styles or css). Styles folder path'
    ),
  },
];

var markup = '';
var scripts = '';
var styles = '';
var hydrogenInit = '';

function setFolders(done) {
  // console.log(fs.existsSync('./hydrogen.config.json'));
  if (fs.existsSync('./hydrogen.config.json') == false) {
    prompt.start();
    prompt.get(properties, function (err, result) {
      markup = result.markupFolder;
      scripts = result.scriptFolder;
      styles = result.styleFolder;
      done();
    });
  } else {
    console.log(
      'H2',
      '[ERROR]'.red,
      'It looks like you already have a Hydrogen configuration file in your project root. Please use that file instead.'
    );
    done('Error');
  }
}

function createHydrogenInit(done) {
  if (fs.existsSync('./' + markup) == true) {
    if (fs.existsSync('./' + scripts) == true) {
      if (fs.existsSync('./' + styles) == true) {
        var defaults = loadH2Defaults('prod');
        defaults.folders.markup = markup;
        defaults.folders.scripts = scripts;
        defaults.folders.styles = styles;
        // Reset the variables.
        // hydrogenInit = '{\n  "folders": {\n    "markup": "' + markup + '",\n    "scripts": "' + scripts + '",\n    "styles": "' + styles + '"\n  }\n}';
        // Write the file.
        fs.writeFile(
          './hydrogen.config.json',
          JSON.stringify(defaults, null, 2),
          function (err) {
            if (err) {
              console.log('H2', '[ERROR]'.red, err);
              done('Error');
            }
          }
        );
        done();
      } else {
        console.log(
          'H2',
          '[ERROR]'.red,
          "The styles folder specified in your Hydrogen configuration file doesn't seem to exist yet. Set it up and try again."
        );
        done('Error');
      }
    } else {
      console.log(
        'H2',
        '[ERROR]'.red,
        "The scripts folder specified in your Hydrogen configuration file doesn't seem to exist yet. Set it up and try again."
      );
      done('Error');
    }
  } else {
    console.log(
      'H2',
      '[ERROR]'.red,
      "The markup folder specified in your Hydrogen configuration file doesn't seem to exist yet. Set it up and try again."
    );
    done('Error');
  }
}

function initSuccess(done) {
  console.log(
    'H2',
    '[SUCCESS]'.green,
    "You've successfully created a Hydrogen configuration file. All the defaults have been added, but you can see all available configuration options at https://hydrogen.design"
  );
  done();
}

exports.init = series(setFolders, createHydrogenInit, initSuccess);
