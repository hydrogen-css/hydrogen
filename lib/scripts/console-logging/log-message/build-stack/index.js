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
 * Assembles console output for an error stack.
 *
 * @param {string} stack
 * @returns {string | false}
 */
function build_stack(stack) {
  try {
    // Break stack by parsing for "at"
    let split_stack = stack.split('\n');
    let trimmed_stack = [];
    split_stack.forEach((item) => {
      trimmed_stack = trimmed_stack.concat(item.trim());
    });
    // Construct the label based on the number of files
    let stack_message = '\n\n' + colors.dim('  Stack    > ');
    // Add the files to the message, with files beyond the first on a new line
    trimmed_stack.forEach(function (file, file_index) {
      if (file_index === 0) {
        stack_message = stack_message + wrap_message(file);
      } else {
        stack_message = stack_message + '\n\n' + colors.dim('           > ') + wrap_message(file);
      }
    });
    // Return the string
    return stack_message;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    return false;
  }
}

module.exports = {
  build_stack,
};
