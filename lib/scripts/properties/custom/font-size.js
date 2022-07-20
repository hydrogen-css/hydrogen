// Hydrogen: Font size parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');

/**
 * Parse data-h2-font-size and return CSS
 *
 * Font size is a custom property that has to parse an optional second option
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_font_size(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] heading | css unit
    var font_size = null;
    var font_size_unit = '';
    var font_size_error_message = '';
    if (values.length >= 1) {
      font_size = values[0];
      font_size_error_message =
        'the "size" option for font-size only accepts "h1" through "h6", "copy", "caption", or a CSS unit.';
    }
    // -------------------------------------------------------------------------
    // Value 1: [optional] line height
    var line_height = null;
    var line_height_error_message = '';
    if (values.length >= 2) {
      line_height = values[1];
      line_height_error_message =
        'the "line_height" option for font-size only accepts a CSS line-height value.';
    }
    // =========================================================================
    // Set up related line height values
    if (font_size == null) {
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        font_size_error_message
      );
      return null;
    } else {
      if (font_size === 'h1') {
        font_size_unit = 'var(--h2-font-size-h1)';
        if (line_height == null) {
          line_height = 'var(--h2-line-height-h1)';
        }
      } else if (font_size === 'h2') {
        font_size_unit = 'var(--h2-font-size-h2)';
        if (line_height == null) {
          line_height = 'var(--h2-line-height-h2)';
        }
      } else if (font_size === 'h3') {
        font_size_unit = 'var(--h2-font-size-h3)';
        if (line_height == null) {
          line_height = 'var(--h2-line-height-h3)';
        }
      } else if (font_size === 'h4') {
        font_size_unit = 'var(--h2-font-size-h4)';
        if (line_height == null) {
          line_height = 'var(--h2-line-height-h4)';
        }
      } else if (font_size === 'h5') {
        font_size_unit = 'var(--h2-font-size-h5)';
        if (line_height == null) {
          line_height = 'var(--h2-line-height-h5)';
        }
      } else if (font_size === 'h6') {
        font_size_unit = 'var(--h2-font-size-h6)';
        if (line_height == null) {
          line_height = 'var(--h2-line-height-h6)';
        }
      } else if (
        font_size === 'base' ||
        font_size === 'paragraph' ||
        font_size === 'normal' ||
        font_size === 'copy'
      ) {
        font_size_unit = 'var(--h2-font-size-copy)';
        if (line_height == null) {
          line_height = 'var(--h2-line-height-copy)';
        }
      } else if (font_size === 'label' || font_size === 'caption') {
        font_size_unit = 'var(--h2-font-size-caption)';
        if (line_height == null) {
          line_height = 'var(--h2-line-height-caption)';
        }
      } else {
        // CSS units were used for font size
        font_size_unit = font_size;
        if (line_height == null) {
          line_height = 'var(--h2-line-height-copy)';
        }
      }
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      // -----------------------------------------------------------------------
      // 1 value syntax
      if (font_size == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          font_size_error_message
        );
        return null;
      } else {
        css_string =
          '{font-size: ' +
          font_size_unit +
          ';line-height: ' +
          line_height +
          ';}';
      }
    } else if (values.length === 2) {
      // -----------------------------------------------------------------------
      // 2 value syntax
      if (font_size == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          font_size_error_message
        );
        return null;
      } else if (line_height == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          line_height_error_message
        );
        return null;
      } else {
        css_string =
          '{font-size: ' +
          font_size_unit +
          ';line-height: ' +
          line_height +
          ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        font_size_error_message
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
  parse_font_size,
};
