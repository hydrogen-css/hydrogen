// Hydrogen data models
let Release = require('../lib/data/release-model-definition');
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '1.0.0',
  date: new Date('2021-04-25'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: { en: ['Adds a basic README file.'] },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds a handful of basic reset styles to ensure consistency.'],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for a whitespace configuration in the settings file.',
        ],
      },
      properties: ['margin', 'padding'],
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: ['Updates the build scripts so that output is more standardized.'],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Adds specificity to margin and padding so that they override reset styles.',
        ],
      },
      properties: ['margin', 'padding'],
    },
  ],
};
