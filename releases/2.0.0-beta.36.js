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
  version: '2.0.0-beta.36',
  date: new Date('2023-01-10'),
  author: 'Josh Beveridge',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug where color key replacement in attribute parsing wasn't accounting for dash or underscore characters.",
        ],
      },
    },
  ],
};
