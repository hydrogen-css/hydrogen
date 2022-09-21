// Hydrogen tests: Build settings
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { build_development_config } = require('../../../lib/setup/build-settings');

function modify_settings(settings) {
  // Manipulate the settings for this test =====================================
  settings.input = ['markup'];
  settings.output = 'styles';
  settings.build.dark_mode = 'toggle';
  settings.build.var_export = true;
  settings.styles.tokens.colors = [
    {
      key: 'white',
      color: 'rgba(255, 255, 255, 1)',
      modifiers: [],
    },
    {
      key: 'black',
      color: '#212130',
      modifiers: [],
    },
    {
      key: 'primary',
      color: '#9D5CFF',
      modifiers: [
        {
          key: 'other',
          color: 'yellow',
        },
        {
          key: 'customModifier',
          color: 'pink',
        },
      ],
    },
    {
      key: 'secondary',
      color: '#53FFE0',
      modifiers: [
        {
          key: 'lighter',
          color: 'green',
        },
      ],
    },
    {
      key: 'accent',
      color: '#FF5C6D',
      modifiers: [],
    },
    {
      key: 'focus',
      color: '#fbce3a',
      modifiers: [],
    },
  ];
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

build_development_config('Property test', modify_settings);
