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
      breaking: true,
      changes: {
        en: [
          'Offset was preventing the use of the true CSS <code>offset</code> value, so it has been removed in favor of <code>location</code>.',
        ],
      },
      properties: ['offset', 'location'],
    },
    {
      breaking: true,
      changes: {
        en: [
          'Support for <code>z-index</code> has been migrated away from being an alias for <code>layer</code> in favor of true CSS <code>z-index</code> syntax, but this means that existing uses of <code>z-index</code> will no longer apply a position value.',
        ],
      },
      properties: ['offset', 'location'],
    },
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
