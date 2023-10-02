let data = {
  layout: 'docs.11ty.js',
  navigation: {
    order: 10,
    key: 'styling',
    parent: 'docs',
    pagination: true,
  },
  terms: [
    'style',
    'styling',
    'css',
    'syntax',
    'overview',
    'typography',
    'layouts',
    'grids',
    'flex',
    'flexbox',
    'colors',
    'colours',
  ],
  title: 'Styling',
  title_long: 'Styling with Hydrogen',
  subtitle: 'Everything you need to know about using Hydrogen to style your project.',
  main: [
    {
      type: 'title',
      label: 'In this section',
      id: 'summary',
    },
    {
      type: 'copy',
      items: [
        'This section of the documentation covers the meat of how to use Hydrogen in your code, including a syntax breakdown, how to use properties, and applying central styles like typography and color.',
      ],
    },
    {
      type: 'overview',
      collection_id: 'en_styling',
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
