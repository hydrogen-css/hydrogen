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
    'This minor release enhances the query configuration so that you can configure more than just media queries, adds a few quality of life features, fixes a few bugs, and updates the documentation site.',
  featured: false,
  date: new Date('2024-07-02'),
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
    {
      breaking: false,
      changes: {
        en: [
          "Exports the <code>build</code> and <code>watch</code> scripts from the module's main index file.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Hydrogen now returns its processed CSS as a string for use by other frameworks.'],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Allows you to control whether Hydrogen writes a CSS file.'],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Adds the ability to toggle Lightning CSS' error recovery to prevent it from exiting the build.",
        ],
      },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: ['Centralizes results logging to help make output more consistent.'],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Deprecates <code>data-h2-container</code> custom syntax in favor of the native CSS property; adds <code>data-h2-wrapper</code> as a replacement for the custom syntax.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: 'warning',
      changes: {
        en: [
          'Addresses inconsistencies created by the random order of the cascade generated based on file-read order.',
          'All properties are now written in alphabetical order, which forces shortcut properties (e.g. <code>margin</code>) to always be overridden by their specific variants (e.g. <code>margin-right</code>).',
          'In practice, this means that if you apply a shortcut property and one or more of its variants to the same element, the specific variants will always take precendence.',
          "This change is labelled with a warning because Hydrogen's output order is liable to change, meaning certain projects might experience a swap in the way overridden properties display.",
        ],
      },
    },
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
    {
      breaking: false,
      changes: {
        en: [
          'Adds new information about incompatibilities between <code>flex-grid</code> and <code>margin</code>.',
        ],
      },
    },
  ],
};
