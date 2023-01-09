const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'configuring-queries',
    parent: 'configuration',
    order: 2,
  },
  title: 'Media queries',
  title_long: 'Configuring media queries',
  subtitle:
    'Understand how to create and use media query values with Hydrogen.',
  main: [
    {
      type: 'title',
      label: 'Understanding queries',
      id: 'queries',
    },
    {
      type: 'copy',
      items: ['Stuff about input/output.'],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'The base query',
          id: 'base',
        },
        {
          type: 'copy',
          items: ['Stuff about input/output.'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Query settings',
      id: 'settings',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: ['Stuff about query settings.'],
        },
        {
          type: 'code',
          file: 'hydrogen.config.json',
          lines: [
            '"media": {',
            '  "base_key": "base",',
            '  "queries": [',
            '    {',
            '      "key": "print",',
            '      "query": "print"',
            '    },',
            '    ...',
            '  ]',
            '}',
          ],
        },
      ],
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
