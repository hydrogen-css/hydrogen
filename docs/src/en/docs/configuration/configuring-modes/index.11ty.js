const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'configuring-modes',
    parent: 'configuration',
    order: 2,
  },
  title: 'Dark mode',
  title_long: 'Configuring dark mode',
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
