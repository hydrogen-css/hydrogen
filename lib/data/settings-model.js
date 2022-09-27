// Hydrogen: Default settings
'use strict';

// Type imports
let Types = require('../data/settings-model-definition');

/**
 * @typedef {import('./settings-model-definition').Settings} Settings
 */

/**
 * Hydrogen's default settings
 * @type {Settings}
 */
let settings_data = {
  info: {
    code: 'https://github.com/hydrogen-design-system/hydrogen',
    docs: 'https://beta.hydrogen.design',
    feedback: 'https://forms.office.com/r/vz80dsUabZ',
    roadmap: 'https://github.com/orgs/hydrogen-design-system/projects/1',
    settings: 'https://beta.hydrogen.design/en/docs/setup/configuration/',
  },
  input: ['array/of/input/folders'],
  output: 'path/to/output/folder',
  build: {
    base_query_key: 'base',
    dark_mode: 'preference',
    logs: false,
    minification: true,
    prefixing: true,
    timers: true,
    reset_styles: true,
    validation: true,
    var_export: false,
  },
  styles: {
    foundations: {
      media: [
        {
          key: 'print',
          query: 'print',
        },
        {
          key: 'p-tablet',
          query: 'screen and (min-width: 48em)',
        },
        {
          key: 'l-tablet',
          query: 'screen and (min-width: 73em)',
        },
        {
          key: 'laptop',
          query: 'screen and (min-width: 80em)',
        },
        {
          key: 'desktop',
          query: 'screen and (min-width: 100em)',
        },
      ],
      typography: [
        {
          query_key: 'base',
          size: '100%',
          line_height: '1.4',
          type_scale: '1.2',
        },
        {
          query_key: 'desktop',
          size: '112.5%',
          line_height: '1.4',
          type_scale: '1.2',
        },
      ],
    },
    tokens: {
      colors: [
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
          modifiers: [],
        },
        {
          key: 'accent',
          color: '#53FFE0',
          modifiers: [],
        },
        {
          key: 'focus',
          color: '#fbce3a',
          modifiers: [],
        },
      ],
      containers: [
        {
          key: 'small',
          max_width: '39rem',
        },
        {
          key: 'medium',
          max_width: '75rem',
        },
        {
          key: 'large',
          max_width: '90rem',
        },
      ],
      fonts: [
        {
          key: 'sans',
          family: 'sans-serif',
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
      ],
      gradients: [],
      radii: [],
      shadows: [
        {
          key: 'small',
          shadow: '0 0.1rem 0.2rem 0 rgba(0, 0, 0, .2)',
        },
        {
          key: 'medium',
          shadow: '0 0.25rem 0.5rem -0.05rem rgba(0, 0, 0, .2)',
        },
        {
          key: 'large',
          shadow: '0 0.4rem 0.7rem -0.1rem rgba(0, 0, 0, .2)',
        },
        {
          key: 'larger',
          shadow: '0 0.55rem 1rem -0.2rem rgba(0, 0, 0, .2)',
        },
        {
          key: 'largest',
          shadow: '0 0.7rem 1.5rem -0.3rem rgba(0, 0, 0, .2)',
        },
      ],
      transitions: {
        durations: [],
        functions: [],
        delays: [],
      },
    },
  },
};

module.exports = settings_data;
