// Hydrogen: Parse attributes
'use strict';

// Hydrogen data models
let Settings = require('../data/settings-model-definition');
/** @typedef {import('../data/settings-model-definition').Settings} Settings */
let Properties = require('../data/property-model-definition');
/** @typedef {import('../data/property-model-definition').Properties} Properties */

// Hydrogen data imports
let state_data = require('../data/state-model');
let property_data_model = require('../data/property-model');
let custom_props = require('../data/properties-custom');

// Hydrogen function imports
const { log_message } = require('../scripts/logs/log-message');

// Vendor imports
var fs = require('fs');
var glob = require('glob');
var path = require('path');

// Scripts

/**
 * Parses a comma separated list and returns an array of values
 * @param {string} attribute
 * @param {string} query
 * @param {string} file
 * @param {string} input
 * @returns {string[] | false}
 */
function parse_list(settings, attribute, query, file, input, character) {
  let parsed_input = [];
  // Create counters for tracking opening/closing brackets
  let bracket_count = 0;
  let square_count = 0;
  // Set the slice position to the start of the string
  // As options are found, this variable tracks how far into the string we are so that we don't duplicate matches
  let slice_start = 0;
  // Loop over each character in the options string
  // By checking for opening/closing brackets, we can slice the string when appropriate matches are found and capture the slice as a single query
  for (let i = 0; i < input.length; ) {
    // If the character is "[" increase the count
    if (input.charAt(i) === '[') {
      square_count = square_count + 1;
    }
    // If the character is "]" decrease the count
    if (input.charAt(i) === ']') {
      square_count = square_count - 1;
    }
    // If the character is "(" increase the count
    if (input.charAt(i) === '(' && square_count === 0) {
      bracket_count = bracket_count + 1;
    }
    // If the character is ")" decrease the count
    if (input.charAt(i) === ')' && square_count === 0) {
      bracket_count = bracket_count - 1;
    }
    // If the current character is a "," and the bracket counts are properly balanced, a complete option was found
    if (
      input.charAt(i) === character &&
      bracket_count === 0 &&
      square_count === 0
    ) {
      // The option is assumed to be everything from slice_start until the current comma character
      let new_option = input.slice(slice_start, i).trim();
      // Add the option to the options array
      parsed_input = parsed_input.concat(new_option);
      // Update the start of the next slice by telling it to look at the character after this comma
      slice_start = i + 1;
    }
    // Increment the character and restart the check
    i = i + 1;
  }
  // Check for a single option
  // The loop above doesn't account for a single input (no comma) or the final string in a comma separated list, so we have to check for it manually by seeing if slice_start matches the length of the input (everything was caught) or if it ended early (something was missed)
  if (slice_start != input.length) {
    // Set the option based on the current slice position to the end of the input
    let new_option = input.slice(slice_start, input.length).trim();
    // Add the option to the options array
    parsed_input = parsed_input.concat(new_option);
  } // Check to see if the options array is empty, and if it is, throw a warning
  if (parsed_input.length === 0) {
    log_message({
      type: 'warning',
      settings: settings,
      step: 'Parsing query options',
      attribute: attribute,
      query: query,
      files: [file],
      message:
        'This query has no options passed to it, so it has been ignored.',
    });
  }
  // Finally, check for outstanding mismatched brackets, because this means that there was a typo
  if (square_count != 0 || bracket_count != 0) {
    log_message({
      type: 'error',
      settings: settings,
      message:
        'Hydrogen found an unequal number of brackets in this attribute. This is likely a typo.',
      step: 'Parsing query options',
      attribute: attribute,
      query: query,
      files: [file],
    });
    return false;
  } else {
    return parsed_input;
  }
}

/**
 * Takes the media string of a query and parses it for modifiers by breaking it apart at : characters
 * @param {Settings} settings The user's settings
 * @param {string} property The relevant Hydrogen property
 * @param {string} attribute The full attribute used in the markup
 * @param {string} input The options string passed from the parser
 * @param {string} file The file this attribute was found in
 * @returns {{children: string[], class: string, id: string, media: string, mode: string, selectors: string[], state: string, theme: "default" | string} | false} An object containing parsed modifiers
 */
