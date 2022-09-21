// Hydrogen logs: Project setup
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { tests_header } = require('./log-labels');
var { log_generic_message } = require('./log-generic');

log_generic_message({
  header: tests_header,
  message: "Refreshing Hydrogen's test environments...",
});
