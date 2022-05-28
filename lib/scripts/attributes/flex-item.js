// Hydrogen: Flex item parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');

/**
 * Parse data-h2-flex-item and return CSS
 * @param {array} argv Command line arguments, used to detect prod or dev environment
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseFlexItem(argv, property, selector, values) {
  try {
    // Set up the main variables
    var attributeCSS = [];
    var cssString = '';
    // Check the value array length
    // Value 1: [required] XofY, auto, content|initial, fill|1
    var flexState = values[0];
    var flexStateErr = '"'.red + flexState.red + '"'.red + ' is an invalid option for ' + property[0].underline + '. Please specify XofY for columns, auto, initial, or fill.';
    // Check the array length for valid options
    if (values.length == 1) {
      // Check to see if the value is a predefined key
      if (flexState == 'auto') {
        cssString = '{flex: auto;max-width: 100%;min-width: 0;}';
      } else if (flexState == 'content' || flexState == 'initial') {
        cssString = '{flex: initial;max-width: 100%;min-width: 0;}';
      } else if (flexState == 'fill' || flexState == '1') {
        cssString = '{flex: 1;max-width: 100%;min-width: 0;}';
      } else {
        // Since the value wasn't a key, it must be an XofY
        var xColumn = flexState.match(/^[0-9]+/g);
        var yColumn = flexState.match(/(?<=of)[0-9]+/g);
        if (xColumn != null && yColumn != null) {
          cssString = '{flex: 0 0 calc((' + xColumn + ' / ' + yColumn + ' * 100%) - var(--h2-column-gap));min-width: 0;}';
        } else {
          h2Error(flexStateErr);
          throw 'Error';
        }
      }
    } else {
      // There were multiple options passed, so log and throw an error
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " only accepts 1 value, and you've specified " + values.length + '.';
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
  parseFlexItem,
};
