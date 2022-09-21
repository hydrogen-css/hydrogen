// Hydrogen: Build script
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { log_command, log_info } = require('./scripts/logs/logs');
var { h2_compile_hydrogen } = require('./scripts/build-hydrogen');

/**
 * Runs a single instance of Hydrogen's build script
 * @returns {boolean} an assembled Hydrogen CSS file
 */
function h2_build_hydrogen() {
  try {
    // Log that the script has started =========================================
    log_command('build');
    // Run Hydrogen ============================================================
    h2_compile_hydrogen('build', process.argv);
  } catch (error) {
    // Log any errors that were unaccounted for ================================
    console.log(error);
    log_info(
      'error',
      'Unknown error',
      'Build initiation',
      null,
      null,
      null,
      null,
      error
    );
    // Return the error to the parent process
    return error;
  }
}

module.exports = {
  h2_build_hydrogen,
};
