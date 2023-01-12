const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    order: 8,
    key: 'configuring-modes',
    parent: 'configuration',
    pagination: true,
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
      label: 'Mode settings',
      id: 'settings',
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
      type: 'title',
      label: 'Dark mode',
      id: 'dark-mode',
    },
    {
      type: 'copy',
      items: ['Stuff about query settings.'],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Choosing an approach',
          id: 'approach',
        },
        {
          type: 'section',
          content: [
            {
              type: 'title',
              label: 'Preference-based dark mode',
              id: 'preference',
            },
            {
              type: 'copy',
              items: ['Stuff about query settings.'],
            },
            {
              type: 'title',
              label: 'Toggle-based dark mode',
              id: 'toggle',
            },
            {
              type: 'copy',
              items: ['Stuff about query settings.'],
            },
            {
              type: 'group',
              items: [
                {
                  type: 'copy',
                  items: ['Toggle markup'],
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
              type: 'group',
              items: [
                {
                  type: 'copy',
                  items: ['Toggle scripts'],
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
          ],
        },
        {
          type: 'title',
          label: 'Automatic vs. manual styling',
          id: 'automatic',
        },
        {
          type: 'copy',
          items: ['Stuff about query settings.'],
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
