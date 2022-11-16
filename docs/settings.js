// Init and imports
'use strict';
const { black } = require('colors');
const { build_development_config } = require('../lib/setup/build-settings');

// Construct the settings
function modify_settings(settings) {
  // Manipulate the settings for this test
  settings.input = ['src/_includes'];
  settings.output = '_site/static/css';
  settings.modes['dark'].method = 'toggle';
  settings.logging.timers = false;
  settings.logging.verbose = false;
  settings.themes[0].typography = [
    {
      query_key: 'base',
      size: '100%',
      line_height: '1.4',
      type_scale: '1.2',
    },
    {
      query_key: 'desktop',
      size: '112.5%',
      line_height: '1.5',
      type_scale: '1.2',
    },
  ];
  settings.themes[0].colors = settings.themes[0].colors.concat(
    {
      key: 'code',
      default: {
        color: 'rgba(50, 50, 65, 1)',
        modifiers: [],
      },
    },
    {
      key: 'font',
      default: {
        color: '#4c4d59',
        modifiers: [],
      },
      dark: {
        color: '#d2d3d9',
        modifiers: [],
      },
    },
    {
      key: 'foreground',
      default: {
        color: 'white',
        modifiers: [],
      },
      dark: {
        color: '#2a2b38',
        modifiers: [],
      },
    },
    {
      key: 'background',
      default: {
        color: '#f4f8ff',
        modifiers: [],
      },
      dark: {
        color: '#212130',
        modifiers: [],
      },
    },
    {
      key: 'error',
      default: {
        color: 'red',
        modifiers: [],
      },
    },
    {
      key: 'warning',
      default: {
        color: 'orange',
        modifiers: [],
      },
    },
    {
      key: 'success',
      default: {
        color: 'green',
        modifiers: [],
      },
    }
  );
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
      key: 'code',
      default: {
        radius: '5px',
      },
    },
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
  return settings;
}

// Build the config
build_development_config('Docs setup', modify_settings);
