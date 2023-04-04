// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').ParsedPath} ParsedPath
 */

// Data imports
const { get_default_config } = require('../../../../../data/config-data');

// Local functions
const { parse_input } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That parse_input properly returns an object with an array, string, and glob', () => {
  // Input
  /** @type {Config} */
  let defaults = get_default_config();
  /** @type {ParsedPath} */
  defaults.path = {
    directory: '/home/user/code/hydrogen',
    path: '/home/user/code/hydrogen/hydrogen.config.json',
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = parse_input(defaults);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(Array.isArray(output.array)).toBe(true);
  expect(typeof output.string).toBe('string');
  expect(typeof output.glob).toBe('string');
});
