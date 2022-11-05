const releases = require('../../_data/releases');
const docs_layout = require('../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'releases',
    parent: 'home',
  },
  title: 'Releases',
  subtitle:
    'This page summarizes all Hydrogen releases, past, present, and future.',
  main: [
    {
      type: 'title',
      label: 'About Hydrogen releases',
      id: 'about',
    },
    {
      type: 'copy',
      items: [
        'A description of the differences between stable and beta channels, as well as major, minor, and path releases.',
      ],
    },
    {
      type: 'title',
      label: 'Latest releases',
      id: 'latest',
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Stable',
          id: 'stable',
        },
        {
          type: 'release',
          category: 'latest',
        },
        {
          type: 'title',
          label: 'Beta',
          id: 'stable',
        },
        {
          type: 'release',
          category: 'beta',
        },
      ],
    },
    {
      type: 'title',
      label: 'Upcoming features',
      id: 'roadmap',
    },
    {
      type: 'title',
      label: 'Full release history',
      id: 'history',
    },
    {
      type: 'copy',
      items: [
        "Below you will find all of Hydrogen's releases, organized first by major release (<code>1.x.x</code>), then by minor release (<code>x.1.x</code>), and finally by patch (<code>x.x.1</code>).",
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
