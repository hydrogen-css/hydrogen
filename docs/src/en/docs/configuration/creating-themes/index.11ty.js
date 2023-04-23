let data = {
  layout: 'docs.11ty.js',
  navigation: {
    order: 9,
    key: 'creating-themes',
    parent: 'configuration',
    pagination: true,
  },
  title: 'Creating themes',
  subtitle: 'Learn how to configure themes and their style tokens.',
  main: [
    {
      type: 'section',
      content: [
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
              items: [
                'The <code>gradients</code> option allows you to define reusable linear or radial gradient values that can be used in properties such as <code>background</code>.',
              ],
            },
            {
              type: 'list',
              style: 'unordered',
              items: [
                '<code>gradient</code> accepts CSS gradient syntax, including directions and a variable number of color stops.',
              ],
            },
            {
              type: 'code',
              file: 'hydrogen.config.json',
              copy: true,
              lines: [
                '"gradients": [',
                '  {',
                '    "key": "linear",',
                '    "default": {',
                '      "gradient": "linear-gradient(to right, purple, blue)",',
                '    },',
                '  },',
                '  ...',
                '],',
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
