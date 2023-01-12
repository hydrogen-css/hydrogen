const docs_layout = require('../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    order: 15,
    key: 'properties',
    parent: 'docs',
    pagination: true,
  },
  title: 'Properties',
  title_long: 'Property support',
  subtitle: 'A summary of CSS and custom properties supported by Hydrogen.',
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
      items: [
        '<a href="/en/docs/properties/standard" title="">Standard properties</a>',
        '<a href="/en/docs/properties/hydrogen" title="">Hydrogen properties</a>',
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
