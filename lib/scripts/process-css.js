// Hydrogen: Process CSS

'use strict';

// Third party dependencies
var autoprefixer = require('autoprefixer');
var colors = require('colors');
var cssnano = require('cssnano');
var fs = require('fs');
var postcss = require('postcss');

// Local dependencies
var { parseENV } = require('./parse-env');
var { getUserOutput } = require('./generate-paths');
var { h2Error, h2Timer } = require('./logs');

function processCSS(argv) {
  try {
    const postCSSTimerStart = process.hrtime.bigint();
    var envObject = parseENV(argv);
    var envState = envObject.state;
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
    if (envState == 'prod') {
      if (fs.existsSync(userOutput + '/hydrogen.raw.css') == true) {
        fs.unlinkSync(userOutput + '/hydrogen.raw.css');
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
