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
    'This release adds support for configurable font weight values and introduces a new default set based on the common language found on MDN. It also migrates Hydrogen away from PostCSS, Autoprefixer, and CSSnano in favor of Lightning CSS.',
  featured: false,
  date: new Date('2024-03-14'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: {
        en: ['Adds support for configurable font weight values.'],
      },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'Migrates away from CSSnano and Autoprefixer in favor of Lightning CSS, which has resulted in some serious speed gains (the documentation site dropped from ~500ms to ~180ms).',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Removes references to an old <code>clean.js</code> file that was causing errors for projects using Hydrogen through PNPM.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug where the <code>:children</code> selector wouldn't style pseudo elements due to the automatically added <code>:not</code> statement.",
        ],
      },
    },
  ],
  documentation: [],
};
