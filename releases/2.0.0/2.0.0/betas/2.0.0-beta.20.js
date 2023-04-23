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
  date: new Date('2022-07-10'),
  version: '2.0.0-beta.20',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          "Hydrogen will now properly error with instructions if you try to run it in a directory that doesn't contain a configuration file.",
        ],
        fr: [
          "Hydrogen affichera désormais correctement des instructions si vous essayez de l'exécuter dans un répertoire qui ne contient pas de fichier de configuration.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Adds a warning if Hydrogen can't find at least 1 instance of the data-h2 attribute in your code.",
        ],
        fr: [
          "Ajoute un avertissement si Hydrogen ne trouve pas au moins une instance de l'attribut data-h2 dans votre code.",
        ],
      },
    },
  ],
};
