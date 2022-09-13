// Hydrogen: Build Hydrogen
'use strict';

// Vendor dependencies
var colors = require('colors');
var fs = require('fs');
var path = require('path');
const validator = require('csstree-validator');

// Hydrogen dependencies
var { parse_settings } = require('./settings/settings-parser');
var {
  validate_settings,
} = require('./settings/validation/settings-validation');
var { get_output_path } = require('./generate-paths');
var { clean_logs } = require('./logs/log-clean');
var { date_time, log_info } = require('./logs/logs');
var { log_timer } = require('./logs/log-timer');
var { parse_input_data_for_attributes } = require('./parse-attributes');
var { generateCoreCSS } = require('./generate-core-css');
var { generateMediaQueryArray } = require('./generate-media-query-array');
var { write_variable_file } = require('./build-variables');
var { process_hydrogen } = require('./process-css');

// Basic property dependencies
var { parse_basic_property } = require('./properties/basic');

// Custom property dependencies
var {
  parse_background_color,
} = require('./properties/custom/background-color');
var { parse_border } = require('./properties/custom/border');
var { parse_text_color } = require('./properties/custom/color');
var { parse_container } = require('./properties/custom/container');
var { parse_fill } = require('./properties/custom/fill');
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
var { parse_space } = require('./properties/space');
var { parse_transform } = require('./properties/custom/transform');
var { parse_transition } = require('./properties/custom/transition');
var { parse_visibility } = require('./properties/custom/visibility');

/**
 * Takes an attribute instance and deconstructs it to identify individual queries passed as options
 * @param {[{attribute: string, files: [string]}]} instance the attribute's instance, including its file location(s)
 * @param {string} property the property associated with the attribute (e.g. "color" from data-h2-color="")
 * @returns {array} an array of queries
 */
function parse_queries(instance, property) {
  try {
    // Create initial variables ================================================
    let query_array = [];
    let bracket_count = 0;
    let square_count = 0;
    // Assemble a working attribute string =====================================
    // Remove the data-h2-property=["|'] and trailing ["|'] so that we're left with only options passed to the attribute
    // Match the property via RegEx
    // The RegEx has to account for both standard attributes as described above AND key/value pair syntax
    var property_regex = new RegExp(
      'data-h2-' + property + '([\'"]:|=[\'"])\\s*["\']?',
      'g'
    );
    var attribute = instance.attribute.replace(property_regex, '');
    // Remove the final character
    // This will always be a " or ' character
    attribute = attribute.slice(0, -1);
    // Loop through the options by character ===================================
    // By checking for opening/closing brackets, we can slice the string when appropriate matches are found and capture the slice as a single query.
    // As queries are found, slice_start tracks how far into the string we are so that we don't duplicate matches
    var slice_start = 0;
    // Perform the loop --------------------------------------------------------
    for (var i = 0; i < attribute.length; ) {
      // Track opening/closing square brackets (+ means opening, - means closing, 0 = no brackets present)
      if (attribute.charAt(i) === '[') {
        square_count = square_count + 1;
      }
      if (attribute.charAt(i) === ']') {
        square_count = square_count - 1;
      }
      // Track opening/closing parentheses (+ means opening, - means closing, 0 = no parentheses present)
      if (attribute.charAt(i) === '(' && square_count === 0) {
        bracket_count = bracket_count + 1;
      }
      if (attribute.charAt(i) === ')' && square_count === 0) {
        bracket_count = bracket_count - 1;
      }
      // If we're on a closing parenthesis, check to see if we're not inside square brackets and whether the closing parenthesis is a match for an opening one
      if (
        attribute.charAt(i) === ')' &&
        bracket_count === 0 &&
        square_count === 0
      ) {
        // A query was found, so build it ......................................
        // The query is assumed to be everything from the slice_start until the current closing parenthesis character
        let new_query = attribute.slice(slice_start, i + 1).trim();
        // Add the query to the query array
        query_array = query_array.concat(new_query);
        // Update the start of the next slice by telling it to look at the character after this closing parenthesis
        slice_start = i + 1;
      }
      // Increment the character and check the next one for a query
      i = i + 1;
    }
    // Check for bad output ====================================================
    // Check for outstanding mismatched parentheses
    if (square_count != 0 || bracket_count != 0) {
      log_info(
        'error',
        'Unequal brackets',
        'Parsing attribute queries',
        instance.attribute,
        null,
        null,
        instance.files,
        'Hydrogen found an unequal number of brackets in this attribute. This is likely a typo.'
      );
      // Return null
      return null;
    }
    // Check to see if there were no queries passed
    if (query_array.length === 0) {
      log_info(
        'warning',
        'Empty attribute',
        'Parsing attribute queries',
        instance.attribute,
        null,
        null,
        instance.files,
        'This attribute has no queries passed to it, so it has been omitted from the build.'
      );
      return null;
    }
    // Return the array of queries
    return query_array;
  } catch (error) {
    // Log any errors that weren't accounted for ===============================
    log_info(
      'error',
      'Unknown error',
      'Parsing attribute queries',
      instance.attribute,
      null,
      null,
      instance.files,
      error
    );
    // Return null
    return null;
  }
}

