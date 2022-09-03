// Hydrogen: Test log function
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies

// Log headers
var console_flourish = '> '.dim;
var tests_header = '☼ Hydrogen'.magenta + ' - ' + ' Tests '.black.bgMagenta;

function log_setup(message) {
  try {
    // Log the test ============================================================
    console.log(
      tests_header +
        '\n' +
        console_flourish +
        'Build step: '.magenta +
        'Project setup' +
        '\n' +
        console_flourish +
        'Context: '.magenta +
        message
    );
    return true;
  } catch (error) {
    // Catch errors ============================================================
    console.log(error);
    return false;
  }
}

function log_test(test, message) {
  try {
    // Log the test ============================================================
    console.log(
      tests_header +
        '\n' +
        console_flourish +
        'Test: '.magenta +
        test +
        '\n' +
        console_flourish +
        'Context: '.magenta +
        message
    );
    return true;
  } catch (error) {
    // Catch errors ============================================================
    console.log(error);
    return false;
  }
}

module.exports = {
  log_setup,
  log_test,
};
