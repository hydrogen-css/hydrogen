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
  date: new Date('2022-09-20'),
  version: '2.0.0-beta.28',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'The documentation website has been migrated into this repository so that the entire application is centralized.',
        ],
        fr: [
          "Le site web de documentation a été migré dans ce dépôt afin que l'ensemble de l'application soit centralisé.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds support for the <code>fill</code> property.'],
        fr: ['Ajoute la prise en charge de la propriété <code>fill</code>.'],
      },
      properties: ['fill'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds a new font size for display style type that is calculated at a level above H1 in the type scale.',
        ],
        fr: [
          "Ajoute une nouvelle taille de police pour le type de style de display qui est calculé à un niveau supérieur à H1 dans l'échelle des types.",
        ],
      },
      properties: ['font-size'],
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'The setup script has been reworked to include the documentation environment.',
        ],
        fr: [
          "Le script d'installation a été retravaillé pour inclure l'environnement de documentation.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Logs passed to the console have been centralized and reworked for more flexibility.',
        ],
        fr: [
          'Les logs transmis à la console ont été centralisés et retravaillés pour plus de flexibilité.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          "Hydrogen now executes based on the location of the configuration, rather than where you've run its command.",
        ],
        fr: [
          "Hydrogen s'exécute désormais en fonction de l'emplacement de la configuration, plutôt que de l'endroit où vous avez exécuté sa commande.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug with <code>transform</code> where decimals in multipliers weren't processed properly.",
        ],
        fr: [
          "Correction d'un bogue avec <code>transform</code> où les décimales dans les multiplicateurs n'étaient pas traitées correctement.",
        ],
      },
      properties: ['transform'],
    },
  ],
};
