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
  version: '2.0.0-beta.24',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Adds a new :class[] modifier that allows you to target the element only if a class or classes have been applied to it.',
          "Classes are specified inside square brackets as a comma separated list and without a '.'",
          'This is particularly useful when styles need to change based on state - you can apply a class when the state changes and the styles will activate.',
        ],
        fr: [
          "Ajoute un nouveau modificateur :class[] qui vous permet de cibler l'élément uniquement si une ou plusieurs classes lui ont été appliquées.",
          "Les classes sont spécifiées entre crochets, sous forme de liste séparée par des virgules et sans '.'",
          "Ceci est particulièrement utile lorsque les styles doivent changer en fonction de l'état - vous pouvez appliquer une classe lorsque l'état change et les styles seront activés.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds a new :children[] modifier that allows you to target an elements children with styles.',
          'Children can be targeted using any valid CSS selector, including tags, classes, ids, and data attributes.',
          'This is helpful for bulk styling child elements and reduces a significant amount of markup bloat.',
          'The :children[] modifier can be overwritten by applying the same property to a child in the event you need a single (or multiple) children to deviate from the standard.',
        ],
        fr: [
          "Ajoute un nouveau modificateur :children[] qui vous permet de cibler les enfants d'un élément avec des styles.",
          "Les enfants peuvent être ciblés à l'aide de tout sélecteur CSS valide, y compris les balises, les classes, les ids et les attributs de données.",
          'Cela permet de styliser en vrac les éléments enfants et de réduire considérablement le nombre de balises.',
          "Le modificateur :children[] peut être remplacé par l'application de la même propriété à un enfant au cas où vous auriez besoin d'un seul (ou de plusieurs) enfant(s) pour déroger à la norme.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "The CSS variable file's contents is now included in hydrogen.css so that you no longer have to load a separate file.",
          'The option to generate a file still remains, but half the variables were being loaded by hydrogen.css already and it made more sense to avoid duplication of variables when loading both files by eliminating the need to load the variable file entirely if you were already loading Hydrogen.',
        ],
        fr: [
          'Le contenu du fichier variable CSS est désormais inclus dans le fichier hydrogen.css, de sorte que vous ne devez plus charger un fichier distinct.',
          "L'option permettant de générer un fichier demeure, mais la moitié des variables étaient déjà chargées par hydrogen.css et il était plus logique d'éviter la duplication des variables lors du chargement des deux fichiers en éliminant la nécessité de charger entièrement le fichier de variables si vous chargez déjà Hydrogen.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds the ability to store your configuration file in the parent directory of the Node process to help support NPM workspaces.',
        ],
        fr: [
          'Ajoute la possibilité de stocker votre fichier de configuration dans le répertoire parent du processus Node pour aider à supporter les espaces de travail NPM.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds a new feedback link to the info object in the configuration file.'],
        fr: [
          "Ajoute un nouveau lien de retour d'information à l'objet info dans le fichier de configuration.",
        ],
      },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'Optimizes the way certain properties override each other so that they only affect CSS values that they are intended to change.',
        ],
        fr: [
          "Optimise la manière dont certaines propriétés se substituent les unes aux autres afin qu'elles n'affectent que les valeurs CSS qu'elles sont censées modifier.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds a new development README file in the lib directory that outlines the basic build flow.',
        ],
        fr: [
          'Ajoute un nouveau fichier README de développement dans le répertoire lib qui décrit le flux de construction de base.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: ['Fixes the broken settings link in the info object in the configuration file.'],
        fr: ["Corrige le lien brisé des paramètres dans l'objet info du fichier de configuration."],
      },
    },
  ],
};
