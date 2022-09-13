// Hydrogen logs: Project setup
'use strict';

// Vendor dependencies
var colors = require('colors');
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

// Hydrogen dependencies
var { setup_header } = require('./log-labels');
var { log_generic_message } = require('./log-generic');

log_generic_message({
  header: setup_header,
  message: 'Setting up the test environment...',
  step: argv.test + ' test',
});
