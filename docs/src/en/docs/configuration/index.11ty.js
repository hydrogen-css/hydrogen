const docs_layout = require('../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    order: 5,
    key: 'configuration',
    parent: 'docs',
    pagination: true,
  },
  title: 'Configuration',
  title_long: 'Configuring Hydrogen',
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
        "This section of the documentation outlines the various options you can set inside of Hydrogen's configuration file. The settings file can be broken apart into three key areas: core build settings, mode settings, and themes.",
      ],
    },
    {
      type: 'list',
      style: 'unordered',
      items: [
        '<a href="/en/docs/configuration/core-settings" title="">Core settings</a>',
        '<a href="/en/docs/configuration/configuring-queries" title="">Configuring media queries</a>',
        '<a href="/en/docs/configuration/configuring-modes" title="">Configuring dark mode</a>',
        '<a href="/en/docs/configuration/creating-themes" title="">Creating themes</a>',
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
