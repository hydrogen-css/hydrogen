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
  date: new Date('2022-07-19'),
  version: '2.0.0-beta.22',
  features: [
    {
      breaking: false,
      changes: { en: ['Adds support for data-h2-flex-grow.'] },
      properties: ['flex-grow'],
    },
    {
      breaking: false,
      changes: { en: ['Adds support for data-h2-justify-items.'] },
      properties: ['justify-items'],
    },
    {
      breaking: false,
      changes: { en: ['Adds support for data-h2-outline.'] },
      properties: ['outline'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Reworks the way attributes are parsed by the system using a data model file that will help enforce consistency and access to more robust metadata over time.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds a new npx h2-clean script that will remove any log files Hydrogen has created.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Log files and the debug CSS file are now placed in the /hydrogen-logs directory, nested inside of a timestamp directory.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Radius now supports a 3 value syntax that matches its CSS counterpart.',
        ],
      },
      properties: ['radius'],
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: { en: ['Updates Node and NPM version requirements.'] },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Reworks property scripts and reorganizes them, along with better code documentation.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds basic VS Code extension recommendations, settings, and forces basic Prettier-specific styling.',
        ],
      },
    },
    {
      breaking: false,
      changes: { en: ['Log files now include line breaks for legibility.'] },
    },
    {
      breaking: false,
      changes: {
        en: ['Changelog data is now organized by major and minor releases.'],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where options inside of an attribute that were missing a media query stopped the compiler completely.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug where key/value pair attributes weren't parsed if the value started on a new line.",
        ],
      },
    },
  ],
};
