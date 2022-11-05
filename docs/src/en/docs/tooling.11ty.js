const docs_layout = require('../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'tooling',
    parent: 'docs',
    order: 3,
  },
  title: 'Tooling',
  title_long: 'Project tooling',
  subtitle:
    "Learn how to integrate Hydrogen into your project's build pipeline.",
  main: [
    {
      type: 'title',
      label: 'Vanilla',
      id: 'hydrogen',
    },
    {
      type: 'title',
      label: 'Eleventy',
      id: '11ty',
    },
    {
      type: 'title',
      label: 'Webpack',
      id: 'webpack',
    },
    {
      type: 'title',
      label: 'Others',
      id: 'others',
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
