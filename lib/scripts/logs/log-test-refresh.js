// Hydrogen tests: Log refresh
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { log_test } = require('./log-tests');

const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

try {
  log_test(argv.test, 'Refreshing this test...');
} catch (error) {
  log_test('Test setup', error);
}
