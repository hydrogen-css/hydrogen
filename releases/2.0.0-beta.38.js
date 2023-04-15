// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.0-beta.38',
  date: new Date('2023-01-12'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Re-adds previous visibility functionality under a new custom property named visually-hidden.',
        ],
      },
      properties: ['visually-hidden', 'visibility'],
    },
  ],
};
