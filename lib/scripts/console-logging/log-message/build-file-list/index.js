// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions

// Helper functions
const { wrap_message } = require('../wrap-message');

// Vendor imports
var colors = require('colors');

// Script ==========================================================================================

/**
 * Assembles console output for an array of files.
 *
 * @param {string[]} files An array of applicable files
 * @returns {string} A stringified file message
 */
function build_file_list(files) {
  try {
    // Construct the label based on the number of files
    let files_message = '\n\n' + colors.dim('  Files    > ');
    // Add the files to the message, with files beyond the first on a new line
    files.forEach(function (file, file_index) {
      if (file_index === 0) {
        files_message = files_message + wrap_message(file);
      } else {
        files_message = files_message + '\n\n' + colors.dim('           > ') + wrap_message(file);
      }
    });
    // Return the string
    return files_message;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    return false;
  }
}

module.exports = {
  build_file_list,
};
