// Hydrogen: Process CSS

'use strict';

// Third party dependencies
var autoprefixer = require('autoprefixer'); // This needs to stay
var colors = require('colors');
var cssnano = require('cssnano');
var lite = require('cssnano-preset-lite');
var fs = require('fs');
var postcss = require('postcss');
var path = require('path');

// CSSnano settings
const preset = lite({ discardComments: { removeAll: true }, discardEmpty: true, normalizeWhitespace: true });

// Local dependencies
var { loadSettings } = require('./load-settings');
var { getUserOutput } = require('./generate-paths');
var { h2Error, h2Timer } = require('./logs');

function processCSS() {
  try {
    const postCSSTimerStart = process.hrtime.bigint();
    // Load user settings
    var settings = loadSettings();
    // Get the user output directory as a string
    var userOutput = getUserOutput('string');
    // Delete any existing hydrogen.css files
    if (fs.existsSync(path.join(userOutput + '/hydrogen.css')) == true) {
      fs.unlinkSync(path.join(userOutput + '/hydrogen.css'));
    }
    // Load the raw CSS synchronously
    var rawCSS = fs.readFileSync(path.join(userOutput + '/hydrogen.raw.css'));
    try {
      // Process the raw CSS with autoprefixer and CSSnano
      postcss([
        cssnano({
          preset,
          plugins: ['autoprefixer'],
        }),
      ])
        .process(rawCSS, { from: path.join(userOutput + '/hydrogen.raw.css'), to: path.join(userOutput + '/hydrogen.css') })
        .then((result) => {
          fs.writeFileSync(path.join(userOutput + '/hydrogen.css'), result.css);
          if (result.map) {
            fs.writeFileSync(path.join(userOutput + '/hydrogen.css.map'), result.map.toString());
          }
        });
      if (settings.debug != null && settings.debug === false) {
        if (fs.existsSync(path.join(userOutput + '/hydrogen.raw.css')) == true) {
          fs.unlinkSync(path.join(userOutput + '/hydrogen.raw.css'));
        }
        if (fs.existsSync(path.join(userOutput + '/hydrogen.logs.media.json')) == true) {
          fs.unlinkSync(path.join(userOutput + '/hydrogen.logs.media.json'));
        }
        if (fs.existsSync(path.join(userOutput + '/hydrogen.logs.attributes.json')) == true) {
          fs.unlinkSync(path.join(userOutput + '/hydrogen.logs.attributes.json'));
        }
        if (fs.existsSync(path.join(userOutput + '/hydrogen.logs.values.json') == true)) {
          fs.unlinkSync(path.join(userOutput + '/hydrogen.logs.values.json'));
        }
      }
      const postCSSTimerEnd = process.hrtime.bigint();
      h2Timer('AP and Nano process time was', postCSSTimerStart, postCSSTimerEnd);
    } catch (error) {
      h2Error("Hydrogen's output contained invalid CSS that PostCSS could not process. This is likely a typo in one of your attributes. Please check the hydrogen.raw.css file in your output folder for syntax errors to pinpoint the exact problem(s).");
      console.log('Error file:', 'hydrogen.raw.css');
      console.log('Error name:', error.name);
      console.log('Error reason:', error.reason);
      return false;
    }
    return true;
  } catch (error) {
    h2Error(error);
    return false;
  }
}

module.exports = {
  processCSS,
};
