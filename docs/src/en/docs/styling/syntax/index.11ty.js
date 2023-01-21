const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    order: 11,
    key: 'syntax',
    parent: 'styling',
    pagination: true,
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
          lines: [
            '<button data-h2-background="base(primary)>',
            '  Hello',
            '</button>',
          ],
        },
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Attribute syntax',
          id: 'attribute',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: ['Hydrogen attributes consist of 3 main elements:'],
            },
            {
              type: 'list',
              style: 'unordered',
              items: [
                "<code>data-h2-</code> is the custom, namespaced data attribute's prefix.",
                "<code>property</code> is the CSS property you'd like to style.",
                '<code>query()</code> represents one or more media queries containing styles that should be applied to the selected property.',
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['data-h2-property="query() ..."'],
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Query syntax',
          id: 'query',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                'Queries have their own syntax and range from extremely simple (e.g. <code>base()</code>) to extremely specific (e.g. <code>p-tablet:dark:hover:selectors[.active]()</code>). They are constructed from the following elements:',
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['media:mode:state:selectors[]:children[](options)'],
            },
          ],
        },
        {
          type: 'group',
          items: [
            {
              type: 'list',
              style: 'unordered',
              items: [
                "<code>media</code> is the only required value for a query and specifies which media query to apply styles to. Generally, you'll be using the <code>base()</code> query for most of your styling.",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['base()'],
            },
          ],
        },
        {
          type: 'group',
          items: [
            {
              type: 'list',
              style: 'unordered',
              items: [
                '<code>:mode</code> allows you to target modes like dark mode. This value is optional and omitting it applies styles to the default light mode.',
                [
                  '<code>:all</code> will force the style to remain the same across light and dark modes.',
                  '<code>:dark</code> will apply the style to dark mode only.',
                ],
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['base:dark()'],
            },
          ],
        },
        {
          type: 'group',
          items: [
            {
              type: 'list',
              style: 'unordered',
              items: [
                '<code>:state</code> allows you to target standard markup states supported by HTML such as <code>:hover</code> and <code>:focus-visible</code>.',
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['base:hover()'],
            },
          ],
        },
        {
          type: 'group',
          items: [
            {
              type: 'list',
              style: 'unordered',
              items: [
                '<code>:selectors[]</code> allows you to specify a comma-separated list of IDs, classes, or attributes that must be present on the element in order for the styles to apply.',
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['base:selectors[.active, #target]()'],
            },
          ],
        },
        {
          type: 'group',
          items: [
            {
              type: 'list',
              style: 'unordered',
              items: [
                '<code>:children[]</code> accepts a comma-separated list of elements as well as IDs, classes, or attributes, but will target nested elements containing the specified selectors.',
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['base:children[button]()'],
            },
          ],
        },
        {
          type: 'group',
          items: [
            {
              type: 'list',
              style: 'unordered',
              items: [
                "<code>(options)</code> are the actual styles you'd like to apply to the property. Barring a handful of custom properties unique to Hydrogen, you can use standard CSS syntax here.",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['data-h2-padding="base(5px)"'],
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
        "Generally speaking, you'll be writing Hydrogen attributes within markup or markup files such as html. This means that you can apply Hydrogen attributes to any element like you would other data attributes. Hydrogen attributes should live next to your classes, ids, and other common attributes.",
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
                "While the syntax can be daunting at first, a majority of the time you'll be using relatively simple iterations of Hydrogen's data attributes. Sometimes examples are the easiest way to learn, so we've provided a few attributes of increasing complexity.",
                "Let's start by applying your primary brand color to some text. To do so, we'll use the <code>data-h2-color</code> attribute, which only accepts one option, </code>color</code>. We'll set this option as <code>primary</code> inside the base media query.",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: ['<p data-h2-color="base(primary)">My text</p>'],
            },
          ],
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "Great! Now let's try something a little more advanced. Perhaps we'd like our text to change to our secondary brand color on desktop devices. We can achieve this by adding another media query inside of the attribute.",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: [
                '<p data-h2-color="base(primary) desktop(secondary)">',
                '  My text',
                '</p>',
              ],
            },
          ],
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                'To take it a step further, how about we make our text white for users who prefer dark mode? We can achieve this by adding the <code>:dark</code> modifier to a new base query.',
                "Hydrogen's data attributes can be as simple or as complex as you need them to be given the design of the interface. Sometimes setting a single option in the base query is enough, while other situations might require different options for every query, mode, and state you have access to.",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: [
                '<p data-h2-color="base(primary) base:dark(white) desktop(secondary)">',
                '  My text',
                '</p>',
              ],
            },
          ],
        },
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
                'Using Hydrogen attributes in your markup is the most common way to add styles to your project.',
                'For example, lets say we have a delete button in our HTML file and want to apply a red background color to help make it clear that the button causes a destructive action.',
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: [
                '<button',
                '  onclick="delete()"',
                '  data-h2-background="base(red)">',
                '  Delete button',
                '</button>',
              ],
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
                'You can also use Hydrogen attributes as key/value pairs in your code. This is especially helpful when working in JavaScript or JSX, because it allows you to create reusable maps of attributes that can then be expanded in your markup.',
                "For example, let's say we have an alert component and we want to apply Hydrogen attributes based on its state of success or error.",
                "By assigning Hydrogen key/value pairs to the <code>alertTypes</code> object, we can use them to apply styles based on the alert's type prop that is passed in later.",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: [
                'const alertTypes = {',
                '  success: {',
                '    "data-h2-background-color": "base(success)",',
                '    "data-h2-color": "base(success.dark)",',
                '  },',
                '  error: {',
                '    "data-h2-background-color": "base(error)",',
                '    "data-h2-color": "base(error.dark)",',
                '  },',
                '};',
                '',
                'class Alert extends React.Component {',
                '  render() {',
                '    return (',
                '      <div {...alertTypes[this.props.alertType]}>My alert text</div>',
                '    );',
                '  }',
                '};',
              ],
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
                "The one thing to note is that it's important that Hydrogen attributes are included in full wherever you use them. Hydrogen scrapes your code to build your CSS, and this means it needs to be able to parse the property in tandem with its options. Separating the options out into variables like the example provided will not work and Hydrogen will ignore the value.",
                'This limitation applies to templating languages as well - be sure to include attributes in their entirety when defining them, whether on an element or in a variable.',
              ],
            },
            {
              type: 'code',
              file: '🚫 Hydrogen will not parse this',
              lines: [
                'var my_value = "base(blue)"',
                '',
                'class Alert extends React.Component {',
                '  render() {',
                '    return (',
                '      <div data-h2-color={my_value}>My alert text</div>',
                '    );',
                '  }',
                '};',
              ],
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
        "Hydrogen also provides a handy VS Code-compatible snippets file that makes adding attributes to your code a breeze. Once added, you can begin typing <code>h2-</code> in your code and tab complete any property available to you. If you find a CSS property that isn't included in the autocomplete, Hydrogen will still parse it properly.",
        'The snippets provide helpful prompts for the syntax, making remembering what you need fast and easy. We recommend adding the snippets to your project files to make them available to anyone working on your code, but you can also add them as a global snippets file if you choose to.',
      ],
    },
    {
      type: 'split',
      first: {
        items: [
          {
            type: 'copy',
            items: ['<strong>To add snippets to your local project:</strong>'],
          },
          {
            type: 'list',
            style: 'ordered',
            items: [
              "In your project folder, create a <code>.vscode</code> folder if one doesn't already exist",
              'Create a file in that folder named <code>hydrogen.code-snippets</code>',
              'Paste the snippets data into the file',
              'Save',
            ],
          },
        ],
      },
      second: {
        items: [
          {
            type: 'copy',
            items: ['<strong>To add snippets to VS Code globally:</strong>'],
          },
          {
            type: 'list',
            style: 'ordered',
            items: [
              'In VS Code, hit <code>CTRL+SHIFT+P</code> to open the command palette',
              'Select "Configure User Snippets"',
              'Select "New Global Snippets File..."',
              'Enter a file name (e.g. <code>hydrogen</code>)',
              'Paste the snippets data into the file',
              'Save',
            ],
          },
        ],
      },
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
