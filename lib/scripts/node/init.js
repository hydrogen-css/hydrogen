"use strict";

const { series, parallel, src, dest, watch } = require('gulp');
const fs = require('fs');
const prompt = require('prompt');
const colors = require('colors');

prompt.message = colors.blue('[PROMPT]') + colors.white(' Hydrogen');
prompt.delimiter = colors.white(':');

const properties = [
  {
    name: 'markupFolder',
    required: true,
    description: colors.white(' please enter the path to your main markup from the root of your project (e.g. src/templates or html). If your project has multiple markup folders, you can add them to an array in the hydrogen.config.json file afterwards. Learn more in the Hydrogen docs. Markup folder path')
  },
  {
    name: 'styleFolder',
    required: true,
    description: colors.white(' please enter the path to your styles folder from the root of your project (e.g. src/styles or css). Styles folder path')
  }
];

var markup = '';
var styles = '';
var hydrogenInit = '';

function setFolders(done) {
  // console.log(fs.existsSync('./hydrogen.config.json'));
  if (fs.existsSync('./hydrogen.config.json') == false) {
    prompt.start();
    prompt.get(properties, function (err, result) {
      markup = result.markupFolder;
      styles = result.styleFolder;
      done();
    });
  } else {
    console.log('[ERROR]'.red, 'Hydrogen: it looks like you already have a Hydrogen configuration file in your project root. Please use that file instead.');
    return false;
  }
}

function createHydrogenInit(done) {
  if (fs.existsSync('./' + markup) == true) {
    if (fs.existsSync('./' + styles) == true) {
      // Reset the variables.
      hydrogenInit = '{\n  "folders": {\n    "markup": "' + markup + '",\n    "styles": "' + styles + '"\n  }\n}';
      // Write the file.
      fs.writeFile('./hydrogen.config.json', hydrogenInit, function(err) {
        if (err) {
          console.log('[ERROR]'.red, 'Hydrogen: ', err);
        }
      });
      done();
    } else {
      console.log('[ERROR]'.red, 'Hydrogen: the styles folder specified in your Hydrogen configuration file doesn\'t seem to exist yet. Set it up and try again.');
      return false;
    }
  } else {
    console.log('[ERROR]'.red, 'Hydrogen: the markup folder specified in your Hydrogen configuration file doesn\'t seem to exist yet. Set it up and try again.');
    return false;
  }
}

function initSuccess(done) {
  console.log('[SUCCESS]'.green, 'Hydrogen: you\'ve successfully created a Hydrogen configuration file. You can see all available configuration options at https://hydrogen.design');
  done();
}

exports.init = series(setFolders, createHydrogenInit, initSuccess);