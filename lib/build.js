// Hydrogen: Build script

'use strict';

// Third party dependencies

// Local dependencies
var { h2_compile_hydrogen } = require('./scripts/build-hydrogen');

function h2_build_hydrogen() {
  try {
    console.log(
      '😼 [' + 'Hydrogen'.magenta + ']',
      'Starting the build script...'
    );
    h2_compile_hydrogen();
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  h2_build_hydrogen,
};
