const releases = require('../../_data/releases');
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
      path: '/en/docs/installation',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Installation',
    },
    {
      path: '/en/docs/configuration',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Configuration',
    },
    {
      path: '/en/docs/syntax',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Syntax and snippets',
    },
    {
      path: '/en/docs/properties',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Find a property',
    },
    {
      path: 'https://github.com/hydrogen-css/hydrogen/issues/new',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Report an issue',
    },
    {
      path: 'https://github.com/hydrogen-css/hydrogen/blob/release/2.0.0/CONTRIBUTING.md',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Contribute',
    },
  ],
  main: [
    {
      type: 'title',
      label: 'About the docs',
      id: 'about',
    },
    {
      type: 'copy',
      items: ['An introduction will find its way here eventually.'],
    },
    {
      type: 'title',
      label: 'Latest releases',
      id: 'releases',
      link: {
        path: '/en/releases',
        label: 'View all updates',
        title: "View all of Hydrogen's documented releases.",
      },
    },
    {
      type: 'latest',
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
