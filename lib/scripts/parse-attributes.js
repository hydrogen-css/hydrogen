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
var { h2_error, h2_error_detail } = require('./logs');

function load_property_data() {
  try {
    // =========================================================================
    // Load the property data model
    var property_data = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../data/property-model.json'))
    );
    // =========================================================================
    // Return the data
    return property_data;
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error(error);
    return false;
  }
}

/**
 * Parses the user's input to check if an instance of the data-h2 wrapper attribute exists and to collect all instances of Hydrogen style properties to be used to assemble CSS
 * @returns {{wrapper_status: boolean, attributes: array}} wrapper_status (whether an instance of data-h2 exists), attributes (a list of unique style attributes found in the user's input)
 */
function parse_input_data_for_attributes(debug) {
  try {
    // Set up working data
    var user_input_paths_as_glob = getUserInput('glob'); // Gets a glob version of the user's input paths
    var user_input_paths_as_array = getUserInput('array'); // Gets an array version of the user's input paths
    var property_data = load_property_data();
    var parsed_data = {
      wrapper_status: false,
      attributes: [],
    }; // The final object to be passed back
    var found_attributes = []; // A list of style attributes found in the user's input
    var ignored_files = [
      'hydrogen.css',
      'hydrogen.logs.attributes.json',
      'hydrogen.logs.media.json',
      'hydrogen.logs.values.json',
      'hydrogen.raw.css',
      'hydrogen.vars.css',
      'hydrogen.vars.scss',
    ]; // The list of Hydrogen files to be ignored
    var assembled_ignored_paths = [];
    // Loop through the user's input folders and create path strings for each Hydrogen file that needs to be ignored
    user_input_paths_as_array.forEach(function (user_input_path) {
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
    var hydrogen_wrapper_attribute_regex = /data-h2(?!-)/g; // Finds any data-h2 string not followed by a "-"
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
          parsed_data.wrapper_status = true;
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
            property_data.forEach(function (item, item_index) {
              item.keys.forEach(function (key, key_index) {
                if (property[0] === key.key) {
                  var attribute_data = {
                    file: user_input_paths_with_ignored_files[file].toString(),
                    attribute: attribute,
                  };
                  key.instances.push(attribute_data);
                }
              });
            });
          });
          found_attributes = found_attributes.concat(attributes);
        }
      }
    }
    if (debug) {
      var file_slug = new Date()
        .toJSON()
        .replace(/:/g, '-')
        .replace(/\./g, '-');
      fs.writeFileSync(
        path.join(
          getUserOutput('string') +
            '/hydrogen-logs/hydrogen.logs.properties.' +
            file_slug +
            '.json'
        ),
        JSON.stringify(property_data, null, ' ')
      );
    }
    // Create a function that isolates unique instances in an array
    function uniq(a) {
      return Array.from(new Set(a));
    }
    // Remove duplicates from the final style attribute list
    var unique_attributes = uniq(found_attributes);
    // Add the unique attributes to the final parsed data
    parsed_data.attributes = unique_attributes;
    // Return the parsed data
    return parsed_data;
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error(error);
    return null;
  }
}

module.exports = {
  parse_input_data_for_attributes,
};
