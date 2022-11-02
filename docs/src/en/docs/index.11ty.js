const docs_layout = require('../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'docs',
    parent: 'home',
  },
  title: 'Docs',
  title_long: 'Welcome to the docs',
  header_index: [
    {
      path: '/en/docs/setup/installation',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Installation',
    },
    {
      path: '/en/docs/setup/installation',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Configuration',
    },
    {
      path: '/en/docs/setup/installation',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Syntax and snippets',
    },
    {
      path: '/en/docs/setup/installation',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Find a property',
    },
    {
      path: '/en/docs/setup/installation',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Report an issue',
    },
    {
      path: '/en/docs/setup/installation',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Contribute',
    },
  ],
  sections: [
    {
      title: {
        label: 'About the docs',
        id: 'about',
      },
      content: ['An introduction will find its way here eventually.'],
    },
    {
      title: {
        label: 'Recent updates',
        id: 'releases',
      },
      sections: [
        {
          title: {
            label: 'Latest stable release',
            id: 'latest',
          },
          releases: 'latest',
        },
        {
          title: {
            label: 'Latest beta release',
            id: 'beta',
          },
          releases: 'beta',
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
