// Hydrogen: Transition parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var {
  property_error_catch,
  get_syntax_errors,
  get_option_count_errors,
} = require('../log-errors');

/**
 * Parse data-h2-transition and return CSS
 * @param {object} settings the user's settings
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the attribute's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_transition(
  settings,
  prop_data,
  instance,
  property,
  selector,
  values
) {
  try {
    // Create working variables ================================================
    var attribute_css = [];
    var css_string = '';
    // Define possible options for the attribute ===============================
    // Value 1 -----------------------------------------------------------------
    // Note that in order to apply transitions to multiple properties on the same element, you can just use another query
    var value_1 = null;
    if (values.length >= 1) {
      value_1 = values[0];
    }
    // Value 2 -----------------------------------------------------------------
    var value_2 = null;
    if (values.length >= 2) {
      value_2 = values[1];
      if (
        settings.styles.tokens != null &&
        settings.styles.tokens.transitions != null &&
        Object.keys(settings.styles.tokens.transitions).length != 0 &&
        settings.styles.tokens.transitions.durations != null &&
        settings.styles.tokens.transitions.durations.length != 0
      ) {
        settings.styles.tokens.transitions.durations.forEach(function (
          durationSetting
        ) {
          if (value_2 == durationSetting.key) {
            value_2 = durationSetting.duration;
          }
        });
      }
    }
    // Value 3 -----------------------------------------------------------------
    var value_3 = null;
    if (values.length >= 3) {
      value_3 = values[2];
      if (
        settings.styles.tokens != null &&
        settings.styles.tokens.transitions != null &&
        Object.keys(settings.styles.tokens.transitions).length != 0 &&
        settings.styles.tokens.transitions.functions != null &&
        settings.styles.tokens.transitions.functions.length != 0
      ) {
        settings.styles.tokens.transitions.functions.forEach(function (
          functionSetting
        ) {
          if (value_3 == functionSetting.key) {
            value_3 = functionSetting.function;
          }
        });
      }
    }
    // Value 4 -----------------------------------------------------------------
    var value_4 = null;
    if (values.length >= 4) {
      value_4 = values[3];
      if (
        settings.styles.tokens != null &&
        settings.styles.tokens.transitions != null &&
        Object.keys(settings.styles.tokens.transitions).length != 0 &&
        settings.styles.tokens.transitions.delays != null &&
        settings.styles.tokens.transitions.delays.length != 0
      ) {
        settings.styles.tokens.transitions.delays.forEach(function (
          delaySetting
        ) {
          if (value_4 == delaySetting.key) {
            value_4 = delaySetting.delay;
          }
        });
      }
    }
    // Assemble the CSS ========================================================
    // We need to check the options list to ensure a valid number of options was passed.
    if (values.length === 2) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 1);
        return null;
      } else {
        css_string = '{transition: ' + value_1 + ' ' + value_2 + ';}';
      }
    } else if (values.length === 3) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 1);
        return null;
      } else if (value_3 == null || value_3 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 2);
        return null;
      } else {
        css_string =
          '{transition: ' + value_1 + ' ' + value_2 + ' ' + value_3 + ';}';
      }
    } else if (values.length === 4) {
      if (value_1 == null || value_1 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 0);
        return null;
      } else if (value_2 == null || value_2 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 1);
        return null;
      } else if (value_3 == null || value_3 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 2);
        return null;
      } else if (value_4 == null || value_4 === 'null') {
        get_syntax_errors(prop_data, property, instance, values, 3);
        return null;
      } else {
        css_string =
          '{transition: ' +
          value_1 +
          ' ' +
          value_2 +
          ' ' +
          value_3 +
          ' ' +
          value_4 +
          ';}';
      }
    } else {
      // An invalid number of options was passed
      get_option_count_errors(prop_data, property, instance, values);
      return null;
    }
    // Assemble the CSS array ==================================================
    selector.forEach(function (single_selector, single_selector_index) {
      attribute_css = attribute_css.concat(single_selector + css_string);
    });
    // Return the array
    return attribute_css;
  } catch (error) {
    // Catch any errors ========================================================
    property_error_catch(property, instance, error);
    return null;
  }
}

module.exports = {
  parse_transition,
};
