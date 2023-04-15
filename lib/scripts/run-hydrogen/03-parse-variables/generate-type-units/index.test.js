// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').ParsedConfig} ParsedConfig
 * @typedef {import('../../../../data/config-data').ParsedTheme} ParsedTheme
 * @typedef {import('../../../../data/config-data').ParsedTypography} ParsedTypography
 */

// Data imports
const { get_parsed_config } = require('../../../../data/config-parsed-data');

// Local functions
const { generate_type_units } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('Valid type_config object using complete line_heights', () => {
  // Input / output
  /** @type {ParsedConfig} */
  let settings = get_parsed_config();
  /** @type {ParsedTypography} */
  let type_config = {
    query_key: 'base',
    query: 'base',
    size: '112.5%',
    type_scale: '1.125',
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
    caption: {
      size: 'calc(var(--h2-font-size-copy) / 1.125)',
      line_height: 1.4,
    },
    copy: {
      size: '1rem',
      line_height: 'var(--h2-base-line-height)',
    },
    h6: {
      size: 'calc(var(--h2-font-size-copy) * 1.125)',
      line_height: 1.2,
    },
    h5: {
      size: 'calc(var(--h2-font-size-h6) * 1.125)',
      line_height: 1.2,
    },
    h4: {
      size: 'calc(var(--h2-font-size-h5) * 1.125)',
      line_height: 1.2,
    },
    h3: {
      size: 'calc(var(--h2-font-size-h4) * 1.125)',
      line_height: 1.2,
    },
    h2: {
      size: 'calc(var(--h2-font-size-h3) * 1.125)',
      line_height: 1.2,
    },
    h1: {
      size: 'calc(var(--h2-font-size-h2) * 1.125)',
      line_height: 1.2,
    },
    display: {
      size: 'calc(var(--h2-font-size-h1) * 1.125)',
      line_height: 1.2,
    },
  };
  let output = {
    type_units:
      '/* Core units */\n' +
      '--h2-base-font-size: 112.5%;\n' +
      '--h2-base-line-height: 1.4;\n' +
      '--h2-base-whitespace: 1.4;\n',
    type_vars:
      '/* Font sizes and line heights */\n' +
      '--h2-font-size-caption: calc(var(--h2-font-size-copy) / 1.125);\n' +
      '--h2-line-height-caption: 1.4;\n' +
      '--h2-font-size-copy: 1rem;\n' +
      '--h2-line-height-copy: var(--h2-base-line-height);\n' +
      '--h2-font-size-h6: calc(var(--h2-font-size-copy) * 1.125);\n' +
      '--h2-line-height-h6: 1.2;\n' +
      '--h2-font-size-h5: calc(var(--h2-font-size-h6) * 1.125);\n' +
      '--h2-line-height-h5: 1.2;\n' +
      '--h2-font-size-h4: calc(var(--h2-font-size-h5) * 1.125);\n' +
      '--h2-line-height-h4: 1.2;\n' +
      '--h2-font-size-h3: calc(var(--h2-font-size-h4) * 1.125);\n' +
      '--h2-line-height-h3: 1.2;\n' +
      '--h2-font-size-h2: calc(var(--h2-font-size-h3) * 1.125);\n' +
      '--h2-line-height-h2: 1.2;\n' +
      '--h2-font-size-h1: calc(var(--h2-font-size-h2) * 1.125);\n' +
      '--h2-line-height-h1: 1.2;\n' +
      '--h2-font-size-display: calc(var(--h2-font-size-h1) * 1.125);\n' +
      '--h2-line-height-display: 1.2;\n',
  };
  process.env.H2DEBUG = true;
  expect(generate_type_units(settings, type_config)).toStrictEqual(output);
});
