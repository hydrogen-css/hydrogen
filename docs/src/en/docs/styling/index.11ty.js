const docs_layout = require('../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'styling',
    parent: 'docs',
    order: 3,
  },
  title: 'Styling',
  title_long: 'Styling with Hydrogen',
  subtitle:
    'Everything you need to know about using Hydrogen to style your project.',
  main: [
    {
      type: 'title',
      label: 'In this section',
      id: 'summary',
    },
    {
      type: 'copy',
      items: [
        "This section of the documentation summarizes the first steps you'll have to take to get Hydrogen running on your project. If you've used Node tools in the past, setup should be pretty straightforward.",
      ],
    },
    {
      type: 'list',
      style: 'unordered',
      items: ['Syntax', 'Typography', 'Layout', 'Colors'],
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
