// Hydrogen: Flex grid parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');
var { parse_whitespace_value } = require('../../parse-whitespace');

/**
 * Parse data-h2-flex-grid and return CSS
 *
 * Flex grid is a custom property that has to parse size tokens
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_flex_grid(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] flex alignment
    var alignment;
    var alignment_error_message =
      'flex-grid accepts standard CSS align-items values as an "alignment" option.';
    if (values.length >= 1) {
      alignment = values[0];
      if (alignment === 'top') {
        alignment = 'flex-start';
      } else if (alignment === 'middle') {
        alignment = 'center';
      } else if (alignment === 'bottom') {
        alignment = 'flex-end';
      }
    }
    // -------------------------------------------------------------------------
    // Value 2: [required] wrapper padding
    var padding;
    var padding_error_message = '';
    if (values.length >= 2) {
      padding = parse_whitespace_value(instance, property, values[1]);
    }
    // -------------------------------------------------------------------------
    // Value 3: [required] gutter or column gutter
    var gutter;
    var gutter_error_message = '';
    if (values.length >= 3) {
      gutter = parse_whitespace_value(instance, property, values[2]);
    }
    // -------------------------------------------------------------------------
    // Value 4: [optional] row gutter
    var row_gutter;
    var row_gutter_error_message = '';
    if (values.length >= 4) {
      row_gutter = parse_whitespace_value(instance, property, values[3]);
    }
    // =========================================================================
    // Check the array length for valid options and assemble the CSS
    if (values.length === 3) {
      if (alignment == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          alignment_error_message
        );
        return null;
      } else if (padding == null) {
        // Whitespace parser provides an error for us
        return null;
      } else if (gutter == null) {
        // Whitespace parser provides an error for us
        return null;
      } else {
        css_string =
          '{align-items: ' +
          alignment +
          ';display: inline-flex;flex-wrap: wrap;--h2-column-gap: ' +
          gutter +
          ';--h2-row-gap: ' +
          gutter +
          ';margin:calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap));width:calc(100% + var(--h2-column-gap));padding: ' +
          padding +
          ';}';
        // =====================================================================
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(single_selector + css_string);
          attribute_css = attribute_css.concat(
            single_selector +
              ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}'
          );
          attribute_css = attribute_css.concat(
            single_selector + '{pointer-events: none;}'
          );
          attribute_css = attribute_css.concat(
            single_selector + ' > * {pointer-events: auto;}'
          );
        });
        // =====================================================================
        // Return the array
        return attribute_css;
      }
    } else if (values.length === 4) {
      if (alignment == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          alignment_error_message
        );
        return null;
      } else if (padding == null) {
        // Whitespace parser provides an error for us
        return null;
      } else if (gutter == null) {
        // Whitespace parser provides an error for us
        return null;
      } else if (row_gutter == null) {
        // Whitespace parser provides an error for us
        return null;
      } else {
        css_string =
          '{align-items: ' +
          alignment +
          ';display: inline-flex;flex-wrap: wrap;--h2-column-gap: ' +
          gutter +
          ';--h2-row-gap: ' +
          row_gutter +
          ';margin:calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap));width:calc(100% + var(--h2-column-gap));padding: ' +
          padding +
          ';}';
        // =====================================================================
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(single_selector + css_string);
          attribute_css = attribute_css.concat(
            single_selector +
              ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}'
          );
          attribute_css = attribute_css.concat(
            single_selector + '{pointer-events: none;}'
          );
          attribute_css = attribute_css.concat(
            single_selector + ' > * {pointer-events: auto;}'
          );
        });
        // =====================================================================
        // Return the array
        return attribute_css;
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "flex-grid accepts 3 (alignment, grid_padding, gutter) or 4 (alignment, grid_padding, column_gutter, row_gutter) options and you've specified " +
          values.length +
          '.'
      );
      return null;
    }
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error_detail('generic', instance.attribute, instance.files, error);
    return null;
  }
}

module.exports = {
  parse_flex_grid,
};
