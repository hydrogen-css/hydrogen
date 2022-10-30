// Hydrogen logs: Build stack message
'use strict';

// Hydrogen data models

// Hydrogen data imports

// Hydrogen function imports
const { flourish } = require('./log-labels');
const { fit_message } = require('./log-fit-message');

// Vendor imports
var colors = require('colors');

// Scripts

/**
 * Assembles console output for an array of files
 * @param {string} stack
 * @returns {string | false}
 */
function build_stack_message(stack) {
  try {
    // Break stack by parsing for "at"
    let split_stack = stack.split('\n');
    let trimmed_stack = [];
    split_stack.forEach((item) => {
      trimmed_stack = trimmed_stack.concat(item.trim());
    });
    // Construct the label based on the number of files
    let stack_message = '\n' + '  Stack    > '.dim;
    // Add the files to the message, with files beyond the first on a new line
    trimmed_stack.forEach(function (file, file_index) {
      if (file_index === 0) {
        stack_message = stack_message + fit_message(file) + '\n';
      } else {
        stack_message =
          stack_message + '\n' + '           > '.dim + fit_message(file) + '\n';
      }
    });
    // Return the string
    return stack_message;
  } catch (error) {
    // Catch any errors
    console.log(error);
    return false;
  }
}

module.exports = {
  build_stack_message,
};
