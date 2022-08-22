// Hydrogen: Build Hydrogen
'use strict';

// Vendor dependencies
var colors = require('colors');
var fs = require('fs');
var path = require('path');

// Hydrogen dependencies
var { validateConfig } = require('./validate-config');
var { getUserOutput } = require('./generate-paths');
var { h2_load_settings } = require('./load-settings');
var {
  date_time,
  h2_timer,
  h2_error,
  h2_error_detail,
  h2_warning,
  h2_warning_detail,
} = require('./logs');
var { parse_input_data_for_attributes } = require('./parse-attributes');
var { generateCoreCSS } = require('./generate-core-css');
var { generateMediaQueryArray } = require('./generate-media-query-array');
var { write_variable_file } = require('./build-variables');
var { processCSS } = require('./process-css');

// Basic property dependencies
var { parse_align_content } = require('./properties/basic/align-content');
var { parse_align_items } = require('./properties/basic/align-items');
var { parse_align_self } = require('./properties/basic/align-self');
var { parse_cursor } = require('./properties/basic/cursor');
var { parse_display } = require('./properties/basic/display');
var { parse_flex_basis } = require('./properties/basic/flex-basis');
var { parse_flex_direction } = require('./properties/basic/flex-direction');
var { parse_flex_grow } = require('./properties/basic/flex-grow');
var { parse_flex_wrap } = require('./properties/basic/flex-wrap');
var { parse_font_style } = require('./properties/basic/font-style');
var { parse_font_weight } = require('./properties/basic/font-weight');
var { parse_grid_column } = require('./properties/basic/grid-column');
var { parse_grid_row } = require('./properties/basic/grid-row');
var { parse_justify_content } = require('./properties/basic/justify-content');
var { parse_justify_items } = require('./properties/basic/justify-items');
var { parse_list_style } = require('./properties/basic/list-style');
var { parse_opacity } = require('./properties/basic/opacity');
var { parse_order } = require('./properties/basic/order');
var { parse_outline } = require('./properties/basic/outline');
var { parse_text_align } = require('./properties/basic/text-align');
var { parse_text_decoration } = require('./properties/basic/text-decoration');
var { parse_text_transform } = require('./properties/basic/text-transform');
var { parse_vertical_align } = require('./properties/basic/vertical-align');

// Custom property dependencies
var {
  parse_background_color,
} = require('./properties/custom/background-color');
var { parse_border } = require('./properties/custom/border');
var { parse_text_color } = require('./properties/custom/color');
var { parse_container } = require('./properties/custom/container');
var { parse_flex_grid } = require('./properties/custom/flex-grid');
var { parse_flex_item } = require('./properties/custom/flex-item');
var { parse_font_family } = require('./properties/custom/font-family');
var { parse_font_size } = require('./properties/custom/font-size');
var { parse_gap } = require('./properties/custom/gap');
var { parse_grid_template } = require('./properties/custom/grid-template');
var { parse_layer } = require('./properties/custom/layer');
var { parse_offset } = require('./properties/custom/offset');
var { parse_overflow } = require('./properties/custom/overflow');
var { parse_overlay } = require('./properties/custom/overlay');
var { parse_position } = require('./properties/custom/position');
var { parse_radius } = require('./properties/custom/radius');
var { parse_shadow } = require('./properties/custom/shadow');
var { parse_size } = require('./properties/custom/size');
var { parse_space } = require('./properties/custom/space');
var { parse_transition } = require('./properties/custom/transition');
var { parse_visibility } = require('./properties/custom/visibility');

/**
 * Takes an attribute and parses out individual query values
 * @param {{file: string, attribute: string}} instance
 * @param {string} property
 * @returns {array}
 */
