// Hydrogen: Log functions
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var {
  console_flourish,
  error_header,
  warning_header,
  success_header,
  alert_header,
  start_header,
  clean_header,
  watch_header,
  init_header,
} = require('./log-labels');

/**
 * Gets the current date and time for use in file slugs
 * @returns {string} 02-03-2022-12-45-12
 */
function date_time() {
  try {
    // Get the working date ====================================================
    var current_date = new Date();
    // Generate a readable slug ================================================
    var date_time =
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
    // Return the date
    return date_time;
  } catch (error) {
    // Log any errors that were unaccounted for ================================
    console.log(error_header + ' ' + error);
    // Return false
    return false;
  }
}

/**
 * Logs that a target command has been initiated
 * @param {string} type build | clean | watch | watching | changed | init
 * @returns {boolean} an assembled console message with the appropriate formatting
 */
function log_command(type) {
  try {
    // Build the individual error outputs ======================================
    var header;
    var context_message = '\n' + console_flourish;
    if (type === 'init') {
      header = init_header;
      context_message =
        context_message + 'Context: '.magenta + 'Starting the watch script...';
    } else if (type === 'build') {
      header = start_header;
      context_message =
        context_message + 'Context: '.magenta + 'Starting the build script...';
    } else if (type === 'watch') {
      header = start_header;
      context_message =
        context_message + 'Context: '.magenta + 'Starting the watch script...';
    } else if (type === 'watching') {
      header = watch_header;
      context_message =
        context_message +
        'Context: '.magenta +
        'Watching for changes to your code...';
    } else if (type === 'changed') {
      header = watch_header;
      context_message =
        context_message +
        'Context: '.magenta +
        'Hydrogen noticed a change and is rebuilding...';
    } else if (type === 'clean') {
      header = clean_header;
      context_message =
        context_message + 'Context: '.magenta + 'Cleaning Hydrogen logs...';
    }
    // Assemble the final log ==================================================
    var command_message = header + context_message;
    // Pass it to the console
    console.log(command_message);
    return true;
  } catch (error) {
    // Log any errors that were unaccounted for ================================
    console.log(error);
    // Return false
    return false;
  }
}

/**
 * Logs a detailed CSS validation error using data passed by Hydrogen's attribute constructor and the vendor validator
 * @param {string} type error | alert | warning | success
 * @param {string} title the error's description
 * @param {string} step the build step the error is occurring in
 * @param {string | null} attribute the offending attribute
 * @param {string | null} css the compiled CSS selector containing the invalid CSS
 * @param {string | null} target the specific CSS causing the error
 * @param {array | null} files the files the attribute has been found in
 * @param {string | null} context additional context to help resolve the error
 * @returns {boolean} an assembled console message with the appropriate formatting
 */
function log_info(type, title, step, attribute, css, target, files, context) {
  try {
    // Build the individual error outputs ======================================
    var type_header;
    if (type === 'error') {
      type_header = error_header;
    } else if (type === 'warning') {
      type_header = warning_header;
    } else if (type === 'alert') {
      type_header = alert_header;
    } else if (type === 'success') {
      type_header = success_header;
    }
    function highlight(string) {
      if (type === 'error') {
        return string.red;
      } else if (type === 'warning') {
        return string.yellow;
      } else if (type === 'alert') {
        return string.blue;
      } else if (type === 'success') {
        return string.green;
      }
    }
    var title_message = '\n' + console_flourish + highlight('Type: ') + title;
    var step_message =
      '\n' + console_flourish + highlight('Build step: ') + step;
    var cause_message = '';
    if (attribute != null) {
      var sanitized_attribute = attribute
        .replace('[data-h2] [', '')
        .replace('[data-h2=dark] [', '')
        .replace('*=', '=')
        .replace(/]$/g, '');
      cause_message =
        '\n' +
        console_flourish +
        highlight('Attribute: ') +
        sanitized_attribute;
    }
    var css_message = '';
    if (css != null) {
      var sanitized_css = css
        .replace('[data-h2] ', '')
        .replace('[data-h2=dark] ', '')
        .replace('*=', '=')
        .replace(/]$/g, '');
      css_message =
        '\n' + console_flourish + highlight('Compiled CSS: ') + sanitized_css;
    }
    var target_message = '';
    if (target != null) {
      target_message =
        '\n' + console_flourish + highlight('Invalid CSS: ') + target;
    }
    var location_message = '';
    var file_distance = '';
    if (files != null) {
      if (files.length === 1) {
        location_message = '\n' + console_flourish + highlight('Location: ');
        file_distance = '\n            ';
      } else {
        location_message = '\n' + console_flourish + highlight('Locations: ');
        file_distance = '\n             ';
      }
      files.forEach(function (file, file_index) {
        if (file_index === 0) {
          location_message = location_message + file;
        } else {
          location_message = location_message + file_distance + file;
        }
      });
    }
    var context_message = '';
    if (context) {
      context_message =
        '\n' + console_flourish + highlight('Context: ') + context;
    }
    // Assemble the final log ==================================================
    var error_message =
      type_header +
      step_message +
      title_message +
      cause_message +
      css_message +
      target_message +
      context_message +
      location_message;
    // Pass it to the console
    console.log(error_message);
    return true;
  } catch (error) {
    // Log any errors that were unaccounted for ================================
    console.log(error);
    // Return false
    return false;
  }
}

module.exports = {
  console_flourish,
  init_header,
  date_time,
  log_command,
  log_info,
};
