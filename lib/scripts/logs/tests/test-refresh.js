// Hydrogen logs: Project setup
('use strict');

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../log-message');
// Vendor imports
var colors = require('colors');
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

log_message({
  type: 'system',
  step: 'Refreshing the ' + argv.test + ' test...',
});
