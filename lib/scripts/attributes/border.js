// Hydrogen: Border parsing

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2_error, h2_error_detail } = require('../logs');
var { parseColor } = require('../parse-color');
var { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-border and return CSS
 * @param {string} attribute The full attribute
 * @param {array} property The attribute's property
 * @param {string} mediaQuery The attribute's media query
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseBorder(attribute, property, mediaQuery, selector, values) {
  try {
    var side_error_message =
      'border accepts the following for its "side" option: "all", "top-bottom", "right-left", "top", "right", "bottom", and "left".';
    // Border accepts 1, 2, or 4 options, so check for the array length
    if (values.length == 1) {
      // The user has only specified a single value, so it must be none
      var none = values[0];
      if (none != 'none') {
        h2_error_detail(
          'syntax',
          attribute,
          null,
          'if using a single option for border, you must use "none".'
        );
        return null;
      } else {
        // The border should be removed from all 4 sides
        var cssString = '{border: ' + none + ';}';
        // Assemble the CSS array
        var borderCSS = [selector + cssString];
        // Return the array
        return borderCSS;
      }
    } else if (values.length == 2) {
      // The user has specified a side and a CSS string to be applied to it
      var sides = values[0];
      var css = values[1];
      if (sides == 'all') {
        // The border should be applied to all 4 sides
        var cssString = '{border: ' + css + ';}';
        // Assemble the CSS array
        var borderCSS = [selector + cssString];
        // Return the array
        return borderCSS;
      } else if (sides == 'top-bottom' || sides == 'bottom-top') {
        // The border should be applied to top and bottom
        var cssString = '{border-top: ' + css + ';border-bottom: ' + css + ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else if (sides == 'right-left' || sides == 'left-right') {
        // The border should be applied to right and left
        var cssString = '{border-left: ' + css + ';border-right: ' + css + ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else if (sides == 'top') {
        // The border should be applied to the top
        var cssString = '{border-top: ' + css + ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else if (sides == 'right') {
        // The border should be applied to the right
        var cssString = '{border-right: ' + css + ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(right-left"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(left-right"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else if (sides == 'bottom') {
        // The border should be applied to the bottom
        var cssString = '{border-bottom: ' + css + ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else if (sides == 'left') {
        // The border should be applied to the left
        var cssString = '{border-left: ' + css + ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(right-left"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(left-right"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else {
        // They've passed an invalid side option, so log and throw an error
        h2_error_detail('syntax', attribute, null, side_error_message);
        return null;
      }
    } else if (values.length == 4) {
      // The user has specified a side, width, style, and color
      var sides = values[0];
      var borderStyle = values[2];
      // Parse the width to check for Hydrogen multiplier values
      var borderWidth = parseWhitespace(property, values[1]);
      if (borderWidth == null) {
        // The width was invalid, so log and throw an error
        h2_error_detail(
          'syntax',
          attribute,
          null,
          'border accepts Hydrogen multipliers (x2) or CSS unit values (1px, .5rem) for its "width" option.'
        );
        return null;
      }
      // Parse the width to check for Hydrogen multiplier values
      var borderColor = parseColor(property, values[3]);
      if (borderColor == null) {
        // The width was invalid, so log and throw an error
        h2_error_detail('syntax_invalid_color', attribute, null);
        return null;
      }
      // Check to see if the color passed is a gradient key, because they aren't supported in borders
      if (borderColor.type == 'gradient') {
        h2_error_detail(
          'syntax',
          attribute,
          null,
          'gradients are not supported inside the border property.'
        );
        return null;
      }
      // Both the width and color are valid, so process the rest of the options
      if (sides == 'all') {
        // The border should be applied to all 4 sides
        var cssString =
          '{border: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        var borderCSS = [selector + cssString];
        // Return the array
        return borderCSS;
      } else if (sides == 'top-bottom' || sides == 'bottom-top') {
        // The border should be applied to top and bottom
        var cssString =
          '{border-top: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';border-bottom: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else if (sides == 'right-left' || sides == 'left-right') {
        // The border should be applied to right and left
        var cssString =
          '{border-right: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';border-left: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else if (sides == 'top') {
        // The border should be applied to the top
        var cssString =
          '{border-top: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else if (sides == 'right') {
        // The border should be applied to the right
        var cssString =
          '{border-right: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(right-left"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(left-right"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else if (sides == 'bottom') {
        // The border should be applied to the bottom
        var cssString =
          '{border-bottom: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(top-bottom"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(bottom-top"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else if (sides == 'left') {
        // The border should be applied to the left
        var cssString =
          '{border-left: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        var borderCSS = [
          '[data-h2-border*="' + mediaQuery + '(all"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(right-left"]' + selector + ',',
          '[data-h2-border*="' + mediaQuery + '(left-right"]' + selector + ',',
          selector + cssString,
        ];
        // Return the array
        return borderCSS;
      } else {
        // They've passed an invalid side option, so log and throw an error
        h2_error_detail('syntax', attribute, null, side_error_message);
        return null;
      }
    } else {
      // There were multiple options passed, so log and throw an error
      h2_error_detail(
        'syntax',
        attribute,
        null,
        'border accepts 1 ("none"), 4(side, width, style, color), or 2(side, CSS) values, and you\'ve specified ' +
          values.length +
          '.'
      );
      return null;
    }
  } catch (error) {
    h2_error(error);
    return null;
  }
}

module.exports = {
  parseBorder,
};
