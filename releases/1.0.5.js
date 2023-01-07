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
  version: '1.0.5',
  date: new Date('2021-04-25'),
  author: 'Josh Beveridge',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes the display attribute not being properly escaped, causing quotations in the CSS.',
        ],
      },
      properties: ['display'],
    },
  ],
};
