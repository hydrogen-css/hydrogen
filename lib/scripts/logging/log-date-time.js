// Hydrogen: Log functions
'use strict';

// Vendor dependencies
var colors = require('colors');

/**
 * Gets the current date and time for use in file slugs
 * @returns {string} 02-03-2022-12-45-12
 */
function date_time() {
  try {
    // Create a new date object
    let current_date = new Date();
    // Convert it to a usable file slug
    let date_time =
      current_date.getFullYear() +
      '-' +
      ('0' + (current_date.getMonth() + 1)).slice(-2) +
      '-' +
      current_date.getDate() +
      '-' +
      current_date.getHours() +
      'h' +
      '-' +
      current_date.getMinutes() +
      'm' +
      '-' +
      current_date.getSeconds() +
      's';
    // Return the result
    return date_time;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  date_time,
};
