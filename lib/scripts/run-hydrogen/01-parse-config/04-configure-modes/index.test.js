// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Modes} Modes
 * @typedef {import('../../../../data/config-data').DarkMode} DarkMode
 */

// Data imports
const { get_default_config } = require('../../../../data/config-data');

// Local functions
const { configure_modes } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That configure_modes properly returns a modified modes object with a full configuration', () => {
  // Input
  /** @type {Config} */
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Modes} */
    modes: {
      method: 'toggle',
      /** @type {DarkMode} */
      dark: {
        auto_apply_styles: false,
        swap_default_modifiers: false,
      },
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_modes(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(output.method).toBe('toggle');
  expect(output.dark.auto_apply_styles).toBe(false);
  expect(output.dark.swap_default_modifiers).toBe(false);
});

test('That configure_modes properly returns a modified modes object with partial configuration', () => {
  // Input
  /** @type {Config} */
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {ConfigOptions} */
    modes: {
      method: 'toggle',
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_modes(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(output.method).toBe('toggle');
  expect(output.dark.auto_apply_styles).toBe(true);
  expect(output.dark.swap_default_modifiers).toBe(true);
});

test('That configure_modes properly returns a modified modes object with an empty configuration', () => {
  // Input
  /** @type {Config} */
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {};
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_modes(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(output.method).toBe('preference');
  expect(output.dark.auto_apply_styles).toBe(true);
  expect(output.dark.swap_default_modifiers).toBe(true);
});
