const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'colors',
    parent: 'styling',
    order: 4,
  },
  title: 'Colors',
  title_long: 'Using color',
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
