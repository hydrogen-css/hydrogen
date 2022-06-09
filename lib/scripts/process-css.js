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
var { h2Error } = require('./logs');

function processCSS(argv) {
  try {
    var envObject = parseENV(argv);
    var envState = envObject.state;
    var userOutput = getUserOutput(argv, 'string');
    console.time('⌚ [' + 'Hydrogen'.magenta + '] ' + 'AP and Nano process time', 'processTime');
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
    console.timeEnd('⌚ [' + 'Hydrogen'.magenta + '] ' + 'AP and Nano process time', 'processTime');
    console.timeEnd('⌚ [' + 'Hydrogen'.magenta + '] ' + 'Total Hydrogen build time', 'totalTime');
  } catch (error) {
    h2Error(error);
    return error;
  }
}

module.exports = {
  processCSS,
};
