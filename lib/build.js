// Hydrogen: Build script
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('./scripts/logs/log-message');
const { h2_compile_hydrogen } = require('./scripts/build-hydrogen');
// Vendor imports

/**
 * Runs a single instance of Hydrogen's build script
 * @returns {boolean} an assembled Hydrogen CSS file
 */
function h2_build_hydrogen() {
  try {
    // Log that the script has started
    log_message({
      type: 'system',
      step: 'Starting the build...',
    });
    // Run Hydrogen
    h2_compile_hydrogen('build', process.argv);
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Build initiation',
    });
    return false;
  }
}

module.exports = {
  h2_build_hydrogen,
};
