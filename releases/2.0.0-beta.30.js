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
  author: 'Josh Beveridge',
  date: new Date('2022-10-30'),
  version: '2.0.0-beta.30',
  features: [
    {
      breaking: true,
      changes: {
        en: [
          'Adds support for themes, each with their own default and dark mode settings.',
        ],
      },
      migrations: {
        en: ['See the configuration model change for migration requirements.'],
      },
    },
    {
      breaking: true,
      changes: {
        en: [
          'Provides new configuration options for automating dark mode, including the addition of a new <code>:all</code> mode modifier that will force a style to persist across modes.',
        ],
      },
      migrations: {
        en: [
          'The <code>dark_mode</code> setting has been renamed and moved to <code>modes</code>, which should contain an object that then contains a <code>dark</code> object.',
          'The <code>dark</code> object can have the following values: <code>automatic</code> as a boolean, and <code>method</code> which accepts <code>preference</code> or <code>toggle</code> like the old option.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds support for all CSS properties.'],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds support for the <code>:selectors</code> modifier.'],
      },
      notes: {
        en: ['This includes deprecation for :id and :class.'],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for attribute selectors inside the <code>:children</code> modifier.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Hydrogen now returns a promise when a build completes/fails for easier integration with projects and build tools.',
        ],
      },
    },
  ],
  optimizations: [
    {
      breaking: true,
      changes: {
        en: [
          'The configuration model has been overhauled to better categorize information and to add support for themes.',
        ],
      },
      migrations: {
        en: [
          'A majority of the settings found withing the "build" configuration have been broken out into more specific sections (e.g. modes, processing, and logging).',
          'The "styles" configuration has been removed entirely in favor of "media" and "themes" configurations.',
          'The "base_query_key" option should be moved under the "media" option, and all media query definitions should be moved under a "queries" option.',
          'Themes require a key value, one of which must always be "default".',
          'Themes should now contain a "typography" object, and then the expected style settings of colors, gradients, fonts, shadows, radii, transitions, etc.',
          'Individual style settings should now contain a key, default, and dark object, which are then provided their own unique settings (e.g. for a color, the default and dark objects should be passed a color string and a modifier array.',
        ],
      },
    },
    {
      breaking: true,
      changes: {
        en: [
          'Color variable exports have been reformatted to export as <code>red</code>, <code>blue</code>, and <code>green</code> values.',
        ],
      },
      migrations: {
        en: [
          'Color variables will need to be wrapped in an <code>RGB</code> or <code>RGBA</code> value.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Rearranges and optimizes certain function calls so that they are called less frequently and perform faster.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds new error and system logging for better debugging.'],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Separates and defines important data models using JSDocs for better documentation and function typing.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds new contextual console information including the number of input files processed during a build.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Begins the addition of per-function unit tests for more reliable change monitoring and bug prevention.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: true,
      changes: {
        en: [
          'Fixed a bug with opacity modifiers on colors, but caused a breaking change as a result that requires them to be written using the full percentage number (e.g. <code>10</code> for <code>10%</code>).',
        ],
      },
      migrations: {
        en: [
          'Instances of opacity modifiers should be changed to reflect the full percentage expected, rather than the decimal value previously used (e.g. <code>.2</code> for <code>20%</code> should become <code>.20</code>).',
        ],
      },
      properties: ['background-color', 'border', 'color', 'fill', 'overlay'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug that caused the compiler to duplicate CSS (and therefore increase build time) during incremental watch runs.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug where <code>none</code> wasn't properly parsed by the <code>max-height/width</code> and <code>min-height/width</code> properties.",
        ],
      },
      properties: ['max-height', 'max-width', 'min-height', 'min-width'],
    },
  ],
};