function parse_modifiers(settings, property, attribute, query, input, file) {
  try {
    // Break the initial input up by ":" characters
    let modifier_array = input.split(':');
    // Create an empty array for tracking individual modifiers
    let parsed_modifier_array = [];
    // Not entirely sure what this is doing or how it works... Original note was that it found ":" characters that didn't exist inside of square brackets, but I can't remember why that was necessary
    for (let i = 0, j = 0; i < modifier_array.length; i++) {
      parsed_modifier_array[j] =
        (parsed_modifier_array[j] ? parsed_modifier_array[j] + ':' : '') +
        modifier_array[i];
      if (
        parsed_modifier_array[j].indexOf('[') == -1 ||
        parsed_modifier_array[j].indexOf(']') != -1
      ) {
        j++;
      }
    }
    // Create initial values for each modifier class
    let parsed_children = [];
    let parsed_class = '';
    let parsed_id = '';
    let parsed_media = '';
    let parsed_mode = 'default';
    let parsed_selectors = [];
    let parsed_state = '';
    let parsed_theme = 'default'; // Default to start, replaced if a theme is found
    // Check to make sure the modifier list wasn't empty
    if (parsed_modifier_array.length > 0) {
      // Loop through the modifiers that were found
      parsed_modifier_array.forEach(function (modifier) {
        // Check for matching media queries
        let media_check = false;
        settings.media.queries.forEach(function (query) {
          if (query.key === modifier) {
            media_check = true;
            parsed_media = modifier;
          }
        });
        // The modifier wasn't a media value, so check for modes
        if (media_check === false) {
          let mode_check = false;
          if (modifier === 'dark') {
            mode_check = true;
            parsed_mode = modifier;
          }
          if (modifier === 'all') {
            mode_check = true;
            parsed_mode = modifier;
          }
          // The modifier wasn't a mode value, so check for states
          if (mode_check === false) {
            let state_check = false;
            state_data.forEach(function (state) {
              if (state === modifier) {
                state_check = true;
                parsed_state = modifier;
              }
            });
            // The modifier wasn't a state value, so check for themes
            if (state_check === false) {
              let theme_check = false;
              Object.keys(settings.themes).forEach(function (theme_key) {
                if (theme_key === modifier) {
                  theme_check = true;
                  parsed_theme = modifier;
                }
              });
              // The modifier wasn't a theme value, so check for selectors or children
              if (theme_check === false) {
                // Check for the selector modifier
                if (modifier.startsWith('selectors[') === true) {
                  // Strip the selector[ and final ]
                  let selectors = modifier.slice(0, -1);
                  selectors = selectors.substring(10);
                  // Parse the list for values
                  parsed_selectors = parse_list(
                    settings,
                    attribute,
                    query,
                    file,
                    selectors,
                    ','
                  );
                } else if (modifier.startsWith('children[') === true) {
                  // Check to see if the property is flex-grid first, because the children modifier isn't available on that property
                  if (property === 'flex-grid') {
                    log_message({
                      type: 'warning',
                      settings: settings,
                      message:
                        "The flex-grid property doesn't support the use of the :children[] modifier, so this modifier has been ignored.",
                      step: 'Parsing query children modifiers',
                      attribute: attribute,
                      query: query,
                      files: [file],
                    });
                  } else {
                    // Strip the children[ and final ]
                    let children = modifier.slice(0, -1);
                    children = children.substring(9);
                    // Parse the list for values
                    parsed_children = parse_list(
                      settings,
                      attribute,
                      query,
                      file,
                      children,
                      ','
                    );
                  }
                } else if (modifier.startsWith('id[') === true) {
                  // Log deprecation warning
                  log_message({
                    type: 'warning',
                    settings: settings,
                    message:
                      'The :id[] and class modifiers have been deprecated in favor of the more flexible :selectors[] modifier. Please migrate when possible.',
                    step: 'Parsing query ID modifiers',
                    attribute: attribute,
                    query: query,
                    files: [file],
                  });
                  // The user is trying to target an element that contains both this Hydrogen attribute AND a specific ID
                  let ids = modifier.match(/\[([^\]]*)/);
                  // Check to see if the ID group was empty, and if it was, throw an error, otherwise, pass the parsed IDs
                  if (ids[1].trim() === '') {
                    log_message({
                      type: 'warning',
                      settings: settings,
                      message:
                        'This query is using an empty :id[] modifier, so this modifier has been ignored.',
                      step: 'Parsing query ID modifiers',
                      attribute: attribute,
                      query: query,
                      files: [file],
                    });
                  } else {
                    // Split the ID array by commas
                    let id_array = ids[1].split(',');
                    // Assemble the ID selector
                    id_array.forEach(function (item) {
                      parsed_id = parsed_id + '#' + item.trim();
                    });
                  }
                } else if (modifier.startsWith('class[') === true) {
                  // Log deprecation warning
                  log_message({
                    type: 'warning',
                    settings: settings,
                    message:
                      'The :id[] and class modifiers have been deprecated in favor of the more flexible :selectors[] modifier. Please migrate when possible.',
                    step: 'Parsing query class modifiers',
                    attribute: attribute,
                    query: query,
                    files: [file],
                  });
                  // The user is trying to target an element that contains both this Hydrogen attribute AND a specific class
                  let classes = modifier.match(/\[([^\]]*)/);
                  // Check to see if the class group was empty, and if it was, throw an error, otherwise, pass the parsed classes
                  if (classes[1].trim() === '') {
                    log_message({
                      type: 'warning',
                      settings: settings,
                      message:
                        'This query is using an empty :class[] modifier, so this modifier has been ignored.',
                      step: 'Parsing query class modifiers',
                      attribute: attribute,
                      query: query,
                      files: [file],
                    });
                  } else {
                    // Split the class array by commas
                    let class_array = classes[1].split(',');
                    // Assemble the class selector
                    class_array.forEach(function (item) {
                      parsed_class = parsed_class + '.' + item.trim();
                    });
                  }
                }
              }
            }
          }
        }
      });
    } else {
      // No modifier were found at all, so throw a warning
      log_message({
        type: 'warning',
        settings: settings,
        step: 'Parsing query modifiers',
        attribute: attribute,
        query: query,
        files: [file],
        message: 'This query is missing a media key, so it has been ignored.',
      });
    }
    // Return the parsed modifier object
    let modifiers = {
      children: parsed_children,
      class: parsed_class,
      id: parsed_id,
      media: parsed_media,
      mode: parsed_mode,
      selectors: parsed_selectors,
      state: parsed_state,
      theme: parsed_theme,
    };
    return modifiers;
  } catch (error) {
    log_message({
      type: 'error',
      settings: settings,
      message: error,
      step: 'Parsing query modifiers',
      attribute: attribute,
      query: query,
      files: [file],
    });
    return false;
  }
}

