// Hydrogen logs: Project setup
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { docs_header } = require('./log-labels');
var { log_generic_message } = require('./log-generic');

log_generic_message({
  header: docs_header,
  message: 'Refreshing the documentation environment...',
  step: 'Documentation',
});
