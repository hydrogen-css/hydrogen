// Hydrogen tests: Build settings
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { build_test_settings } = require('../../build-settings');

function modify_settings(settings) {
  // Manipulate the settings for this test =====================================
  settings.input = ['markup'];
  settings.output = 'styles';
  settings.build.dark_mode = 'toggle';
  settings.build.var_export = true;
  settings.styles.tokens.colors.forEach(function (c, c_index) {
    if (c.key === 'primary') {
      c.modifiers = [
        {
          key: 'other',
          color: 'yellow',
        },
        {
          key: 'customModifier',
          color: 'pink',
        },
      ];
    }
    if (c.key === 'secondary') {
      c.modifiers = [
        {
          key: 'lighter',
          color: 'green',
        },
      ];
    }
  });
  settings.styles.tokens.gradients = [
    {
      key: 'myLinearGradient',
      gradient: 'linear-gradient(135deg, green, pink, rgba(255, 255, 255, 1))',
      fallback: 'green',
    },
    {
      key: 'myRadialGradient',
      gradient:
        'radial-gradient(circle at left, green, pink, rgba(255, 255, 255, 1))',
      fallback: 'green',
    },
  ];
  return settings;
}

build_test_settings('Property test', modify_settings);
