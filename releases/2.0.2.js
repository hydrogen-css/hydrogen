// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.2',
  featured: false,
  date: new Date('2023-03-27'),
  author: 'Josh Beveridge',
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'Organizes key regular expressions into a single helper file for easier maintenance and reuse.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Updates various documentation files (<code>README.md</code>, <code>CONTRIBUTING.md</code>, settings data) with correct links and information.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where configured color values used inside of CSS gradient definitions were improperly replaced when two configured colors were used and one contained a color modifier.',
          'For example: <code>data-h2-background="base(linear-gradient(90deg, primary, primary.darkest))"</code>',
        ],
      },
    },
  ],
};
