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
      fs.readFileSync(path.resolve(__dirname, '../data/property-model.json'))
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
    var found_attributes = []; // A list of style attributes found in the user's input
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
    for (let file in user_input_paths_with_ignored_files) {
      // Check to see if the path is a file
      if (
        fs.lstatSync(user_input_paths_with_ignored_files[file]).isDirectory() ==
        false
      ) {
        var file_data = fs
          .readFileSync(user_input_paths_with_ignored_files[file])
          .toString(); // Get the file's data as a string to be parsed
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
            // Gets the property name out of the attribute (e.g. bg-color from data-h2-bg-color="")
            var propertyRegex = /(?<=data-h2-)(?:([^"'=\s]*)|([^\s]+))/g;
            var property = attribute.match(propertyRegex);
            var property_validity = false;
            property_data.properties.forEach(function (item, item_index) {
              item.keys.forEach(function (key, key_index) {
                if (property[0] === key.key) {
                  property_validity = true;
                  var duplicate_check = false;
                  key.instances.forEach(function (instance, instance_index) {
                    if (attribute === instance.attribute) {
                      // One already exists, just add the file to the list
                      duplicate_check = true;
                      // Check to see if the file has already been logged or not
                      var file_duplicate_check = false;
                      instance.files.forEach(function (
                        instance_file,
                        instance_file_index
                      ) {
                        if (
                          instance_file ===
                          user_input_paths_with_ignored_files[file].toString()
                        ) {
                          file_duplicate_check = true;
                        }
                      });
                      // Now that duplicates have been accounted for, log the file
                      if (file_duplicate_check === false) {
                        instance.files.push(
                          user_input_paths_with_ignored_files[file].toString()
                        );
                      }
                    }
                  });
                  // Now that existing ones have been checked, see if it needs to be a new instance
                  if (duplicate_check === false) {
                    var attribute_data = {
                      attribute: attribute,
                      files: [
                        user_input_paths_with_ignored_files[file].toString(),
                      ],
                    };
                    key.instances.push(attribute_data);
                  }
                }
              });
            });
            if (property_validity === false) {
              log_info(
                'error',
                'Invalid property',
                'Parsing input for attributes',
                attribute,
                null,
                null,
                [user_input_paths_with_ignored_files[file].toString()],
                "This attribute is using a property that isn't supported by hydrogen. Please refer to the documentation for a complete list of supported properties."
              );
            }
          });
          found_attributes = found_attributes.concat(attributes);
        }
      }
    }
    // =========================================================================
    // Produce a log file if debug is enabled
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
    // =========================================================================
    // Return the parsed data
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
