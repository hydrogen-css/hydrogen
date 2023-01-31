// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('./settings-model-definition').Settings} Settings
 */

// Data imports

// Logging

// Functions

// Vendor imports

// Script
/**
 * Hydrogen's default settings
 * @returns {Settings}
 */
function get_settings_data() {
  return {
    info: {
      code: 'https://github.com/hydrogen-design-system/hydrogen',
      docs: 'https://beta.hydrogen.design',
      feedback: 'https://forms.office.com/r/vz80dsUabZ',
      roadmap: 'https://github.com/orgs/hydrogen-design-system/projects/1',
      settings: 'https://beta.hydrogen.design/en/docs/setup/configuration/',
    },
    input: ['array/of/input/folders'],
    output: 'path/to/output/folder',
    modes: {
      method: 'preference',
      dark: {
        auto_apply_styles: true,
        swap_default_modifiers: true,
      },
    },
    processing: {
      reset_styles: true,
      prefixing: true,
      minification: true,
      var_export: false,
    },
    logging: {
      logs: false,
      timers: true,
      verbose: true,
      errors: {
        count: 0,
        storage: [],
      },
      warnings: {
        count: 0,
        storage: [],
      },
    },
    media: {
      base_key: 'base',
      queries: [
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
    },
    themes: [
      {
        key: 'default',
        typography: [
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
        ],
        colors: [
          {
            key: 'white',
            default: {
              color: 'rgba(255, 255, 255, 1)',
              modifiers: [],
            },
            dark: {
              color: '#212130',
              modifiers: [],
            },
          },
          {
            key: 'black',
            default: {
              color: '#212130',
              modifiers: [],
            },
            dark: {
              color: 'rgba(255, 255, 255, 1)',
              modifiers: [],
            },
          },
          {
            key: 'primary',
            default: {
              color: '#9D5CFF',
              modifiers: [],
            },
          },
          {
            key: 'secondary',
            default: {
              color: '#53FFE0',
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
          },
        ],
        containers: [
          {
            key: 'small',
            default: {
              max_width: '39rem',
            },
          },
          {
            key: 'medium',
            default: {
              max_width: '75rem',
            },
          },
          {
            key: 'large',
            default: {
              max_width: '90rem',
            },
          },
        ],
        fonts: [
          {
            key: 'sans',
            default: {
              family: 'sans-serif',
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
        gradients: [],
        radii: [],
        shadows: [
          {
            key: 'small',
            default: {
              shadow: '0 0.1rem 0.2rem 0 rgba(0, 0, 0, .2)',
            },
            dark: {
              shadow: '0 0.1rem 0.2rem 0 rgba(0, 0, 0, .5)',
            },
          },
          {
            key: 'medium',
            default: {
              shadow: '0 0.25rem 0.5rem -0.05rem rgba(0, 0, 0, .2)',
            },
            dark: {
              shadow: '0 0.25rem 0.5rem -0.05rem rgba(0, 0, 0, .5)',
            },
          },
          {
            key: 'large',
            default: {
              shadow: '0 0.4rem 0.7rem -0.1rem rgba(0, 0, 0, .2)',
            },
            dark: {
              shadow: '0 0.4rem 0.7rem -0.1rem rgba(0, 0, 0, .5)',
            },
          },
          {
            key: 'larger',
            default: {
              shadow: '0 0.55rem 1rem -0.2rem rgba(0, 0, 0, .2)',
            },
            dark: {
              shadow: '0 0.55rem 1rem -0.2rem rgba(0, 0, 0, .5)',
            },
          },
          {
            key: 'largest',
            default: {
              shadow: '0 0.7rem 1.5rem -0.3rem rgba(0, 0, 0, .2)',
            },
            dark: {
              shadow: '0 0.7rem 1.5rem -0.3rem rgba(0, 0, 0, .5)',
            },
          },
        ],
        transitions: {
          durations: [],
          functions: [],
          delays: [],
        },
      },
    ],
  };
}

module.exports = {
  get_settings_data,
};
