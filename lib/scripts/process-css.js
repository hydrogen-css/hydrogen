// Hydrogen: Process CSS

'use strict';

// Third party dependencies
var autoprefixer = require('autoprefixer');
var colors = require('colors');
var cssnano = require('cssnano');
var fs = require('fs');
var postcss = require('postcss');

// Local dependencies
var { loadSettings } = require('./load-settings');
var { getUserOutput } = require('./generate-paths');
var { h2Error, h2Timer } = require('./logs');

function processCSS(argv) {
  try {
    const postCSSTimerStart = process.hrtime.bigint();
    // Load user settings
    var settings = loadSettings(argv);
    var userOutput = getUserOutput(argv, 'string');
    if (fs.existsSync(userOutput + '/hydrogen.css') == true) {
      fs.unlinkSync(userOutput + '/hydrogen.css');
    }
    fs.readFile(userOutput + '/hydrogen.raw.css', (err, css) => {
      postcss([autoprefixer, cssnano])
        .process(css, { from: userOutput + '/hydrogen.raw.css', to: userOutput + '/hydrogen.css' })
        .then((result) => {
          fs.writeFileSync(userOutput + '/hydrogen.css', result.css);
          if (result.map) {
            fs.writeFileSync(userOutput + '/hydrogen.css.map', result.map.toString());
          }
        });
    });
    if (settings.debug != null && settings.debug === false) {
      if (fs.existsSync(userOutput + '/hydrogen.raw.css') == true) {
        fs.unlinkSync(userOutput + '/hydrogen.raw.css');
      }
      if (fs.existsSync(userOutput + '/hydrogen.logs.media.json') == true) {
        fs.unlinkSync(userOutput + '/hydrogen.logs.media.json');
      }
      if (fs.existsSync(userOutput + '/hydrogen.logs.attributes.json') == true) {
        fs.unlinkSync(userOutput + '/hydrogen.logs.attributes.json');
      }
      if (fs.existsSync(userOutput + '/hydrogen.logs.values.json') == true) {
        fs.unlinkSync(userOutput + '/hydrogen.logs.values.json');
      }
    }
    const postCSSTimerEnd = process.hrtime.bigint();
    h2Timer('AP and Nano process time was', postCSSTimerStart, postCSSTimerEnd);
  } catch (error) {
    h2Error(error);
    return error;
  }
}

module.exports = {
  processCSS,
};