/**
 * Takes a query and parses it for the media string (including modifiers) and the options provided to it
 * @param {[{attribute: string, files: [string]}]} instance the attribute's instance, including its file location(s)
 * @param {string} input any query - e.g. query:modifiers(options)
 * @returns {{media: string, options: string}} object containing the media and options strings
 */
function parse_value_for_media_and_options(instance, input) {
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
    log_info(
      'error',
      'Unknown error',
      'Parsing attributes',
      instance.attribute,
      null,
      null,
      instance.files,
      error
    );
    // Return false
    return false;
  }
}

/**
 * Takes the media string of a query and parses it for modifiers by breaking it apart at : characters
 * @param {[{attribute: string, files: [string]}]} instance the attribute's instance, including its file location(s)
 * @param {string} input any media string - e.g. query:modifiers
 * @returns {array} array containing the media query and individual modifiers
 */
function parse_modifiers(instance, input) {
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
    log_info(
      'error',
      'Unknown error',
      'Parsing query modifiers',
      instance.attribute,
      null,
      null,
      instance.files,
      error
    );
    // Return false
    return false;
  }
}

/**
 * Takes a single string of all options passed to a query and parses them, separating them based on commas if the comma exists outside of brackets
 * @param {[{attribute: string, files: [string]}]} instance the attribute's instance, including its file location(s)
 * @param {string} options the string of options passed from the query
 * @returns {array} an array of queries
 */
