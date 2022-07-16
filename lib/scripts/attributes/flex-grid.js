// Hydrogen: Flex grid parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error, h2_error_detail } = require('../logs');
var { parseWhitespace } = require('../parse-whitespace');

/**
 * Parse data-h2-flex-grid and return CSS
 * @param {string} attribute The full attribute
 * @param {array} property The attribute's property
 * @param {string} selector The assembled CSS selector
 * @param {array} values The trimmed values passed to the attribute
 * @returns {array} Returns an array of CSS selectors and their contents
 */
function parseFlexGrid(attribute, property, selector, values) {
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
      padding = parseWhitespace(property, values[1]);
    }
    // -------------------------------------------------------------------------
    // Value 3: [required] gutter or column gutter
    var gutter;
    var gutter_error_message = '';
    if (values.length >= 3) {
      gutter = parseWhitespace(property, values[2]);
    }
    // -------------------------------------------------------------------------
    // Value 4: [optional] row gutter
    var row_gutter;
    var row_gutter_error_message = '';
    if (values.length >= 4) {
      row_gutter = parseWhitespace(property, values[3]);
    }
    // =========================================================================
    // Check the array length for valid options and assemble the CSS
    if (values.length === 3) {
      if (alignment == null) {
        h2_error_detail('syntax', attribute, null, alignment_error_message);
        return null;
      } else if (padding == null) {
        // Rather than using padding_error_message, use the default invalid whitespace syntax error
        h2_error_detail('syntax_invalid_whitespace', attribute, null);
        return null;
      } else if (gutter == null) {
        // Rather than using gutter_error_message, use the default invalid whitespace syntax error
        h2_error_detail('syntax_invalid_whitespace', attribute, null);
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
        attribute_css = [
          selector + css_string,
          selector +
            ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}',
          selector + '{pointer-events: none;}',
          selector + ' > * {pointer-events: auto;}',
        ];
        // =====================================================================
        // Return the array
        return attribute_css;
      }
    } else if (values.length === 4) {
      if (alignment == null) {
        h2_error_detail('syntax', attribute, null, alignment_error_message);
        return null;
      } else if (padding == null) {
        // Rather than using padding_error_message, use the default invalid whitespace syntax error
        h2_error_detail('syntax_invalid_whitespace', attribute, null);
        return null;
      } else if (gutter == null) {
        // Rather than using gutter_error_message, use the default invalid whitespace syntax error
        h2_error_detail('syntax_invalid_whitespace', attribute, null);
        return null;
      } else if (row_gutter == null) {
        // Rather than using row_gutter_error_message, use the default invalid whitespace syntax error
        h2_error_detail('syntax_invalid_whitespace', attribute, null);
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
        attribute_css = [
          selector + css_string,
          selector +
            ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}',
          selector + '{pointer-events: none;}',
          selector + ' > * {pointer-events: auto;}',
        ];
        // =====================================================================
        // Return the array
        return attribute_css;
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        attribute,
        null,
        "flex-grid accepts 3 (alignment, grid_padding, gutter) or 4 (alignment, grid_padding, column_gutter, row_gutter) options and you've specified " +
          values.length +
          '.'
      );
      return null;
    }
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error(error, attribute);
    return null;
  }
}

module.exports = {
  parseFlexGrid,
};
