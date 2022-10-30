// Hydrogen: Generate date-time
'use strict';

// Hydrogen data models
let Settings = require('../../data/settings-model-definition');
/** @typedef {import('../../data/settings-model-definition').Settings} Settings */

// Hydrogen data imports

// Hydrogen core functions

// Hydrogen helper functions

// Hydrogen log functions
const { log_message } = require('../logs/log-message');

// Vendor imports

// Script

/**
 * @typedef {object} Args
 * @prop {Settings} settings
 */

/**
 * Gets the current date and time and transforms them into a usable string
 * @param {Args} args { settings }
 * @returns {string | false} "02-03-2022-12-45-12" | false
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
        log_message({
          type: 'error',
          settings: args.settings,
          step: 'Log data-time creation',
          error: error,
        });
        return false;
      }
    } else {
      throw new Error('The settings object was missing or not an object.');
    }
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Log data-time creation',
      error: error,
    });
    return false;
  }
}

module.exports = {
  generate_date_time,
};
