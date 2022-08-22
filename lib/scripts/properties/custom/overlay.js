// Hydrogen: Overlay parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');
var { parse_color_value } = require('../../parse-color');

/**
 * Parse data-h2-overlay and return CSS
 *
 * Overlay is a custom property that has to parse colors
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_overlay(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] color | gradient
    var background_color = null;
    var background_color_error_message = '';
    if (values.length >= 1) {
      background_color = parse_color_value(instance, property, values[0]);
    }
    // -------------------------------------------------------------------------
    // Value 2: [optional] opacity
    var opacity = null;
    var opacity_error_message = '';
    if (values.length >= 2) {
      opacity = values[1];
      opacity_error_message =
        'the "opacity" option for overlay only accepts decimals.';
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      // -----------------------------------------------------------------------
      // 1 value syntax
      if (background_color == null) {
        // Color parser provides an error for us
        return null;
      } else {
        if (background_color.type === 'solid') {
          css_string =
            '{background-color: ' +
            background_color.color +
            ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        } else if (background_color.type === 'gradient') {
          css_string =
            '{background-color: ' +
            background_color.fallback +
            ';background-image: ' +
            background_color.color +
            ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        }
      }
    } else if (values.length === 2) {
      // -----------------------------------------------------------------------
      // 2 value syntax
      if (background_color == null) {
        // Color parser provides an error for us
        return null;
      } else if (opacity == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          opacity_error_message
        );
        return null;
      } else {
        if (background_color.type == 'solid') {
          css_string =
            '{background-color: ' +
            background_color.color +
            ';opacity: ' +
            opacity +
            ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        } else if (background_color.type == 'gradient') {
          css_string =
            '{background-color: ' +
            background_color.fallback +
            ';background-image: ' +
            background_color.color +
            ';opacity: ' +
            opacity +
            ";content: ' ';display: block;height: 100%;position: absolute;top: 0;left: 0;width: 100%;}";
        }
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "overlay accepts 1 (color | gradient) or 2 (color | gradient, opacity) values, and you've specified " +
          values.length +
          '.'
      );
      return null;
    }
    // =========================================================================
    // Assemble the CSS array
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(
        single_selector + ':before' + css_string
      );
      attribute_css = attribute_css.concat(
        single_selector + '{position: relative;}'
      );
      attribute_css = attribute_css.concat(
        single_selector + ' > * {position: relative;}'
      );
    });
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
  parse_overlay,
};
