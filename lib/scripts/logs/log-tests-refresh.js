// Hydrogen logs: Project setup
'use strict';

// Vendor dependencies
var colors = require('colors');
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

// Hydrogen dependencies
var { tests_header } = require('./log-labels');
var { log_generic_message } = require('./log-generic');

log_generic_message({
  header: tests_header,
  message: 'Refreshing the test environment...',
  step: argv.test + ' test',
});
