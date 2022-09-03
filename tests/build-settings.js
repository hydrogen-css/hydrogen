// Hydrogen tests: Build settings
'use strict';

// Vendor dependencies
var fs = require('fs');
var path = require('path');

// Hydrogen dependencies
var { log_test } = require('../lib/scripts/log-tests');

function build_test_settings(test_name, modification) {
  try {
    // Load the default configuration ============================================
    var settings = JSON.parse(
      fs.readFileSync(
        path.resolve(process.cwd(), '../../lib/data/', 'hydrogen.defaults.json')
      )
    );
    // Manipulate the settings for this test =====================================
    var test_settings = modification(settings);
    // Check for old configuration files =========================================
    if (
      fs.existsSync(path.resolve(process.cwd(), 'hydrogen.config.json')) ===
      true
    ) {
      fs.rmSync(path.resolve(process.cwd(), 'hydrogen.config.json'), {
        recursive: true,
        force: true,
      });
      log_test(test_name, 'Found and removed an old configuration file.');
    }
    // Write the new configuration file ==========================================
    fs.writeFile(
      path.resolve(process.cwd() + '/hydrogen.config.json'),
      JSON.stringify(test_settings, null, 2),
      function (error) {
        if (error) {
          throw error;
        } else {
          log_test(
            test_name,
            "Successfully created this test's unique configuration file."
          );
        }
      }
    );
  } catch (error) {
    // Catch any errors ==========================================================
    log_test(test_name, error);
    return false;
  }
}

module.exports = {
  build_test_settings,
};
