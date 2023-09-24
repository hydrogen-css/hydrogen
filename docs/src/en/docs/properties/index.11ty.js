let data = {
  layout: 'docs.11ty.js',
  navigation: {
    order: 15,
    key: 'properties',
    parent: 'docs',
    pagination: true,
  },
  terms: ['property', 'properties', 'custom', 'supports'],
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
        "This section of the documentation provides an overview of the CSS properties supported by Hydrogen, including custom properties introduced by Hydrogen's syntax.",
      ],
    },
    {
      type: 'overview',
      collection_id: 'en_properties',
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
