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
  date: new Date('2022-06-30'),
  version: '2.0.0-beta.18',
  optimizations: [
    {
      breaking: true,
      changes: {
        en: [
          'Migrates all config keys away from camelCase in favor of underscores for legibility and accessibility.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where automated dark color scale values were incorrect in the variable export file when compared to the actual Hydrogen output.',
        ],
      },
    },
  ],
};
