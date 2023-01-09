const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'creating-themes',
    parent: 'configuration',
    order: 4,
  },
  title: 'Creating themes',
  subtitle: 'TBD',
  main: [
    {
      type: 'title',
      label: 'Theme basics',
      id: 'basics',
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
          label: 'The default theme',
          id: 'default',
        },
        {
          type: 'copy',
          items: ['Stuff about input/output.'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Theme settings',
      id: 'settings',
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Typography',
          id: 'typography',
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
        {
          type: 'title',
          label: 'Colors',
          id: 'colors',
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
        {
          type: 'title',
          label: 'Containers',
          id: 'containers',
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
        {
          type: 'title',
          label: 'Fonts',
          id: 'fonts',
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
        {
          type: 'title',
          label: 'Gradients',
          id: 'gradients',
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
        {
          type: 'title',
          label: 'Radii',
          id: 'radii',
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
        {
          type: 'title',
          label: 'Shadows',
          id: 'shadows',
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
        {
          type: 'title',
          label: 'Transitions',
          id: 'transitions',
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
