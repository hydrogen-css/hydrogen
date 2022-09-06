// Hydrogen tests: Build settings
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { build_test_settings } = require('../../build-settings');

function modify_settings(settings) {
  // Manipulate the settings for this test =====================================
  settings.input = 'string';
  settings.output = [];
  settings.build.dark_mode = true;
  settings.build.var_export = 'string';
  settings.styles.foundations.media = [
    {
      key: 65,
      query: 45,
    },
    {
      key: 'invalid',
      query: 'my_string',
    },
    {
      key: 'base',
      query: 'my_string',
    },
  ];
  return settings;
}

build_test_settings('Parser test', modify_settings);
