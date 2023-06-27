// Hydrogen data models
/**
 * @typedef {import('../../../lib/data/release-template-data').Release} Release
 * @typedef {import('../../../lib/data/release-template-data').Change} Change
 * @typedef {import('../../../lib/data/release-template-data').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.2',
  summary:
    "This release adds more granular control to <code>line-height</code> settings, reworks Hydrogen's internal testing framework, and fixes a handful of bugs. You'll also notice significant improvements to the documentation website, including code highlighting, a release RSS feed, and more.",
  featured: false,
  date: new Date('2023-06-26'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Updates the <code>typography</code> configuration to accept <code>line-height</code> configurations for each level in the type scale.',
        ],
      },
      properties: ['font-size'],
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: ['Migrates internal development testing away from custom JavaScript in favor of Jest.'],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Overhauls the <code>lib</code> directory structure for clearer build step identification and consistent structure.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Further updates and minimizes console output by replacing the "system" label with Hydrogen\'s version and appending timers to their relevant behaviours.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Restructures the <code>releases</code> directory for better organization and glob references.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Updates repo-specific documentation to better reflect the build process and addition of Jest testing.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Deprecates the term "copy" in favor of "body" when referring to paragraph-sized text.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds error codes for better toolchain integration.'],
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
    {
      breaking: false,
      changes: {
        en: ["Fixes a bug where font sizes weren't always respected on iOS."],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where PostCSS would increase in run time during the <code>watch</code> command due to cached data not being purged.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug where the <code>:hover</code> selector wasn't properly wrapped in the <code>(hover:hover)</code> media query when used in the <code>:children</code> query modifier, resulting in an uneven experience on touch devices.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where Hydrogen incorrectly identified the <code>data-h2</code> wrapper attribute if it was referenced in CSS files.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where Hydrogen reported a successful compile despite there being errors logged to the console.',
        ],
      },
    },
  ],
};
