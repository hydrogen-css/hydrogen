const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'standard-properties',
    parent: 'properties',
    order: 1,
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
