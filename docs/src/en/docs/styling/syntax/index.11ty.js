const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'syntax',
    parent: 'styling',
    order: 1,
  },
  title: 'Syntax',
  title_long: "Understanding Hydrogen's syntax",
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
