// Hydrogen logs: Project setup
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { setup_header } = require('./log-labels');
var { log_generic_message } = require('./log-generic');

log_generic_message({
  header: setup_header,
  message: "Setting up Hydrogen's development environment...",
});