function parse_options(instance, options) {
  try {
    // Create initial variables ================================================
    let options_array = [];
    let bracket_count = 0;
    let square_count = 0;
    // Loop through the options by character ===================================
    // By checking for opening/closing brackets, we can slice the string when appropriate matches are found and capture the slice as a single query.
    // As options are found, slice_start tracks how far into the string we are so that we don't duplicate matches
    var slice_start = 0;
    // Perform the loop --------------------------------------------------------
    for (var i = 0; i < options.length; ) {
      // Track opening/closing square brackets (+ means opening, - means closing, 0 = no brackets present)
      if (options.charAt(i) === '[') {
        square_count = square_count + 1;
      }
      if (options.charAt(i) === ']') {
        square_count = square_count - 1;
      }
      // Track opening/closing parentheses (+ means opening, - means closing, 0 = no parentheses present)
      if (options.charAt(i) === '(' && square_count === 0) {
        bracket_count = bracket_count + 1;
      }
      if (options.charAt(i) === ')' && square_count === 0) {
        bracket_count = bracket_count - 1;
      }
      // If we're on a closing parenthesis, check to see if we're not inside square brackets and whether the closing parenthesis is a match for an opening one
      if (
        options.charAt(i) === ',' &&
        bracket_count === 0 &&
        square_count === 0
      ) {
        // A query was found, so build it ......................................
        // The query is assumed to be everything from the slice_start until the current closing parenthesis character
        let new_option = options.slice(slice_start, i).trim();
        // Add the query to the query array
        options_array = options_array.concat(new_option);
        // Update the start of the next slice by telling it to look at the character after this closing parenthesis
        slice_start = i + 1;
      }
      // Increment the character and check the next one for a query
      i = i + 1;
    }
    // Check for single values =================================================
    // The loop doesn't account for single values (no comma) or the final string in a comma separated list
    if (slice_start != options.length) {
      // The loop didn't reach the end, so catch whatever is left
      let new_option = options.slice(slice_start, options.length).trim();
      options_array = options_array.concat(new_option);
    }
    // Check for bad output ====================================================
    // Check for outstanding mismatched parentheses
    if (square_count != 0 || bracket_count != 0) {
      log_info(
        'error',
        'Unequal brackets',
        'Parsing query options',
        instance.attribute,
        null,
        null,
        instance.files,
        'Hydrogen found an unequal number of brackets in this attribute. This is likely a typo.'
      );
      // Return null
      return null;
    }
    // Return the array of options
    return options_array;
  } catch (error) {
    // Log any errors that weren't accounted for ===============================
    log_info(
      'error',
      'Unknown error',
      'Parsing query options',
      instance.attribute,
      null,
      null,
      instance.files,
      error
    );
    // Return null
    return null;
  }
}

/**
 * Builds Hydrogen
 * @param {string} command build | watch
 * @param {object} settings the user's settings
 * @returns a compiled Hydrogen CSS file
 */
