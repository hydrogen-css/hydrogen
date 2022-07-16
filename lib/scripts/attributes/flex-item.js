// Hydrogen: Flex item parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error, h2_error_detail } = require('../logs');

/**
 * Parse data-h2-flex-item and return CSS
 * @param {string} attribute The full attribute
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseFlexItem(attribute, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] XofY columns, content|initial, fill|1
    var columns = null;
    var columns_error_message =
      'flex-item accepts a column fraction in the format of "XofY", or values of "auto", "initial", or "fill" as options.';
    if (values.length >= 1) {
      columns = values[0];
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      if (columns == null) {
        h2_error_detail('syntax', attribute, null, columns_error_message);
        return null;
      } else {
        // Check to see if the value is a reserved key first
        if (columns === 'auto') {
          css_string = '{flex: auto;max-width: 100%;min-width: 0;}';
        } else if (columns === 'content' || columns === 'initial') {
          css_string = '{flex: initial;max-width: 100%;min-width: 0;}';
        } else if (columns === 'fill' || columns === '1') {
          css_string = '{flex: 1;max-width: 100%;min-width: 0;}';
        } else {
          // Since the value wasn't a key, it must be an XofY
          var x_column = columns.match(/^[0-9]+/g);
          var y_column = columns.match(/(?<=of)[0-9]+/g);
          if (x_column != null && y_column != null) {
            css_string =
              '{flex: 0 0 calc((' +
              x_column +
              ' / ' +
              y_column +
              ' * 100%) - var(--h2-column-gap));min-width: 0;}';
          } else {
            h2_error_detail('syntax', attribute, null, columns_error_message);
            return null;
          }
        }
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        attribute,
        null,
        "flex-item accepts 1 value (XofY | auto | content | fill), and you've specified " +
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
  parseFlexItem,
};
