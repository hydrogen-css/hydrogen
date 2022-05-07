// Hydrogen: Border parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2Error } = require('../logs');
var { parseColor } = require('../parse-color');
var { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-border and return CSS
 * @param {array} argv Command line arguments, used to detect prod or dev environment
 * @param {array} property The attribute's property
 * @param {string} mediaQuery The attribute's media query
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseBorder(argv, property, mediaQuery, selector, values) {
  try {
    // Border accepts 2 or 4 options, so check for the array length
    if (values.length == 2) {
      // The user has specified a side and a CSS string to be applied to it
      var sides = values[0];
      var css = values[1];
      if (sides == 'all') {
        // The border should be applied to all 4 sides
        var cssString = '{border: ' + css + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'top-bottom' || sides == 'bottom-top') {
        // The border should be applied to top and bottom
        var cssString = '{border-top: ' + css + ';border-bottom: ' + css + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'right-left' || sides == 'left-right') {
        // The border should be applied to right and left
        var cssString = '{border-left: ' + css + ';border-right: ' + css + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'top') {
        // The border should be applied to the top
        var cssString = '{border-top: ' + css + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'right') {
        // The border should be applied to the right
        var cssString = '{border-right: ' + css + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(right-left"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(left-right"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'bottom') {
        // The border should be applied to the bottom
        var cssString = '{border-bottom: ' + css + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'left') {
        // The border should be applied to the left
        var cssString = '{border-left: ' + css + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(right-left"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(left-right"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else {
        // They've passed an invalid side option, so log and throw an error
        var errorMessage = '"'.red + sides.red + '"'.red + ' is not a valid side option for ' + property[0].underline + '. Valid options include "all", "top-bottom", "right-left", "top", "right", "bottom", and "left".'
        h2Error(errorMessage);
        throw 'Error';
      }
    } else if (values.length == 4) {
      // The user has specified a side, width, style, and color
      var sides = values[0];
      var borderStyle = values[2];
      // Parse the width to check for Hydrogen multiplier values
      var borderWidth = parseWhitespace(argv, property, values[1]);
      if (borderWidth == null) {
        // The width was invalid, so log and throw an error
        var errorMessage = '"'.red + values[1].red + '"'.red + ' is an invalid width for ' + property[0].underline + '.';
        h2Error(errorMessage);
        throw 'Error';
      }
      // Parse the width to check for Hydrogen multiplier values
      var borderColor = parseColor(argv, property, values[3]);
      if (borderColor == null) {
        // The width was invalid, so log and throw an error
        var errorMessage = '"'.red + values[3].red + '"'.red + ' is an invalid color for ' + property[0].underline + '.'
        h2Error(errorMessage);
        throw 'Error';
      }
      // Check to see if the color passed is a gradient key, because they aren't supported in borders
      if (borderColor.type == 'gradient') {
        var errorMessage = 'Gradients'.red + ' are not supported by ' + property[0].underline + '.'
        h2Error(errorMessage);
        throw 'Error';
      }
      // Both the width and color are valid, so process the rest of the options
      if (sides == 'all') {
        // The border should be applied to all 4 sides
        var cssString = '{border: ' + borderWidth + ' ' + borderStyle + ' ' + borderColor.color + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'top-bottom' || sides == 'bottom-top') {
        // The border should be applied to top and bottom
        var cssString = '{border-top: ' + borderWidth + ' ' + borderStyle + ' ' + borderColor.color + ';border-bottom: ' + borderWidth + ' ' + borderStyle + ' ' + borderColor.color + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'right-left' || sides == 'left-right') {
        // The border should be applied to right and left
        var cssString = '{border-right: ' + borderWidth + ' ' + borderStyle + ' ' + borderColor.color + ';border-left: ' + borderWidth + ' ' + borderStyle + ' ' + borderColor.color + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'top') {
        // The border should be applied to the top
        var cssString = '{border-top: ' + borderWidth + ' ' + borderStyle + ' ' + borderColor.color + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'right') {
        // The border should be applied to the right
        var cssString = '{border-right: ' + borderWidth + ' ' + borderStyle + ' ' + borderColor.color + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(right-left"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(left-right"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'bottom') {
        // The border should be applied to the bottom
        var cssString = '{border-bottom: ' + borderWidth + ' ' + borderStyle + ' ' + borderColor.color + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else if (sides == 'left') {
        // The border should be applied to the left
        var cssString = '{border-left: ' + borderWidth + ' ' + borderStyle + ' ' + borderColor.color + ';transition: all 0.2s ease;}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(right-left"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(left-right"]' + selector + ',',
          selector + cssString
        ]
        // Return the array
        return borderCSS;
      } else {
        // They've passed an invalid side option, so log and throw an error
        var errorMessage = '"'.red + sides.red + '"'.red + ' is not a valid side option for ' + property[0].underline + '. Valid options include "all", "top-bottom", "right-left", "top", "right", "bottom", and "left".'
        h2Error(errorMessage);
        throw 'Error';
      }
    } else {
      // There were multiple options passed, so log and throw an error
      var errorMessage = '"data-h2-'.red + property[0].red + '"'.red + ' only accepts 2 or 4 values, and you\'ve specified ' + values.length + '.'
      h2Error(errorMessage);
      throw 'Error';
    }
  } catch (err) {
    return null;
  }
}

module.exports = {
  parseBorder
}