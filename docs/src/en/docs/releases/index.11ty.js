let data = {
  layout: 'docs.11ty.js',
  navigation: {
    key: 'releases',
    parent: 'docs',
  },
  terms: [
    'releases',
    'roadmaps',
    'what',
    'next',
    'updates',
    'patches',
    'major',
    'minor',
    'subscribe',
    'subscription',
    'history',
    'histories',
    'betas',
    'breaking',
    'changes',
    'bugs',
    'bugfixes',
    'hotfixes',
    'features',
    'optimizations',
    'new',
  ],
  title: 'Releases',
  subtitle: 'This page summarizes all Hydrogen releases, past, present, and future.',
  main: [
    {
      type: 'title',
      label: 'Upcoming features',
      id: 'roadmap',
      link: {
        path: '/feed.xml',
        title: "Subscribe to Hydrogen's RSS feed to stay in the loop.",
        label: 'Subscribe to updates',
        external: true,
      },
    },
    {
      type: 'copy',
      items: [
        'You can follow along with Hydrogen\'s development by visiting the <a href="https://github.com/orgs/hydrogen-css/projects/3/views/3" title="Visit Hydrogen\'s roadmap on Github." rel="noreferrer" target="_blank">project\'s public Github project</a> that contains tabs for the next upcoming release, backlog content, and known bugs.',
        'Found a bug or want to request a new feature? Head on over to <a href="https://github.com/hydrogen-css/hydrogen" title="Visit Hydrogen\'s codebase on Github." rel="noreferrer" target="_blank">Hydrogen\'s Github repository</a> and <a href="https://github.com/hydrogen-css/hydrogen/issues/new" title="Submit a new ticket on Github." rel="noreferrer" target="_blank">submit a ticket</a>. Once the ticket is triaged, it will be added to the proejct and you\'ll be able to follow along for updates.',
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
