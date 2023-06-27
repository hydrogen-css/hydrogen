// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.1',
  summary:
    'This release contains a handful of minor quality of life changes, including reduced console output and better development console error logging.',
  featured: false,
  date: new Date('2023-02-27'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: {
        en: ['Console output has been reduced even further when the verbose option is disabled.'],
      },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'Adds an optional development environment variable <code>H2DEBUG</code> that can be used to force every function to log errors to the console.',
          'This is primarily for development work and debugging on Hydrogen and not for use by end users.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug that prevented CSS compilation if the unsupported fallback value was missing from gradient theme configurations.',
        ],
      },
    },
  ],
};
