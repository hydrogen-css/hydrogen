let data = {
  layout: 'docs.11ty.js',
  navigation: {
    key: 'docs',
    parent: 'home',
  },
  title: 'Documentation',
  title_long: 'Documentation',
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
      label: 'Welcome to Hydrogen!',
      id: 'about',
    },
    {
      type: 'copy',
      items: [
        "<img alt='npm (tag)' src='https://img.shields.io/npm/v/@hydrogen-css/hydrogen/latest?color=%239D5CFF&label=latest'> <img alt='npm (tag)' src='https://img.shields.io/npm/v/@hydrogen-css/hydrogen/beta?color=%239D5CFF&label=beta'> <img alt='Netlify' src='https://img.shields.io/netlify/f508b5d3-904e-4a1b-9ec9-cf8c2334f0e3?label=docs'> <a href='https://hydrogen.design/feed.xml' title='Subscribe to updates.'><img src='https://img.shields.io/badge/feed-active-orange'></a>",
        "Thanks for visiting Hydrogen's documentation! This site contains everything you'll need to install Hydrogen on your project, create a theme, run commands, style your interfaces, and troubleshoot common problems.",
        "Have a question but can't find the answer here? <a href='https://github.com/hydrogen-css/hydrogen/issues/new' title='Create a new issue on Github.' target='_blank' rel='noreferrer'>Submit a ticket on Github</a> and perhaps the community can provide some insight. We'd also love to receive feedback on how this documentation can be improved.",
      ],
    },
    {
      type: 'title',
      label: 'Recent updates',
      id: 'releases',
      link: {
        path: '/en/docs/releases',
        label: 'View all updates',
        title: "View all of Hydrogen's documented releases.",
      },
    },
    {
      type: 'copy',
      items: [
        'Learn more about the latest and greatest releases containing new features, optimized tooling, bugfixes, and a better overall experience.',
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Featured release',
          id: 'featured',
        },
        {
          type: 'featured',
        },
        {
          type: 'title',
          label: 'Latest stable and beta releases',
          id: 'latest',
        },
        {
          type: 'latest',
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
