// Hydrogen.css / Build Development Ready CSS

// =============================================================================

'use strict';

// Requirements
const fs = require('fs');

// Load Hydrogen's Configuration
var {
  loadH2Defaults,
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Load the Font Face Function
var { setFontFaceCSS } = require('../functions/set-fonts');

// =============================================================================

async function buildDevCSS(env) {
  // End the Sass compiler time tracker.
  console.timeEnd(
    'Hydrogen ' + '[TIMELOG]'.magenta + ' Sass compile time was',
    'sassTime'
  );
  // Load the destination root path.
  var destRoot = getH2DestinationPath(env);
  // Load the user configured output directory path.
  var outputDir = getH2OutputDirectory(env);
  // Combine the destination root and user output directory.
  var destPath = destRoot + outputDir;
  // Set the font face CSS.
  var fontFaceCSS = setFontFaceCSS(env);
  // Get the temporary core Hydrogen.
  var compiledHydrogenCoreCSS = fs
    .readFileSync(destPath + '/hydrogen/compiled/core.css')
    .toString();
  var compiledHydrogenUtilityCSS = fs
    .readFileSync(destPath + '/hydrogen/compiled/compile.css')
    .toString();
  // Assemble the string.
  var devHydrogen =
    fontFaceCSS + compiledHydrogenCoreCSS + compiledHydrogenUtilityCSS;
  // Write the file.
  fs.mkdirSync(destPath + '/hydrogen/cleaned');
  fs.writeFileSync(
    destPath + '/hydrogen/cleaned/hydrogen.css',
    devHydrogen,
    function (err) {
      if (err) {
        console.log('Hydrogen', '[ERROR]'.red, err);
      }
    }
  );
  await Promise.resolve('done?');
}

module.exports = buildDevCSS;