/**
 * Takes a single string of all options passed to a query and parses them, separating them based on commas if the comma exists outside of brackets
 * @param {Settings} settings The user's settings
 * @param {string} property The relevant Hydrogen property
 * @param {string} attribute The full attribute used in the markup
 * @param {string} input The options string passed from the parser
 * @param {string} file The file this attribute was found in
 * @returns {string[] | false} The array of individual options
 */
function parse_options(settings, property, attribute, query, input, file) {
  try {
    // Set up a new array to collect the parsed options
    let options_array = parse_list(
      settings,
      attribute,
      query,
      file,
      input,
      ','
    );
    if (options_array) {
      return options_array;
    } else {
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      settings: settings,
      message: error,
      step: 'Parsing query options',
      attribute: attribute,
      query: query,
      files: [file],
    });
    return false;
  }
}

/**
 * Takes a query and parses it for the media string (including modifiers) and the options provided to it
 * @param {Settings} settings The user's settings
 * @param {string} property The relevant Hydrogen property
 * @param {string} attribute The full attribute used in the markup
 * @param {string} input The query string passed from the parser
 * @param {string} file The file this attribute was found in
 * @returns {{modifiers: {children: string[], class: string, id: string, media: string, mode: string, state: string}, prefix: string, options: string[]} | false} The query's modifier prefix as a string, parsed modifiers, and an array of its options
 */
