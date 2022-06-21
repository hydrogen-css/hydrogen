// Hydrogen: Parse attributes

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

// Local dependencies
var { getUserInput } = require('./generate-paths');
var { h2Error, h2Timer } = require('./logs');

/**
 * This script parses the user's input directories and looks for data-h2 attributes
 * @returns {array} Returns an array of attributes found in the code that has been sanitized of duplicates
 */
function parseAttributes() {
  try {
    const parseAttributesTimerStart = process.hrtime.bigint();
    var inputData = getUserInput('glob');
    var ignoreSettings = ['hydrogen.css', 'hydrogen.logs.attributes.json', 'hydrogen.logs.media.json', 'hydrogen.logs.values.json', 'hydrogen.raw.css', 'hydrogen.vars.css', 'hydrogen.vars.scss'];
    var userInputArray = getUserInput('array');
    var finalIgnoreArray = [];
    userInputArray.forEach(function (input) {
      ignoreSettings.forEach(function (setting) {
        finalIgnoreArray = finalIgnoreArray.concat(path.join(input + '/**/' + setting));
      });
    });
    // Convert the inputData and finalIgnoreArray because the glob module doesn't accept '\' characters
    inputData = inputData.replace(/\\/g, '/');
    finalIgnoreArray.forEach(function (item, index) {
      finalIgnoreArray[index] = item.replace(/\\/g, '/');
    });
    // Create the glob
    var files = glob.sync('{' + inputData + '}', {
      ignore: finalIgnoreArray,
    });
    var hydrogenRegex = /data-h2-([^=\s'"]+)((=|["']+:+ ?)(\\)?["'{]([^"'}]*)["'}]{1})/g;
    var hydrogenAttributes = [];
    for (let item in files) {
      if (fs.lstatSync(files[item]).isDirectory() == false) {
        var fileData = fs.readFileSync(files[item]).toString();
        var attributes = fileData.match(hydrogenRegex);
        if (attributes != null) {
          hydrogenAttributes = hydrogenAttributes.concat(attributes);
        }
      }
    }
    function uniq(a) {
      return Array.from(new Set(a));
    }
    var cleanAttributes = uniq(hydrogenAttributes); // Cleans duplicates
    const parseAttributesTimerEnd = process.hrtime.bigint();
    h2Timer('Attribute scrape time was', parseAttributesTimerStart, parseAttributesTimerEnd);
    return cleanAttributes;
  } catch (error) {
    h2Error(error);
    return false;
  }
}

module.exports = {
  parseAttributes,
};
