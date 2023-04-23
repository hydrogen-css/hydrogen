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
  date: new Date('2022-08-22'),
  version: '2.0.0-beta.25',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Adds a new :id[] modifier that allows you to target the element only if a target ID been applied to it.',
          'Like classes and children, IDs are specified inside square brackets.',
        ],
        fr: [
          "Ajoute un nouveau modificateur :id[] qui vous permet de cibler l'élément uniquement si un ID cible lui a été appliqué.",
          'Comme les classes et les enfants, les ID sont spécifiés entre crochets.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds a snippet for single queries with options.'],
        fr: ['Ajoute un snippet pour les requêtes uniques avec options'],
      },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: ['Updates snippets to be more concise now that there are many modifier types.'],
        fr: [
          "Met à jour les extraits pour qu'ils soient plus concis maintenant qu'il existe de nombreux types de modificateurs.",
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug that was preventing the use of pseudo selectors in the children modifier.',
        ],
        fr: [
          "Correction d'un bogue qui empêchait l'utilisation de pseudo-sélecteurs dans le modificateur d'enfants.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Prevents the use of 'id', 'class', and 'children' as media query keys during validation.",
        ],
        fr: [
          "Empêche l'utilisation de 'id', 'class' et 'children' comme clés de requête de média pendant la validation.",
        ],
      },
    },
  ],
};
