const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    order: 14,
    key: 'colors',
    parent: 'styling',
    pagination: true,
  },
  title: 'Colors',
  title_long: 'Using color',
  subtitle:
    'Learn about standard vs. configured colors, color modifiers, and applying colors across themes and modes.',
  main: [
    {
      type: 'title',
      label: 'Color basics',
      id: 'basics',
    },
    {
      type: 'copy',
      items: ['Talk about using color in attributes, standard vs. configured.'],
    },
    {
      type: 'title',
      label: 'Working with modifiers',
      id: 'modifiers',
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Built-in color modifiers',
          id: 'built-in-color',
        },
        {
          type: 'title',
          label: 'Built-in opacity modifiers',
          id: 'built-in-opacity',
        },
        {
          type: 'title',
          label: 'Custom modifiers',
          id: 'custom',
        },
        {
          type: 'copy',
          items: [
            'Check to make sure that setting a modifier in the dark settings auto swaps.',
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Colors across modes',
      id: 'modes',
    },
    {
      type: 'title',
      label: 'Colors across themes',
      id: 'themes',
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
