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
  author: 'Josh Beveridge',
  date: new Date('2021-09-28'),
  version: '1.1.9',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a resulting bug from the previous version that caused the production version of the watch script to fail.',
        ],
      },
    },
  ],
};
