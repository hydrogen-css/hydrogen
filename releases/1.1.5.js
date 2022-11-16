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
  date: new Date('2021-08-06'),
  version: '1.1.5',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Enhances the clean script to accept key-value pairs when scanning markup and scripts.',
        ],
      },
    },
  ],
};
