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
  version: '2.0.0-beta.34',
  date: new Date('2022-11-17'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: true,
      changes: {
        en: [
          'Adds support for parsing configured colors (and their modifiers) as well as space multipliers inside of almost all standard CSS properties.',
        ],
      },
      notes: [],
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixed a bug where captions were being assigned the wrong variable, resulting in incorrect computed values.',
        ],
      },
    },
  ],
};
