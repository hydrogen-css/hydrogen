// Hydrogen: Container parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_load_settings } = require('../load-settings');
var { h2_error, h2_error_detail } = require('../logs');
const { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-container and return CSS
 * @param {string} attribute The full attribute
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseContainer(attribute, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var settings = h2_load_settings();
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] alignment
    var alignment = null;
    var alignment_error_message =
      'container accepts "center", "left", and "right" as an "alignment" option.';
    var alignment_css = '';
    if (values.length >= 1) {
      // Set the alignment as the value for now
      alignment = values[0];
      if (alignment === 'center' || alignment === 'middle') {
        // Check to see if the alignment value matches any reserved keys
        alignment_css = 'margin-right: auto;margin-left: auto;';
      } else if (alignment === 'left') {
        alignment_css = 'margin-right: auto;margin-left: 0;';
      } else if (alignment === 'right') {
        alignment_css = 'margin-right: 0;margin-left: auto;';
      } else {
        // Because it doesn't match any keys, its invalid.
        alignment = null;
      }
    }
    // -------------------------------------------------------------------------
    // Value 2: [required] container key or max_width
    var max_width = null;
    var max_width_error_message =
      'container accepts container keys or CSS unit values as a "max_width" value.';
    if (values.length >= 2) {
      // Set the container as the value for now
      max_width = values[1];
      // Loop through the user's container settings
      settings.containers.forEach(function (containerSetting) {
        // Check for a matching container key
        if (max_width === containerSetting.key) {
          // Set the container as the setting's max_width value
          max_width = containerSetting.max_width;
        }
      });
      // Check to see if the container matched a key or not by comparing it to its original value
      if (max_width === values[1]) {
        // It didn't match any settings, so assume it's a CSS value
        max_width = parseWhitespace(property, values[1]);
        // Disable the error message as it will use a generic whitespace one instead.
        max_width_error_message = null;
      }
    }
    // -------------------------------------------------------------------------
    // Value 3: [optional] left-right padding
    var padding = null;
    var padding_error_message = '';
    if (values.length >= 3) {
      padding = parseWhitespace(property, values[2]);
    }
    // =========================================================================
    // Check the array length for valid options and assemble the CSS
    if (values.length === 2) {
      // -----------------------------------------------------------------------
      // 2 value syntax
      if (alignment == null) {
        h2_error_detail('syntax', attribute, null, alignment_error_message);
        return null;
      } else if (max_width == null) {
        if (max_width_error_message == null) {
          h2_error_detail('syntax_invalid_whitespace', attribute, null);
        } else {
          h2_error_detail('syntax', attribute, null, max_width_error_message);
        }
        return null;
      } else {
        css_string =
          '{' + alignment_css + 'max-width: ' + max_width + ';width: 100%;}';
      }
    } else if (values.length === 3) {
      // -----------------------------------------------------------------------
      // 3 value syntax
      if (alignment == null) {
        h2_error_detail('syntax', attribute, null, alignment_error_message);
        return null;
      } else if (max_width == null) {
        if (max_width_error_message == null) {
          h2_error_detail('syntax_invalid_whitespace', attribute, null);
        } else {
          h2_error_detail('syntax', attribute, null, max_width_error_message);
        }
        return null;
      } else if (padding == null) {
        h2_error_detail('syntax_invalid_whitespace', attribute, null);
        return null;
      } else {
        css_string =
          '{' +
          alignment_css +
          'max-width: calc(' +
          max_width +
          ' + (' +
          padding +
          ' * 2));padding-right:' +
          padding +
          ';padding-left:' +
          padding +
          ';width: 100%;}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        attribute,
        null,
        "container accepts 2 (alignment, max_width) or 3 (alignment, max_width, padding) options and you've specified " +
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
    h2_error(error, attribute);
    return null;
  }
}

module.exports = {
  parseContainer,
};
