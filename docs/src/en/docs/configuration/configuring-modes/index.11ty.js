const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'configuring-modes',
    parent: 'configuration',
    order: 3,
  },
  title: 'Dark mode',
  title_long: 'Configuring dark mode',
  subtitle:
    'Learn how to configure dark mode and automatically apply it to your project.',
  main: [
    {
      type: 'title',
      label: 'Understanding modes',
      id: 'modes',
    },
    {
      type: 'copy',
      items: ['Stuff about input/output.'],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Modes vs. themes',
          id: 'themes',
        },
        {
          type: 'copy',
          items: ['Stuff about input/output.'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Dark mode',
      id: 'dark-mode',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: ['Stuff about query settings.'],
        },
        {
          type: 'code',
          file: 'hydrogen.config.json',
          lines: [
            '"modes": {',
            '  "dark": {',
            '    "method": "preference",',
            '    "automatic": true,',
            '    "automatic_modifiers": true,',
            '  }',
            '}',
          ],
        },
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Creating a toggle',
          id: 'toggle',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: ['Stuff about query settings.'],
            },
            {
              type: 'code',
              file: 'app.js',
              lines: [
                '"modes": {',
                '  "dark": {',
                '    "method": "preference",',
                '    "automatic": true,',
                '    "automatic_modifiers": true,',
                '  }',
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
