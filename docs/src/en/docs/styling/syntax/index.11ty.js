const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'syntax',
    parent: 'styling',
    order: 1,
  },
  title: 'Syntax',
  title_long: 'Syntax overview',
  subtitle:
    'Learn about an attribute is constructed and how they enable styling.',
  main: [
    {
      type: 'title',
      label: 'Parts of an attribute',
      id: 'parts',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Hydrogen's unique approach to applying styles takes advantage of the key-value pair provided by custom data attribute selectors. This key-value setup allows Hydrogen to remain legible without sacrificing complexity when its required.",
          ],
        },
        {
          type: 'code',
          file: 'index.html',
          lines: ['data-h2-property="media:mode:modifiers(options)"'],
        },
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'A basic example',
          id: 'example',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "Hydrogen's unique approach to applying styles takes advantage of the key-value pair provided by custom data attribute selectors. This key-value setup allows Hydrogen to remain legible without sacrificing complexity when its required.",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['data-h2-property="media:mode:modifiers(options)"'],
            },
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Using attributes in your code',
      id: 'code',
    },
    {
      type: 'copy',
      items: [
        "Hydrogen's unique approach to applying styles takes advantage of the key-value pair provided by custom data attribute selectors. This key-value setup allows Hydrogen to remain legible without sacrificing complexity when its required.",
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Working with markup',
          id: 'markup',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "Hydrogen's unique approach to applying styles takes advantage of the key-value pair provided by custom data attribute selectors. This key-value setup allows Hydrogen to remain legible without sacrificing complexity when its required.",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['data-h2-property="media:mode:modifiers(options)"'],
            },
          ],
        },
        {
          type: 'title',
          label: 'Working with JavaScript',
          id: 'javascript',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "Hydrogen's unique approach to applying styles takes advantage of the key-value pair provided by custom data attribute selectors. This key-value setup allows Hydrogen to remain legible without sacrificing complexity when its required.",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['data-h2-property="media:mode:modifiers(options)"'],
            },
          ],
        },
        {
          type: 'title',
          label: 'Parsing limitations',
          id: 'limitations',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "Hydrogen's unique approach to applying styles takes advantage of the key-value pair provided by custom data attribute selectors. This key-value setup allows Hydrogen to remain legible without sacrificing complexity when its required.",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['data-h2-property="media:mode:modifiers(options)"'],
            },
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'VS Code snippets',
      id: 'snippets',
    },
    {
      type: 'copy',
      items: [
        "Hydrogen's unique approach to applying styles takes advantage of the key-value pair provided by custom data attribute selectors. This key-value setup allows Hydrogen to remain legible without sacrificing complexity when its required.",
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
