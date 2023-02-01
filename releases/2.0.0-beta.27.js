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
  date: new Date('2022-09-08'),
  version: '2.0.0-beta.27',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for CSS validation during CSS construction. This allows Hydrogen to warn you against invalid CSS before it gets processed, preventing errors and providing opportunities to fix otherwise hidden problems.',
        ],
        fr: [
          "Ajoute la prise en charge de la validation CSS pendant la construction du CSS. Hydrogen peut ainsi vous avertir des CSS non valides avant qu'ils ne soient traités, ce qui permet d'éviter les erreurs et de corriger des problèmes autrement cachés.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Updates the development setup script and adds new refresh and testing scripts.',
        ],
        fr: [
          'Mise à jour du script de configuration du développement et ajout de nouveaux scripts de rafraîchissement et de test.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for unique command flags that provide command line level control over certain build settings.',
          "<code>--config=''</code> allows you to pass a directory containing a <code>hydrogen.config.json</code> file.",
          '<code>--quiet</code>, <code>--quiet=false</code> allows you to enable/disable timer output in the console.',
          '<code>--validate</code>, <code>--validate==false</code> allows you to enable/disable CSS validation.',
          '<code>--prefix</code>, <code>--prefix=false</code> allows you to enable/disable Autoprefixer.',
          "<code>--logs</code>, <code>--logs=false</code> allows you to enable/disable Hydrogen's log output.",
          '<code>--minify</code>, <code>--minify=false</code> allows you to enable/disable CSSnano.',
        ],
        fr: [
          'Ajout de la prise en charge de drapeaux de commande uniques qui permettent de contrôler certains paramètres de construction au niveau de la ligne de commande.',
          "<code>--config=''</code> vous permet de transmettre un répertoire contenant un fichier <code>hydrogen.config.json</code>.",
          "<code>--quiet</code>, <code>--quiet=false</code> permet d'activer/désactiver la sortie du timer dans la console.",
          "<code>--validate</code>, <code>--validate==false</code> vous permet d'activer/désactiver la validation CSS.",
          "<code>--prefix</code>, <code>--prefix=false</code> permet d'activer/désactiver l'Autoprefixer.",
          "<code>--logs</code>, <code>--logs=false</code> vous permet d'activer/désactiver la sortie des journaux d'Hydrogen.",
          "<code>--minify</code>, <code>--minify=false</code> vous permet d'activer/désactiver CSSnano.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for the <code>transform</code> property, including parsing of whitespace multipliers contained within the CSS declaration.',
        ],
        fr: [
          "Ajoute la prise en charge de la propriété <code>transform</code>, y compris l'analyse des multiplicateurs d'espacement contenus dans la déclaration CSS.",
        ],
      },
      notes: {
        en: [
          'Transform is the first property that checks a CSS value for Hydrogen specific syntax and replaces it on the fly with the correct values.',
        ],
        fr: [
          'Transform est la première propriété qui vérifie une valeur CSS pour la syntaxe spécifique à Hydrogen et la remplace à la volée par les valeurs correctes.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for the <code>line-height</code> property, along with its alias, <code>leading</code>.',
        ],
        fr: [
          'Ajoute la prise en charge de la propriété <code>line-height</code>, ainsi que de son alias, <code>leading</code>.',
        ],
      },
      properties: ['line-height'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for a new fraction-based column syntax for <code>flex-item</code> elements inside of a <code>flex-grid</code>.',
          "The new syntax looks like this: <code>data-h2-flex-item='base(1/2)'</code>",
        ],
        fr: [
          "Ajout de la prise en charge d'une nouvelle syntaxe de colonne basée sur les fractions pour les éléments <code>flex-item</code> à l'intérieur d'un <code>flex-grid</code>.",
          "La nouvelle syntaxe ressemble à ceci : <code>data-h2-flex-item='base(1/2)'</code>.",
        ],
      },
      properties: ['flex-item'],
    },
  ],
  optimizations: [
    {
      breaking: true,
      changes: {
        en: [
          'Overhauls the configuration data model for better categorization and to increase ease of validation for optional items.',
          'Adds new configuration options inside of the new build object.',
          '<code>base_query_key</code> allows you to optionally set a custom key for the base media query, which has been removed from the media configuration.',
          '<code>validation</code> allows you to enable/disable the new CSS validation feature.',
          '<code>minification</code> allows you to enable/disable CSSnano.',
          '<code>prefixing</code> allows you to enable/disable Autoprefixer.',
          '<code>quiet</code> allows you to enable/disable timer output in the console.',
        ],
        fr: [
          'Refonte du modèle de données de configuration pour une meilleure catégorisation et une plus grande facilité de validation des éléments optionnels.',
          "Ajoute de nouvelles options de configuration à l'intérieur du nouvel objet de build.",
          '<code>base_query_key</code> vous permet de définir de manière facultative une clé personnalisée pour la requête média de base, qui a été supprimée de la configuration des médias.',
          "<code>validation</code> vous permet d'activer/désactiver la nouvelle fonction de validation CSS.",
          "<code>minification</code> vous permet d'activer/désactiver CSSnano.",
          "<code>prefixing</code> vous permet d'activer/désactiver le Autoprefixer.",
          "<code>quiet</code> vous permet d'activer/désactiver la sortie du timer dans la console.",
        ],
      },
      migrations: {
        en: [
          '<code>debug</code> is now <code>logs</code>, nested inside the <code>build</code> object.',
          '<code>variables</code> is now <code>var_export</code>, nested inside the <code>build</code> object.',
          'Both <code>reset-styles</code> and <code>dark_mode</code> are now nested inside the <code>build</code> object.',
          '<code>colors</code>, <code>containers</code>, <code>fonts</code>, <code>gradients</code>, <code>radii</code> (from <code>radius</code>), <code>shadows</code>, and <code>transitions</code> are now nested inside a <code>tokens</code> object, which itself is nested inside a <code>styles</code> object.',
          'Both <code>media</code> and <code>typography</code> are now found inside a <code>foundations</code> object, which is found inside the <code>styles</code> object.',
        ],
        fr: [
          "<code>debug</code> est maintenant <code>logs</code>, imbriqué dans l'objet <code>build</code>.",
          "<code>variables</code> est maintenant <code>var_export</code>, imbriqué dans l'objet <code>build</code>.",
          "<code>reset_styles</code> et <code>dark_mode</code> sont maintenant imbriqués dans l'objet de <code>build</code>.",
          '<code>colors</code>, <code>containers</code>, <code>fonts</code>, <code>gradients</code>, <code>radii</code> (à partir de <code>radius</code>), <code>shadows</code> et <code>transitions</code> sont maintenant imbriqués dans un objet <code>tokens</code>, qui lui-même est imbriqué dans un objet <code>styles</code>.',
          "<code>media</code> et <code>typography</code> se trouvent désormais tous deux dans un objet <code>foundations</code>, qui se trouve dans l'objet <code>styles</code>.",
        ],
      },
    },
    {
      breaking: true,
      changes: {
        en: [
          'Reworks <code>gap</code> so that it better aligns with other syntax choices around columns/rows/axes. Passing 1 option now sets a gap value on both, while 2 options applies to column and row respectively.',
        ],
        fr: [
          "Remaniement <code>gap</code> pour qu'il s'aligne mieux avec les autres choix syntaxiques autour des colonnes/lignes/axes. Passer l'option 1 définit maintenant une valeur d'écart sur les deux, tandis que les options 2 s'appliquent respectivement à la colonne et à la ligne.",
        ],
      },
      migrations: {
        en: [
          'Find instances of <code>gap</code> in your code and review the axes chosen, and replace the second value with a space unit where necessary.',
          "For example: <code>data-h2-gap='base(x3, both)'</code> => <code>data-h2-gap='base(x3)'</code>",
          "Another example: <code>data-h2-gap='base(x2, row)'</code> => <code>data-h2-gap='base(0, x2)'</code>",
        ],
        fr: [
          "Trouvez des exemples de <code>gap</code> dans votre code et revoyez les axes choisis, et remplacez la deuxième valeur par une unité d'espacement si nécessaire.",
          "Par exemple : <code>data-h2-gap='base(x3, both)'</code> => <code>data-h2-gap='base(x3)'</code>",
          "Un autre exemple : <code>data-h2-gap='base(x2, row)'</code> => <code>data-h2-gap='base(0, x2)'</code>",
        ],
      },
      properties: ['gap'],
    },
    {
      breaking: true,
      changes: {
        en: [
          'Reworks <code>overflow</code> so that it better aligns with other syntax choices around columns/rows/axes. Passing 1 option now sets an overflow value on both axes, while 2 options applies to <code>x</code> and <code>y</code> respectively.',
        ],
        fr: [
          "Remaniement de l'<code>overflow</code> pour qu'il s'aligne mieux avec les autres choix syntaxiques autour des colonnes/lignes/axes. Passer l'option 1 définit maintenant une valeur de débordement sur les deux axes, tandis que les options 2 s'appliquent respectivement à <code>x</code> et <code>y</code>.",
        ],
      },
      migrations: {
        en: [
          'Find instances of <code>overflow</code> in your code and review the axes chosen, and replace the second value with an overflow value where necessary.',
          "For example: <code>data-h2-overflow='base(hidden, y)'</code> => <code>data-h2-overflow='base(visible, hidden)'</code>",
          "Another example: <code>data-h2-overflow='base(hidden, both)'</code> => <code>data-h2-overflow='base(hidden)'</code>",
        ],
        fr: [
          "Trouvez les cas de l'<code>overflow</code> dans votre code et revoyez les axes choisis, et remplacez la deuxième valeur par une valeur de dépassement si nécessaire.",
          "Par exemple : <code>data-h2-overflow='base(hidden, y)'</code> => <code>data-h2-overflow='base(visible, hidden)'</code>",
          "Un autre exemple : <code>data-h2-overflow='base(hidden, both)'</code> => <code>data-h2-overflow='base(hidden)'</code>",
        ],
      },
      properties: ['overflow'],
    },
    {
      breaking: true,
      changes: {
        en: [
          'Simplifies the <code>flex-grid</code> syntax even further to accept 2 (<code>alignment</code>, <code>gutter</code>) or 3 (<code>alignment</code>, <code>column_gutter</code>, <code>row_gutter</code>) values.',
        ],
        fr: [
          'Simplifie encore davantage la syntaxe de <code>flex-grid</code> en acceptant des valeurs de 2 (<code>alignment</code>, <code>gutter</code>) ou 3 (<code>alignment</code>, <code>column_gutter</code>, <code>row_gutter</code>).',
        ],
      },
      migrations: {
        en: [
          'Find instances of <code>flex-grid</code> in your code and remove the second option entirely.',
          "For example: <code>data-h2-flex-grid='base(center, x2, x3)'</code> => <code>data-h2-flex-grid='base(center, x3)'</code>",
          "Another example: <code>data-h2-flex-grid='base(center, x2, 40px, 20px)'</code> => <code>data-h2-flex-grid='base(center, 40px, 20px)'</code>",
        ],
        fr: [
          'Trouvez les instances de <code>flex-grid</code> dans votre code et supprimez entièrement la deuxième option.',
          "Par exemple : <code>data-h2-flex-grid='base(center, x2, x3)'</code> => <code>data-h2-flex-grid='base(center, x3)'</code>",
          "Un autre exemple : <code>data-h2-flex-grid='base(center, x2, 40px, 20px)'</code> => <code>data-h2-flex-grid='base(center, 40px, 20px)'</code>",
        ],
      },
      notes: {
        en: [
          "The flex-grid is now a deprecated back-up for browser support purposes. CSS grid is fully supported in 2.0.0, and flexbox was never meant to be a grid replacement. It has small implementation bugs regardless of the approach taken to generate a grid, so it's been simplified for ease-of-use.",
          "Because flexbox's support of gap is implemented differently than grid, the flex-grid relies on a negative margin hack to allow for gap/gutter support. This approach has its downsides though, specifically that applying backgrounds, padding, or borders directly to the grid element doesn't behave as expected and that the negative margin overlaps previous elements if it's large.",
          'These changes were implemented as the result of a bug with the current implementation relying on inline-flex over flex as the default grid display value. This gave the grid extra height if the grid items were smaller than the default line height of the tag used.',
          "It's now recommended that applying styles to a grid be done on a wrapper element instead, which avoids a significant number of implementation bugs. Thus, grid-padding has been removed as an option from the flex-grid attribute.",
        ],
        fr: [
          "La grille flexbox est désormais une solution de secours dépréciée à des fins de prise en charge par les navigateurs. La grille CSS est entièrement prise en charge dans la version 2.0.0, et flexbox n'a jamais été conçu pour remplacer la grille. Elle présente de petits bogues de mise en œuvre, quelle que soit l'approche adoptée pour générer une grille, et a donc été simplifiée pour en faciliter l'utilisation.",
          "Étant donné que la prise en charge de l'espacement par flexbox est mise en œuvre différemment de celle de la grille, la grille flex s'appuie sur une marge négative pour permettre la prise en charge de l'espacement et de la gouttière. Cette approche présente toutefois des inconvénients, notamment le fait que l'application d'arrière-plans, de rembourrages ou de bordures directement à l'élément de la grille ne se comporte pas comme prévu et que la marge négative chevauche les éléments précédents si elle est importante.",
          "Ces modifications ont été mises en œuvre à la suite d'un bogue dans l'implémentation actuelle qui utilisait inline-flex au lieu de flex comme valeur d'affichage de la grille par défaut. Cela donnait à la grille une hauteur supplémentaire si les éléments de la grille étaient plus petits que la hauteur de ligne par défaut de la balise utilisée.",
          "Il est désormais recommandé d'appliquer des styles à une grille sur un élément d'habillage, ce qui permet d'éviter un grand nombre de bogues de mise en œuvre. Ainsi, le grid-padding a été supprimé en tant qu'option de l'attribut flex-grid.",
        ],
      },
      properties: ['flex-grid'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Completely rewrites the query parsing script for cleaner and more reliable output, particularly when it comes to complex brackets nested inside of modifiers.',
          "This also removed the parser's dependency on spaces as a delimiter for queries.",
        ],
        fr: [
          "Réécriture complète du script d'analyse des requêtes pour une sortie plus propre et plus fiable, en particulier lorsqu'il s'agit de parenthèses complexes imbriquées dans des modificateurs.",
          "Cela a également supprimé la dépendance de l'analyseur syntaxique vis-à-vis des espaces comme délimiteur des requêtes.",
        ],
      },
      notes: {
        en: [
          "There's a complex parentheses bug where the parser will error out if there are is a non-equal number of opening and closing parentheses, but when the parentheses do in fact line up, the system doesn't have a way of identifying the problem.",
          'CSS validation was a way of catching this bug before assembly.',
        ],
        fr: [
          "Il existe un bogue complexe concernant les parenthèses : l'analyseur syntaxique se trompe si le nombre de parenthèses ouvrantes et fermantes n'est pas égal, mais lorsque les parenthèses sont effectivement alignées, le système n'a aucun moyen d'identifier le problème.",
          "La validation CSS était un moyen d'attraper ce bogue avant l'assemblage.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds <code>z-index</code> as an alias for <code>layer</code>.'],
        fr: [
          'Ajoute <code>z-index</code> comme alias pour <code>layer</code>.',
        ],
      },
      properties: ['layer'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Error reporting has been reworked to provide clearer headings and more detailed information, including things like invalid settings and the build step in which the error occurred.',
        ],
        fr: [
          "Les rapports d'erreur ont été retravaillés pour fournir des titres plus clairs et des informations plus détaillées, y compris des éléments tels que les paramètres invalides et l'étape de construction au cours de laquelle l'erreur s'est produite.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Completely overhauls settings validation and validation output.'],
        fr: [
          'Refonte complète de la validation des paramètres et de la sortie de validation.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Completely overhauls internal testing and provides a more robust testing framework for catching bugs faster and more consistently.',
        ],
        fr: [
          "Refonte complète des tests internes et fourniture d'un cadre de test plus robuste permettant de détecter les bogues plus rapidement et de manière plus cohérente.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Overhauls the property data model to be more concise and easier to manipulate.',
        ],
        fr: [
          'Refonte du modèle de données des propriétés pour le rendre plus concis et plus facile à manipuler.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Consolidated scripting for basic and size-only properties to make bugs less likely and code easier to maintain.',
        ],
        fr: [
          'Consolidation des scripts pour les propriétés de base et de taille uniquement afin de réduire les risques de bogues et de faciliter la maintenance du code.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where CSS colors using a <code>.</code> character were inadvertently resulting in an error.',
        ],
        fr: [
          'Corrige un bogue pour lequel les couleurs CSS utilisant un caractère <code>.</code> entraînaient par inadvertance une erreur.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug where queries that weren't separated by a space were parsed as a single query, resulting in an error.",
        ],
        fr: [
          "Correction d'un bogue où les requêtes qui n'étaient pas séparées par un espace étaient analysées comme une seule requête, ce qui entraînait une erreur.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where non-unit values passed to the container attribute would result in a string inside of a calc function.',
        ],
        fr: [
          "Correction d'un bogue pour lequel des valeurs non unitaires passées à l'attribut conteneur pouvaient donner lieu à une chaîne de caractères à l'intérieur d'une fonction de calcul.",
        ],
      },
      properties: ['container'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where visibility was setting overflow to auto rather than visible, causing unexpected scroll bars.',
        ],
        fr: [
          "Correction d'un bogue où la visibilité réglait le débordement sur auto plutôt que sur visible, provoquant des barres de défilement inattendues.",
        ],
      },
      properties: ['visibility'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes incorrect timer reporting for the PostCSS processing step (prefixing and minification).',
        ],
        fr: [
          "Correction d'un rapport de temporisation incorrect pour l'étape de traitement PostCSS (préfixation et minification).",
        ],
      },
    },
  ],
};
