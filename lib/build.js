// Hydrogen: Build script

'use strict';

// Third party dependencies

// Local dependencies
var { buildHydrogen } = require('./scripts/build-hydrogen');

function build() {
  try {
    console.log('😼 [' + 'Hydrogen'.magenta + ']', 'Starting the build script...');
    buildHydrogen();
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  build,
};
