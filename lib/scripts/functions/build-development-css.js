// Hydrogen.css / Build Development Ready CSS

// =============================================================================

'use strict';

// Requirements
const fs = require('fs');

// Load Hydrogen's Configuration
var { loadH2Config } = require('../functions/config-load');

// Load the Font Face Function
var { setFontFaceCSS } = require('../functions/set-fonts');

// =============================================================================

async function buildDevCSS(env) {
  var config = loadH2Config(env);
  console.timeEnd(
    'H2 ' + '[TIMELOG]'.magenta + ' Sass compile time was',
    'sassTime'
  );
  var fontFaceCSS = setFontFaceCSS(env);
  var projectPath;
  if (env == 'dev') {
    projectPath = './lib/stage/';
  } else if (env == 'prod') {
    projectPath = './';
  }
  // Get the temporary core Hydrogen.
  var compiledHydrogenCoreCSS = fs
    .readFileSync(projectPath + config.folders.styles + '/hydrogen/compiled/core.css')
    .toString();
  var compiledHydrogenUtilityCSS = fs
    .readFileSync(
      projectPath + config.folders.styles + '/hydrogen/compiled/compile.css'
    )
    .toString();
  // Assemble the string.
  var devHydrogen =
    fontFaceCSS + compiledHydrogenCoreCSS + compiledHydrogenUtilityCSS;
  // Write the file.
  fs.mkdirSync(projectPath + config.folders.styles + '/hydrogen/cleaned');
  fs.writeFileSync(
    projectPath + config.folders.styles + '/hydrogen/cleaned/hydrogen.css',
    devHydrogen,
    function (err) {
      if (err) {
        console.log('H2', '[ERROR]'.red, err);
      }
    }
  );
  await Promise.resolve('done?');
}

module.exports = buildDevCSS;
