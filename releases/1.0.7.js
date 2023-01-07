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
  version: '1.0.7',
  date: new Date('2021-06-23'),
  author: 'Josh Beveridge',
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'Updates dependencies to fix security warnings; certain dependencies are blocked and waiting on patches.',
        ],
      },
    },
  ],
};
