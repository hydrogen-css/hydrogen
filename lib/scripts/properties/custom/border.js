// Hydrogen: Border parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');
var { parse_color_value } = require('../../parse-color');
var { parse_whitespace_value } = require('../../parse-whitespace');

/**
 * Parse data-h2-border and return CSS
 *
 * Border is a custom property that has to parse colors
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} media_query the attribute's media query, used for specificity overrides
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_border(instance, property, media_query, selector, values) {
  try {
    //
    // Set up the main variables ===============================================
    //
    var attribute_css = [];
    var css_string = '';
    //
    // Define common errors ====================================================
    //
    var side_error_message =
      'border accepts the following for its "side" option: "all", "top-bottom", "right-left", "top", "right", "bottom", and "left".';
    // Border accepts 1, 2, or 4 options, so check for the array length
    if (values.length == 1) {
      // The user has only specified a single value, so it must be none
      var none = values[0];
      if (none != 'none') {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          'if using a single option for border, you must use "none".'
        );
        return null;
      } else {
        // The border should be removed from all 4 sides
        css_string = '{border: ' + none + ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      }
    } else if (values.length == 2) {
      // The user has specified a side and a CSS string to be applied to it
      var sides = values[0];
      var css = values[1];
      if (sides == 'all') {
        // The border should be applied to all 4 sides
        css_string = '{border: ' + css + ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'top-bottom' || sides == 'bottom-top') {
        // The border should be applied to top and bottom
        css_string = '{border-top: ' + css + ';border-bottom: ' + css + ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'right-left' || sides == 'left-right') {
        // The border should be applied to right and left
        css_string = '{border-left: ' + css + ';border-right: ' + css + ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'top') {
        // The border should be applied to the top
        css_string = '{border-top: ' + css + ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(top-bottom"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(bottom-top"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'right') {
        // The border should be applied to the right
        css_string = '{border-right: ' + css + ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(right-left"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(left-right"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'bottom') {
        // The border should be applied to the bottom
        css_string = '{border-bottom: ' + css + ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(top-bottom"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(bottom-top"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'left') {
        // The border should be applied to the left
        css_string = '{border-left: ' + css + ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(right-left"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(left-right"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else {
        // They've passed an invalid side option, so log and throw an error
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          side_error_message
        );
        return null;
      }
    } else if (values.length == 4) {
      // The user has specified a side, width, style, and color
      var sides = values[0];
      var borderStyle = values[2];
      // Parse the width to check for Hydrogen multiplier values
      var borderWidth = parse_whitespace_value(instance, property, values[1]);
      if (borderWidth == null) {
        // Whitespace parser provides an error for us
        return null;
      }
      // Parse the width to check for Hydrogen multiplier values
      var borderColor = parse_color_value(instance, property, values[3]);
      if (borderColor == null) {
        // Color parser provides an error for us
        return null;
      }
      // Check to see if the color passed is a gradient key, because they aren't supported in borders
      if (borderColor.type == 'gradient') {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          'gradients are not supported inside the border property.'
        );
        return null;
      }
      // Both the width and color are valid, so process the rest of the options
      if (sides == 'all') {
        // The border should be applied to all 4 sides
        css_string =
          '{border: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'top-bottom' || sides == 'bottom-top') {
        // The border should be applied to top and bottom
        css_string =
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
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'right-left' || sides == 'left-right') {
        // The border should be applied to right and left
        css_string =
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
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'top') {
        // The border should be applied to the top
        css_string =
          '{border-top: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(top-bottom"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(bottom-top"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'right') {
        // The border should be applied to the right
        css_string =
          '{border-right: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(right-left"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(left-right"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'bottom') {
        // The border should be applied to the bottom
        css_string =
          '{border-bottom: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(top-bottom"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(bottom-top"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else if (sides == 'left') {
        // The border should be applied to the left
        css_string =
          '{border-left: ' +
          borderWidth +
          ' ' +
          borderStyle +
          ' ' +
          borderColor.color +
          ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(all"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(right-left"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(
            '[data-h2-border*="' +
              media_query +
              '(left-right"]' +
              single_selector +
              ','
          );
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      } else {
        // They've passed an invalid side option, so log and throw an error
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          side_error_message
        );
        return null;
      }
    } else {
      // There were multiple options passed, so log and throw an error
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        'border accepts 1 ("none"), 4(side, width, style, color), or 2(side, CSS) values, and you\'ve specified ' +
          values.length +
          '.'
      );
      return null;
    }
    // =========================================================================
    // Return the array
    return attribute_css;
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error_detail('generic', instance.attribute, instance.files, error);
    return null;
  }
}

module.exports = {
  parse_border,
};
