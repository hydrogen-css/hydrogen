const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'hydrogen-properties',
    parent: 'properties',
    order: 2,
  },
  title: 'Hydrogen properties',
  subtitle: "A list of helper properties provided by Hydrogen's syntax.",
  main: [],
};

function render(data) {
  return data;
}

module.exports = {
  data,
  render,
};
