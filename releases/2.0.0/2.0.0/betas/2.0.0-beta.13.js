// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  author: 'Josh Beveridge',
  date: new Date('2022-06-17'),
  version: '2.0.0-beta.13',
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          "The process script has been reworked so that Autoprefixer is now run through CSSnano, and CSSnano's preset has been set to lite for improved speed.",
          [
            'This is also meant to prevent Hydrogen from being overly prescriptive about how its file is minimized, so by using lite, the changes are restricted to autoprefixing, removing empty selectors/queries, removing comments, and whitespace normalization.',
          ],
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'All query values are now checked for extra opening and closing parentheses to prevent unexpected PostCSS syntax errors.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'CSS colors are now parsed for dot characters to prevent unexpected PostCSS syntax errors.',
        ],
      },
    },
  ],
};
