// Hydrogen data models
/**
 * @typedef {import('../../../lib/data/release-template-data').Release} Release
 * @typedef {import('../../../lib/data/release-template-data').Change} Change
 * @typedef {import('../../../lib/data/release-template-data').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.1.0',
  summary:
    'This patch enhances the query configuration so that you can configure more than just media queries, fixes one or two bugs, and updates the documentation site.',
  featured: false,
  date: new Date('2024-07-01'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Allows for other <code>@rule</code> configurations in the media settings, which enables the use of container queries.',
        ],
      },
    },
  ],
  optimizations: [],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: ['Fixes a bug where the build would log as "succeeded" when warnings were output.'],
      },
    },
  ],
  documentation: [
    {
      breaking: false,
      changes: {
        en: ['Reworks the homepage layout with a reduced header and updated copy.'],
      },
    },
  ],
};
