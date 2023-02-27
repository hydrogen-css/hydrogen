// Hydrogen logs: Build file message
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { fit_message } = require('./log-fit-message');
// Vendor imports
var colors = require('colors');

/**
 * Assembles console output for an array of files
 * @param {string[]} files An array of applicable files
 * @returns {string} A stringified file message
 */
function build_file_message(files) {
  try {
    // Construct the label based on the number of files
    let files_message = '\n\n' + '  Files    > '.dim;
    // Add the files to the message, with files beyond the first on a new line
    files.forEach(function (file, file_index) {
      if (file_index === 0) {
        files_message = files_message + fit_message(file);
      } else {
        files_message =
          files_message + '\n\n' + '           > '.dim + fit_message(file);
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
  build_file_message,
};
