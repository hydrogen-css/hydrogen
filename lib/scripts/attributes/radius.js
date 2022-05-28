// Hydrogen: Radius parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('../load-settings');
var { h2Error } = require('../logs');
var { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-radius and return CSS
 * @param {array} argv Command line arguments, used to detect prod or dev environment
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseRadius(argv, property, selector, values) {
  try {
    // Set up the main variables
    var settings = loadSettings(argv);
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] All, top-bottom, top
    var value1;
    var value1Err;
    if (values.length >= 1) {
      value1 = values[0];
      settings.radius.forEach(function (radiusSetting) {
        if (value1 == radiusSetting.key) {
          value1 = radiusSetting.radius;
        }
      });
      value1 = parseWhitespace(argv, property, value1);
      value1Err = '"'.red + value1.red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Value 2: [optional] right-left, right
    var value2;
    var value2Err;
    if (values.length >= 2) {
      value2 = values[1];
      settings.radius.forEach(function (radiusSetting) {
        if (value2 == radiusSetting.key) {
          value2 = radiusSetting.radius;
        }
      });
      value2 = parseWhitespace(argv, property, value2);
      value2Err = '"'.red + value2.toString().red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Value 3: [optional] bottom
    var value3;
    var value3Err;
    if (values.length >= 3) {
      value3 = values[2];
      settings.radius.forEach(function (radiusSetting) {
        if (value3 == radiusSetting.key) {
          value3 = radiusSetting.radius;
        }
      });
      value3 = parseWhitespace(argv, property, value3);
      value3Err = '"'.red + value3.toString().red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Value 4: [optional] left
    var value4;
    var value4Err;
    if (values.length >= 4) {
      value4 = values[3];
      settings.radius.forEach(function (radiusSetting) {
        if (value4 == radiusSetting.key) {
          value4 = radiusSetting.radius;
        }
      });
      value4 = parseWhitespace(argv, property, value4);
      value4Err = '"'.red + value4.toString().red + '"'.red + ' is an invalid option for ' + property[0].underline + '.';
    }
    // Check the array length for valid options
    if (values.length == 1) {
      if (value1 == null) {
        h2Error(value1Err);
        throw 'Error';
      } else {
        cssString = '{border-radius: ' + value1 + ';}';
      }
    } else if (values.length == 2) {
      if (value1 == null) {
        h2Error(value1Err);
        throw 'Error';
      } else if (value2 == null) {
        h2Error(value2Err);
        throw 'Error';
      } else {
        cssString = '{border-top-left-radius: ' + value1 + ';border-bottom-right-radius: ' + value1 + ';border-top-right-radius: ' + value2 + ';border-bottom-left-radius: ' + value2 + ';}';
      }
    } else if (values.length == 4) {
      if (value1 == null) {
        h2Error(value1Err);
        throw 'Error';
      } else if (value2 == null) {
        h2Error(value2Err);
        throw 'Error';
      } else if (value3 == null) {
        h2Error(value3Err);
        throw 'Error';
      } else if (value4 == null) {
        h2Error(value4Err);
        throw 'Error';
      } else {
        cssString = '{border-top-left-radius: ' + value1 + ';border-top-right-radius: ' + value2 + ';border-bottom-right-radius: ' + value3 + ';border-bottom-left-radius: ' + value4 + ';}';
      }
    } else {
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " accepts 1, 2, or 4 values, and you've specified " + values.length + '.';
      h2Error(errorMessage);
      throw 'Error';
    }
    // Assemble the CSS array
    var attributeCSS = [selector + cssString];
    // Return the array
    return attributeCSS;
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseRadius,
};
