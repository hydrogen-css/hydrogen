// Hydrogen: Transform parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail } = require('../../logs');
var { parse_whitespace_value } = require('../../parse-whitespace');

/**
 * Parse data-h2-transform and return CSS
 *
 * Transform is a custom property that has to parse whitespace values
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @param {string} error_message the custom error message for this property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_transform(instance, property, selector, values) {
  try {
    // Create initial variables ================================================
    var attribute_css = [];
    var css_string = '';
    // Define possible options =================================================
    // Transform accepts a single option, but it can also parse whitespace multipliers
    // Value 1 -----------------------------------------------------------------
    // "transformation" - this value is required.
    var transformation = null;
    var transformation_error_message = '';
    if (values.length >= 1) {
      // Set the value to be an exact match to start
      transformation = values[0];
      // Set the default error
      transformation_error_message =
        'the "transformation" option only accepts CSS transform values. These values do allow you to use Hydrogen multipliers as units of space.';
      // Check for whitespace multipliers ......................................
      // Because transforms generally rely on consistent values that match spacing of surrounding elements, it's important that transforms support multipliers despite them only accepting a single CSS string
      var multipliers = transformation.match(/-?x[0-9]+/g); // grabs matching multipliers
      var multiplier_pairs = []; // sets up an array to work with
      var failed = false; // sets up a check to fail the attribute if a multiplier is returned incorrectly
      if (multipliers != null) {
        // Multipliers were found, so loop through the matches and parse them
        multipliers.forEach(function (multiplier, multiplier_index) {
          var multiplier_data = {
            initial: multiplier,
            converted: parse_whitespace_value(instance, property, multiplier),
          };
          // If the parsed multiplier was valid, add it to the pairs array
          if (multiplier_data.converted != null) {
            multiplier_pairs = multiplier_pairs.concat(multiplier_data);
          } else {
            failed = true;
          }
        });
      }
      // Check if the parsing passed, and if it did, replace the multipliers in the string with their parsed values
      if (failed === false) {
        multiplier_pairs.forEach(function (pair, pair_index) {
          transformation = transformation.replace(pair.initial, pair.converted);
        });
      } else {
        // The whitespace parser would have provided a console error already.
        return null;
      }
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 1) {
      if (transformation == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          transformation_error_message
        );
        return null;
      } else {
        css_string = '{' + property + ': ' + transformation + ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "transform accepts 1 value (transformation), and you've specified " +
          values.length +
          '.'
      );
      return null;
    }
    // Assemble the CSS array ==================================================
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(single_selector + css_string);
    });
    // Return the array
    return attribute_css;
  } catch (error) {
    // Log any errors that weren't accounted for ===============================
    h2_error_detail('generic', instance.attribute, instance.files, error);
    // Return null
    return null;
  }
}

module.exports = {
  parse_transform,
};
