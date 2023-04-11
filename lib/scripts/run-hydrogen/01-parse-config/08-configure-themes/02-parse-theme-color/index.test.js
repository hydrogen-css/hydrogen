// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').Color} Color
 */

// Data imports
const { get_default_config } = require('../../../../../data/config-data');

// Local functions
const { parse_theme_color } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That parse_theme_color correctly parses default and dark color settings with default modifiers and generates correctly formatted variable data', () => {
  // Input
  /** @type {Config} */
  let config = get_default_config();
  /** @type {Color} */
  let color_config = {
    key: 'primary',
    default: {
      color: 'red',
      modifiers: [],
    },
    dark: {
      color: 'maroon',
      modifiers: [],
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = parse_theme_color(config, color_config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(typeof output.key).toBe('string');
  expect(output.default && typeof output.default.color).toBe('string');
  expect(Array.isArray(output.default.modifiers)).toBe(true);
  output.default.modifiers.forEach((modifier) => {
    expect(typeof modifier.key).toBe('string');
    expect(typeof modifier.color === 'string' || modifier.color === false).toBe(true);
    expect(modifier.var_data && typeof modifier.var_data === 'object').toBe(true);
    expect(modifier.var_data.name).not.toBe(undefined);
    expect(modifier.var_data.value).not.toBe(undefined);
    expect(typeof modifier.default).toBe('boolean');
    expect(typeof modifier.overwritten).toBe('boolean');
  });
  expect(output.dark && typeof output.dark.color).toBe('string');
  expect(Array.isArray(output.dark.modifiers)).toBe(true);
  output.dark.modifiers.forEach((modifier) => {
    expect(typeof modifier.key).toBe('string');
    expect(typeof modifier.color === 'string' || modifier.color === false).toBe(true);
    expect(modifier.var_data && typeof modifier.var_data === 'object').toBe(true);
    expect(modifier.var_data.name).not.toBe(undefined);
    expect(modifier.var_data.value).not.toBe(undefined);
    expect(typeof modifier.default).toBe('boolean');
    expect(typeof modifier.overwritten).toBe('boolean');
  });
  expect(output.var_data && typeof output.var_data === 'object').toBe(true);
  expect(output.var_data.name).not.toBe(undefined);
  expect(output.var_data.value).not.toBe(undefined);
});

test('That parse_theme_color correctly parses default color settings when dark values are omitted with default modifiers and generates correctly formatted variable data', () => {
  // Input
  /** @type {Config} */
  let config = get_default_config();
  /** @type {Color} */
  let color_config = {
    key: 'primary',
    default: {
      color: 'red',
      modifiers: [],
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = parse_theme_color(config, color_config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(typeof output.key).toBe('string');
  expect(output.default && typeof output.default.color).toBe('string');
  expect(Array.isArray(output.default.modifiers)).toBe(true);
  output.default.modifiers.forEach((modifier) => {
    expect(typeof modifier.key).toBe('string');
    expect(typeof modifier.color === 'string' || modifier.color === false).toBe(true);
    expect(modifier.var_data && typeof modifier.var_data === 'object').toBe(true);
    expect(modifier.var_data.name).not.toBe(undefined);
    expect(modifier.var_data.value).not.toBe(undefined);
    expect(typeof modifier.default).toBe('boolean');
    expect(typeof modifier.overwritten).toBe('boolean');
  });
  expect(output.dark && typeof output.dark.color).toBe('string');
  expect(Array.isArray(output.dark.modifiers)).toBe(true);
  output.dark.modifiers.forEach((modifier) => {
    expect(typeof modifier.key).toBe('string');
    expect(typeof modifier.color === 'string' || modifier.color === false).toBe(true);
    expect(modifier.var_data && typeof modifier.var_data === 'object').toBe(true);
    expect(modifier.var_data.name).not.toBe(undefined);
    expect(modifier.var_data.value).not.toBe(undefined);
    expect(typeof modifier.default).toBe('boolean');
    expect(typeof modifier.overwritten).toBe('boolean');
  });
  expect(output.var_data && typeof output.var_data === 'object').toBe(true);
  expect(output.var_data.name).not.toBe(undefined);
  expect(output.var_data.value).not.toBe(undefined);
});

test('That parse_theme_color correctly parses default color settings when dark values are omitted, and automated modifier swapping is disabled, with default modifiers and generates correctly formatted variable data', () => {
  // Input
  /** @type {Config} */
  let config = get_default_config();
  config.modes.dark.swap_default_modifiers = false;
  /** @type {Color} */
  let color_config = {
    key: 'primary',
    default: {
      color: 'red',
      modifiers: [],
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = parse_theme_color(config, color_config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(typeof output.key).toBe('string');
  expect(output.default && typeof output.default.color).toBe('string');
  expect(Array.isArray(output.default.modifiers)).toBe(true);
  output.default.modifiers.forEach((modifier) => {
    expect(typeof modifier.key).toBe('string');
    expect(typeof modifier.color === 'string' || modifier.color === false).toBe(true);
    expect(modifier.var_data && typeof modifier.var_data === 'object').toBe(true);
    expect(modifier.var_data.name).not.toBe(undefined);
    expect(modifier.var_data.value).not.toBe(undefined);
    expect(typeof modifier.default).toBe('boolean');
    expect(typeof modifier.overwritten).toBe('boolean');
  });
  expect(!output.dark).toBe(true);
  expect(output.var_data && typeof output.var_data === 'object').toBe(true);
  expect(output.var_data.name).not.toBe(undefined);
  expect(output.var_data.value).not.toBe(undefined);
});

test('That parse_theme_color correctly parses default and dark color settings and generates correctly formatted variable data with a default modifier overwritten', () => {
  // Input
  /** @type {Config} */
  let config = get_default_config();
  /** @type {Color} */
  let color_config = {
    key: 'primary',
    default: {
      color: 'red',
      modifiers: [
        {
          key: 'light',
          color: 'blue',
        },
      ],
    },
    dark: {
      color: 'maroon',
      modifiers: [],
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = parse_theme_color(config, color_config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(typeof output.key).toBe('string');
  expect(output.default && typeof output.default.color).toBe('string');
  expect(Array.isArray(output.default.modifiers)).toBe(true);
  output.default.modifiers.forEach((modifier) => {
    expect(typeof modifier.key).toBe('string');
    expect(typeof modifier.color === 'string' || modifier.color === false).toBe(true);
    expect(modifier.var_data && typeof modifier.var_data === 'object').toBe(true);
    expect(modifier.var_data.name).not.toBe(undefined);
    expect(modifier.var_data.value).not.toBe(undefined);
    expect(typeof modifier.default).toBe('boolean');
    expect(typeof modifier.overwritten).toBe('boolean');
    if (modifier.key === 'light') {
      expect(modifier.overwritten).toBe(true);
      expect(modifier.color).toBe('blue');
    }
  });
  expect(output.dark && typeof output.dark.color).toBe('string');
  expect(Array.isArray(output.dark.modifiers)).toBe(true);
  output.dark.modifiers.forEach((modifier) => {
    expect(typeof modifier.key).toBe('string');
    expect(typeof modifier.color === 'string' || modifier.color === false).toBe(true);
    expect(modifier.var_data && typeof modifier.var_data === 'object').toBe(true);
    expect(modifier.var_data.name).not.toBe(undefined);
    expect(modifier.var_data.value).not.toBe(undefined);
    expect(typeof modifier.default).toBe('boolean');
    expect(typeof modifier.overwritten).toBe('boolean');
  });
  expect(output.var_data && typeof output.var_data === 'object').toBe(true);
  expect(output.var_data.name).not.toBe(undefined);
  expect(output.var_data.value).not.toBe(undefined);
});

test('That parse_theme_color correctly parses default and dark color settings and generates correctly formatted variable data with a default modifier overwritten', () => {
  // Input
  /** @type {Config} */
  let config = get_default_config();
  /** @type {Color} */
  let color_config = {
    key: 'primary',
    default: {
      color: 'red',
      modifiers: [
        {
          key: 'hero',
          color: 'blue',
        },
      ],
    },
    dark: {
      color: 'maroon',
      modifiers: [],
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = parse_theme_color(config, color_config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(typeof output.key).toBe('string');
  expect(output.default && typeof output.default.color).toBe('string');
  expect(Array.isArray(output.default.modifiers)).toBe(true);
  output.default.modifiers.forEach((modifier) => {
    expect(typeof modifier.key).toBe('string');
    expect(typeof modifier.color === 'string' || modifier.color === false).toBe(true);
    expect(modifier.var_data && typeof modifier.var_data === 'object').toBe(true);
    expect(modifier.var_data.name).not.toBe(undefined);
    expect(modifier.var_data.value).not.toBe(undefined);
    expect(typeof modifier.default).toBe('boolean');
    expect(typeof modifier.overwritten).toBe('boolean');
    if (modifier.key === 'custom') {
      expect(modifier.overwritten).toBe(false);
      expect(modifier.color).toBe('blue');
    }
  });
  expect(output.dark && typeof output.dark.color).toBe('string');
  expect(Array.isArray(output.dark.modifiers)).toBe(true);
  output.dark.modifiers.forEach((modifier) => {
    expect(typeof modifier.key).toBe('string');
    expect(typeof modifier.color === 'string' || modifier.color === false).toBe(true);
    expect(modifier.var_data && typeof modifier.var_data === 'object').toBe(true);
    expect(modifier.var_data.name).not.toBe(undefined);
    expect(modifier.var_data.value).not.toBe(undefined);
    expect(typeof modifier.default).toBe('boolean');
    expect(typeof modifier.overwritten).toBe('boolean');
  });
  expect(output.var_data && typeof output.var_data === 'object').toBe(true);
  expect(output.var_data.name).not.toBe(undefined);
  expect(output.var_data.value).not.toBe(undefined);
});
