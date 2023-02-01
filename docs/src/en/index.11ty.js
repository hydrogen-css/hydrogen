const home_layout = require('../_includes/pages/home.11ty');
const { latest } = require('../_data/releases');

var data = {
  layout: 'pages/home.11ty.js',
  navigation: {
    key: 'home',
  },
  title: 'Home',
  home_nav: [
    {
      path: '/en',
      title: "Visit Hydrogen's homepage.",
      label: 'Home',
    },
    {
      path: '/en/docs',
      title: "View Hydrogen's documentation.",
      label: 'Documentation',
    },
    {
      path: '/en/docs/releases',
      title:
        'Learn more about the latest release, past updates, and upcoming features.',
      label: 'Releases',
    },
    {
      path: 'https://github.com/hydrogen-css/hydrogen',
      title: "View Hydrogen's open source code in a new tab.",
      label: 'Github',
    },
  ],
  hero: {
    features: [
      {
        title: 'What is Hydrogen?',
        content: [
          'Hydrogen is a CSS framework that combines the power of inline styling with the efficiency of token-style settings to help you create consistent, beautiful experiences.',
        ],
      },
      {
        title: 'How does it work?',
        content: [
          "Hydrogen scans your code for <code>data-h2</code> attributes, parses their values, and seamlessly creates a production-ready CSS file containing exactly what you've asked for.",
        ],
      },
      {
        title: 'Why should I use it?',
        content: [
          'Hydrogen helps you move beyond the chaos of maintaining CSS. It handles naming methodologies, typography, and enforcing your brand all while being fast, legible, and open-source.',
        ],
      },
    ],
  },
  features: {
    main: {
      title: {
        label: 'Feature overview',
        id: 'features',
        icon: {
          alt: "A sticker-style icon of one of Hydrogen's adorable little mascots, Beep. Beep is a robot.",
          path: '/static/img/icon-robot.svg',
        },
      },
      list: [
        {
          title: {
            label: 'The CSS you know and love.',
            id: 'syntax',
          },
          content: [
            "Hydrogen's syntax supports any CSS property you can think of (and a few custom ones) while enhancing them with configurable, inline queries and modifiers. You can write familiar CSS syntax while easily targeting custom themes, dark mode, and interaction states.",
          ],
          example: 'properties',
        },
        {
          title: {
            label: 'It works while you work, and keeps up too.',
            id: 'speed',
          },
          content: [
            'Rather than compiling a library, Hydrogen generates CSS on the fly by scanning your code and parsing unique <code>data-h2</code> attributes. Integrate it into your build tools and run it in the background as you develop for on-demand styling.',
          ],
          code: {
            lines: [
              '☼ Hydrogen - System - Starting the build...',
              '  Message  > Hydrogen v' + latest.version,
              '☼ Hydrogen - System - 28 files were processed...',
              '☼ Hydrogen - System - Exporting CSS...',
              '☼ Hydrogen - Timers - 0646ms (Total build)',
              '☼ Hydrogen - Success - Exporting CSS',
            ],
          },
        },
        {
          title: {
            label: 'Your brand, your way, in every line.',
            id: 'brand',
          },
          content: [
            "Embracing a design-token-style approach, Hydrogen's configuration allows you to centrally define decisions such as color, typography, and shadows. These values then become usable in Hydrogen's attributes, allowing you to update them product-wide in a matter of seconds.",
          ],
          example: 'themes',
          code: {
            file: 'index.html',
            lines: [
              '<p data-h2-color="base(myBrandColor)">',
              '  Your project name.',
              '</p>',
            ],
          },
        },
      ],
    },
    sub: {
      title: {
        label: "There's a whole lot more too...",
        id: 'more',
      },
      list: [
        {
          title: 'Inline media queries',
          content: [
            'Define media queries in your configuration and then call them directly in attributes.',
          ],
        },
        {
          title: 'Inline states',
          content: [
            'Style native HTML interaction states like <code>:hover</code> and <code>:focus</code> right in your markup.',
          ],
        },
        {
          title: 'Inline selectors',
          content: [
            'Using the <code>:selectors</code> modifier, apply styles to a specific ID, class, or attribute.',
          ],
        },
        {
          title: 'Inline nested elements',
          content: [
            'Using the <code>:children</code> modifier, apply styles to nested tags or selectors for bulk styling.',
          ],
        },
        {
          title: 'Automated dark mode',
          content: [
            'Define sibling values for dark mode and apply them instantly using a single value.',
          ],
        },
        {
          title: 'Automated theming',
          content: [
            'Create entire themes for your project and apply them app-wide in an instant.',
          ],
        },
        {
          title: 'Automated typography',
          content: [
            'Automatically generate a type scale, vertical rhythm, and whitespace tokens.',
          ],
        },
        {
          title: 'Open-source code',
          content: [
            'Hydrogen is provided under an MIT license; fork the code and change it to suit your needs.',
          ],
        },
      ],
    },
  },
  start: {
    title: {
      label: 'Quick start',
      id: 'start',
      icon: {
        path: '/static/img/icon-flag.svg',
        alt: 'A sticker-style icon of a race flag.',
      },
    },
    subtitle: {
      label: 'Get up and running in 6 steps.',
      id: 'steps',
    },
    steps: [
      {
        title: 'Install Hydrogen using NPM',
        content: [
          'Ensure you have <a href="https://nodejs.org/en/" title="Learn more about Node and NPM." target="_blank" rel="noreferrer">Node installed</a> on your machine. Then navigate to your project in a terminal and run the NPM installation command to install Hydrogen.',
        ],
        code: {
          file: 'terminal',
          lines: ['npm install @hydrogen-css/hydrogen --save'],
        },
      },
      {
        title: 'Create a configuration file',
        content: [
          "From your project, run the <code>h2-init</code> command to create a configuration file. You'll be asked to specify your input and output directories.",
        ],
        code: {
          file: 'terminal',
          lines: ['npx h2-init'],
        },
      },
      {
        title: 'Add <code>data-h2</code> to your <code>html</code> element',
        content: [
          "To apply Hydrogen to your entire project, add the <code>data-h2</code> attribute to your <code>html</code> element. Hydrogen's styles won't work outside of this attribute, so feel free to apply it elsewhere if you only need to style a subset of your project.",
        ],
        code: {
          file: 'index.html',
          lines: ['<!DOCTYPE html>', '<html data-h2>', '  <body />', '</html>'],
        },
      },
      {
        title: 'Import the Hydrogen CSS file',
        content: [
          "Like any other CSS file, you'll need to import Hydrogen's CSS into the <code>head</code> of your document.",
        ],
        code: {
          file: 'index.html',
          lines: [
            '<head>',
            '  ...',
            '  <link rel="stylesheet" href="path/to/hydrogen.css">',
            '</head>',
          ],
        },
      },
      {
        title: 'Use Hydrogen to style an element',
        content: [
          'Now that the CSS file is ready to be loaded in, you can start going wild with Hydrogen attributes to style your project.',
        ],
        code: {
          file: 'index.html',
          lines: ['<p data-h2-color="base(primary)">', '  Hello!', '</p>'],
        },
      },
      {
        title: 'Watch the magic',
        content: [
          "When you're ready to view your masterpiece, you can run the build (or watch) command to compile your custom built CSS file.",
        ],
        code: {
          file: 'terminal',
          lines: ['npx h2-build'],
        },
      },
    ],
  },
  jump: {
    title: {
      label: 'Jump right in',
      id: 'start',
      icon: {
        path: '/static/img/icon-compass.svg',
        alt: 'A sticker-style icon of a compass.',
      },
    },
    sections: [
      {
        title: 'Installation',
        sub: [
          '<a href="/en/docs/installation/getting-started" title="">Getting started</a>',
          '<a href="/en/docs/installation/running-commands" title="">Running commands</a>',
        ],
      },
      {
        title: 'Configuration',
        sub: [
          '<a href="/en/docs/configuration/core-settings" title="">Core settings</a>',
          '<a href="/en/docs/configuration/configuring-queries" title="">Configuring media queries</a>',
          '<a href="/en/docs/configuration/configuring-modes" title="">Configuring dark mode</a>',
          '<a href="/en/docs/configuration/creating-themes" title="">Creating themes</a>',
        ],
      },
      {
        title: 'Styling',
        sub: [
          '<a href="/en/docs/styling/syntax" title="">Syntax</a>',
          '<a href="/en/docs/styling/typography" title="">Typography</a>',
          '<a href="/en/docs/styling/layout" title="">Layout</a>',
          '<a href="/en/docs/styling/colors" title="">Colors</a>',
        ],
      },
      {
        title: 'Properties',
        sub: [
          '<a href="/en/docs/properties/standard" title="">Standard properties</a>',
          '<a href="/en/docs/properties/hydrogen" title="">Hydrogen properties</a>',
        ],
      },
    ],
  },
};

function render(data) {
  return data;
}

module.exports = {
  data,
  render,
};
