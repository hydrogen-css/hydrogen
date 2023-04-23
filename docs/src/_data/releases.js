// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions

// Helper functions

// Vendor imports
var path = require('path');

// Script ==========================================================================================

module.exports = {
  history: require(path.resolve('../releases')).releases(),
  latest: require(path.resolve('../releases')).stable(),
  stable: require(path.resolve('../releases')).stable(),
  beta: require(path.resolve('../releases')).beta(),
  featured: require(path.resolve('../releases')).featured(),
};
