const releases = require('../../../_data/releases');
const docs_layout = require('../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'releases',
    parent: 'docs',
    order: 5,
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
        'Hydrogen releases generally follow the <a href="https://semver.org/" title="Learn more about semantic versioning." rel="noreferrer" target="_blank">semantic versioning standard</a> and fall into one of two channels:',
      ],
    },
    {
      type: 'list',
      style: 'unordered',
      items: [
        '<strong>Stable</strong>, production-ready releases',
        'Experimental <strong>beta</strong> releases',
      ],
    },
    {
      type: 'release-summary',
      content: {
        major: [
          'Major releases contain significant architectural restructuring and include breaking changes that require migration to continue using.',
        ],
        minor: [
          'Minor releases include important new features and functionality that are always backwards compatible with existing releases.',
        ],
        patch: [
          'Patch releases contain minor enhancements, optimizations, and bugfixes that are always backwards compatible with existing releases.',
        ],
        beta: [
          "Beta releases contain bleeding-edge features that might result in breaking changes, bugs, and/or methodologies that are subject to change. Use a beta release if you're interested in testing upcoming features or want to contribute towards Hydrogen's code.",
        ],
      },
    },
    {
      type: 'title',
      label: 'Latest releases',
      id: 'latest',
    },
    {
      type: 'copy',
      items: [
        'The following are the latest <strong>stable</strong> production-ready Hydrogen release, as well as the latest <strong>beta</strong> release with the newest features.',
      ],
    },
    {
      type: 'latest',
    },
    {
      type: 'title',
      label: 'Upcoming features',
      id: 'roadmap',
    },
    {
      type: 'copy',
      items: [
        'You can follow along with Hydrogen\'s development by visiting the <a href="https://workflowy.com/s/hydrogen/7Gjmdbjiqc0Wst1R" title="Visit Hydrogen\'s roadmap on Workflowy." rel="noreferrer" target="_blank">project\'s public Workflowy</a> that contains information on upcoming releases, backlog content, and known bugs.',
        'Found a bug or want to request a new feature? Head on over to <a href="https://github.com/hydrogen-css/hydrogen" title="Visit Hydrogen\'s codebase on Github." rel="noreferrer" target="_blank">Hydrogen\'s Github repository</a> and <a href="https://github.com/hydrogen-css/hydrogen/issues/new" title="Submit a new ticket on Github." rel="noreferrer" target="_blank">submit a ticket</a>. Once the ticket is triaged, it will be added to the Workflowy and you\'ll be able to follow along for updates.',
      ],
    },
    {
      type: 'title',
      label: 'Full release history',
      id: 'history',
    },
    {
      type: 'copy',
      items: [
        "Below is Hydrogen's documented release history, in chronological order. Releases are tagged based on the categories described above, and where a release contained breaking changes, a red tag has been included.",
      ],
    },
    {
      type: 'history',
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
