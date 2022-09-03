// Hydrogen tests: Log setup
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { log_test } = require('../lib/scripts/log-tests');

const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

try {
  log_test(
    argv.test,
    'Setting up the test environment and installing packages...'
  );
} catch (error) {
  log_test('Test setup', error);
}