function parse_modifiers_and_options(
  settings,
  property,
  attribute,
  input,
  file
) {
  try {
    // Check to see if modifiers exist first by checking the first character for opening brackets
    if (input.charAt(0) === '(') {
      log_message({
        type: 'warning',
        settings: settings,
        message: 'This query is missing a media key, so it has been ignored.',
        step: 'Parsing query syntax',
        attribute: attribute,
        query: input,
        files: [file],
      });
      return false;
    } else {
      // Create a counter for brackets
      let open_bracket = 0;
      // Loop backwards through the input
      // This is because we need to find the options encased in the final pair of ()
      for (let i = input.length; i > 0; i -= 1) {
        // If the character is "(" increase the count
        if (input.charAt(i) === '(') open_bracket++;
        // If the character is ")" decrease the count
        if (input.charAt(i) === ')') open_bracket--;
        // If brackets are properly matched and the current character isn't empty, use the character's index to return everything before it as the modifier prefix, and everything from the index onwards as the options.
        if (open_bracket === 0 && input.charAt(i) != '') {
          // Parse modifiers
          let modifiers = parse_modifiers(
            settings,
            property,
            attribute,
            input,
            input.substring(0, i),
            file
          );
          // Parse options passed to the query
          let options;
          if (custom_props.includes(property)) {
            options = parse_options(
              settings,
              property,
              attribute,
              input,
              input.substring(i).slice(1, -1),
              file
            );
          } else {
            options = [input.substring(i).slice(1, -1)];
          }
          // Return the modifiers and options to the query object
          if (modifiers && options) {
            return {
              modifiers: modifiers,
              prefix: input.substring(0, i),
              options: options,
            };
          } else {
            // The modifiers or options failed, so throw an error
            return false;
          }
        }
      }
    }
  } catch (error) {
    log_message({
      type: 'error',
      settings: settings,
      message: error,
      step: 'Parsing query syntax',
      attribute: attribute,
      query: input,
      files: [file],
    });
    return false;
  }
}

/**
 * Takes an attribute instance and deconstructs it to identify individual queries passed as options
 * @param {Settings} settings The user's settings
 * @param {string} property The relevant Hydrogen property
 * @param {string} attribute The full attribute used in the markup
 * @param {string} input The values string passed from the parser
 * @param {string} file The file this attribute was found in
 * @returns {[{modifiers: {children: string[], class: string, id: string, media: string, mode: string, state: string}, options: string[], prefix: string, query: string}] | false}
 */
