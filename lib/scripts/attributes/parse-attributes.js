// Hydrogen: Parse attributes
'use strict';

// Hydrogen data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('../../data/property-model-definition').PropertyModel} PropertyModel
 * @typedef {import('../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../data/property-model-definition').Attribute} Attribute
 * @typedef {import('../../data/property-model-definition').Query} Query
 * @typedef {import('../../data/property-model-definition').Modifiers} Modifiers
 */

// Hydrogen data imports
let property_model = require('../../data/property-model');

// Hydrogen function imports
const { log_message } = require('../logs/log-message');
const { parse_queries } = require('./parse-queries');

// Vendor imports
var fs = require('fs');
var glob = require('glob');
var path = require('path');

// Scripts

/**
 * Parses the user's input to check if an instance of the data-h2 wrapper attribute exists and to collect all instances of Hydrogen style properties to be used to assemble CSS
 * @param {Settings} settings
 * @returns {PropertyModel | false} The properties model populated with parsed data for all attributes used
 */
function parse_attributes(settings) {
  try {
    /** @type {PropertyModel} */
    let property_data = JSON.parse(JSON.stringify(property_model));
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
            settings.processing.wrapper = true;
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
              attribute: match_array[0] // Full attribute
                .replace(/\n/g, '')
                .replace(/\r/g, '')
                .replace(/\t/g, ''),
              groups: [
                match_array[1] // data-h2-
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
                  .replace(/\t/g, ''),
                match_array[2] // property
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
                  .replace(/\t/g, ''),
                match_array[3] // ="queries
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
                  .replace(/\t/g, ''),
                match_array[4] // =
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
                  .replace(/\t/g, ''),
                match_array[5] // spaces
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
                  .replace(/\t/g, ''),
                match_array[6] // "queries
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
              // Get the attribute's value
              let attribute_content = match.groups[6];
              // Check to see if the property has already been added to the attribute list
              if (!Object.keys(property_data.attributes).includes(property)) {
                // This property has never been called, so add it, along with the attribute's instance
                let queries = parse_queries(
                  settings,
                  property,
                  attribute,
                  attribute_content,
                  file_path_string
                );
                if (queries) {
                  /** @type {Attribute} */
                  let new_attribute = {
                    attribute: attribute,
                    queries: queries,
                    files: [file_path_string],
                  };
                  property_data.attributes[property] = [new_attribute];
                } else {
                  throw new Error(
                    'This attribute has no queries passed to it.'
                  );
                }
              } else {
                // It does exist, so check attribute instances for a matching attribute
                Object.keys(property_data.attributes).forEach(
                  (property_key) => {
                    let match = false;
                    property_data.attributes[property_key].forEach(
                      (attribute_instance) => {
                        if (attribute_instance.attribute === attribute) {
                          // This attribute has been recorded before, so just add this file to the existing list
                          match = true;
                          attribute_instance.files =
                            attribute_instance.files.concat(file_path_string);
                        }
                      }
                    );
                    if (!match) {
                      let queries = parse_queries(
                        settings,
                        property_data,
                        property,
                        attribute,
                        attribute_content,
                        file_path_string
                      );
                      if (queries) {
                        /** @type {Attribute} */
                        let new_attribute = {
                          attribute: attribute,
                          queries: queries,
                          files: [file_path_string],
                        };
                        property_data.attributes[property_key] =
                          property_data.attributes[property_key].concat(
                            new_attribute
                          );
                      } else {
                        throw new Error(
                          'This attribute has no queries passed to it.'
                        );
                      }
                    }
                  }
                );
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
      // Log the number of files Hydrogen has processed
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
      throw new Error('The glob package failed to produce an input glob.');
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
  parse_attributes,
};
