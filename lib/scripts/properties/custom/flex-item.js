// Hydrogen: Flex item parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');

/**
 * Parse data-h2-flex-item and return CSS
 *
 * Flex item is a custom property that has to custom column spans
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_flex_item(instance, property, selector, values) {
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
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          columns_error_message
        );
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
            h2_error_detail(
              'syntax',
              instance.attribute,
              instance.files,
              columns_error_message
            );
            return null;
          }
        }
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "flex-item accepts 1 value (XofY | auto | content | fill), and you've specified " +
          values.length +
          '.'
      );
      return null;
    }
    // =========================================================================
    // Assemble the CSS array
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(single_selector + css_string);
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
  parse_flex_item,
};
