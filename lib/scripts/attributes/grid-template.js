// Hydrogen: Grid template column and row parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');
var { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-grid-templates-columns and data-h2-grid-template-rows attributes and return CSS
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseGridTemplate(property, selector, values) {
  try {
    // Grid templates only accept 1 value, so check for the array length
    if (values.length == 1) {
      // There was only one option passed
      var template = values[0];
      // Break the value into individual items so that we can check for multipliers and replace them with the correct value
      var singleTemplates = [];
      if (template.indexOf(' ') > -1) {
        singleTemplates = template.split(/ +/);
        for (const newTemplate of singleTemplates) {
          newTemplate.trim();
        }
      } else {
        singleTemplates = singleTemplates.concat(template);
      }
      // Loop through the options and check for multipliers
      for (const [i, el] of singleTemplates.entries()) {
        var parsedItem = parseWhitespace(property, el);
        singleTemplates[i] = parsedItem;
      }
      var finalTemplate = singleTemplates.join(' ');
      // Build the final CSS string
      var cssString = '{' + property[0] + ': ' + finalTemplate + ';}';
      // Assemble the CSS array
      var attributeCSS = [selector + cssString];
      // Return the array
      return attributeCSS;
    } else {
      // There were multiple options passed, so log and throw an error
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + " only accepts 1 value, and you've specified " + parsedValues.length + '.';
      h2Error(errorMessage);
      throw 'Error';
    }
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseGridTemplate,
};
