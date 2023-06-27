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
  date: new Date('2022-09-20'),
  version: '2.0.0-beta.29',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where <code>:state</code> modifiers applied to children rather than the element they were applied to.',
        ],
        fr: [
          "Correction d'un bogue où les modificateurs <code>:state</code> s'appliquaient aux enfants plutôt qu'à l'élément auquel ils étaient appliqués.",
        ],
      },
      notes: {
        en: [
          'Because children can targeted directly using complex selectors, all other modifiers should generally apply to the element containing the attribute.',
        ],
        fr: [
          "Comme les enfants peuvent être ciblés directement à l'aide de sélecteurs complexes, tous les autres modificateurs doivent généralement s'appliquer à l'élément contenant l'attribut.",
        ],
      },
    },
  ],
};
