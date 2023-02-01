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
  date: new Date('2021-09-08'),
  version: '1.1.6',
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'Updates and fixes NPM warnings where possible, including to gulp-sass v5.0.0.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'An improperly set environment variable had broken the init script.',
        ],
      },
    },
  ],
};
