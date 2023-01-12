const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    order: 16,
    key: 'standard-properties',
    parent: 'properties',
    pagination: true,
  },
  title: 'Standard properties',
  subtitle: "A list of CSS properties supported by Hydrogen's syntax.",
  main: [],
};

function render(data) {
  return data;
}

module.exports = {
  data,
  render,
};
