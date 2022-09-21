const home_layout = require('../_includes/pages/home.11ty');

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
      path: 'https://gitlab.com/hydrogen-css/hydrogen',
      title: "View Hydrogen's open source code in a new tab.",
      label: 'Code',
    },
    {
      path: '/en/docs',
      title: "View Hydrogen's documentation.",
      label: 'Documentation',
    },
  ],
  hero: {
    features: [
      {
        title: 'What is Hydrogen?',
        content: [
          'Hydrogen is a utility CSS framework that allows you to style websites right in your markup. Design settings meet the flexibility of data attributes to help you create consistent, beautiful experiences.',
        ],
      },
      {
        title: 'How does it work?',
        content: [
          "Hydrogen scans your markup for instances of <code>data-h2</code> attributes and builds CSS based on their values. It produces a production-ready file that only contains exactly what you've asked for.",
        ],
      },
      {
        title: 'Why should I use it?',
        content: [
          'Leave behind the complexities of maintaining your CSS, remembering how to name classes, defining type scales, and enforcing consistent colors. Best of all, Hydrogen is fast, legible, and open-source.',
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
            label: 'An easy-to-learn, namespaced syntax.',
            id: 'syntax',
          },
          content: [
            "Hydrogen's syntax mimics CSS to make understanding your markup as easy as possible. It pulls from existing best practices to reduce the language learning curve, and it won't interfere with your existing CSS thanks to its custom attributes.",
          ],
          code: {
            file: 'index.html',
            lines: [
              '<p data-h2-color="base(primary) base:hover(accent)">',
              '  Welcome to Hydrogen!',
              '</p>',
            ],
          },
        },
        {
          title: {
            label: 'Watch it build as you work, in an instant.',
            id: 'speed',
          },
          content: [
            'Rather than compiling a library, Hydrogen scans your code and builds a CSS file. Integrate it into your build tools and run it in the background as you develop and it will provide an up-to-date CSS file for you on the fly.',
          ],
          code: {
            file: 'terminal',
            lines: [
              '☼ Hydrogen - Timer - Total build: 234ms',
              '☼ Hydrogen - Success',
              '> Context: Hydrogen successfully build a CSS file in your output directory.',
            ],
          },
        },
        {
          title: {
            label: 'Your brand, your way, in every line.',
            id: 'brand',
          },
          content: [
            'Embracing a design token style approach, Hydrogen encourages you to define decisions like color, typography, radii, and shadows in its configuration file. Use these definitions in your attributes, and update them product-wide in a matter of seconds.',
          ],
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
        label: 'And a whole lot more...',
        id: 'more',
      },
      list: [
        {
          title: 'Inline media queries',
          content: [
            'Define any type of query in your configuration and then call them right in your markup.',
          ],
        },
        {
          title: 'Target specific selectors',
          content: [
            'Style component states by targeting whether an ID or class is present on your element.',
          ],
        },
        {
          title: 'Target nested elements',
          content: [
            'Using the <code>:children</code> modifier, set styles on nested tags or selectors for bulk styling.',
          ],
        },
        {
          title: 'Inline dark mode',
          content: [
            'Pair queries with dark mode counterparts and toggle them through a class or browser setting.',
          ],
        },
        {
          title: 'Inline state styling',
          content: [
            'Style and manage native HTML interaction states like hover and focus right in your markup.',
          ],
        },
        {
          title: 'CSS value support',
          content: [
            'Use raw CSS values in many attributes to get it pixel perfect, including color, spacing, and more.',
          ],
        },
        {
          title: 'Automated typography',
          content: [
            'Generate a type scale, vertical rhythm, and whitespace framework based on line height.',
          ],
        },
        {
          title: 'Open-source',
          content: [
            'The framework is provided under an MIT license. Dig into the code and discover the possibilities.',
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
  properties: {
    title: {
      label: 'Find a property',
      id: 'properties',
      icon: {
        path: '/static/img/icon-compass.svg',
        alt: 'A sticker-style icon of a compass.',
      },
      link: {
        path: '/en/docs',
        title:
          "Head on over to Hydrogen's documentation for more detailed property information.",
        label: 'Visit the documentation',
      },
    },
  },
};

function render(data) {
  return data;
}

module.exports = {
  data,
  render,
};
