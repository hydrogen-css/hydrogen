let data = {
  layout: 'docs.11ty.js',
  navigation: {
    key: 'docs',
    parent: 'home',
  },
  title: 'Documentation',
  title_long: 'Welcome to the docs',
  header_index: [
    {
      path: '/en/docs/installation',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Install Hydrogen',
    },
    {
      path: '/en/docs/configuration',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Configure your project',
    },
    {
      path: '/en/docs/styling',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Style your interfaces',
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
      path: 'https://github.com/hydrogen-css/hydrogen/blob/main/CONTRIBUTING.md',
      title: 'Learn more about how to install Hydrogen on your project.',
      label: 'Contribute back',
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
      items: [
        "Thanks for visiting Hydrogen's documentation! This site contains everything you'll need to install Hydrogen on your project, create a theme, run commands, style your interfaces, and troubleshoot common problems.",
        "Have a question but can't find the answer here? <a href='https://github.com/hydrogen-css/hydrogen/issues/new' title='Create a new issue on Github.' target='_blank' rel='noreferrer'>Submit a ticket on Github</a> and perhaps the community can provide some insight. We'd also love to receive feedback on how this documentation can be improved.",
      ],
    },
    {
      type: 'title',
      label: 'Featured release',
      id: 'featured',
      link: {
        path: '/en/docs/releases',
        label: 'View all updates',
        title: "View all of Hydrogen's documented releases.",
      },
    },
    {
      type: 'copy',
      items: ['Check out the latest and greatest major release!'],
    },
    {
      type: 'featured',
    },
    {
      type: 'title',
      label: 'Latest releases',
      id: 'releases',
      link: {
        path: '/en/docs/releases',
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
