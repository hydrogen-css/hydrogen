// Hydrogen: Transition parsing
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_load_settings } = require('../../load-settings');
var { h2_error_detail } = require('../../logs');

/**
 * Parse data-h2-transition and return CSS
 *
 * Transition is a custom property that has to parse multiple configured keys
 *
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {array} selector the assembled CSS selector
 * @param {array} values the trimmed values passed to the property
 * @returns {array} returns an array of strings containing CSS selectors and their values
 */
function parse_transition(instance, property, selector, values) {
  try {
    // =========================================================================
    // Set up the main variables
    var settings = h2_load_settings();
    var attribute_css = [];
    var css_string = '';
    // =========================================================================
    // Define possible values for the attribute
    // -------------------------------------------------------------------------
    // Value 1: [required] property
    // Note that in order to apply transitions to multiple properties on the same element, you can just use another query
    var value1 = null;
    var value1_error_message = '';
    if (values.length >= 1) {
      value1 = values[0];
      value1_error_message =
        'the "property" option for transition only accepts CSS property names.';
    }
    // -------------------------------------------------------------------------
    // Value 2: [required] duration
    var value2 = null;
    var value2_error_message = '';
    if (values.length >= 2) {
      value2 = values[1];
      if (
        settings.transitions != null &&
        settings.transitions.durations != null
      ) {
        settings.transitions.durations.forEach(function (durationSetting) {
          if (value2 == durationSetting.key) {
            value2 = durationSetting.duration;
          }
        });
      }
      value2_error_message =
        'the "duration" option for transition only accepts configured duration keys or CSS transition duration time values.';
    }
    // -------------------------------------------------------------------------
    // Value 3: [optional] function
    var value3 = null;
    var value3_error_message = '';
    if (values.length >= 3) {
      value3 = values[2];
      if (
        settings.transitions != null &&
        settings.transitions.functions != null
      ) {
        settings.transitions.functions.forEach(function (functionSetting) {
          if (value3 == functionSetting.key) {
            value3 = functionSetting.function;
          }
        });
      }
      value3_error_message =
        'the "function" option for transition only accepts configured function keys or CSS transition functions.';
    }
    // -------------------------------------------------------------------------
    // Value 4: [optional] delay
    var value4 = null;
    var value4_error_message = '';
    if (values.length >= 4) {
      value4 = values[3];
      if (settings.transitions != null && settings.transitions.delays != null) {
        settings.transitions.delays.forEach(function (delaySetting) {
          if (value4 == delaySetting.key) {
            value4 = delaySetting.delay;
          }
        });
      }
      value4_error_message =
        'the "delay" option for transition only accepts configured delay keys or CSS transition delay time values.';
    }
    // =========================================================================
    // Check the array length for value options and assemble the CSS
    if (values.length === 2) {
      // -----------------------------------------------------------------------
      // 2 value syntax
      if (value1 == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          value1_error_message
        );
        return null;
      } else if (value2 == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          value2_error_message
        );
        return null;
      } else {
        css_string = '{transition: ' + value1 + ' ' + value2 + ';}';
      }
    } else if (values.length === 3) {
      // -----------------------------------------------------------------------
      // 3 value syntax
      if (value1 == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          value1_error_message
        );
        return null;
      } else if (value2 == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          value2_error_message
        );
        return null;
      } else if (value3 == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          value3_error_message
        );
        return null;
      } else {
        css_string =
          '{transition: ' + value1 + ' ' + value2 + ' ' + value3 + ';}';
      }
    } else if (values.length === 4) {
      // -----------------------------------------------------------------------
      // 4 value syntax
      if (value1 == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          value1_error_message
        );
        return null;
      } else if (value2 == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          value2_error_message
        );
        return null;
      } else if (value3 == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          value3_error_message
        );
        return null;
      } else if (value4 == null) {
        h2_error_detail(
          'syntax',
          instance.attribute,
          instance.files,
          value4_error_message
        );
        return null;
      } else {
        css_string =
          '{transition: ' +
          value1 +
          ' ' +
          value2 +
          ' ' +
          value3 +
          ' ' +
          value4 +
          ';}';
      }
    } else {
      // An incorrect number of options were passed, so throw an error.
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "transition accepts 1 (property), 2 (property, duration), 3 (property, duration, function), or 4 (property, duration, function, delay) values, and you've specified " +
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
  parse_transition,
};
