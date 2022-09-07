// Hydrogen tests: Build settings
'use strict';

// Vendor dependencies

// Hydrogen dependencies
var { build_test_settings } = require('../../build-settings');

function modify_settings(settings) {
  // Manipulate the settings for this test =====================================
  settings.input = ['markup'];
  settings.output = 'styles';
  settings.styles.foundations.media = [
    {
      key: 'print',
      query: 'print',
    },
  ];
  settings.styles.foundations.typography = [
    {
      query_key: 'base',
      size: '100%',
      line_height: '1.4',
      type_scale: '1.2',
    },
  ];
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
  settings.styles.tokens.containers = [
    {
      key: 'small',
      max_width: '39rem',
    },
  ];
  settings.styles.tokens.fonts = [
    {
      key: 'sans',
      family: 'sans-serif',
    },
  ];
  settings.styles.tokens.gradients = [
    {
      key: 'myGradient',
      gradient: 'linear-gradient(red, green)',
      fallback: 'blue',
    },
  ];
  settings.styles.tokens.radii = [
    {
      key: 'myRadius',
      radius: '3px',
    },
  ];
  settings.styles.tokens.shadows = [
    {
      key: 'myShadow',
      shadow: '0 3px 10px black',
    },
  ];
  settings.styles.tokens.transitions = {
    durations: [
      {
        key: 'myDuration',
        duration: '3s',
      },
    ],
    functions: [
      {
        key: 'myFunction',
        function: 'ease',
      },
    ],
    delays: [
      {
        key: 'myDelay',
        delay: '2s',
      },
    ],
  };
  return settings;
}

build_test_settings('Parser test', modify_settings);
