// Hydrogen: Transition parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('../load-settings');
var { h2Error } = require('../logs');

/**
 * Parse data-h2-transition and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseTransition(property, selector, values) {
  try {
    // Set up the main variables
    var settings = loadSettings();
    var attributeCSS = [];
    var cssString = '';
    // Define possible values for the attribute
    // Value 1: [required] property
    // Note that in order to apply transitions to multiple properties on the same element, you can just use another query
    var value1;
    var value1Err;
    if (values.length >= 1) {
      value1 = values[0];
      value1Err = '"'.red + value1.red + '"'.red + ' is an invalid property option for ' + property[0].underline + '.';
    }
    // Value 2: [required] duration
    var value2;
    var value2Err;
    if (values.length >= 2) {
      value2 = values[1];
      if (settings.transitions != null && settings.transitions.durations != null) {
        settings.transitions.durations.forEach(function (durationSetting) {
          if (value2 == durationSetting.key) {
            value2 = durationSetting.duration;
          }
        });
      }
      value2Err = '"'.red + value2.toString().red + '"'.red + ' is an invalid duration option for ' + property[0].underline + '.';
    }
    // Value 3: [optional] function
    var value3;
    var value3Err;
    if (values.length >= 3) {
      value3 = values[2];
      if (settings.transitions != null && settings.transitions.functions != null) {
        settings.transitions.functions.forEach(function (functionSetting) {
          if (value3 == functionSetting.key) {
            value3 = functionSetting.function;
          }
        });
      }
      value3Err = '"'.red + value3.toString().red + '"'.red + ' is an invalid function option for ' + property[0].underline + '.';
    }
    // Value 4: [optional] delay
    var value4;
    var value4Err;
    if (values.length >= 4) {
      value4 = values[3];
      if (settings.transitions != null && settings.transitions.delays != null) {
        settings.transitions.delays.forEach(function (delaySetting) {
          if (value4 == delaySetting.key) {
            value4 = delaySetting.delay;
          }
        });
      }
      value4Err = '"'.red + value4.toString().red + '"'.red + ' is an invalid delay option for ' + property[0].underline + '.';
    }
    // Check the array length for valid options
    if (values.length == 2) {
      if (value1 == null) {
        h2Error(value1Err);
        throw 'Error';
      } else if (value2 == null) {
        h2Error(value2Err);
        throw 'Error';
      } else {
        cssString = '{transition: ' + value1 + ' ' + value2 + ';}';
      }
    } else if (values.length == 3) {
      if (value1 == null) {
        h2Error(value1Err);
        throw 'Error';
      } else if (value2 == null) {
        h2Error(value2Err);
        throw 'Error';
      } else if (value3 == null) {
        h2Error(value3Err);
        throw 'Error';
      } else {
        cssString = '{transition: ' + value1 + ' ' + value2 + ' ' + value3 + ';}';
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
        cssString = '{transition: ' + value1 + ' ' + value2 + ' ' + value3 + ' ' + value4 + ';}';
      }
    } else {
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " accepts 2, 3, or 4 values, and you've specified " + values.length + '.';
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
  parseTransition,
};
