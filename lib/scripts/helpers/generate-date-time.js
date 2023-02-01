// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */

// Data imports

// Logging

// Functions

// Vendor imports

// Script
/**
 * Gets the current date and time and transforms them into a usable string
 * @param {{settings: Settings}} args
 * @returns {string} "02-03-2022-12-45-12"
 */
function generate_date_time(args) {
  try {
    if (args.settings && typeof args.settings === 'object') {
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
        throw error;
      }
    } else {
      throw new Error('The settings object was missing or not an object.');
    }
  } catch (error) {
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Generating date/time',
        error: error,
      };
    }
  }
}

module.exports = {
  generate_date_time,
};
