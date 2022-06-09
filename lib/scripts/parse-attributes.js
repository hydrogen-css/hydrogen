// Hydrogen: Parse attributes

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');
var glob = require('glob');

// Local dependencies
var { getUserInput } = require('./generate-paths');
var { h2Error, h2Timer } = require('./logs');

/**
 * This script parses the user's input directories and looks for data-h2 attributes
 * @returns {array} Returns an array of attributes found in the code that has been sanitized of duplicates
 */
function parseAttributes(argv) {
  try {
    const parseAttributesTimerStart = process.hrtime.bigint();
    var inputData = getUserInput(argv, 'glob');
    var files = glob.sync('{' + inputData + '}');
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
