// Hydrogen data models
/**
 * @typedef {import('../../../lib/data/release-template-data').Release} Release
 * @typedef {import('../../../lib/data/release-template-data').Change} Change
 * @typedef {import('../../../lib/data/release-template-data').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.5',
  summary:
    'This release fixes a log bug and updates the error output when Lightning CSS fails for easier debugging.',
  featured: false,
  date: new Date('2024-03-14'),
  author: 'Josh Beveridge',
  features: [],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'Enhances the error output when Lightning CSS fails so that it includes the line and column values for the CSS location in <code>hydrogen.raw.css</code>.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug that prevented the <code>generate_logs</code> configuration from working, which also caused the compile to fail.',
        ],
      },
    },
  ],
  documentation: [
    {
      breaking: false,
      changes: {
        en: [
          'Removes outstanding references to Autoprefixer and CSSnano from the <code>CONTRIBUTE.md</code> file.',
        ],
      },
    },
  ],
};
