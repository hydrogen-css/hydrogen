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
var { loadSettings } = require('./load-settings');

function processCSS(argv) {
  try {
    var envObject = parseENV(argv);
    var envState = envObject.state;
    var envSrc = envObject.src;
    var settings = loadSettings(argv);
    console.time(
      'Hydrogen ' + '[LOGGING]'.magenta + ' Autoprefixer and CSSNano process time was',
      'processTime'
    );
    if (fs.existsSync(envSrc + settings.output + '/hydrogen.css') == true) {
      fs.unlinkSync(envSrc + settings.output + '/hydrogen.css');
    }
    fs.readFile(envSrc + settings.output + '/hydrogen.raw.css', (err, css) => {
      postcss([ autoprefixer, cssnano ])
        .process(css, { from: envSrc + settings.output + '/hydrogen.raw.css', to: envSrc + settings.output + '/hydrogen.css' })
        .then(result => {
          fs.writeFile(envSrc + settings.output + '/hydrogen.css', result.css, () => true)
          if ( result.map ) {
            fs.writeFile(envSrc + settings.output + '/hydrogen.css.map', result.map.toString(), () => true)
          }
        })
    })
    if (envState == 'prod') {
      if (fs.existsSync(envSrc + settings.output + '/hydrogen.raw.css') == true) {
        fs.unlinkSync(envSrc + settings.output + '/hydrogen.raw.css');
      }
    }
    console.timeEnd(
      'Hydrogen ' + '[LOGGING]'.magenta + ' Autoprefixer and CSSNano process time was',
      'processTime'
    );
    console.timeEnd(
      'Hydrogen ' + '[LOGGING]'.magenta + ' Hydrogen\'s total build time was',
      'totalTime'
    );
  } catch(err) {
    return err;
  }
}

module.exports = {
  processCSS
}