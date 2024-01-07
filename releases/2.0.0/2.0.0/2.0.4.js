// Hydrogen data models
/**
 * @typedef {import('../../../lib/data/release-template-data').Release} Release
 * @typedef {import('../../../lib/data/release-template-data').Change} Change
 * @typedef {import('../../../lib/data/release-template-data').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.4',
  summary:
    'This release adds support for configurable font weight values and introduces a new default set based on the common language found on MDN.',
  featured: false,
  date: new Date('2024-01-06'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: {
        en: ['Adds support for configurable font weight values.'],
      },
    },
  ],
  optimizations: [],
  bugfixes: [],
  documentation: [],
};
