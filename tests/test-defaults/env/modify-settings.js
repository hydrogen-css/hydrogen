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
  settings.themes[0].colors = settings.themes[0].colors.concat({
    key: 'page',
    default: {
      color: '#f3f3f9',
      modifiers: [],
    },
    dark: {
      color: '#111117',
      modifiers: [],
    },
  });
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
  let dt_theme = {
    key: 'dt',
    colors: [
      {
        key: 'white',
        default: {
          color: 'white',
          modifiers: [],
        },
        dark: {
          color: '#2d2d2d',
          modifiers: [],
        },
      },
      {
        key: 'primary',
        default: {
          color: '#00C3B7',
          modifiers: [],
        },
        dark: {
          color: '#86e3de',
          modifiers: [],
        },
      },
      {
        key: 'accent',
        default: {
          color: '#9747FF',
          modifiers: [],
        },
        dark: {
          color: '#c395ff',
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
      {
        key: 'page',
        default: {
          color: '#f3f3f9',
          modifiers: [],
        },
        dark: {
          color: '#111117',
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
          gradient: 'linear-gradient(90deg, #FFB900, #00C3B7, #FF5958)',
          fallback: '#FFB900',
        },
      },
      {
        key: 'primaryRadial',
        default: {
          gradient:
            'radial-gradient(RGBA(255, 185, 0, 1), rgba(42, 44, 61, 1))',
          fallback: 'RGBA(255, 185, 0, 1)',
        },
      },
      {
        key: 'accentRadial',
        default: {
          gradient:
            'radial-gradient(RGBA(255, 89, 88, 1), rgba(42, 44, 61, 1))',
          fallback: 'RGBA(255, 89, 88, 1)',
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
  let iap_theme = {
    key: 'iap',
    colors: [
      {
        key: 'primary',
        default: {
          color: '#c01e5a',
          modifiers: [],
        },
        dark: {
          color: '#df6b96',
          modifiers: [],
        },
      },
      {
        key: 'accent',
        default: {
          color: '#272f6b',
          modifiers: [],
        },
        dark: {
          color: '#6871b3',
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
          gradient: 'linear-gradient(90deg, #c01e5a, #272f6b)',
          fallback: '#c01e5a',
        },
      },
      {
        key: 'primaryRadial',
        default: {
          gradient:
            'radial-gradient(rgba(192, 30, 90, 1), rgba(42, 44, 61, 1))',
          fallback: 'rgba(192, 30, 90, 1)',
        },
      },
      {
        key: 'accentRadial',
        default: {
          gradient:
            'radial-gradient(rgba(39, 47, 107, 1), rgba(42, 44, 61, 1))',
          fallback: 'rgba(39, 47, 107, 1)',
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
  settings.themes = settings.themes.concat(dt_theme);
  settings.themes = settings.themes.concat(iap_theme);
  return settings;
}

build_development_config('Default test', modify_settings);
