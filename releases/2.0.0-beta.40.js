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
  version: '2.0.0-beta.40',
  date: new Date('2023-01-26'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: true,
      changes: {
        en: [
          'Enhances the functionality from the previous release by enabling the fixed use of any configured color in dark mode when the automatic setting is enabled.',
          'This means that if you set black to automatically swap to white but need black explicitly in dark mode, you can simply define <code>:dark(black)</code>.',
        ],
      },
    },
  ],
};
