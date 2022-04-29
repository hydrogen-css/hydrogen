// Hydrogen: Process CSS

'use strict';

// Third party dependencies
var autoprefixer = require('autoprefixer');
var colors = require('colors');
var cssnano = require('cssnano');
var fs = require('fs');
var postcss = require('postcss');

function processCSS() {
  try {
    console.time(
      'Hydrogen ' + '[LOGGING]'.magenta + ' Autoprefixer and CSSNano process time was',
      'processTime'
    );
    if (fs.existsSync('./tests/styles/hydrogen.css') == true) {
      fs.unlinkSync('./tests/styles/hydrogen.css');
    }
    fs.readFile('./tests/styles/hydrogen.raw.css', (err, css) => {
      postcss([ autoprefixer, cssnano ])
        .process(css, { from: './tests/styles/hydrogen.raw.css', to: './tests/styles/hydrogen.css' })
        .then(result => {
          fs.writeFile('./tests/styles/hydrogen.css', result.css, () => true)
          if ( result.map ) {
            fs.writeFile('./tests/styles/hydrogen.css.map', result.map.toString(), () => true)
          }
        })
    })
    // if (fs.existsSync('./tests/styles/hydrogen.raw.css') == true) {
    //   fs.unlinkSync('./tests/styles/hydrogen.raw.css');
    // }
    console.timeEnd(
      'Hydrogen ' + '[LOGGING]'.magenta + ' Autoprefixer and CSSNano process time was',
      'processTime'
    );
  } catch(err) {
    return err;
  }
}

module.exports = {
  processCSS
}