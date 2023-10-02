let data = {
  layout: 'docs.11ty.js',
  navigation: {
    order: 2,
    key: 'installation',
    parent: 'docs',
    pagination: true,
  },
  terms: ['installation', 'install', 'basics', 'getting', 'set', 'up', 'start', 'here', 'commands'],
  title: 'Installation',
  title_long: 'Installing Hydrogen',
  subtitle: 'Instructions on how to install and run Hydrogen on your project.',
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
      type: 'overview',
      collection_id: 'en_installation',
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
