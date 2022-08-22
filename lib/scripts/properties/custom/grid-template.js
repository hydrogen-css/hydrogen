// Hydrogen: Grid template column and row parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');
var { parse_whitespace_value } = require('../../parse-whitespace');

/**
 * Parse data-h2-grid-templates-columns and data-h2-grid-template-rows attributes and return CSS
 *
 * Grid template is a custom property that has to parse size tokens
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_grid_template(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] CSS template
    var template = null;
    var template_error_message = '';
    if (values.length >= 1) {
      template = values[0];
      template_error_message =
        'the "template" option for ' +
        property +
        ' only accepts CSS ' +
        property +
        ' values.';
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 1) {
      // -----------------------------------------------------------------------
      // 1 value syntax
      var individual_template_items = [];
      // Break the value into individual items so that we can check for multipliers and replace them with the correct value
      if (template.indexOf(' ') > -1) {
        individual_template_items = template.split(/ +/);
        for (const new_template of individual_template_items) {
          new_template.trim();
        }
      } else {
        individual_template_items = individual_template_items.concat(template);
      }
      // Loop through the options and check for multipliers
      for (const [i, el] of individual_template_items.entries()) {
        var parsed_item = parse_whitespace_value(instance, property, el);
        individual_template_items[i] = parsed_item;
      }
      var final_template = individual_template_items.join(' ');
      // Build the final CSS string
      css_string = '{' + property + ': ' + final_template + ';}';
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        property +
          " accepts 1 value (template), and you've specified " +
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
  parse_grid_template,
};
