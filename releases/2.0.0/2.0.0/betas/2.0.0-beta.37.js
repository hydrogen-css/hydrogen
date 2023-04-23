// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.0-beta.37',
  date: new Date('2023-01-10'),
  author: 'Josh Beveridge',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug that was causing color opacity modifiers to break because of the way the value was being parsed as a number.',
        ],
      },
    },
  ],
};
