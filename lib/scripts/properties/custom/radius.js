// Hydrogen: Radius parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_load_settings } = require('../../load-settings');
var { h2_error_detail } = require('../../logs');
var { parse_whitespace_value } = require('../../parse-whitespace');

/**
 * Parse data-h2-radius and return CSS
 *
 * Radius is a custom property that has to parse configured settings
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_radius(instance, property, selector, values) {
  try {
    // Set up the main variables
    var settings = h2_load_settings();
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] all, top_left_bottom_right_radius, top_left_radius, top_left_radius
    var value1;
    var value1_error_message;
    if (values.length >= 1) {
      value1 = values[0];
      settings.radius.forEach(function (radiusSetting) {
        if (value1 == radiusSetting.key) {
          value1 = radiusSetting.radius;
        }
      });
      value1 = parse_whitespace_value(instance, property, value1);
      value1_error_message = 'radius options can only be CSS units.';
    }
    // -------------------------------------------------------------------------
    // Value 2: [optional] top_right_bottom_left_radius, top_right_bottom_left_radius, top_right_radius
    var value2;
    var value2_error_message;
    if (values.length >= 2) {
      value2 = values[1];
      settings.radius.forEach(function (radiusSetting) {
        if (value2 == radiusSetting.key) {
          value2 = radiusSetting.radius;
        }
      });
      value2 = parse_whitespace_value(instance, property, value2);
      value2_error_message = 'radius options can only be CSS units.';
    }
    // -------------------------------------------------------------------------
    // Value 3: [optional] bottom_right_radius, bottom_right_radius
    var value3;
    var value3_error_message;
    if (values.length >= 3) {
      value3 = values[2];
      settings.radius.forEach(function (radiusSetting) {
        if (value3 == radiusSetting.key) {
          value3 = radiusSetting.radius;
        }
      });
      value3 = parse_whitespace_value(instance, property, value3);
      value3_error_message = 'radius options can only be CSS units.';
    }
    // -------------------------------------------------------------------------
    // Value 4: [optional] bottom_left_radius
    var value4;
    var value4_error_message;
    if (values.length >= 4) {
      value4 = values[3];
      settings.radius.forEach(function (radiusSetting) {
        if (value4 == radiusSetting.key) {
          value4 = radiusSetting.radius;
        }
      });
      value4 = parse_whitespace_value(instance, property, value4);
      value4_error_message = 'radius options can only be CSS units.';
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      // -----------------------------------------------------------------------
      // 1 value syntax
      if (value1 == null) {
        // Whitespace parser provides an error for us
        return null;
      } else {
        css_string = '{border-radius: ' + value1 + ';}';
      }
    } else if (values.length === 2) {
      // -----------------------------------------------------------------------
      // 2 value syntax
      if (value1 == null || value2 == null) {
        // Whitespace parser provides an error for us
        return null;
      } else {
        css_string =
          '{border-top-left-radius: ' +
          value1 +
          ';border-bottom-right-radius: ' +
          value1 +
          ';border-top-right-radius: ' +
          value2 +
          ';border-bottom-left-radius: ' +
          value2 +
          ';}';
      }
    } else if (values.length === 3) {
      // -----------------------------------------------------------------------
      // 3 value syntax
      if (value1 == null || value2 == null || value3 == null) {
        // Whitespace parser provides an error for us
        return null;
      } else {
        css_string =
          '{border-top-left-radius: ' +
          value1 +
          ';border-top-right-radius: ' +
          value2 +
          ';border-bottom-right-radius: ' +
          value3 +
          ';border-bottom-left-radius: ' +
          value2 +
          ';}';
      }
    } else if (values.length === 4) {
      // -----------------------------------------------------------------------
      // 4 value syntax
      if (
        value1 == null ||
        value2 == null ||
        value3 == null ||
        value4 == null
      ) {
        // Whitespace parser provides an error for us
        return null;
      } else {
        css_string =
          '{border-top-left-radius: ' +
          value1 +
          ';border-top-right-radius: ' +
          value2 +
          ';border-bottom-right-radius: ' +
          value3 +
          ';border-bottom-left-radius: ' +
          value4 +
          ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "radius accepts 1 (radius), 2 (top_left_bottom_right_radius, top_right_bottom_left_radius), 3 (top_left_radius, top_right_bottom_left_radius, bottom_right_radius), or 4 (top_left_radius, top_right_radius, bottom_right_radius, bottom_left_radius) values, and you've specified " +
          values.length +
          '.'
      );
      return null;
    }
    // =========================================================================
    // Assemble the CSS array
    attribute_css = [selector + css_string];
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
  parse_radius,
};
