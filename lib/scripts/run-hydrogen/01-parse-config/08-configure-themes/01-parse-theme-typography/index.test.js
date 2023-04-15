// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').Media} Media
 * @typedef {import('../../../../../data/config-data').Typography} Typography
 * @typedef {import('../../../../../data/config-data').LineHeights} LineHeights
 * @typedef {import('../../../../../data/config-data').ParsedTypography} ParsedTypography
 */

// Data imports
const { get_default_config } = require('../../../../../data/config-data');

// Local functions
const { parse_theme_typography } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That parse_theme_typography properly compiles type scale data and adds it to the typography object when a full line_heights definition is configured', () => {
  // Input
  let defaults = get_default_config();
  /** @type {Typography} */
  let type_config = {
    query_key: 'print',
    size: '100%',
    type_scale: '1.125',
    /** @type {LineHeights} */
    line_heights: {
      caption: '1.4',
      copy: '1.4',
      h6: '1.2',
      h5: '1.2',
      h4: '1.2',
      h3: '1.2',
      h2: '1.2',
      h1: '1.2',
      display: '1.2',
    },
  };
  /** @type {Config} */
  let config = {
    /** @type {Media} */
    media: defaults.media,
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  /** @type {ParsedTypography} */
  let output = parse_theme_typography(config, type_config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(typeof output.query).toBe('string');
  expect(output.caption && typeof output.caption.size).toBe('string');
  expect(
    output.caption &&
      (typeof output.caption.line_height === 'string' ||
        typeof output.caption.line_height === 'number')
  ).toBe(true);
  expect(output.copy && typeof output.copy.size).toBe('string');
  expect(
    output.copy &&
      (typeof output.copy.line_height === 'string' || typeof output.copy.line_height === 'number')
  ).toBe(true);
  expect(output.h6 && typeof output.h6.size).toBe('string');
  expect(
    output.h6 &&
      (typeof output.h6.line_height === 'string' || typeof output.h6.line_height === 'number')
  ).toBe(true);
  expect(output.h5 && typeof output.h5.size).toBe('string');
  expect(
    output.h5 &&
      (typeof output.h5.line_height === 'string' || typeof output.h5.line_height === 'number')
  ).toBe(true);
  expect(output.h4 && typeof output.h4.size).toBe('string');
  expect(
    output.h4 &&
      (typeof output.h4.line_height === 'string' || typeof output.h4.line_height === 'number')
  ).toBe(true);
  expect(output.h3 && typeof output.h3.size).toBe('string');
  expect(
    output.h3 &&
      (typeof output.h3.line_height === 'string' || typeof output.h3.line_height === 'number')
  ).toBe(true);
  expect(output.h2 && typeof output.h2.size).toBe('string');
  expect(
    output.h2 &&
      (typeof output.h2.line_height === 'string' || typeof output.h2.line_height === 'number')
  ).toBe(true);
  expect(output.h1 && typeof output.h1.size).toBe('string');
  expect(
    output.h1 &&
      (typeof output.h1.line_height === 'string' || typeof output.h1.line_height === 'number')
  ).toBe(true);
  expect(output.display && typeof output.display.size).toBe('string');
  expect(
    output.display &&
      (typeof output.display.line_height === 'string' ||
        typeof output.display.line_height === 'number')
  ).toBe(true);
});

