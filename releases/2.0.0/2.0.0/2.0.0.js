// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.0',
  summary:
    'This release reworks almost every single feature and option, enabling more reliable output, faster compile times, and loads of new features and options.',
  featured: true,
  date: new Date('2023-02-01'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: true,
      changes: {
        en: [
          'Hydrogen 2.0.0 represents a completely new approach to CSS that differs drastically from version 1.0.0.',
          'Rather than compiling a Sass library and then selectively generating a CSS file for your project, Hydrogen now actively parses <code>data-h2</code> attribute values using JavaScript and creates CSS on the fly.',
          'This approach is significantly faster and more accurate than the previous approach and opens up a world of new possibilities that you can discover in the 2.0.0 documentation.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'While version 1.0.0 supported over 25 different style properties, this release shatters that limitation by enabling support for every single CSS property out there.',
          'Not only can you use any CSS property at your disposal, 2.0.0 supports the use of configured settings',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          '2.0.0 introduces new functionality that enables support for custom, automatically applied themes.',
          "By adding the theme's key value to your site's <code>data-h2</code> wrapper attribute, you can restyle your project in seconds.",
          'This functionality also enables the ability to specify unique styles per-theme, meaning you can alter layouts, media, and more.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Alongside themes, 2.0.0 also adds support for configuring values that apply to dark mode automatically.',
          'This feature also allows you to control how dark mode is applied; whether through media queries or a manual toggle.',
          'Each theme you define has access to its own unique styles for light and dark modes, allowing you to customize them as much as you need.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          '2.0.0 introduces new query-specific references that allow more granular control over the target of your styles.',
          'The <code>:selectors[]</code> allows you to apply styles only if the element contains specific selectors (classes, ids, attributes).',
          'The <code>:children[]</code> allows you to apply styles to children nested inside the current element, allowing you to bulk style similar elements.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'A new vertical rhythm and typography system has been implemented that allows you to granularly control how typography appears on your project on a per-media query basis.',
          'These typography settings now also directly impact and inform an automatically generated heading typography scale that accounts for default line height.',
          'New whitespace multipliers have been added that allow you to apply multiples of your base line-height as units of space, creating unity and consistency between the interface and the typography.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Color configurations have been overhauled and improved through the addition of color modifiers.',
          'Out of the box, for each of your color configurations, Hydrogen generates 6 alternate colors: <code>light</code>, <code>lighter</code>, <code>lightest</code>, <code>dark</code>, <code>lighter</code>, <code>darkest</code>.',
          'Color opacity modifiers have also been improved and now support dynamic calculation, meaning they are no longer limited to fixed values.',
          'Alongside default modifiers, you can now also define custom modifiers for your colors, allowing you to set unique values for specific contexts.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          '2.0.0 introduces a handful of helpful validation steps to help catch unexpected errors in your code.',
          "Hydrogen will now validate your configuration file before each run to ensure there aren't any syntax errors.",
          "It will also validate each attribute's parsed CSS to try and catch invalid CSS syntax.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Hydrogen's CLI commands now accept a series of optional flags, allowing you to customize the output based on environment and build contexts.",
        ],
      },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: ["Hydrogen's documentation has been completely rebuilt from the ground up using 11ty."],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'CSS construction has been improved to leverage the use of CSS variables throughout, allowing for greater control and manipulation by both the system and the end user.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "The system's code structure and documentation have been significantly improved and organized for better maintenance, debugging, and community contribution.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "2.0.0 updates and enhances Hydrogen's console output. Along with more helpful output, you'll find new formatting, configurable settings, detailed timers, and more.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Hydrogen now offers a new debugging tool that generates log files containing parsed data that can offer insight into where the tool might be failing.',
        ],
      },
    },
  ],
};
