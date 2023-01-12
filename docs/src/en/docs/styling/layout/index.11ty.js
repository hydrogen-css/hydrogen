const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    order: 13,
    key: 'layout',
    parent: 'styling',
    pagination: true,
  },
  title: 'Layout',
  title_long: 'Applying layouts',
  subtitle: 'TBD',
  main: [],
};

function render(data) {
  return data;
}

module.exports = {
  data,
  render,
};
