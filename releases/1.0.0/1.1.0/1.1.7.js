// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  author: 'Josh Beveridge',
  date: new Date('2021-09-09'),
  version: '1.1.7',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: ['Fixes a typo (a missing $) that completely broke the overflow attribute.'],
      },
    },
  ],
};
