// Hydrogen: Parse attributes

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');
var glob = require('glob');

// Local dependencies
var { generateInputGlob } = require('./generate-input-glob');

/**
 * This script parses the user's input directories and looks for data-h2 attributes
 * @returns {array} Returns an array of attributes found in the code that has been sanitized of duplicates
 */
function parseAttributes(argv) {
  try {
    console.time(
      'Hydrogen ' + '[LOGGING]'.magenta + ' Code scrape time was',
      'scrapeTime'
    );
    var inputData = generateInputGlob(argv);
    var files = glob.sync(inputData);
    var hydrogenRegex = /data-h2-([^=\s'"]+)(\s|(=|["']+:+ ?)(\\)?["'{]([^"'}]*)["'}]{1})/g;
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
    console.timeEnd(
      'Hydrogen ' + '[LOGGING]'.magenta + ' Code scrape time was',
      'scrapeTime'
    );
    return cleanAttributes;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  parseAttributes
}