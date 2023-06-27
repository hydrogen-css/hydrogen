// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '1.1.0',
  date: new Date('2021-07-23'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'The init script now asks for a scripts folder alongside the markup folder because state management that happens in JavaScript needs to be considered when compiling the production files.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for the width attribute, allowing the user to configure custom width values.',
        ],
      },
      properties: ['width'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for state management through the use of ":x" syntax, allowing for control over hover (:h), active (:a), focus (:f), and disabled (:d).',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds support for normal and stretch prop values when defining a grid.'],
      },
      properties: ['flex-grid'],
    },
    {
      breaking: false,
      changes: { en: ['Adds support for the normal prop value.'] },
      properties: ['align-items'],
    },
  ],
  optimizations: [
    {
      breaking: true,
      changes: {
        en: [
          'Alters the configuration file to use the word key over name for syntax consistency with other tools.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'The init script will now fail if the directories entered in the prompt do not yet exist.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Reworks a lot of the scripting into more centralized, reusable chunks.'],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Removes the need for a Gulpfile for internal development and migrates to node execution of Gulp scripts.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Ensures that that debug configuration properly applies to the compile script, as well as the build script.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Updates the use of "/" characters in Sass math functions to resolve deprecation warnings.',
        ],
      },
    },
  ],
};