function parse_instance_queries(settings, property, attribute, input, file) {
  try {
    // Create an empty array to store unparsed queries
    let query_array = [];
    // Create an empty array to store the final queries
    let queries = [];
    // Create counters for tracking opening/closing brackets
    let bracket_count = 0;
    let square_count = 0;
    // Check for extra quote characters at the beginning of the string and remove them
    if (
      (input.charAt(0) === '"') |
      (input.charAt(0) === "'") |
      (input.charAt(0) === '`')
    ) {
      input = input.slice(1);
    }
    // Set the slice position to the start of the string
    // As options are found, this variable tracks how far into the string we are so that we don't duplicate matches
    let slice_start = 0;
    // Loop over each character in the options string
    // By checking for opening/closing brackets, we can slice the string when appropriate matches are found and capture the slice as a single query
    for (let i = 0; i < input.length; ) {
      // If the character is "[" increase the count
      if (input.charAt(i) === '[') {
        square_count = square_count + 1;
      }
      // If the character is "]" decrease the count
      if (input.charAt(i) === ']') {
        square_count = square_count - 1;
      }
      // If the character is "(" increase the count
      if (input.charAt(i) === '(' && square_count === 0) {
        bracket_count = bracket_count + 1;
      }
      // If the character is ")" decrease the count
      if (input.charAt(i) === ')' && square_count === 0) {
        bracket_count = bracket_count - 1;
      }
      // If the current character is a ")" and the bracket counts are properly balanced, a complete query was found
      if (
        input.charAt(i) === ')' &&
        bracket_count === 0 &&
        square_count === 0
      ) {
        // The option is assumed to be everything from slice_start until the current ")" character
        let new_query = input.slice(slice_start, i + 1).trim();
        // Add the query to the query array
        query_array = query_array.concat(new_query);
        // Update the start of the next slice by telling it to look at the character after this bracket
        slice_start = i + 1;
      }
      // Increment the character and check the next one for a query
      i = i + 1;
    }
    // Check for outstanding mismatched brackets, because this means that there was a typo
    if (square_count != 0 || bracket_count != 0) {
      log_message({
        type: 'error',
        settings: settings,
        message:
          'Hydrogen found an unequal number of brackets in this attribute. This is likely a typo.',
        step: 'Parsing attribute queries',
        attribute: attribute,
        files: [file],
      });
      return false;
    }
    // Check to see if the query array is empty and close the parser if it is
    if (query_array.length === 0) {
      log_message({
        type: 'warning',
        settings: settings,
        message:
          'This attribute has no queries passed to it, so it has been ignored.',
        step: 'Parsing attribute queries',
        attribute: attribute,
        files: [file],
      });
      return false;
    }
    // Loop through the queries that were found and parse them, after which return them
    query_array.forEach(function (query) {
      let parsed_query = parse_modifiers_and_options(
        settings,
        property,
        attribute,
        query,
        file
      );
      // If a parsed query was found, add it to the final query array - don't return false here because we want to return all valid queries without failing on bad ones, which should be ignored
      if (parsed_query) {
        queries.push({
          modifiers: parsed_query.modifiers,
          prefix: parsed_query.prefix,
          options: parsed_query.options,
          query: query,
          selectors: [],
        });
      }
    });
    return queries;
  } catch (error) {
    log_message({
      type: 'error',
      settings: settings,
      message: error,
      step: 'Parsing attribute queries',
      attribute: attribute,
      files: [file],
    });
    return false;
  }
}

/**
 * Parses the user's input to check if an instance of the data-h2 wrapper attribute exists and to collect all instances of Hydrogen style properties to be used to assemble CSS
 * @param {Settings} settings The user's settings
 * @returns {Properties | false} The properties model populated with parsed data for all attributes used
 */
