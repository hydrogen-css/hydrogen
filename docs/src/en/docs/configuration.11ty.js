const docs_layout = require('../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'configuration',
    parent: 'docs',
    order: 4,
  },
  title: 'Configuration',
  subtitle: "Learn how to configure Hydrogen's settings and design themes.",
  main: [],
};

function render(data) {
  return data;
}

module.exports = {
  data,
  render,
};
