// Hydrogen
'use strict';

// Vendor imports
const { glob } = require('glob');
var path = require('path');

/**
 * Grabs the CSS data provided by the W3C Webref module and compiles an array of CSS property names
 * @returns {string[]} An array of CSS property names
 */
const get_webref_data = () => {
  try {
    // Create an empty array to store the data we want to collect
    let property_json = [];
    // Get webref's location
    const webref_loc = require.resolve('@webref/css').replace('index.js', '');
    // Create an array of file paths for the Webref JSON files
    const file_list = glob.sync(path.resolve(process.cwd(), webref_loc + '*.json'), {
      ignore: [path.resolve(process.cwd(), webref_loc + 'package.json')],
    });
    // Loop through the JSON files
    file_list.forEach((file) => {
      // Load the individual file
      const file_data = require(file);
      if (file_data) {
        // Loop through the properties object and add its contents to the storage array
        file_data.properties.forEach((prop) => {
          property_json = property_json.concat(prop.name);
        });
      }
    });
    // Return the assembled property array
    return property_json;
  } catch (error) {}
};

// Export the function
module.exports = {
  get_webref_data,
};
