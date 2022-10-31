// Hydrogen tests: Build settings
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { build_development_config } = require('../../../lib/setup/build-settings');

function modify_settings(settings) {
  // Manipulate the settings for this test
  settings.input = ['markup', 'styles'];
  settings.output = 'styles';
  settings.modes['dark'].method = 'toggle';
  settings.processing.var_export = true;
  return settings;
}

build_development_config('Errors test', modify_settings);