function parse_input_data_for_attributes(settings) {
  try {
    /** @type {Properties} */
    let property_data = JSON.parse(JSON.stringify(property_data_model));
    // Get the user's input paths as both a glob and an array
    let user_input_paths_as_glob = settings.input.parsed.glob;
    let user_input_paths_as_array = settings.input.parsed.array;
    // Define directories Hydrogen should ignore
    let ignored_directories = ['hydrogen-logs/**/*'];
    // Define files Hydrogen should ignore
    let ignored_files = [
      'hydrogen.css',
      'hydrogen.raw.css',
      'hydrogen.vars.css',
    ];
    // Create an empty array to store ignored paths
    let assembled_ignored_paths = [];
    // Loop through the user's input folders and create path strings for each Hydrogen file that needs to be ignored
    user_input_paths_as_array.forEach(function (user_input_path) {
      ignored_directories.forEach(function (ignored_dir) {
        assembled_ignored_paths = assembled_ignored_paths.concat(
          path.join(user_input_path + '/**/' + ignored_dir)
        );
      });
      ignored_files.forEach(function (ignored_file) {
        assembled_ignored_paths = assembled_ignored_paths.concat(
          path.join(user_input_path + '/**/' + ignored_file)
        );
      });
    });
    // The glob framework doesn't accept '\' characters and treats them as escapes, so replace them with '/'
    let sanitized_input_glob = user_input_paths_as_glob.replace(/\\/g, '/');
    let sanitized_ignored_paths = [];
    assembled_ignored_paths.forEach((path) => {
      sanitized_ignored_paths = sanitized_ignored_paths.concat(
        path.replace(/\\/g, '/')
      );
    });
    // Assemble the user's folder paths and the complete ignored file paths into a usable glob
    let user_input_paths_with_ignored_files = glob.sync(
      '{' + sanitized_input_glob + '}',
      {
        ignore: sanitized_ignored_paths,
      }
    );
    // Check that glob succeeded
    if (user_input_paths_with_ignored_files) {
      // Create a RegEx for the Hydrogen wrapper attribute (data-h2) - note the RegEx finds matches of the attribute not followed by a "-" character to avoid conflicts with other Hydrogen attributes
      let hydrogen_wrapper_attribute_regex = /data-h2(?![-\]])/g;
      // Create a RegEx for matching Hydrogen style attributes
      // 2.0.0-beta.29 parser
      // let hydrogen_style_attribute_regex = /data-h2-([^=\s'"]+)((=|["']+:+\s*)(\\)?["'{]([^"'}]*)["'}]{1})/g;
      // 2.0.0-beta.30 parser that also matches data-h2-property: {}
      // let hydrogen_style_attribute_regex = /(data-h2-)([a-zA-Z-]*)((=|.?:)(\s?)(\\?'([^']*)|\\?"([^"]*))|(:)(\s?)({([^}]*)))/gm;
      // 2.0.0-beta.30 parser without data-h2-property: {} matching
      let hydrogen_style_attribute_regex =
        /(data-h2-)([a-zA-Z-]*)((=|.?:)(\s*)(\\?'([^']*)|\\?"([^"]*)|\\?`([^`]*)))/gm;
      // Create a counter for reporting on files processed
      let file_count = 0;
      // Loop through valid input files and match both the Hydrogen wrapper attribute and any Hydrogen style attributes
      for (let file in user_input_paths_with_ignored_files) {
        // Create a variable for the current file's path
        let attribute_file = user_input_paths_with_ignored_files[file];
        // Convert the file's path to a string for later reference
        let file_path_string =
          user_input_paths_with_ignored_files[file].toString();
        // Check to see if the path is a file
        if (fs.lstatSync(attribute_file).isDirectory() === false) {
          // Count the file
          file_count = file_count + 1;
          // Get the file's contents and convert it to a string for parsing
          let file_data = fs.readFileSync(attribute_file).toString();
          // Match the contents of the file for the Hydrogen wrapper attribute and if it's found, indicate it in the property data
          if (file_data.match(hydrogen_wrapper_attribute_regex) != null) {
            property_data.hydrogen = true;
          }
          // Now match for Hydrogen style attributes and collect their match groups
          // Set an empty array for RegEx matches
          let match_array;
          // Set an empty array to store the final attributes and their groups
          let attributes = [];
          while (
            (match_array = hydrogen_style_attribute_regex.exec(file_data)) !==
            null
          ) {
            if (
              match_array.index === hydrogen_style_attribute_regex.lastIndex
            ) {
              hydrogen_style_attribute_regex.lastIndex++;
            }
            attributes.push({
              // Ensure that all matches have whitespace characters that aren't spaces removed
              attribute: match_array[0]
                .replace(/\n/g, '')
                .replace(/\r/g, '')
                .replace(/\t/g, ''),
              groups: [
                match_array[1]
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
                  .replace(/\t/g, ''),
                match_array[2]
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
                  .replace(/\t/g, ''),
                match_array[3]
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
                  .replace(/\t/g, ''),
                match_array[4]
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
                  .replace(/\t/g, ''),
                match_array[5]
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
                  .replace(/\t/g, ''),
                match_array[6]
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
                  .replace(/\t/g, ''),
              ],
            });
          }
          // Check to see if attributes were found in this file
          if (attributes.length > 0) {
            // Loop through each attribute for parsing
            attributes.forEach(function (match) {
              // Set the attribute for use
              let attribute = match.attribute;
              // Get the property value from the attribute
              let property = match.groups[1];
              // Set a validity check
              let validity = false;
              // Loop through the available properties
              property_data.properties.forEach(function (prop) {
                // Loop through the properties in the model
                prop.keys.forEach(function (prop_key) {
                  // Check for a match in each property's key list
                  if (prop_key.name === property) {
                    // Indicate a valid property was found
                    validity = true;
                    // Loop through the instance array to check if the attribute was recorded previously
                    let attribute_status = false;
                    prop_key.instances.forEach(function (prop_instance) {
                      if (prop_instance.attribute === attribute) {
                        // A match was found, so add this attribute's file location to the existing list if it's not already there
                        attribute_status = true;
                        if (
                          prop_instance.files.includes(file_path_string) ===
                          false
                        ) {
                          prop_instance.files =
                            prop_instance.files.concat(file_path_string);
                        }
                      }
                    });
                    if (attribute_status === false) {
                      // No match was found, so analyze and build the values
                      let values = parse_instance_queries(
                        settings,
                        prop_key.name,
                        attribute,
                        match.groups[5],
                        file_path_string
                      );
                      // Ensure the values returned okay
                      if (values) {
                        // Add this attribute as a new instance
                        prop_key.instances.push({
                          attribute: attribute,
                          files: [file_path_string],
                          values: values,
                        });
                      }
                    }
                  }
                });
              });
              // The property didn't match an existing unique Hydrogen property, so treat it as a standard CSS property instead
              if (!validity) {
                // Parse its values
                let values = parse_instance_queries(
                  settings,
                  property,
                  attribute,
                  match.groups[5],
                  file_path_string
                );
                // Ensure the values returned okay
                if (values != false) {
                  // Add this attribute as a new property, including its first instance
                  let new_property = {
                    group: 'css',
                    id: property,
                    incompatibilities: [],
                    keys: [
                      {
                        instances: [
                          {
                            attribute: attribute,
                            files: [file_path_string],
                            values: values,
                          },
                        ],
                        name: property,
                      },
                    ],
                    syntaxes: [
                      {
                        default: true,
                        options: [
                          {
                            required: true,
                            types: {
                              css: [property],
                              tokens: [],
                            },
                            value: 'css',
                          },
                        ],
                      },
                    ],
                    title: {
                      en: '',
                      fr: '',
                    },
                  };
                  property_data.properties =
                    property_data.properties.concat(new_property);
                }
              }
            });
          }
        }
      }
      // Check to see if logging has been enabled, and if it has, write a property log file
      if (settings.logging.logs) {
        fs.writeFileSync(
          path.join(settings.logging.directory + '/property-data.json'),
          JSON.stringify(property_data, null, ' ')
        );
      }
      // Log that Hydrogen is exporting variables
      let label = ' files were processed...';
      if (file_count === 1) {
        label = ' file was processed...';
      }
      log_message({
        type: 'system',
        step: file_count + label,
      });
      // Return the property data
      return property_data;
    } else {
      log_message({
        type: 'error',
        settings: settings,
        step: 'Parsing input for attributes',
        files: user_input_paths_as_array,
        error: new Error('The glob package failed to produce an input glob.'),
      });
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      settings: settings,
      step: 'Parsing input for attributes',
      files: user_input_paths_as_array,
      error: error,
    });
    return false;
  }
}

module.exports = {
  parse_input_data_for_attributes,
};
