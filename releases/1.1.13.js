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
  date: new Date('2021-11-22'),
  version: '1.1.13',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where the new utility generation script was appending defaults to the end of the configuration array, resulting in them being prioritized last.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Sets transition all for these properties rather than dedicated values because when used in concert, the last one would always take precendence.',
        ],
      },
      properties: [
        'background-color',
        'border',
        'color',
        'opacity',
        'overlay',
        'shadow',
        'width',
      ],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug that broke the production build script if the flex grid was disabled.',
        ],
      },
    },
  ],
};
