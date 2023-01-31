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
  settings.themes[0].colors = [
    {
      key: 'white',
      default: {
        color: 'rgba(255, 255, 255, 1)',
        modifiers: [],
      },
    },
    {
      key: 'black',
      default: {
        color: '#212130',
        modifiers: [],
      },
    },
    {
      key: 'primary',
      default: {
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
    },
    {
      key: 'secondary',
      default: {
        color: '#53FFE0',
        modifiers: [
          {
            key: 'lighter',
            color: 'green',
          },
        ],
      },
    },
    {
      key: 'accent',
      default: {
        color: '#FF5C6D',
        modifiers: [],
      },
    },
    {
      key: 'focus',
      default: {
        color: '#fbce3a',
        modifiers: [],
      },
    },
  ];
  settings.themes[0].gradients = [
    {
      key: 'myLinearGradient',
      default: {
        gradient:
          'linear-gradient(135deg, green, pink, rgba(255, 255, 255, 1))',
        fallback: 'green',
      },
    },
    {
      key: 'myRadialGradient',
      default: {
        gradient:
          'radial-gradient(circle at left, green, pink, rgba(255, 255, 255, 1))',
        fallback: 'green',
      },
    },
  ];
  return settings;
}

build_development_config('Property test', modify_settings);
