const { latest } = require('../_data/releases');

var data = {
  layout: 'home.11ty.js',
  navigation: {
    key: 'home',
  },
  title: 'Home',
  terms: ['home', 'hydrogen', 'features', 'marketing'],
  subtitle: "Hydrogen's main landing page.",
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
      title: 'Learn more about the latest release, past updates, and upcoming features.',
      label: 'Releases',
    },
    {
      path: '/en/docs/faqs',
      title: 'Find answers to common questions about Hydrogen.',
      label: 'FAQs',
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
            language: 'powershell',
            count: 3,
            lines: [
              '☼ Hydrogen - v' + latest.version + ' - Starting the build...',
              '☼ Hydrogen - v' + latest.version + ' - CSS file written (186ms)',
              '  Message  > The Hydrogen build completed successfully.',
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
            language: 'html',
            count: 3,
            lines: ['<p data-h2-color="base(myBrandColor)">', '  Your project name.', '</p>'],
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
          title: 'Inline @rules',
          content: [
            'Configure media queries, container queries, and more and then call them directly in attributes.',
          ],
        },
        {
          title: 'Manage states',
          content: [
            'Style native HTML interaction states like <code>:hover</code> and <code>:focus</code> right in your markup.',
          ],
        },
        {
          title: 'Target selectors',
          content: [
            'Using the <code>:selectors</code> modifier, apply styles to a specific ID, class, or attribute.',
          ],
        },
        {
          title: 'Style descendants',
          content: [
            'Using the <code>:children</code> modifier, apply styles to nested tags or selectors for bulk styling.',
          ],
        },
        {
          title: 'Automated dark mode',
          content: [
            'Define sibling tokens for dark mode and activate them instantly with a single value.',
          ],
        },
        {
          title: 'Create themes',
          content: [
            'Style entire themes for your project and apply them app-wide by swapping a single string.',
          ],
        },
        {
          title: 'Easy typography',
          content: [
            'Generate a type scale, vertical rhythm, and whitespace tokens that can adapt to media queries.',
          ],
        },
        {
          title: 'Open-source code',
          content: [
            'Hydrogen is provided under an GPL-3.0 license; fork the code and change it to suit your needs.',
          ],
        },
      ],
    },
  },
  start: {
    title: {
      label: 'Get started',
      id: 'start',
      icon: {
        path: '/static/img/icon-flag.svg',
        alt: 'A sticker-style icon of a race flag.',
      },
      link: {
        label: 'Installation details',
        title: 'Visit the docs and learn more about installing Hydrogen in depth.',
        path: '/en/docs/installation',
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
          language: 'powershell',
          count: 1,
          lines: ['npm install @hydrogen-css/hydrogen --save'],
        },
      },
      {
        title: 'Create a configuration file',
        content: [
          "From your project, run the <code>h2-init</code> command to create a configuration file. You'll be asked to specify your input and output directories.",
        ],
        code: {
          language: 'powershell',
          count: 1,
          lines: ['npx h2-init'],
        },
      },
      {
        title: 'Add <code>data-h2</code> to your <code>html</code> element',
        content: [
          'Add the <code>data-h2</code> attribute to your <code>html</code> element to apply Hydrogen project-wide. You can also add it to select elements instead.',
        ],
        code: {
          language: 'html',
          count: 4,
          lines: ['<!DOCTYPE html>', '<html data-h2>', '  <body />', '</html>'],
        },
      },
      {
        title: 'Import the Hydrogen CSS file',
        content: [
          "Like any other CSS file, you'll need to import Hydrogen's CSS into the <code>head</code> of your document.",
        ],
        code: {
          language: 'html',
          count: 4,
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
          language: 'html',
          count: 1,
          lines: ['<p data-h2-color="base(primary)">Hello!</p>'],
        },
      },
      {
        title: 'Build it!',
        content: [
          "When you're ready to view your masterpiece, you can run the build (or watch) command to compile your custom built CSS file.",
        ],
        code: {
          language: 'powershell',
          count: 1,
          lines: ['npx h2-build'],
        },
      },
    ],
  },
  jump: {
    title: {
      label: 'Jump right in',
      id: 'jump',
      icon: {
        path: '/static/img/icon-compass.svg',
        alt: 'A sticker-style icon of a compass.',
      },
      link: {
        label: 'Visit the docs',
        title: 'Head on over to the documentation main page.',
        path: '/en/docs',
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
