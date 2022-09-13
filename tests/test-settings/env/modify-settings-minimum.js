// Hydrogen tests: Build settings
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { build_development_config } = require('../../../lib/setup/build-settings');

function modify_settings(settings) {
  // Manipulate the settings for this test =====================================
  settings.input = ['markup'];
  settings.output = 'styles';
  delete settings.build;
  delete settings.styles.foundations.media;
  settings.styles.foundations.typography = [
    {
      query_key: 'base',
      size: '100%',
      line_height: '1.4',
      type_scale: '1.2',
    },
  ];
  delete settings.styles.tokens;
  return settings;
}

build_development_config('Settings test', modify_settings);
