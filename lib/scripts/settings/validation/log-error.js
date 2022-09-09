// Hydrogen: Settings error log
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { console_flourish, error_header } = require('../../log-labels');
var { log_info } = require('../../logs');

function log_error(title, step, files, error, values) {
  try {
    var title_message = '\n' + console_flourish + 'Summary: '.red + title;
    var step_message = '\n' + console_flourish + 'Configuration: '.red + step;
    var value_message = '';
    if (values) {
      value_message = '\n' + console_flourish + 'Value: '.red + values;
    }
    var location_message = '';
    var file_distance = '';
    if (files != null) {
      var files = [files];
      if (files.length === 1) {
        location_message = '\n' + console_flourish + 'Location: '.red;
        file_distance = '\n            ';
      } else {
        location_message = '\n' + console_flourish + 'Locations: '.red;
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
    if (error) {
      context_message = '\n' + console_flourish + 'Context: '.red + error;
    }
    // Assemble the final log ==================================================
    var error_message =
      error_header +
      step_message +
      title_message +
      value_message +
      context_message +
      location_message;
    // Pass it to the console
    console.log(error_message);
    return true;
  } catch (error) {
    // Catch any errors ========================================================
    log_info(
      'error',
      'Unknown error',
      'Logging settings error',
      null,
      null,
      null,
      null,
      error
    );
    return false;
  }
}

module.exports = {
  log_error,
};
