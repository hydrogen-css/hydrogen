// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  author: 'Josh Beveridge',
  date: new Date('2022-07-11'),
  version: '2.0.0-beta.21',
  features: [
    {
      breaking: false,
      changes: { en: ['Adds state support for :focus-visible.'] },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: ['Reorganizes the cascade order of states to better reflect expected control.'],
      },
    },
  ],
};
