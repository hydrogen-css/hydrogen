// Hydrogen tests: Log setup
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { log_setup } = require('./log-tests');

try {
  log_setup(
    "Setting up Hydrogen's development environment and installing packages..."
  );
} catch (error) {
  log_setup('Project setup', error);
}