function get_queries(instance, property) {
  try {
    //
    // Create variables ========================================================
    //
    var result = [];
    var open_bracket = 0;
    var square_bracket = 0;
    var current_attribute = '';
    //
    // Remove the property =====================================================
    // This regex grabs the "data-h2-property='" and removes it from the attribute. It also has to account for syntax differences in key/value pair attribute definitions
    var property_regex = new RegExp(
      'data-h2-' + property + '([\'"]:|=[\'"])\\s*["\']?',
      'g'
    );
    var attribute = instance.attribute.replace(property_regex, '');
    // Remove the final character, which will always be a " or '
    attribute = attribute.slice(0, -1);
    // Check for bracket matches ===============================================
    // This loop checks for matching pairs to determine where a query starts and finishes. It accounts for opening and closing brackets inside of a query.
    for (var i = 0; i < attribute.length; ++i) {
      // Count brackets
      if (attribute.charAt(i) === '(') open_bracket++;
      if (attribute.charAt(i) === ')') open_bracket--;
      // Check for square brackets - this is required because the addition of classes and children introduce spaces within [] characters that need to be ignored
      if (attribute.charAt(i) === '[') square_bracket++;
      if (attribute.charAt(i) === ']') square_bracket--;
      if (attribute.charAt(i) == ' ' && square_bracket == 0) {
        if (open_bracket == 0 && current_attribute != '') {
          result.push(current_attribute);
          current_attribute = '';
        } else if (open_bracket > 0) {
          current_attribute += attribute.charAt(i);
        }
      } else {
        current_attribute += attribute.charAt(i);
      }
    }
    if (current_attribute != '') {
      // Adds the last token
      result.push(current_attribute);
    }
    // Return the result =======================================================
    return result;
  } catch (error) {
    // Catch errors ============================================================
    h2_error_detail('generic', instance.attribute, instance.files, error);
    return null;
  }
}

/**
 * Takes a query and parses it for the media string (including modifiers) and the options provided to it
 * @param {string} input any query - e.g. query:modifiers(options)
 * @returns {{media: string, options: string}} object containing the media and options strings
 */
function parse_value_for_media_and_options(input) {
  try {
    // Create initial variables ================================================
    var open_bracket = 0;
    // Loop backwards through the input ========================================
    // This is because we need to find the options encased in the final pair of ()
    for (var i = input.length; i > 0; i -= 1) {
      // Add for opening brackets
      if (input.charAt(i) === '(') open_bracket++;
      // Subtract for closing brackets
      if (input.charAt(i) === ')') open_bracket--;
      // If brackets are properly matched and the current character isn't empty, use the character's index to return everything before it as the media query, and everything from it on as the options.
      if (open_bracket === 0 && input.charAt(i) != '') {
        // Return the media and options strings
        return {
          media: input.substring(0, i),
          options: input.substring(i),
        };
      }
    }
  } catch (error) {
    // Log any unaccounted for errors ==========================================
    h2_error_detail('generic', null, null, error);
    // Return false
    return false;
  }
}

/**
 * Takes the media string of a query and parses it for modifiers by breaking it apart at : characters
 * @param {string} input any media string - e.g. query:modifiers
 * @returns {array} array containing the media query and individual modifiers
 */
function parse_modifiers(input) {
  try {
    // Create initial variables ================================================
    var tmp = input.split(':');
    var result = [];
    // Loop through the input ==================================================
    // This loop checks for : characters but ignores them if they exist inside of []
    for (var i = 0, j = 0; i < tmp.length; i++) {
      result[j] = (result[j] ? result[j] + ':' : '') + tmp[i];
      if (result[j].indexOf('[') == -1 || result[j].indexOf(']') != -1) {
        j++;
      }
    }
    // Return the result
    return result;
  } catch (error) {
    // Log any unaccounted for errors ==========================================
    h2_error_detail('generic', null, null, error);
    // Return false
    return false;
  }
}

/**
 * Checks to see whether a query has matching sets of parentheses
 * @param {string} query a media query and its options (e.g. base(rgba(255, 255, 255, 1)))
 * @returns {boolean} returns either true or false depending on whether the query has too many parentheses
 */
