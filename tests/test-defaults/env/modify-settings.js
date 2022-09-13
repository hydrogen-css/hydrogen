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
  settings.styles.foundations.typography = [
    {
      query_key: 'base',
      size: '100%',
      line_height: '1.4',
      type_scale: '1.25',
    },
    {
      query_key: 'desktop',
      size: '112.5%',
      line_height: '1.4',
      type_scale: '1.25',
    },
  ];
  settings.styles.tokens.fonts = [
    {
      key: 'sans',
      family: "'Inter', sans-serif",
    },
    {
      key: 'serif',
      family: 'serif',
    },
    {
      key: 'script',
      family: 'script',
    },
    {
      key: 'mono',
      family: 'monospace',
    },
  ];
  settings.styles.tokens.gradients = [
    {
      key: 'divider',
      gradient: 'linear-gradient(90deg, #53FFE0, #9D5CFF)',
      fallback: '#53FFE0',
    },
    {
      key: 'primaryRadial',
      gradient: 'radial-gradient(rgba(157,92,255, 1), rgba(42, 44, 61, 1))',
      fallback: 'rgba(157,92,255, 1)',
    },
    {
      key: 'accentRadial',
      gradient: 'radial-gradient(rgba(83, 255, 224, 1), rgba(42, 44, 61, 1))',
      fallback: 'rgba(83, 255, 224, 1)',
    },
  ];
  settings.styles.tokens.radii = [
    {
      key: 'rounded',
      radius: '10px',
    },
    {
      key: 'pill',
      radius: '50rem',
    },
    {
      key: 'circle',
      radius: '100%',
    },
  ];
  return settings;
}

build_development_config('Default test', modify_settings);
