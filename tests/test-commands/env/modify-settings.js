// Hydrogen tests: Build settings
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { build_development_config } = require('../../../lib/setup/build-settings');

function modify_settings(settings) {
  // Manipulate the settings for this test
  settings.input = ['markup'];
  settings.output = 'styles';
  settings.modes['dark'].method = 'toggle';
  settings.processing.export_variable_file = true;
  return settings;
}

build_development_config('Commands test', modify_settings);
