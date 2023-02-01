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
  version: '1.0.4',
  date: new Date('2021-04-25'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Enhances the build scripts so that they provide helpful console output regarding processes as they run, the amount of time they take, and other descriptive messaging.',
        ],
      },
    },
  ],
};
