"use strict";

var colors = require('colors');
const fs = require('fs');

function buildDevCSS(config, normalizeCSS, fontFaceCSS) {
  // Get the temporary core Hydrogen.
  var compiledHydrogenCoreCSS = fs.readFileSync('./' + config.folders.styles + '/hydrogen/compiled/core.css').toString();
  // Get the temporary compiled Hydrogen file, located in the user's specified location in the config.
  var compiledHydrogenUtilityCSS = fs.readFileSync('./' + config.folders.styles + '/hydrogen/compiled/utility.css').toString();
  // Assemble the string.
  var devHydrogen = normalizeCSS + fontFaceCSS + compiledHydrogenCoreCSS + compiledHydrogenUtilityCSS;
  // Write the file.
  fs.writeFile('./' + config.folders.styles + '/hydrogen.css', devHydrogen, function(err) {
    if (err) {
      console.log('Hydrogen: ', err);
    }
  });
}

module.exports = buildDevCSS;