// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '1.0.6',
  date: new Date('2021-04-26'),
  author: 'Josh Beveridge',
  optimizations: [
    {
      breaking: false,
      changes: {
        en: ['Enhances the init script so that the output it creates is more consistent.'],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: ['Fixes a color function bug that was causing the init script to fail.'],
      },
    },
  ],
};
