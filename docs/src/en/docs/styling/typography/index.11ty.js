const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    order: 12,
    key: 'typography',
    parent: 'styling',
    pagination: true,
  },
  title: 'Typography',
  title_long: 'Setting typography',
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
