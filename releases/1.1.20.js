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
  version: '1.1.20',
  date: new Date('2022-06-30'),
  author: 'Josh Beveridge',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: ['Rolls back an accidental package publish of the 2.0.0 beta.'],
        fr: [
          'Annule une publication accidentelle de paquets de la version 2.0.0 beta.',
        ],
      },
    },
  ],
};
