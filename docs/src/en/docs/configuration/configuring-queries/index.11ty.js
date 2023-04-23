let data = {
  layout: 'docs.11ty.js',
  navigation: {
    order: 7,
    key: 'configuring-queries',
    parent: 'configuration',
    pagination: true,
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
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "As outlined in the <a href='/en/docs/styling/syntax' title='Learn more about Hydrogen attribute syntax.'>syntax section</a>, media queries are an integral piece of writing Hydrogen attributes. They are used by combing a media query key with parentheses that contain the options available to the property you're trying to use.",
          ],
        },
        {
          type: 'code',
          lines: ['media(options)'],
        },
      ],
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            'Query keys can can also be combined with mode and state modifiers to create complex style selectors that suit every situation.',
          ],
        },
        {
          type: 'code',
          lines: [
            'media:hover(options)',
            'media:dark(options)',
            'media:dark:focus(options)',
          ],
        },
      ],
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
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "The foundation for Hydrogen's media queries is built on the <code>base()</code> query. This query is what you'll use to define basic styles on any element that apply to all media queries. Generally speaking, the <code>base()</code> query is the query you'll use the most, and will almost always appear on an element unless your needs only apply to a specific media query.",
                "<strong>The base query's key can be configured to a different word in your media configuration.</strong>",
              ],
            },
            {
              type: 'code',
              lines: ['data-h2-color="base(yellow)"'],
            },
          ],
        },
        {
          type: 'title',
          label: 'Custom queries',
          id: 'custom',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "Hydrogen allows you to configure any number of media queries to suit your project needs. Queries are defined in full inside your configuration file along with a key value that is used to reference them inside of attributes. <strong>It's important to note that the order of your media query configurations is important.</strong> Queries will appear in the cascade in the same order they are defined, so order them using a mobile first approach to avoid unexpected specificity problems.",
                "Hydrogen comes equipped with a handful of custom queries that are ready to use, but once you've settled on a series of queries, you can start accessing them inside of attributes using their key value, followed by brackets containing the attributes options.",
                "Custom queries can be chained to alter an element as many times as you need. Unlike the configuration file, query order doesn't matter when used inside of an attribute, though it is beneficial to order them in a way that makes sense for code legibility.",
              ],
            },
            {
              type: 'code',
              lines: [
                'data-h2-color="',
                '  base(yellow)',
                '  customQuery(pink)',
                '  customQuery:dark(green)',
                '  customQuery:hover(blue)',
                '"',
              ],
            },
          ],
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
          items: [
            'You can configure media queries in the <code>media</code> section of the configuration file.',
            'The <code>base_key</code> setting allows you to change the word used to access the base query.',
            'The <code>queries</code> object accepts any number of custom queries, which require a <code>key</code> value and a <code>query</code> CSS media query.',
            'As mentioned above, ensure that your queries are in a logical order, starting with mobile and increasing down the list.',
          ],
        },
        {
          type: 'code',
          file: 'hydrogen.config.json',
          copy: true,
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
