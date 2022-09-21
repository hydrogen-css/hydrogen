// Hydrogen logs: Build file message
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { console_flourish } = require('./log-labels');

/**
 * Assembles console output for an array of files
 * @param {array} files An array of applicable files
 * @param {string} type generic | alert | warning | error | success
 * @returns {string} A stringified file message
 */
function build_file_message(files, type) {
  try {
    // Grab the message type ===================================================
    // This ensures our location label is the correct color for the message
    function highlight(string) {
      if (type === 'generic') {
        return string.magenta;
      } else if (type === 'alert') {
        return string.blue;
      } else if (type === 'warning') {
        return string.yellow;
      } else if (type === 'error') {
        return string.red;
      } else if (type === 'success') {
        return string.green;
      }
    }
    // Construct the label based on the number of files ========================
    var files_message = '';
    if (files.length === 1) {
      files_message =
        files_message + '\n' + console_flourish + highlight('Location: ');
    } else {
      files_message =
        files_message + '\n' + console_flourish + highlight('Locations: ');
    }
    // Add the files to the message ============================================
    files.forEach(function (file, file_index) {
      if (file_index === 0) {
        files_message = files_message + file;
      } else {
        files_message = files_message + '\n' + '             ' + file;
      }
    });
    // Return the string =======================================================
    return files_message;
  } catch (error) {
    // Catch any errors
    console.log(error);
    return false;
  }
}

module.exports = {
  build_file_message,
};
