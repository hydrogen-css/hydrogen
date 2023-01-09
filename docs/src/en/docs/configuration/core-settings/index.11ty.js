const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'custom-properties',
    parent: 'configuration',
    order: 1,
  },
  title: 'Core settings',
  title_long: 'Core build settings',
  subtitle:
    "Understand how to configure Hydrogen's build settings, including output controls and debugging.",
  main: [
    {
      type: 'title',
      label: 'The configuration file',
      id: 'config',
    },
    {
      type: 'copy',
      items: [
        "All of Hydrogen's settings can be configured inside of the <code>hydrogen.config.json</code> file generated during the installation process. This file contains a handful of basic development settings and helpful default style configurations that you can change, add to, or remove to produce a look and feel that matches your brand.",
        "Hydrogen's configuration follows a similar theory to a <strong>design token</strong> approach, where standardizing design decisions inside of the config allows you to leverage them across the whole project in a consistent, easily-updated way. ",
        'Each time you run <code>npx h2-build</code> or <code>npx h2-watch</code>, Hydrogen will first validate your configuration file to ensure it has everything it needs for a successful build. If something is missing or improperly formatted, Hydrogen will let you know in the console output. ',
      ],
    },
    {
      type: 'title',
      label: 'Core settings',
      id: 'core',
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Input and output',
          id: 'input-output',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: ['Stuff about input/output.'],
            },
            {
              type: 'code',
              file: 'hydrogen.config.json',
              lines: [
                '"input": [',
                '  "path/to/first/input/folder",',
                '  "path/to/second/input/folder"',
                '],',
                '"output": "path/to/output/folder"',
              ],
            },
          ],
        },
        {
          type: 'title',
          label: 'Process settings',
          id: 'processing',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: ['Stuff about processing.'],
            },
            {
              type: 'code',
              file: 'hydrogen.config.json',
              lines: [
                '"processing": {',
                '  "reset_styles": true',
                '  "prefixing": true',
                '  "minification": true',
                '  "var_export": false',
                '}',
              ],
            },
          ],
        },
        {
          type: 'title',
          label: 'Log settings',
          id: 'logging',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: ['Stuff about logging.'],
            },
            {
              type: 'code',
              file: 'hydrogen.config.json',
              lines: [
                '"logging": {',
                '  "logs": false',
                '  "timers": true',
                '  "verbose": true',
                '}',
              ],
            },
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
