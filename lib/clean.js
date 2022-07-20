// Hydrogen: Clean script
'use strict';

// Vendor dependencies
var fs = require('fs');
var path = require('path');

// Hydrogen dependencies
var { h2_error } = require('./scripts/logs');
var { getUserOutput } = require('./scripts/generate-paths');

/**
 * Removes any existing log directories
 */
function h2_clean_logs() {
  try {
    //
    // Log that the script has started =========================================
    //
    console.log(
      '🧹 [' + 'Hydrogen'.magenta + ']',
      "Cleaning Hydrogen's logs..."
    );
    //
    // Check for and remove the log directory ==================================
    //
    if (
      fs.existsSync(path.join(getUserOutput('string') + '/hydrogen-logs')) ===
      true
    ) {
      fs.rmSync(path.join(getUserOutput('string') + '/hydrogen-logs'), {
        recursive: true,
        force: true,
      });
    }
    //
    // Log success =============================================================
    //
    console.log(
      '✅ [' + 'Hydrogen'.magenta + ']',
      "Hydrogen's log files were successfully removed from your output directory."
    );
  } catch (error) {
    //
    // Catch errors ============================================================
    //
    h2_error(error);
    return error;
  }
}

module.exports = {
  h2_clean_logs,
};