function lint_parentheses(query) {
  try {
    // Check for brackets ======================================================
    // This loops through and adds or removes 1 based on the open/close state of the bracket. The result should be 0 if the brackets all match. A positive number means too many open brackets, while a negative number means too many closing brackets.
    var brackets = 0;
    for (var i = 0; i < query.length; ++i) {
      if (query.charAt(i) === '(') brackets++;
      if (query.charAt(i) === ')') brackets--;
    }
    // Return bracket status ===================================================
    if (brackets > 0 || brackets < 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    // Log any unaccounted for errors ==========================================
    h2_error_detail('generic', null, null, error);
    return false;
  }
}

function h2_compile_hydrogen() {
  try {
    // Start total build timer
    const totalBuildTimerStart = process.hrtime.bigint();
    // Set up environment vars for debugging
    var debug = false;
    // Validate the configuration file
    var validation = validateConfig();
    // Only run if the config passes
    if (validation === true) {
      // Load user settings
      var settings = h2_load_settings();
      // Check for the debug state
      if (settings.debug != null && settings.debug === true) {
        debug = true;
      }
      // Create the logs folder if it doesn't exist and debug is enabled
      var debug_data = {
        time: date_time(),
        enabled: false,
      };
      if (debug === true) {
        debug_data.enabled = true;
        let log_directory = getUserOutput('string') + '/hydrogen-logs';
        if (!fs.existsSync(log_directory)) {
          fs.mkdirSync(log_directory);
        }
        let log_time_directory =
          getUserOutput('string') + '/hydrogen-logs/' + debug_data.time;
        if (!fs.existsSync(log_time_directory)) {
          fs.mkdirSync(log_time_directory);
        }
      }
      // Start the parsing timer
      const input_data_parser_timer_start = process.hrtime.bigint();
      // Parse the project markup for both a single data-h2 attribute and all data-h2-property attributes
      var hydrogen_attribute_data = parse_input_data_for_attributes(debug_data);
      // Check for at least 1 data-h2 attribute, otherwise log an error
      if (hydrogen_attribute_data.hydrogen === false) {
        h2_warning_detail('wrapper_attribute', null, null);
      }
      // End the parsing timer
      const input_data_parser_timer_end = process.hrtime.bigint();
      h2_timer(
        'Attribute scrape time was',
        input_data_parser_timer_start,
        input_data_parser_timer_end
      );
      // Build the core CSS
      var hydrogen = generateCoreCSS();
      // Set the pseudo class array ** Note that this array needs to be reflected in the media validation
      var state_array = [
        'visited',
        'checked',
        'link',
        'enabled',
        'optional',
        'required',
        'valid',
        'invalid',
        'hover',
        'disabled',
        'focus-visible',
        'focus',
        'active',
      ];
      // Build the media query array
      var mediaQueryArray = generateMediaQueryArray(state_array);
      // Generate a CSS variable file if the user has enabled them
      if (settings.variables == true) {
        write_variable_file();
      }
      // Start CSS construction timer
      const CSSTimerStart = process.hrtime.bigint();
      // Loop through attributes that have been found
      var debugValueArray = [];
      hydrogen_attribute_data.properties.forEach(function (
        property_data,
        property_data_index
      ) {
        property_data.keys.forEach(function (attribute, attribute_index) {
          var property = attribute.key;
          attribute.instances.forEach(function (instance, instance_index) {
            var falseAttribute = false;
            // Get the values from the attribute
            var values = get_queries(instance, property);
            // Create a new debug value set
            var newDebugValueSet = {
              attribute: instance.attribute,
              valuesArray: values,
              values: [],
            };
            // Loop through the values
            if (values != null && values.length != 0 && values[0].length != 0) {
              values.forEach(function (value) {
                // Add the value to the debug array
                var newDebugValue = {
                  value: value,
                };
                // Lint for extra parentheses
                if (lint_parentheses(value) == false) {
                  h2_error_detail('parens', instance.attribute, instance.files);
                  falseAttribute = true;
                } else {
                  // Get the front of the query
                  var mediaQuery =
                    parse_value_for_media_and_options(value).media;
                  // Check to see if media queries were actually found (for example, to handle instances of (options), etc.)
                  if (mediaQuery == null) {
                    h2_error_detail(
                      'missing_query',
                      instance.attribute,
                      instance.files
                    );
                    falseAttribute = true;
                  } else {
                    // Get the individual queries by splitting at : characters
                    let mediaModifiers = parse_modifiers(mediaQuery);
                    // Add the media modifiers to the debug array
                    newDebugValue.mediaModifiers = mediaModifiers;
                    // Set the working variables
                    var final_query = null;
                    var final_mode = null;
                    var final_state = null;
                    var final_id = '';
                    var final_class = '';
                    var final_children = [];
                    mediaModifiers.forEach(function (modifier) {
                      settings.media.forEach(function (query) {
                        if (query.key == modifier) {
                          final_query = modifier;
                        }
                      });
                      if (modifier == 'dark') {
                        final_mode = modifier;
                      }
                      state_array.forEach(function (pseudo) {
                        if (pseudo == modifier) {
                          final_state = modifier;
                        }
                      });
                      if (modifier.startsWith('id[') === true) {
                        // The user is trying to target an element that contains both this Hydrogen attribute AND a specific id
                        var ids = modifier.match(/\[([^\]]*)/);
                        if (ids[1].trim() === '') {
                          // There were no ids passed, so throw an error
                          h2_warning_detail(
                            'empty_id_modifier',
                            instance.attribute,
                            instance.files
                          );
                        } else {
                          // There were valid ids, so assemble the class selector
                          var id_array = ids[1].split(',');
                          id_array.forEach(function (item, item_index) {
                            final_id = final_id + '#' + item.trim();
                          });
                        }
                      }
                      if (modifier.startsWith('class[') === true) {
                        // The user is trying to target an element that contains both this Hydrogen attribute AND a specific class
                        var classes = modifier.match(/\[([^\]]*)/);
                        if (classes[1].trim() === '') {
                          // There were no classes passed, so throw an error
                          h2_warning_detail(
                            'empty_class_modifier',
                            instance.attribute,
                            instance.files
                          );
                        } else {
                          // There were valid classes, so assemble the class selector
                          var class_array = classes[1].split(',');
                          class_array.forEach(function (item, item_index) {
                            final_class = final_class + '.' + item.trim();
                          });
                        }
                      }
                      if (modifier.startsWith('children[') === true) {
                        if (property === 'flex-grid') {
                          h2_warning_detail(
                            'unsupported_modifier_children',
                            instance.attribute,
                            instance.files
                          );
                        } else {
                          // The user is trying to target the children of an element with this Hydrogen attribute
                          var children = modifier.match(/\[([^\]]*)/);
                          if (children[1].trim() === '') {
                            // There were no children passed, so throw an error
                            h2_warning_detail(
                              'empty_children_modifier',
                              instance.attribute,
                              instance.files
                            );
                          } else {
                            // There were valid children, so assemble the child selector
                            var child_array = children[1].split(',');
                            child_array.forEach(function (item, item_index) {
                              final_children = final_children.concat(
                                item.trim()
                              );
                            });
                          }
                        }
                      }
                    });
                    // Add the final parsed query elements to the debug array
                    newDebugValue.final_query = final_query;
                    newDebugValue.final_mode = final_mode;
                    newDebugValue.final_state = final_state;
                    newDebugValue.final_class = final_class;
                    newDebugValue.final_children = final_children;
                    // Check to see if the media query was valid, and if was, continue
                    // console.log('final query:', final_query);
                    if (final_query != null) {
                      // Add the final value's total object to the debug array
                      newDebugValueSet.values =
                        newDebugValueSet.values.concat(newDebugValue);
                      // Build the css selector array
                      var cssSelector = [];
                      var state_string = '';
                      // Check to see if a state was called, and if it was, concatenate it with a colon
                      if (final_state != null) {
                        state_string = ':' + final_state;
                      }
                      // Check to see if children were provided
                      if (final_children.length > 0) {
                        // There were children, so add a selector for each child
                        final_children.forEach(function (child, child_index) {
                          cssSelector = cssSelector.concat(
                            '[data-h2-' +
                              property +
                              '*="' +
                              value +
                              '"]' +
                              final_id +
                              final_class +
                              ' ' +
                              child +
                              ':not([data-h2-' +
                              property +
                              '])' +
                              state_string
                          );
                        });
                      } else {
                        // No children were called, so only add a single childless selector
                        cssSelector = cssSelector.concat(
                          '[data-h2-' +
                            property +
                            '*="' +
                            value +
                            '"]' +
                            final_id +
                            final_class +
                            state_string
                        );
                      }
                      // var internalValuesRegex = /(?<=\().*(?=\))/g; // Gets the internal values of the media query (e.g. red, all from b(red, all))
                      var internalValues = parse_value_for_media_and_options(
                        value
                      ).options.slice(1, -1);
                      // Check to see if the query was empty (e.g. b() vs b(things))
                      if (
                        internalValues != null &&
                        internalValues.length != 0
                      ) {
                        var singleValueRegex = /[^,]*\([^)]*\)|[^,]+/g; // Gets comma separated values, minus commas, but also checks for xyz(a, ..), to account for rgba/hsl values
                        var singleValues =
                          internalValues.match(singleValueRegex);
                        // Create a new array so we can parse the values, remove any preceding spaces, and assemble them for use
                        var parsedValues = [];
                        singleValues.forEach(function (singleValue) {
                          if (singleValue[0] == ' ') {
                            parsedValues = parsedValues.concat(
                              singleValue.slice(1)
                            );
                          } else {
                            parsedValues = parsedValues.concat(singleValue);
                          }
                        });
                        // Create the string and value variables for later use
                        var valueCSS;
                        if (property == 'custom') {
                          // This will be for assembling custom CSS Hydrogen groups in the config so that you can consolidate recurring styles behind one attribute, in the same way you would with a class
                        } else if (property == 'align-content') {
                          valueCSS = parse_align_content(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'align-items') {
                          valueCSS = parse_align_items(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'align-self') {
                          valueCSS = parse_align_self(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (
                          property == 'background-color' ||
                          property == 'bg-color'
                        ) {
                          valueCSS = parse_background_color(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'border') {
                          valueCSS = parse_border(
                            instance,
                            property,
                            mediaQuery,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (
                          property == 'font-color' ||
                          property == 'color'
                        ) {
                          valueCSS = parse_text_color(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'container') {
                          valueCSS = parse_container(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'cursor') {
                          valueCSS = parse_cursor(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'display') {
                          valueCSS = parse_display(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'flex-basis') {
                          valueCSS = parse_flex_basis(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'flex-direction') {
                          valueCSS = parse_flex_direction(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'flex-grid') {
                          valueCSS = parse_flex_grid(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'flex-grow') {
                          valueCSS = parse_flex_grow(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'flex-item') {
                          valueCSS = parse_flex_item(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'flex-wrap') {
                          valueCSS = parse_flex_wrap(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'font-family') {
                          valueCSS = parse_font_family(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'font-size') {
                          valueCSS = parse_font_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'font-style') {
                          valueCSS = parse_font_style(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'font-weight') {
                          valueCSS = parse_font_weight(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'gap') {
                          valueCSS = parse_gap(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'grid-column') {
                          valueCSS = parse_grid_column(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'grid-row') {
                          valueCSS = parse_grid_row(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'grid-template-columns') {
                          valueCSS = parse_grid_template(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'grid-template-rows') {
                          valueCSS = parse_grid_template(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'height') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'justify-content') {
                          valueCSS = parse_justify_content(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'justify-items') {
                          valueCSS = parse_justify_items(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'layer') {
                          valueCSS = parse_layer(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'list-style') {
                          valueCSS = parse_list_style(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'margin') {
                          valueCSS = parse_space(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'margin-top') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'margin-right') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'margin-bottom') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'margin-left') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'max-height') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'max-width') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'min-height') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'min-width') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (
                          property == 'offset' ||
                          property == 'location'
                        ) {
                          valueCSS = parse_offset(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'opacity') {
                          valueCSS = parse_opacity(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'order') {
                          valueCSS = parse_order(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'outline') {
                          valueCSS = parse_outline(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'overflow') {
                          valueCSS = parse_overflow(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'overlay') {
                          valueCSS = parse_overlay(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'padding') {
                          valueCSS = parse_space(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'padding-top') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'padding-right') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'padding-bottom') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'padding-left') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'position') {
                          valueCSS = parse_position(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'radius') {
                          valueCSS = parse_radius(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'shadow') {
                          valueCSS = parse_shadow(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'text-align') {
                          valueCSS = parse_text_align(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'text-decoration') {
                          valueCSS = parse_text_decoration(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'text-transform') {
                          valueCSS = parse_text_transform(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'transition') {
                          valueCSS = parse_transition(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'vertical-align') {
                          valueCSS = parse_vertical_align(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'visibility') {
                          valueCSS = parse_visibility(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else if (property == 'width') {
                          valueCSS = parse_size(
                            instance,
                            property,
                            cssSelector,
                            parsedValues
                          );
                          if (valueCSS == null) {
                            falseAttribute = true;
                          }
                        } else {
                          h2_error_detail(
                            'invalid_attribute',
                            instance.attribute,
                            instance.files
                          );
                          falseAttribute = true;
                        }
                      } else {
                        h2_error_detail(
                          'empty_query',
                          instance.attribute,
                          instance.files
                        );
                        falseAttribute = true;
                      }
                    } else {
                      h2_error_detail(
                        'invalid_query',
                        instance.attribute,
                        instance.files
                      );
                      falseAttribute = true;
                    }
                  }
                }
                // Check to see if the attribute passed as valid
                if (falseAttribute === false) {
                  // Add to media css string, and only assemble the hydrogen file at the end, with the correct order for queries by looping through them
                  mediaQueryArray.forEach(function (query) {
                    if (final_query === query.key) {
                      // Matching media query
                      if (final_mode == null && query.state === 'light') {
                        // Light mode
                        if (final_state == null && query.pseudo === 'default') {
                          // No pseudo
                          if (Array.isArray(valueCSS) === true) {
                            valueCSS.forEach(function (item) {
                              query.queryString =
                                query.queryString + '\n[data-h2] ' + item;
                            });
                          } else {
                            query.queryString =
                              query.queryString + '\n[data-h2] ' + valueCSS;
                          }
                        } else if (final_state === query.pseudo) {
                          // Matching pseudo
                          if (Array.isArray(valueCSS) === true) {
                            valueCSS.forEach(function (item) {
                              query.queryString =
                                query.queryString + '\n[data-h2] ' + item;
                            });
                          } else {
                            query.queryString =
                              query.queryString + '\n[data-h2] ' + valueCSS;
                          }
                        }
                      } else if (
                        final_mode === 'dark' &&
                        query.state === 'dark'
                      ) {
                        // Dark mode
                        // Set dark mode prefix based on user settings
                        var darkPrefix = '\n[data-h2] ';
                        if (settings.dark_mode == 'toggle') {
                          darkPrefix = '\n[data-h2="dark"] ';
                        }
                        // Assemble dark mode media arrays
                        if (final_state == null && query.pseudo === 'default') {
                          // No pseudo
                          if (Array.isArray(valueCSS) === true) {
                            valueCSS.forEach(function (item) {
                              query.queryString =
                                query.queryString + darkPrefix + item;
                            });
                          } else {
                            query.queryString =
                              query.queryString + darkPrefix + valueCSS;
                          }
                        } else if (final_state === query.pseudo) {
                          // Matching pseudo
                          if (Array.isArray(valueCSS) == true) {
                            valueCSS.forEach(function (item) {
                              query.queryString =
                                query.queryString + darkPrefix + item;
                            });
                          } else {
                            query.queryString =
                              query.queryString + darkPrefix + valueCSS;
                          }
                        }
                      }
                    }
                  });
                }
              });
            } else {
              h2_warning_detail(
                'empty_attribute',
                instance.attribute,
                instance.files
              );
            }
            // Add the whole attribute value set to the debug array
            debugValueArray = debugValueArray.concat(newDebugValueSet);
          });
        });
      });
      // Write the values debug file
      if (debug_data.enabled === true) {
        fs.writeFileSync(
          getUserOutput('string') +
            '/hydrogen-logs/' +
            debug_data.time +
            '/query-details.json',
          JSON.stringify(debugValueArray, null, ' ')
        );
      }
      // Add each query string to the Hydrogen string and close the media query bracket if necessary
      mediaQueryArray.forEach(function (query) {
        if (query.bracket == true) {
          hydrogen =
            hydrogen +
            '\n/* ' +
            query.key +
            ' - ' +
            query.state +
            ' - ' +
            query.pseudo +
            ' */\n' +
            query.queryString +
            '\n}';
        } else {
          hydrogen =
            hydrogen +
            '\n/* ' +
            query.key +
            ' - ' +
            query.state +
            ' - ' +
            query.pseudo +
            ' */' +
            query.queryString;
        }
      });
      if (debug_data.enabled === true) {
        // Write a dump of the media array
        fs.writeFileSync(
          path.join(
            getUserOutput('string') +
              '/hydrogen-logs/' +
              debug_data.time +
              '/media-queries.json'
          ),
          JSON.stringify(mediaQueryArray, null, ' ')
        );
      }
      // Write the CSS =========================================================
      // These scripts output a raw CSS file for processing and optionally generate a copy as a log file for debugging.
      // Delete existing files -------------------------------------------------
      if (
        fs.existsSync(
          path.join(getUserOutput('string') + '/hydrogen.raw.css')
        ) == true
      ) {
        fs.unlinkSync(path.join(getUserOutput('string') + '/hydrogen.raw.css'));
      }
      // Write the new file ----------------------------------------------------
      fs.writeFileSync(
        path.join(getUserOutput('string') + '/hydrogen.raw.css'),
        hydrogen
      );
      // Write debug raw CSS ---------------------------------------------------
      if (debug_data.enabled === true) {
        fs.writeFileSync(
          path.join(
            getUserOutput('string') +
              '/hydrogen-logs/' +
              debug_data.time +
              '/output.css'
          ),
          hydrogen
        );
      }
      // End CSS construction timer
      const CSSTimerEnd = process.hrtime.bigint();
      h2_timer('CSS construction time was', CSSTimerStart, CSSTimerEnd);
      // Run Autoprefixer and CSS Nano
      var processStatus = processCSS();
      if (processStatus === true) {
        // End total build timer
        const totalBuildTimerEnd = process.hrtime.bigint();
        h2_timer(
          'Total Hydrogen build time was',
          totalBuildTimerStart,
          totalBuildTimerEnd
        );
        // Log that debug logs were created if debug is set
        if (debug_data.enabled === true) {
          h2_warning_detail('logs', null, [
            path.join(getUserOutput('string') + '/hydrogen-logs'),
          ]);
        }
        // Log success
        console.log(
          '✅ [' + 'Hydrogen'.magenta + ']',
          'A CSS file was successfully built in ' +
            path.resolve(getUserOutput('string')).green
        );
      }
    }
  } catch (error) {
    h2_error(error);
    return false;
  }
}

module.exports = {
  h2_compile_hydrogen,
};
