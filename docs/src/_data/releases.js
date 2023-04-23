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
  history: require('@hydrogen-css/hydrogen/releases').releases(),
  latest: require('@hydrogen-css/hydrogen/releases').stable(),
  stable: require('@hydrogen-css/hydrogen/releases').stable(),
  beta: require('@hydrogen-css/hydrogen/releases').beta(),
  featured: require('@hydrogen-css/hydrogen/releases').featured(),
};
