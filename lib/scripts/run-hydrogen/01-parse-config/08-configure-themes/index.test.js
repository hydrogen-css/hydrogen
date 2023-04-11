// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Modes} Modes
 * @typedef {import('../../../../data/config-data').Media} Media
 * @typedef {import('../../../../data/config-data').Theme} Theme
 * @typedef {import('../../../../data/config-data').Color} Color
 */

// Data imports
const { get_default_config } = require('../../../../data/config-data');

// Local functions
const { configure_themes } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That configure_themes returns the default theme when no theme is provided by the user', () => {
  // Input
  /** @type {Config} */
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Modes} */
    modes: defaults.modes,
    /** @type {Media} */
    media: defaults.media,
    /** @type {Theme[]} */
    themes: [],
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_themes(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
});

test('That configure_themes returns properly if colors are omitted', () => {
  // Input
  /** @type {Config} */
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Modes} */
    modes: defaults.modes,
    /** @type {Media} */
    media: defaults.media,
    /** @type {Theme[]} */
    themes: [
      {
        key: 'testTheme',
        typography: [
          {
            query_key: 'base',
            size: '100%',
            type_scale: '1.125',
            line_heights: {
              copy: 1.5,
            },
          },
        ],
      },
    ],
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_themes(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
});

test('That configure_themes returns properly if the deprecated line_height setting is used', () => {
  // Input
  /** @type {Config} */
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Modes} */
    modes: defaults.modes,
    /** @type {Media} */
    media: defaults.media,
    /** @type {Theme[]} */
    themes: [
      {
        key: 'testTheme',
        typography: [
          {
            query_key: 'base',
            size: '100%',
            type_scale: '1.125',
            line_height: 1.6,
          },
        ],
      },
    ],
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_themes(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
});

test('That configure_themes returns properly if typography is omitted', () => {
  // Input
  /** @type {Config} */
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Modes} */
    modes: defaults.modes,
    /** @type {Media} */
    media: defaults.media,
    /** @type {Theme[]} */
    themes: [
      {
        key: 'testTheme',
        colors: [
          {
            key: 'primary',
            default: {
              color: 'red',
              modifiers: [],
            },
          },
        ],
      },
    ],
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_themes(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
});
