// Hydrogen: Process CSS
'use strict';

// Vendor dependencies
var autoprefixer = require('autoprefixer'); // This needs to stay
var colors = require('colors');
var cssnano = require('cssnano');
var cssnano_default = require('cssnano-preset-default');
var fs = require('fs');
var postcss = require('postcss');
var path = require('path');

const preset = cssnano_default({
  cssDeclarationSorter: false,
  calc: false,
  colormin: false,
  convertValues: false,
  discardOverridden: false,
  mergeLonghand: false,
  mergeRules: false,
  orderedValues: false,
  reduceInitial: false,
  reduceTransforms: false,
  svgo: false,
  uniqueSelectors: false,
});

// Hydrogen dependencies
var { h2_load_settings } = require('./load-settings');
var { getUserOutput } = require('./generate-paths');
var { h2_timer, h2_error_detail } = require('./logs');

function processCSS() {
  try {
    const postCSSTimerStart = process.hrtime.bigint();
    // Load user settings
    var settings = h2_load_settings();
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
          plugins: [autoprefixer],
        }),
      ])
        .process(rawCSS, {
          from: path.join(userOutput + '/hydrogen.raw.css'),
          to: path.join(userOutput + '/hydrogen.css'),
        })
        .then((result) => {
          fs.writeFileSync(path.join(userOutput + '/hydrogen.css'), result.css);
          if (result.map) {
            fs.writeFileSync(
              path.join(userOutput + '/hydrogen.css.map'),
              result.map.toString()
            );
          }
        });
      if (fs.existsSync(path.join(userOutput + '/hydrogen.raw.css')) == true) {
        fs.unlinkSync(path.join(userOutput + '/hydrogen.raw.css'));
      }
      const postCSSTimerEnd = process.hrtime.bigint();
      h2_timer(
        'AP and Nano process time was',
        postCSSTimerStart,
        postCSSTimerEnd
      );
    } catch (error) {
      h2_error_detail(
        'internal',
        null,
        path.join(userOutput + '/hydrogen.raw.css'),
        "Hydrogen's output contained invalid CSS that PostCSS could not process. This might be a typo in one of your attributes. Please check the hydrogen.raw.css file in your output folder for syntax errors to pinpoint the exact problem(s).\n\n" +
          error
      );
      return null;
    }
    return true;
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error_detail(
      'generic',
      null,
      path.join(userOutput + '/hydrogen.raw.css'),
      error
    );
    return null;
  }
}

module.exports = {
  processCSS,
};
