// Hydrogen tests: Seed test settings
'use strict';

// Hydrogen data models
let Settings = require('../../../lib/data/settings-model-definition');
/** @typedef {import('../../../lib/data/settings-model-definition').Settings} Settings */

// Hydrogen data imports

// Hydrogen function imports
const {
  build_development_config,
} = require('../../../lib/setup/build-settings');

// Vendor imports

// Scripts

/**
 * Modifies the settings object for the test
 * @param {Settings} settings
 * @returns {Settings}
 */
function modify_settings(settings) {
  settings.input = ['input'];
  settings.output = 'output';
  settings.modes = {
    dark: {
      automatic: true,
      method: 'toggle',
    },
  };
  settings.processing = {
    browser_prefix_css: true,
    minify_css: true,
    include_reset_css: true,
    export_variable_file: true,
  };
  settings.logging = {
    logs: true,
    timers: false,
  };
  settings.media = {
    base_key: 'custom',
    queries: [
      {
        key: 'print',
        query: 'print',
      },
    ],
  };
  let default_theme = {
    key: 'default',
    typography: [
      {
        query_key: 'custom',
        line_height: '1.4',
        size: '100%',
        type_scale: '1.33',
      },
    ],
    colors: [
      {
        key: 'testColor',
        default: {
          color: 'red',
          modifiers: [
            {
              key: 'testModifier',
              color: 'yellow',
            },
          ],
        },
        dark: {
          color: 'maroon',
          modifiers: [
            {
              key: 'testModifier',
              color: 'orange',
            },
          ],
        },
      },
    ],
    containers: [
      {
        key: 'testContainer',
        default: {
          max_width: '45em',
        },
      },
    ],
    fonts: [
      {
        key: 'testFont',
        default: {
          family: '45em',
        },
      },
    ],
    gradients: [
      {
        key: 'testGradient',
        default: {
          gradient: 'linear-gradient(90deg,red,blue)',
          fallback: 'red',
        },
        dark: {
          gradient: 'linear-gradient(90deg,maroon,navy)',
          fallback: 'maroon',
        },
      },
    ],
    radii: [
      {
        key: 'testRadius',
        default: {
          radius: '10px',
        },
      },
    ],
    shadows: [
      {
        key: 'testShadow',
        default: {
          shadow: '1px 1px 1px red',
        },
        dark: {
          shadow: '1px 1px 1px maroon',
        },
      },
    ],
    transitions: {
      durations: [
        {
          key: 'testDuration',
          default: {
            duration: '2s',
          },
        },
      ],
      functions: [
        {
          key: 'testFunction',
          default: {
            function: 'ease',
          },
        },
      ],
      delays: [
        {
          key: 'testDelay',
          default: {
            delay: '2s',
          },
        },
      ],
    },
  };
  let optional_theme = {
    key: 'optionalTheme',
    typography: [
      {
        query_key: 'custom',
        line_height: '1.4',
        size: '100%',
        type_scale: '1.33',
      },
    ],
    colors: [
      {
        key: 'testColor',
        default: {
          color: 'green',
          modifiers: [
            {
              key: 'testModifier',
              color: 'olive',
            },
          ],
        },
        dark: {
          color: 'darkgreen',
          modifiers: [
            {
              key: 'testModifier',
              color: 'darkolivegreen',
            },
          ],
        },
      },
    ],
    containers: [
      {
        key: 'testContainer',
        default: {
          max_width: '45em',
        },
      },
    ],
    fonts: [
      {
        key: 'testFont',
        default: {
          family: '45em',
        },
      },
    ],
    gradients: [
      {
        key: 'testGradient',
        default: {
          gradient: 'linear-gradient(90deg,green,blue)',
          fallback: 'green',
        },
        dark: {
          gradient: 'linear-gradient(90deg,darkgreen,navy)',
          fallback: 'darkgreen',
        },
      },
    ],
    radii: [
      {
        key: 'testRadius',
        default: {
          radius: '20px',
        },
      },
    ],
    shadows: [
      {
        key: 'testShadow',
        default: {
          shadow: '1px 1px 1px green',
        },
        dark: {
          shadow: '1px 1px 1px darkgreen',
        },
      },
    ],
    transitions: {
      durations: [
        {
          key: 'testDuration',
          default: {
            duration: '2s',
          },
        },
      ],
      functions: [
        {
          key: 'testFunction',
          default: {
            function: 'ease',
          },
        },
      ],
      delays: [
        {
          key: 'testDelay',
          default: {
            delay: '2s',
          },
        },
      ],
    },
  };
  settings.themes = [default_theme, optional_theme];
  return settings;
}

build_development_config('Settings test', modify_settings);