test('That parse_theme_typography properly compiles type scale data and adds it to the typography object when a partial line_heights definition is configured', () => {
  // Input
  let defaults = get_default_config();
  /** @type {Typography} */
  let type_config = {
    query_key: 'print',
    size: '100%',
    type_scale: '1.125',
    /** @type {LineHeights} */
    line_heights: {
      caption: '1.4',
      h5: '1.2',
      h2: 'auto',
    },
  };
  /** @type {Config} */
  let config = {
    /** @type {Media} */
    media: defaults.media,
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  /** @type {ParsedTypography} */
  let output = parse_theme_typography(config, type_config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(typeof output.query).toBe('string');
  expect(output.caption && typeof output.caption.size).toBe('string');
  expect(
    output.caption &&
      (typeof output.caption.line_height === 'string' ||
        typeof output.caption.line_height === 'number')
  ).toBe(true);
  expect(output.copy && typeof output.copy.size).toBe('string');
  expect(
    output.copy &&
      (typeof output.copy.line_height === 'string' || typeof output.copy.line_height === 'number')
  ).toBe(true);
  expect(output.h6 && typeof output.h6.size).toBe('string');
  expect(
    output.h6 &&
      (typeof output.h6.line_height === 'string' || typeof output.h6.line_height === 'number')
  ).toBe(true);
  expect(output.h5 && typeof output.h5.size).toBe('string');
  expect(
    output.h5 &&
      (typeof output.h5.line_height === 'string' || typeof output.h5.line_height === 'number')
  ).toBe(true);
  expect(output.h4 && typeof output.h4.size).toBe('string');
  expect(
    output.h4 &&
      (typeof output.h4.line_height === 'string' || typeof output.h4.line_height === 'number')
  ).toBe(true);
  expect(output.h3 && typeof output.h3.size).toBe('string');
  expect(
    output.h3 &&
      (typeof output.h3.line_height === 'string' || typeof output.h3.line_height === 'number')
  ).toBe(true);
  expect(output.h2 && typeof output.h2.size).toBe('string');
  expect(
    output.h2 &&
      (typeof output.h2.line_height === 'string' || typeof output.h2.line_height === 'number')
  ).toBe(true);
  expect(output.h1 && typeof output.h1.size).toBe('string');
  expect(
    output.h1 &&
      (typeof output.h1.line_height === 'string' || typeof output.h1.line_height === 'number')
  ).toBe(true);
  expect(output.display && typeof output.display.size).toBe('string');
  expect(
    output.display &&
      (typeof output.display.line_height === 'string' ||
        typeof output.display.line_height === 'number')
  ).toBe(true);
});

test('That parse_theme_typography properly compiles type scale data and adds it to the typography object when no line_heights definition is configured', () => {
  // Input
  let defaults = get_default_config();
  /** @type {Typography} */
  let type_config = {
    query_key: 'print',
    size: '100%',
    type_scale: '1.125',
  };
  /** @type {Config} */
  let config = {
    /** @type {Media} */
    media: defaults.media,
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  /** @type {ParsedTypography} */
  let output = parse_theme_typography(config, type_config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(typeof output.query).toBe('string');
  expect(output.caption && typeof output.caption.size).toBe('string');
  expect(
    output.caption &&
      (typeof output.caption.line_height === 'string' ||
        typeof output.caption.line_height === 'number')
  ).toBe(true);
  expect(output.copy && typeof output.copy.size).toBe('string');
  expect(
    output.copy &&
      (typeof output.copy.line_height === 'string' || typeof output.copy.line_height === 'number')
  ).toBe(true);
  expect(output.h6 && typeof output.h6.size).toBe('string');
  expect(
    output.h6 &&
      (typeof output.h6.line_height === 'string' || typeof output.h6.line_height === 'number')
  ).toBe(true);
  expect(output.h5 && typeof output.h5.size).toBe('string');
  expect(
    output.h5 &&
      (typeof output.h5.line_height === 'string' || typeof output.h5.line_height === 'number')
  ).toBe(true);
  expect(output.h4 && typeof output.h4.size).toBe('string');
  expect(
    output.h4 &&
      (typeof output.h4.line_height === 'string' || typeof output.h4.line_height === 'number')
  ).toBe(true);
  expect(output.h3 && typeof output.h3.size).toBe('string');
  expect(
    output.h3 &&
      (typeof output.h3.line_height === 'string' || typeof output.h3.line_height === 'number')
  ).toBe(true);
  expect(output.h2 && typeof output.h2.size).toBe('string');
  expect(
    output.h2 &&
      (typeof output.h2.line_height === 'string' || typeof output.h2.line_height === 'number')
  ).toBe(true);
  expect(output.h1 && typeof output.h1.size).toBe('string');
  expect(
    output.h1 &&
      (typeof output.h1.line_height === 'string' || typeof output.h1.line_height === 'number')
  ).toBe(true);
  expect(output.display && typeof output.display.size).toBe('string');
  expect(
    output.display &&
      (typeof output.display.line_height === 'string' ||
        typeof output.display.line_height === 'number')
  ).toBe(true);
});

test('That parse_theme_typography properly compiles type scale data and adds it to the typography object when the deprecated line_height definition is configured', () => {
  // Input
  let defaults = get_default_config();
  /** @type {Typography} */
  let type_config = {
    query_key: 'print',
    size: '100%',
    type_scale: '1.125',
    line_height: 1.4,
  };
  /** @type {Config} */
  let config = {
    /** @type {Media} */
    media: defaults.media,
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  /** @type {ParsedTypography} */
  let output = parse_theme_typography(config, type_config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(typeof output.query).toBe('string');
  expect(output.caption && typeof output.caption.size).toBe('string');
  expect(
    output.caption &&
      (typeof output.caption.line_height === 'string' ||
        typeof output.caption.line_height === 'number')
  ).toBe(true);
  expect(output.copy && typeof output.copy.size).toBe('string');
  expect(
    output.copy &&
      (typeof output.copy.line_height === 'string' || typeof output.copy.line_height === 'number')
  ).toBe(true);
  expect(output.h6 && typeof output.h6.size).toBe('string');
  expect(
    output.h6 &&
      (typeof output.h6.line_height === 'string' || typeof output.h6.line_height === 'number')
  ).toBe(true);
  expect(output.h5 && typeof output.h5.size).toBe('string');
  expect(
    output.h5 &&
      (typeof output.h5.line_height === 'string' || typeof output.h5.line_height === 'number')
  ).toBe(true);
  expect(output.h4 && typeof output.h4.size).toBe('string');
  expect(
    output.h4 &&
      (typeof output.h4.line_height === 'string' || typeof output.h4.line_height === 'number')
  ).toBe(true);
  expect(output.h3 && typeof output.h3.size).toBe('string');
  expect(
    output.h3 &&
      (typeof output.h3.line_height === 'string' || typeof output.h3.line_height === 'number')
  ).toBe(true);
  expect(output.h2 && typeof output.h2.size).toBe('string');
  expect(
    output.h2 &&
      (typeof output.h2.line_height === 'string' || typeof output.h2.line_height === 'number')
  ).toBe(true);
  expect(output.h1 && typeof output.h1.size).toBe('string');
  expect(
    output.h1 &&
      (typeof output.h1.line_height === 'string' || typeof output.h1.line_height === 'number')
  ).toBe(true);
  expect(output.display && typeof output.display.size).toBe('string');
  expect(
    output.display &&
      (typeof output.display.line_height === 'string' ||
        typeof output.display.line_height === 'number')
  ).toBe(true);
});
