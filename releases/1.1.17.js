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
  date: new Date('2022-01-26'),
  version: '1.1.17',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Updates all instances of the project referring to itself to use path.resolve to ensure that the routing always works.',
        ],
      },
    },
  ],
};
