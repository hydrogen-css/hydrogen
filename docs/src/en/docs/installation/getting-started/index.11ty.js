let data = {
  layout: 'docs.11ty.js',
  navigation: {
    order: 3,
    key: 'getting-started',
    parent: 'installation',
    pagination: true,
  },
  terms: ['getting', 'started', 'install', 'package', 'beta', 'initialization'],
  title: 'Getting started',
  subtitle: 'Learn how to install and initialize Hydrogen using Node.',
  main: [
    {
      type: 'title',
      label: 'Installing the package',
      id: 'install',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Hydrogen runs behind the scenes using Node.js. In order to install Hydrogen on your project, you'll need to have Node and NPM installed on your machine. From there, inside of a command prompt/terminal window, navigate to the root of your project and run the installation command.",
            "Once the command finishes, you'll be able to run Hydrogen's commands from your project. If you'd like to dig a little deeper into Hydrogen's code, you'll be able to find the installation inside of your project's <code>node_modules</code> folder.",
          ],
        },
        {
          type: 'code',
          file: 'terminal',
          language: 'powershell',
          count: 1,
          lines: ['npm install @hydrogen-css/hydrogen --save-dev'],
        },
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Beta releases',
          id: 'beta',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                'Depending on what\'s next in the roadmap, Hydrogen offers occasional beta releases for testing upcoming features. You can view the most recent beta releases on <a href="https://www.npmjs.com/package/@hydrogen-css/hydrogen" title="Visit Hydrogen on NPM." target="_blank" rel="noreferrer">Hydrogen\'s NPM package page</a>. If you\'d like to install a beta release on your project, you can do so using a modified version of the installation command.',
              ],
            },
            {
              type: 'code',
              file: 'terminal',
              language: 'powershell',
              count: 1,
              lines: ['npm install @hydrogen-css/hydrogen@beta --save-dev'],
            },
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Initialization',
      id: 'initialization',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Once Hydrogen has successfully installed, you can run the initialization command from the root folder of your project. This command will prompt you to enter a few details about your project's markup and output directory, after which it will automatically create a configuration file for you. This configuration file contains everything you'll need to customize Hydrogen to your brand, including examples and default values.",
          ],
        },
        {
          type: 'code',
          file: 'terminal',
          language: 'powershell',
          count: 1,
          lines: ['npx h2-init'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Loading Hydrogen',
      id: 'load',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "To get started using Hydrogen attributes, you'll need to add a <code>data-h2</code> attribute to your <code>html</code> or <code>body</code> element. You can also apply this attribute to a section or component if you only need Hydrogen in a localized context.",
            "Finally, you'll need to add Hydrogen's CSS file to your project's <code>head</code> tag. The path you use here should reflect the path you specified as your output directory, followed by <code>hydrogen.css</code>.",
            "You're all set to start developing with Hydrogen.",
          ],
        },
        {
          type: 'code',
          file: 'index.html',
          language: 'html',
          count: 11,
          lines: [
            '<!DOCTYPE html>',
            '<html data-h2>',
            '  <head>',
            '    ...',
            '    <link rel="stylesheet" href="path/to/hydrogen.css">',
            '    ...',
            '  </head>',
            '  <body>',
            '    ...',
            '  </body>',
            '</html>',
          ],
        },
      ],
    },
  ],
};

function render(data) {
  return data;
}

module.exports = {
  data,
  render,
};
