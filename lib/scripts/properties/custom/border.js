// Hydrogen: Border parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var {
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
} = require('../log-errors');
var { parse_color_value } = require('../../parse-color');
var { parse_whitespace_value } = require('../../parse-whitespace');

/**
 * Parse data-h2-border and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {string} media_query the attribute's media query, used for specificity overrides
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_border(
  settings,
  instance,
  property,
  media_query,
  selector,
  values
) {
  try {
    // Create working variables ================================================
    var attribute_css = [];
    var css_string = '';
    // Define possible options for the attribute ===============================
    // Value 1 -----------------------------------------------------------------
    var value_1 = null;
    if (values.length >= 1) {
      value_1 = values[0];
      if (values.length === 1) {
        if (value_1 != 'none') {
          value_1 = null;
        }
      } else if (values.length === 2 || values.length === 4) {
        if (
          value_1 != 'all' &&
          value_1 != 'top-bottom' &&
          value_1 != 'right-left' &&
          value_1 != 'top' &&
          value_1 != 'right' &&
          value_1 != 'bottom' &&
          value_1 != 'left'
        ) {
          value_1 = null;
        }
      }
    }
    // Value 2 -----------------------------------------------------------------
    var value_2 = null;
    if (values.length >= 2) {
      value_2 = values[1];
      if (values.length === 4) {
        value_2 = parse_whitespace_value(instance, property, values[1]);
      }
    }
    // Value 3 -----------------------------------------------------------------
    var value_3 = null;
    if (values.length >= 3) {
      value_3 = values[2];
    }
    // Value 4 -----------------------------------------------------------------
    var value_4 = null;
    if (values.length >= 4) {
      value_4 = parse_color_value(settings, instance, property, values[3]);
      if (value_4 != null && value_4.type === 'gradient') {
        get_syntax_errors(property, instance, values, 3);
        return null;
      }
    }
    // Assemble side selectors =================================================
    var side_selectors = [
      {
        key: 'all',
        selectors: [],
      },
      {
        key: 'top-bottom',
        selectors: ['none', 'all'],
      },
      {
        key: 'right-left',
        selectors: ['none', 'all'],
      },
      {
        key: 'top',
        selectors: ['none', 'all', 'top-bottom'],
      },
      {
        key: 'right',
        selectors: ['none', 'all', 'right-left'],
      },
      {
        key: 'bottom',
        selectors: ['none', 'all', 'top-bottom'],
      },
      {
        key: 'left',
        selectors: ['none', 'all', 'right-left'],
      },
    ];
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 1) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else {
        // The border should be removed from all 4 sides
        css_string = '{border: ' + value_1 + ';}';
        // Assemble the CSS array
        selector.forEach(function (single_selector, single_selector_index) {
          attribute_css = attribute_css.concat(single_selector + css_string);
        });
      }
    } else if (values.length === 2) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(property, instance, values, 1);
        return null;
      } else {
        if (value_1 === 'all') {
          css_string = '{border: ' + value_2 + ';}';
        } else if (value_1 === 'top-bottom') {
          css_string =
            '{border-top: ' + value_2 + ';border-bottom: ' + value_2 + ';}';
        } else if (value_1 === 'right-left') {
          css_string =
            '{border-left: ' + value_2 + ';border-right: ' + value_2 + ';}';
        } else {
          css_string = '{border-' + value_1 + ': ' + value_2 + ';}';
        }
        side_selectors.forEach(function (s, s_index) {
          if (s.key === value_1) {
            selector.forEach(function (single_selector, single_selector_index) {
              s.selectors.forEach(function (t, t_index) {
                attribute_css = attribute_css.concat(
                  '[data-h2-border*="' +
                    media_query +
                    '(' +
                    t +
                    '"]' +
                    single_selector +
                    ','
                );
              });
              attribute_css = attribute_css.concat(
                single_selector + css_string
              );
            });
          }
        });
      }
    } else if (values.length === 4) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(property, instance, values, 1);
        return null;
      } else if (value_3 == null || value_3 === 'null') {
        get_syntax_errors(property, instance, values, 2);
        return null;
      } else if (value_4 == null || value_4 === 'null') {
        get_syntax_errors(property, instance, values, 3);
        return null;
      } else {
        if (value_1 === 'all') {
          css_string =
            '{border: ' + value_2 + ' ' + value_3 + ' ' + value_4.color + ';}';
        } else if (value_1 === 'top-bottom') {
          css_string =
            '{border-top: ' +
            value_2 +
            ' ' +
            value_3 +
            ' ' +
            value_4.color +
            ';border-bottom: ' +
            value_2 +
            ' ' +
            value_3 +
            ' ' +
            value_4.color +
            ';}';
        } else if (value_1 === 'right-left') {
          css_string =
            '{border-right: ' +
            value_2 +
            ' ' +
            value_3 +
            ' ' +
            value_4.color +
            ';border-left: ' +
            value_2 +
            ' ' +
            value_3 +
            ' ' +
            value_4.color +
            ';}';
        } else {
          css_string =
            '{border-' +
            value_1 +
            ': ' +
            value_2 +
            ' ' +
            value_3 +
            ' ' +
            value_4.color +
            ';}';
        }
        side_selectors.forEach(function (s, s_index) {
          if (s.key === value_1) {
            selector.forEach(function (single_selector, single_selector_index) {
              s.selectors.forEach(function (t, t_index) {
                attribute_css = attribute_css.concat(
                  '[data-h2-border*="' +
                    media_query +
                    '(' +
                    t +
                    '"]' +
                    single_selector +
                    ','
                );
              });
              attribute_css = attribute_css.concat(
                single_selector + css_string
              );
            });
          }
        });
      }
    } else {
      // An invalid number of options was passed
      get_option_count_errors(property, instance, values);
      return null;
    }
    // Return the array
    return attribute_css;
  } catch (error) {
    // Catch any errors ========================================================
    property_error_catch(property, instance, error);
    return null;
  }
}

module.exports = {
  parse_border,
};
