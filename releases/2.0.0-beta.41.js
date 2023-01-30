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
  version: '2.0.0-beta.41',
  date: new Date('2023-01-29'),
  author: 'Josh Beveridge',
  optimizations: [
    {
      breaking: true,
      changes: {
        en: [
          'Updates the <code>automatic_modifiers</code> setting in the <code>modes</code> configuration to <code>swap_default_modifiers</code> to help make the purpose of the setting more explicit.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug with the init script that caused an error if the input or output directories were specified inside directories that didn't yet exist.",
        ],
      },
    },
  ],
};