function h2_compile_hydrogen(command, args) {
  try {
    // Start the build timer ===================================================
    const total_build_timer_start = process.hrtime.bigint();
    // Load and validated user settings ========================================
    // Start the settings timer ------------------------------------------------
    const parse_settings_timer_start = process.hrtime.bigint();
    // Load the settings -------------------------------------------------------
    const settings = parse_settings(args);
    // Validate the final settings ---------------------------------------------
    const validation = validate_settings(settings);
    // Only run if the config passes
    if (validation === true) {
      // End and log the settings timer ------------------------------------------
      const parse_settings_timer_end = process.hrtime.bigint();
      log_timer(
        settings,
        'Parsing and validating settings',
        parse_settings_timer_start,
        parse_settings_timer_end
      );
      // Next step ===============================================================
      // If enabled, clean the log directory -------------------------------------
      if (settings.clean === true) {
        clean_logs(settings);
      }
      // Set up environment vars for debugging
      var debug = false;
      // Check for the debug state
      if (settings.build.logs != null && settings.build.logs === true) {
        debug = true;
      }
      // Create the logs folder if it doesn't exist and debug is enabled
      var debug_data = {
        time: date_time(),
        enabled: false,
      };
      if (debug === true) {
        debug_data.enabled = true;
        let log_directory =
          get_output_path(settings, 'string') + '/hydrogen-logs';
        if (!fs.existsSync(log_directory)) {
          fs.mkdirSync(log_directory);
        }
        let log_time_directory =
          get_output_path(settings, 'string') +
          '/hydrogen-logs/' +
          debug_data.time;
        if (!fs.existsSync(log_time_directory)) {
          fs.mkdirSync(log_time_directory);
        }
      }
      // Start the parsing timer
      const input_data_parser_timer_start = process.hrtime.bigint();
      // Parse the project markup for both a single data-h2 attribute and all data-h2-property attributes
      var parsed_attribute_data = parse_input_data_for_attributes(
        settings,
        debug_data
      );
      // Check for at least 1 data-h2 attribute, otherwise log an error
      if (parsed_attribute_data.hydrogen != true) {
        log_info(
          'warning',
          'Missing data-h2 wrapper',
          'Attribute parsing',
          null,
          null,
          null,
          null,
          'Hydrogen couldn\'t find a "data-h2" attribute in your markup. This attribute is required for Hydrogen styles to work on your project.'
        );
      }
      // End the parsing timer
      const input_data_parser_timer_end = process.hrtime.bigint();
      log_timer(
        settings,
        'Scraping and parsing attributes',
        input_data_parser_timer_start,
        input_data_parser_timer_end
      );
      // Build the core CSS
      var hydrogen = generateCoreCSS(settings);
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
      var mediaQueryArray = generateMediaQueryArray(settings, state_array);
      // Generate a CSS variable file if the user has enabled them
      if (settings.build.var_export == true) {
        write_variable_file(settings);
      }
      // Start CSS construction timer
      const CSSTimerStart = process.hrtime.bigint();
      // Loop through attributes that have been found
      var debugValueArray = [];
      for (let property_data in parsed_attribute_data.properties) {
        for (let property_key in parsed_attribute_data.properties[property_data]
          .property_keys) {
          var property = property_key;
          for (let attribute_instance in parsed_attribute_data.properties[
            property_data
          ].property_keys[property_key]) {
            var instance = {
              attribute: attribute_instance,
              files:
                parsed_attribute_data.properties[property_data].property_keys[
                  property_key
                ][attribute_instance],
            };
            var falseAttribute = false;
            // NEW QUERY PARSER
            var values = parse_queries(instance, property);
            // Create a new debug value set
            var newDebugValueSet = {
              attribute: instance.attribute,
              valuesArray: values,
              values: [],
            };
            // Loop through the values
            if (values != null) {
              values.forEach(function (value) {
                // Add the value to the debug array
                var newDebugValue = {
                  value: value,
                };
                // Get the front of the query
                var mediaQuery = parse_value_for_media_and_options(
                  instance,
                  value
                ).media;
                var valueCSS;
                // Check to see if media queries were actually found (for example, to handle instances of (options), etc.)
                if (mediaQuery == null) {
                  log_info(
                    'error',
                    'Missing query key',
                    'CSS construction',
                    instance.attribute,
                    null,
                    null,
                    instance.files,
                    'This attribute contains a query definition that is missing a key. Check to ensure that all queries are linked to a media query key.'
                  );
                  falseAttribute = true;
                } else {
                  // Get the individual queries by splitting at : characters
                  let mediaModifiers = parse_modifiers(instance, mediaQuery);
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
                    settings.styles.foundations.media.forEach(function (query) {
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
                        log_info(
                          'warning',
                          'Empty ID modifier',
                          'CSS construction',
                          instance.attribute,
                          null,
                          null,
                          instance.files,
                          'This attribute contains a query using an empty :id[] modifier, so it has been omitted from the build.'
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
                        log_info(
                          'warning',
                          'Empty class modifier',
                          'CSS construction',
                          instance.attribute,
                          null,
                          null,
                          instance.files,
                          'This attribute contains a query using an empty :class[] modifier, so it has been omitted from the build.'
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
                        log_info(
                          'warning',
                          'Flex-grid child modifier',
                          'CSS construction',
                          instance.attribute,
                          null,
                          null,
                          instance.files,
                          "The flex-grid attribute doesn't support the use of the :children[] modifier, so this modifier has been ignored."
                        );
                      } else {
                        // The user is trying to target the children of an element with this Hydrogen attribute
                        var children = modifier.match(/\[([^\]]*)/);
                        if (children[1].trim() === '') {
                          // There were no children passed, so throw an error
                          log_info(
                            'warning',
                            'Empty children modifier',
                            'CSS construction',
                            instance.attribute,
                            null,
                            null,
                            instance.files,
                            'This attribute contains a query using an empty :children[] modifier, so it has been omitted from the build.'
                          );
                        } else {
                          // There were valid children, so assemble the child selector
                          var child_array = children[1].split(',');
                          child_array.forEach(function (item, item_index) {
                            final_children = final_children.concat(item.trim());
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
                    // var internalValuesRegex = /(?<=\().*(?=\))/g; // Gets the internal values of the media query (e.g. red, all from base(red, all))
                    var internalValues = parse_value_for_media_and_options(
                      instance,
                      value
                    ).options.slice(1, -1);
                    // Check to see if the query was empty (e.g. base() vs base(things))
                    if (internalValues != null && internalValues.length != 0) {
                      // Get individual values from the internal output
                      var individual_options = parse_options(
                        instance,
                        internalValues
                      );
                      if (individual_options != null) {
                        if (property == 'custom') {
                          // This will be for assembling custom CSS Hydrogen groups in the config so that you can consolidate recurring styles behind one attribute, in the same way you would with a class
                        } else if (
                          property === 'align-content' ||
                          property === 'align-items' ||
                          property === 'align-self' ||
                          property === 'cursor' ||
                          property === 'display' ||
                          property === 'flex-basis' ||
                          property === 'flex-direction' ||
                          property === 'flex-grow' ||
                          property === 'flex-wrap' ||
                          property === 'font-style' ||
                          property === 'font-weight' ||
                          property === 'grid-column' ||
                          property === 'grid-row' ||
                          property === 'justify-content' ||
                          property === 'justify-items' ||
                          property === 'list-style' ||
                          property === 'opacity' ||
                          property === 'order' ||
                          property === 'outline' ||
                          property === 'text-align' ||
                          property === 'text-decoration' ||
                          property === 'text-transform' ||
                          property === 'vertical-align'
                        ) {
                          // Parse basic properties
                          valueCSS = parse_basic_property(
                            settings,
                            'basic',
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (
                          property === 'height' ||
                          property === 'line-height' ||
                          property === 'leading' ||
                          property === 'margin-top' ||
                          property === 'margin-right' ||
                          property === 'margin-bottom' ||
                          property === 'margin-left' ||
                          property === 'max-height' ||
                          property === 'max-width' ||
                          property === 'min-height' ||
                          property === 'min-width' ||
                          property === 'padding-top' ||
                          property === 'padding-right' ||
                          property === 'padding-bottom' ||
                          property === 'padding-left' ||
                          property === 'width'
                        ) {
                          // Parse size properties
                          valueCSS = parse_basic_property(
                            settings,
                            'size',
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (
                          property === 'margin' ||
                          property === 'padding'
                        ) {
                          // Parse space properties
                          valueCSS = parse_space(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (
                          property == 'background-color' ||
                          property == 'bg-color'
                        ) {
                          valueCSS = parse_background_color(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'border') {
                          valueCSS = parse_border(
                            settings,
                            instance,
                            property,
                            mediaQuery,
                            cssSelector,
                            individual_options
                          );
                        } else if (
                          property == 'font-color' ||
                          property == 'color'
                        ) {
                          valueCSS = parse_text_color(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'container') {
                          valueCSS = parse_container(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'fill') {
                          valueCSS = parse_fill(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'flex-grid') {
                          valueCSS = parse_flex_grid(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'flex-item') {
                          valueCSS = parse_flex_item(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'font-family') {
                          valueCSS = parse_font_family(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'font-size') {
                          valueCSS = parse_font_size(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'gap') {
                          valueCSS = parse_gap(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'grid-template-columns') {
                          valueCSS = parse_grid_template(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'grid-template-rows') {
                          valueCSS = parse_grid_template(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (
                          property == 'layer' ||
                          property == 'z-index'
                        ) {
                          valueCSS = parse_layer(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (
                          property == 'offset' ||
                          property == 'location'
                        ) {
                          valueCSS = parse_offset(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'overflow') {
                          valueCSS = parse_overflow(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'overlay') {
                          valueCSS = parse_overlay(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'position') {
                          valueCSS = parse_position(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'radius') {
                          valueCSS = parse_radius(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'shadow') {
                          valueCSS = parse_shadow(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'transform') {
                          valueCSS = parse_transform(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'transition') {
                          valueCSS = parse_transition(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else if (property == 'visibility') {
                          valueCSS = parse_visibility(
                            settings,
                            instance,
                            property,
                            cssSelector,
                            individual_options
                          );
                        } else {
                          log_info(
                            'error',
                            'Invalid property',
                            'CSS construction',
                            instance.attribute,
                            null,
                            null,
                            instance.files,
                            "This attribute is using a property that isn't supported by Hydrogen. Please refer to the documentation for a complete list of supported properties."
                          );
                          falseAttribute = true;
                        }
                      } else {
                        log_info(
                          'error',
                          'Invalid query options',
                          'Parsing query options',
                          instance.attribute,
                          null,
                          null,
                          instance.files,
                          'This attribute contains a query with invalid options, so the attribute has been omitted from the build'
                        );
                        falseAttribute = true;
                      }
                    } else {
                      log_info(
                        'error',
                        'Empty query definitions',
                        'CSS construction',
                        instance.attribute,
                        null,
                        null,
                        instance.files,
                        "This attribute contains a query that hasn't been passed any options, so the attribute has been omitted from the build."
                      );
                      falseAttribute = true;
                    }
                  } else {
                    log_info(
                      'error',
                      'Invalid media query',
                      'CSS construction',
                      instance.attribute,
                      null,
                      null,
                      instance.files,
                      'This attribute contains an invalid media query key in one of its definitions. Please ensure you use a query key defined in your configuration.'
                    );
                    falseAttribute = true;
                  }
                }
                if (valueCSS == null) {
                  falseAttribute = true;
                }
                // Check to see if the attribute passed as valid
                if (falseAttribute === false) {
                  if (settings.build.validation === true) {
                    // Validate CSS
                    var validation_string = '';
                    valueCSS.forEach(function (c, c_index) {
                      validation_string = validation_string + c;
                    });
                    var validation = validator.validateString(
                      validation_string,
                      ''
                    );
                    for (const [filename, errors] of validation) {
                      if ((errors != null) & (errors.length != 0)) {
                        errors.forEach(function (e, e_index) {
                          var target_css = e.property + ': ' + e.css + ';';
                          log_info(
                            'error',
                            'Invalid CSS',
                            'CSS construction',
                            instance.attribute,
                            validation_string,
                            target_css,
                            instance.files
                          );
                        });
                      }
                    }
                  }
                  // Add to media css string, and only assemble the Hydrogen file at the end, with the correct order for queries by looping through them
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
                        if (settings.build.dark_mode == 'toggle') {
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
            }
            // Add the whole attribute value set to the debug array
            debugValueArray = debugValueArray.concat(newDebugValueSet);
          }
        }
      }
      // Write the values debug file
      if (debug_data.enabled === true) {
        fs.writeFileSync(
          get_output_path(settings, 'string') +
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
            get_output_path(settings, 'string') +
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
          path.join(get_output_path(settings, 'string') + '/hydrogen.raw.css')
        ) == true
      ) {
        fs.unlinkSync(
          path.join(get_output_path(settings, 'string') + '/hydrogen.raw.css')
        );
      }
      // Write the new file ----------------------------------------------------
      fs.writeFileSync(
        path.join(get_output_path(settings, 'string') + '/hydrogen.raw.css'),
        hydrogen
      );
      // Write debug raw CSS ---------------------------------------------------
      if (debug_data.enabled === true) {
        fs.writeFileSync(
          path.join(
            get_output_path(settings, 'string') +
              '/hydrogen-logs/' +
              debug_data.time +
              '/output.css'
          ),
          hydrogen
        );
      }
      // End CSS construction timer
      const CSSTimerEnd = process.hrtime.bigint();
      log_timer(settings, 'CSS construction', CSSTimerStart, CSSTimerEnd);
      // Run Autoprefixer and CSS Nano
      process_hydrogen(settings, command, total_build_timer_start, debug_data);
    } else {
      return false;
    }
  } catch (error) {
    // Log any errors that weren't accounted for ===============================
    log_info(
      'error',
      'Unknown error',
      'Hydrogen build',
      null,
      null,
      null,
      null,
      error
    );
    // Return false
    return false;
  }
}

module.exports = {
  h2_compile_hydrogen,
};
