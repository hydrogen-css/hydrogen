// Hydrogen: Parse attributes
'use strict';

// Vendor dependencies
var colors = require('colors');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

// Hydrogen dependencies
var { getUserInput } = require('./generate-paths');
var { getUserOutput } = require('./generate-paths');
var { log_info } = require('./logs');

/**
 * Loads the property data model from the modules data directory
 * @returns {object} a data model containing all relevant property data
 */
function load_property_data() {
  try {
    // Load the property data model ============================================
    var property_data = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../data/properties.json'))
    );
    // Return the data
    return property_data;
  } catch (error) {
    // Catch any errors ========================================================
    log_info(
      'error',
      'Unknown error',
      'Loading Hydrogen property model',
      null,
      null,
      null,
      null,
      error
    );
    return false;
  }
}

/**
 * Parses the user's input to check if an instance of the data-h2 wrapper attribute exists and to collect all instances of Hydrogen style properties to be used to assemble CSS
 * @param {boolean} debug Indicates if debug is enabled
 * @returns {{hydrogen: boolean, properties: [{id: string, property: string, syntax: [{attribute: string, default: boolean, options: [{key: string, types: {key: boolean, css: boolean}, required: boolean, values: []}]}], keys: [{key: string, instances: [{attribute: string, files: []}]}]}]}}
 */
function parse_input_data_for_attributes(settings, debug) {
  try {
    // Set up working data
    var user_input_paths_as_glob = getUserInput(settings, 'glob'); // Gets a glob version of the user's input paths
    var user_input_paths_as_array = getUserInput(settings, 'array'); // Gets an array version of the user's input paths
    var property_data = load_property_data();
    var ignored_directories = ['hydrogen-logs/**/*'];
    var ignored_files = [
      'hydrogen.css',
      'hydrogen.raw.css',
      'hydrogen.vars.css',
    ]; // The list of Hydrogen files to be ignored
    var assembled_ignored_paths = [];
    // Loop through the user's input folders and create path strings for each Hydrogen file that needs to be ignored
    user_input_paths_as_array.forEach(function (user_input_path) {
      ignored_directories.forEach(function (ignored_dir, ignored_dir_index) {
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
    // Sanitize the input glob and ignored files array because the glob module doesn't accept '\' characters
    user_input_paths_as_glob = user_input_paths_as_glob.replace(/\\/g, '/');
    assembled_ignored_paths.forEach(function (
      ignored_path,
      ignored_path_index
    ) {
      assembled_ignored_paths[ignored_path_index] = ignored_path.replace(
        /\\/g,
        '/'
      );
    });
    // Assemble the user's folder paths and the complete ignored file paths into a usable glob
    var user_input_paths_with_ignored_files = glob.sync(
      '{' + user_input_paths_as_glob + '}',
      {
        ignore: assembled_ignored_paths,
      }
    );
    // Run expressions on each file to check for the Hydrogen wrapper attribute and any style attributes that have been used
    var hydrogen_wrapper_attribute_regex = /data-h2(?![-\]])/g; // Finds any data-h2 string not followed by a "-"
    var hydrogen_style_attribute_regex =
      /data-h2-([^=\s'"]+)((=|["']+:+\s*)(\\)?["'{]([^"'}]*)["'}]{1})/g;
    var propertyRegex = /(?<=data-h2-)(?:([^"'=\s]*)|([^\s]+))/g;
    for (let file in user_input_paths_with_ignored_files) {
      // Set file for use
      var attribute_file = user_input_paths_with_ignored_files[file];
      var attribute_file_string =
        user_input_paths_with_ignored_files[file].toString();
      // Check to see if the path is a file
      if (fs.lstatSync(attribute_file).isDirectory() == false) {
        var file_data = fs.readFileSync(attribute_file).toString(); // Get the file's data as a string to be parsed
        // Check for a data-h2 attribute
        if (file_data.match(hydrogen_wrapper_attribute_regex) != null) {
          property_data.hydrogen = true;
        }
        // Get all instances of Hydrogen style attributes in the file
        var attributes = file_data.match(hydrogen_style_attribute_regex);
        if (attributes != null) {
          attributes.forEach(function (attribute, index) {
            // Remove arbitrary whitespace from the attribute
            attributes[index] = attribute
              .replace(/\n/g, '')
              .replace(/\r/g, '')
              .replace(/\t/g, '');
          });
          attributes.forEach(function (attribute, attribute_index) {
            // Get the property value from the attribute
            var property_matches = attribute.match(propertyRegex);
            var property = property_matches[0];
            // Set a validity check for error reporting later
            var validity = false;
            // Loop through the available properties
            for (let p_data in property_data.properties) {
              // If the property matches an existing property key, continue
              if (
                Object.keys(
                  property_data.properties[p_data].property_keys
                ).includes(property) === true
              ) {
                validity = true;
                if (
                  Object.keys(
                    property_data.properties[p_data].property_keys[property]
                  ).includes(attribute) === true
                ) {
                  // a match exists, check to see if the file exists
                  if (
                    property_data.properties[p_data].property_keys[property][
                      attribute
                    ].includes(attribute_file_string) === false
                  ) {
                    // file didn't exist yet, add it
                    property_data.properties[p_data].property_keys[property][
                      attribute
                    ] = property_data.properties[p_data].property_keys[
                      property
                    ][attribute].concat(attribute_file_string);
                  }
                } else {
                  // no match exists, add the attribute and file
                  property_data.properties[p_data].property_keys[property][
                    attribute
                  ] = [attribute_file_string];
                }
              }
            }
            if (validity === false) {
              if (property_validity === false) {
                log_info(
                  'error',
                  'Invalid property',
                  'Parsing input for attributes',
                  attribute,
                  null,
                  null,
                  [attribute_file_string],
                  "This attribute is using a property that isn't supported by hydrogen. Please refer to the documentation for a complete list of supported properties."
                );
              }
            }
          });
        }
      }
    }
    if (debug.enabled === true) {
      fs.writeFileSync(
        path.join(
          getUserOutput(settings, 'string') +
            '/hydrogen-logs/' +
            debug.time +
            '/property-data.json'
        ),
        JSON.stringify(property_data, null, ' ')
      );
    }
    return property_data;
  } catch (error) {
    // Catch any errors ========================================================
    log_info(
      'error',
      'Unknown error',
      'Parsing input for attributes',
      null,
      null,
      null,
      null,
      error
    );
    return null;
  }
}

module.exports = {
  load_property_data,
  parse_input_data_for_attributes,
};
