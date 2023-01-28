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
  subtitle:
    "Learn about whitespace units, layout tips, and Hydrogen's flexbox grid system.",
  main: [
    {
      type: 'title',
      label: 'Whitespace multiplier units',
      id: 'multipliers',
    },
    {
      type: 'copy',
      items: ["Don't forget to explain that regular units work too"],
    },
    {
      type: 'title',
      label: 'Approaching grids',
      id: 'grids',
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Standard CSS options',
          id: 'css-options',
        },
        {
          type: 'title',
          label: "Hydrogen's flexbox grid",
          id: 'flexbox-grid',
        },
      ],
    },
    {
      type: 'title',
      label: 'Theme-specific layouts',
      id: 'themes',
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
