// Hydrogen: Setup logs
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { console_flourish, setup_header } = require('./log-labels');

function log_setup(message) {
  try {
    // Log the test ============================================================
    console.log(
      setup_header +
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

function log_docs_setup(message) {
  try {
    // Log the test ============================================================
    console.log(
      setup_header +
        '\n' +
        console_flourish +
        'Build step: '.magenta +
        'Documentation setup' +
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
  log_docs_setup,
};
