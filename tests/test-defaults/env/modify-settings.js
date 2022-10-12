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
  settings.processing.var_export = true;
  settings.themes[0].fonts = [
    {
      key: 'sans',
      default: {
        family: "'Inter', sans-serif",
      },
    },
    {
      key: 'serif',
      default: {
        family: 'serif',
      },
    },
    {
      key: 'script',
      default: {
        family: 'script',
      },
    },
    {
      key: 'mono',
      default: {
        family: 'monospace',
      },
    },
  ];
  settings.themes[0].gradients = [
    {
      key: 'divider',
      default: {
        gradient: 'linear-gradient(90deg, #53FFE0, #9D5CFF)',
        fallback: '#53FFE0',
      },
    },
    {
      key: 'primaryRadial',
      default: {
        gradient: 'radial-gradient(rgba(157,92,255, 1), rgba(42, 44, 61, 1))',
        fallback: 'rgba(157,92,255, 1)',
      },
    },
    {
      key: 'accentRadial',
      default: {
        gradient: 'radial-gradient(rgba(83, 255, 224, 1), rgba(42, 44, 61, 1))',
        fallback: 'rgba(83, 255, 224, 1)',
      },
    },
  ];
  settings.themes[0].radii = [
    {
      key: 'rounded',
      default: {
        radius: '10px',
      },
    },
    {
      key: 'pill',
      default: {
        radius: '50rem',
      },
    },
    {
      key: 'circle',
      default: {
        radius: '100%',
      },
    },
  ];
  let test_theme = {
    key: 'theme',
    typography: [
      {
        query_key: 'base',
        size: '120%',
        line_height: '1.5',
        type_scale: '1.33',
      },
      {
        query_key: 'desktop',
        size: '150%',
        line_height: '1.5',
        type_scale: '1.33',
      },
    ],
    colors: [
      {
        key: 'primary',
        default: {
          color: '#EE3482',
          modifiers: [],
        },
      },
      {
        key: 'accent',
        default: {
          color: '#F4B12F',
          modifiers: [],
        },
      },
      {
        key: 'focus',
        default: {
          color: '#2F73F4',
          modifiers: [],
        },
      },
    ],
    containers: [],
    fonts: [
      {
        key: 'sans',
        default: {
          family: "'Open Sans', sans-serif",
        },
      },
      {
        key: 'serif',
        default: {
          family: 'serif',
        },
      },
      {
        key: 'script',
        default: {
          family: 'script',
        },
      },
      {
        key: 'mono',
        default: {
          family: 'monospace',
        },
      },
    ],
    gradients: [
      {
        key: 'divider',
        default: {
          gradient: 'linear-gradient(90deg, #EE3482, #F4B12F)',
          fallback: '#EE3482',
        },
      },
      {
        key: 'primaryRadial',
        default: {
          gradient:
            'radial-gradient(rgba(238, 52, 130, 1), rgba(42, 44, 61, 1))',
          fallback: 'rgba(238, 52, 130, 1)',
        },
      },
      {
        key: 'accentRadial',
        default: {
          gradient:
            'radial-gradient(rgba(244, 177, 47, 1), rgba(42, 44, 61, 1))',
          fallback: 'rgba(244, 177, 47, 1)',
        },
      },
    ],
    radii: [],
    shadows: [],
    transitions: {
      durations: [],
      functions: [],
      delays: [],
    },
  };
  settings.themes = settings.themes.concat(test_theme);
  return settings;
}

build_development_config('Default test', modify_settings);
