// Hydrogen tests: Build settings
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { build_test_settings } = require('../../build-settings');

function modify_settings(settings) {
  // Manipulate the settings for this test =====================================
  settings.input = ['markup'];
  settings.output = 'styles';
  settings.styles.tokens.colors = [
    {
      key: 'primary',
      color: '#9D5CFF',
      modifiers: [
        {
          key: 'myModifier',
          color: 'red',
        },
      ],
    },
  ];
  settings.styles.tokens.gradients = [
    {
      key: 'myModifier',
      gradient: 'linear-gradient(red, green)',
      fallback: 'blue',
    },
  ];
  return settings;
}

build_test_settings('Parser test', modify_settings);
