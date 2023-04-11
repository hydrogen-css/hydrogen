// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Media} Media
 * @typedef {import('../../../../data/config-data').Query} Query
 */

// Data imports
const { get_default_config } = require('../../../../data/config-data');

// Local functions
const { configure_media } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That configure_media properly returns a modified modes object with a full configuration', () => {
  // Input
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Media} */
    media: {
      base_key: 'custom',
      /** @type {Query[]} */
      queries: [
        {
          key: 'custom-query',
          query: 'screen and (min-width: 100em)',
        },
      ],
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_media(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(output.base_key).toBe('custom');
  expect(Array.isArray(output.queries)).toBe(true);
  expect(output.queries[0].key).toBe('custom');
  expect(output.queries[0].query).toBe('base');
  expect(output.queries[1].key).toBe('custom-query');
  expect(output.queries[1].query).toBe('screen and (min-width: 100em)');
});

test('That configure_media properly returns a modified modes object with a partial configuration', () => {
  // Input
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Media} */
    media: {
      /** @type {Query[]} */
      queries: [
        {
          key: 'custom-query',
          query: 'screen and (min-width: 100em)',
        },
      ],
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_media(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(Array.isArray(output.queries)).toBe(true);
  expect(output.queries[0].key).toBe('base');
  expect(output.queries[0].query).toBe('base');
  expect(output.queries[1].key).toBe('custom-query');
  expect(output.queries[1].query).toBe('screen and (min-width: 100em)');
});

test('That configure_media properly returns a modified modes object with an empty configuration', () => {
  // Input
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {};
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_media(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(Array.isArray(output.queries)).toBe(true);
  expect(output.queries[0].key).toBe('base');
  expect(output.queries[0].query).toBe('base');
  expect(output.queries.length).toBe(6);
});
