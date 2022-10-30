// Hydrogen logs: Fit message to console
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
// Vendor imports

/**
 * Fits a string to the console's width to help with readability of output
 * @param {string} message The string to be collapsed
 * @returns {string} A string with newlines at correct positioning based on current console size
 */
function fit_message(message) {
  try {
    // Set a variable to hold the new collapsed message
    let new_message = '';
    // Set the trim value based on the current console width minus Hydrogen's prefix space
    let magic_number = message.length;
    if (process.stdout.columns) {
      magic_number = process.stdout.columns - 15;
    }
    // If the message is longer than the magic number, collapse it, otherwise simply return it as is
    if (message.length > magic_number) {
      // Get an array of characters in intervals based on the magic number
      let string_matches = message.match(
        new RegExp('.{1,' + magic_number + '}', 'g')
      );
      // Loop through each match, trim the whitespace from the ends, and add them together with a new line
      string_matches.forEach(function (match, index) {
        if (index === 0) {
          new_message = new_message + match.trim();
        } else {
          new_message = new_message + '\n             '.dim + match.trim();
        }
      });
    } else {
      new_message = message;
    }
    // Return the finalized string
    return new_message;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  fit_message,
};
