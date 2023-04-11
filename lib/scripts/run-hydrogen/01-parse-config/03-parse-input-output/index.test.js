// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Input} Input
 * @typedef {import('../../../../data/config-data').Output} Output
 * @typedef {import('../../../../data/config-data').ParsedPath} ParsedPath
 * @typedef {import('../../../../data/config-data').ParsedInput} ParsedInput
 * @typedef {import('../../../../data/config-data').ParsedOutput} ParsedOutput
 */

// Data imports

// Local functions
const { parse_input_output } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That parse_input_output properly returns a modified modes object with a full configuration', () => {
  // Input
  /** @type {Config} */
  let config = {
    /** @type {ParsedPath} */
    path: {
      directory: '/home/user/code/hydrogen',
      path: '/home/user/code/hydrogen/hydrogen.config.json',
    },
    /** @type {Input} */
    input: ['path/to/test/input'],
    /** @type {Output} */
    output: 'path/to/test/output',
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  /** @type {{input: ParsedInput, output: ParsedOutput}} */
  let output = parse_input_output(config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(output.input && typeof output.input === 'object').toBe(true);
  expect(Array.isArray(output.input.raw)).toBe(true);
  expect(output.input.parsed && typeof output.input.parsed === 'object').toBe(true);
  expect(Array.isArray(output.input.parsed.array)).toBe(true);
  expect(typeof output.input.parsed.string).toBe('string');
  expect(typeof output.input.parsed.glob).toBe('string');
  expect(output.output && typeof output.output === 'object').toBe(true);
  expect(typeof output.output.raw).toBe('string');
  expect(output.output.parsed && typeof output.output.parsed === 'object').toBe(true);
  expect(Array.isArray(output.output.parsed.array)).toBe(true);
  expect(typeof output.output.parsed.string).toBe('string');
  expect(typeof output.output.parsed.glob).toBe('string');
});
