// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../data/settings-model-definition').Typography} Typography
 */

// Data imports
const { get_default_config } = require('../../data/config-data');

// Functions
const { build_typography_variables } = require('./build-typography-variables');

// Tests

test('Generates a string of CSS variables containing font sizes and line heights for the type scale', () => {
  // Input / output
  /** @type {Settings} */
  let settings = get_default_config();
  /** @type {Typography} */
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
  let output =
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
    '--h2-line-height-display: 1.2;\n';
  process.env.H2DEBUG = true;
  expect(build_typography_variables(settings, type_config)).toStrictEqual(output);
});
