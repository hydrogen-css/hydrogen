let data = {
  layout: 'docs.11ty.js',
  navigation: {
    key: 'faqs',
    parent: 'docs',
  },
  terms: [
    'frequently',
    'asked',
    'questions',
    'help',
    'support',
    'broken',
    'features',
    'data',
    'attributes',
    'frameworks',
    'integration',
  ],
  title: 'Frequently asked questions',
  subtitle: 'Find answers to common questions about Hydrogen.',
  main: [
    {
      type: 'title',
      label: 'Find an answer',
      id: 'answers',
    },
    {
      type: 'copy',
      items: [
        "This page contains a handful of common questions about Hydrogen's approach, how you can get in touch, and offers help with common tasks. We're always considering new content that might help out users, so if you have ideas, don't hesitate to reach out on <a href='https://github.com/hydrogen-css/hydrogen/issues/new' title='Submit a ticket on Github.' target='_blank'>Github</a>!",
      ],
    },
    {
      type: 'expansion',
      label: '"What is a CSS utility framework?"',
      expanded: '',
      id: 'utility',
      items: [
        {
          type: 'copy',
          items: [
            'While CSS frameworks come in a bunch of flavors, Hydrogen opts to leverage a utility-style approach. What does this mean? Normally when you style an element, you assign it a <code>class</code> and write custom CSS.',
            "As your project grows, this custom CSS starts to become complicated - classes begin to conflict, some styles change elements unexpectedly, and you're forced to invent a naming scheme for your classes that often becomes unruly.",
            'Utility frameworks abstract these problems away by eliminating the need for you to write custom CSS. The framework provides you with pre-made classes that do very specific things, such as styling a <code>margin</code> or <code>background-color</code>. This provides some unique benefits:',
          ],
        },
        {
          type: 'list',
          items: [
            'You can write styles directly in your markup, including media queries, hover states, and nested elements',
            'Utilities are safe and reusable, meaning you can change or remove them without worrying about how it will affect other parts of your project',
            "As you repeat styles, your CSS file doesn't continue to grow",
            'You no longer have to name classes or IDs, as the framework handles CSS generation for you',
          ],
        },
        {
          type: 'copy',
          items: [
            'Hydrogen takes this approach in a slightly different direction, leveraging the more flexible syntax offered by <code>data-attributes</code> to allow for highly legible, extremely flexible styling.',
          ],
        },
      ],
    },
    {
      type: 'expansion',
      label: '"Why does Hydrogen use data attributes instead of classes?"',
      expanded: '',
      id: 'attributes',
      items: [
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                'The decision to use data attributes instead of the more commonly used classes was made due to the key-value pairing of data attributes allowing for clearer syntax and better code legibility.',
                "Unlike other class-based frameworks, one of Hydrogen's main goals is to make inline styling easier to read and write. Class-based frameworks often result in a large group of unorganized shortform class names, some of which, if you don't already know the framework's syntax, aren't clear in their effects.",
              ],
            },
            {
              type: 'code',
              file: 'app.html',
              language: 'html',
              count: 9,
              lines: [
                '<!-- Tailwind -->',
                '<p class="my-0 mx-1.5 bg-white text-base text-black dark:bg-black dark:text-white">',
                '  Styled text',
                '</p>',
                '',
                '<!-- Hydrogen -->',
                '<p data-h2-margin="base(0px x1.5)" data-h2-background="base(white)" data-h2-font-size="base(body)" data-h2-color="base(black)">',
                '  Styled text',
                '</p>',
              ],
            },
          ],
        },
        {
          type: 'copy',
          items: [
            'This verbosity has its obvious downsides; mainly, a less concise character count. In practice this means that your file sizes are likely to be slightly larger in comparison to other frameworks.',
            "Data attributes, however, aren't limited by the same syntax constraints that the class attribute is, meaning Hydrogen can provide features such as selector and child element targeting that mimics syntax that you already know.",
          ],
        },
      ],
    },
    {
      type: 'expansion',
      label: '"How can I request a feature, report a bug, or get help with an issue?"',
      expanded: '',
      id: 'bugs',
      items: [
        {
          type: 'copy',
          items: [
            "The best way to share an idea or report a problem is to submit a <a href='https://github.com/hydrogen-css/hydrogen/issues/new' title='Submit a ticket on Github.' target='_blank'>new Github ticket</a> or discussion. You can see features and bugfixes that are planned in <a href='https://github.com/orgs/hydrogen-css/projects/3/views/3' title='Check out the roadmap on Github.' target='_blank'>our roadmap on Github</a>, so if your idea or problem isn't reflected there, share it with us!",
            'Tickets will be triaged as fast as possible, and we plan to take action, the issue will be added to the project backpack or a scheduled milestone.',
          ],
        },
      ],
    },
    {
      type: 'expansion',
      label: '"How can I integrate Hydrogen with common frameworks?"',
      expanded: '',
      id: 'frameworks',
      items: [
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "While Hydrogen doesn't offer direct plugins for various framework integrations at this time, it does provide a handful of options for integration at various levels.",
                'Get started by importing the build and watch scripts.',
              ],
            },
            {
              type: 'code',
              file: 'framework.js',
              language: 'js',
              count: 1,
              lines: [
                "const { hydrogen_build, hydrogen_watch } = require('@hydrogen-css/hydrogen');",
              ],
            },
          ],
        },
        {
          type: 'copy',
          items: [
            "Generally speaking, in order to add Hydrogen to your build process, you'll need to call it during the appropriate build hooks offered by your framework of choice. There are a few options for how Hydrogen can be called:",
          ],
        },
        {
          type: 'list',
          items: [
            "Using Hydrogen's <code>build</code> script each time the framework is built",
            "Using Hydrogen's <code>watch</code> script in parallel with your build script (this is particularly helpful during development)",
            'Selectively disabling Hydrogen from writing a CSS file and instead passing its output to your framework to handle instead',
          ],
        },
        {
          type: 'copy',
          items: [
            "Adding Hydrogen to your production build or one-off development build commands is generally easy, however things tend to get more complicated if your framework offers a watch mode or hot-reloading. If you're having trouble, try running Hydrogen's <code>watch</code> script on the initial build, at which point it will automatically rebuild when changes are detected.",
            "If your integration is causing an infinite loop, this is likely due to your framework detecting Hydrogen's CSS file being written. The first thing you can try to avoid this is to have Hydrogen output the CSS file to your compiled directiory (often <code>dist</code>). If this isn't possible, depending on your framework, you might be able to disable the file writing and pass Hydrogen's processed CSS to the framework directly, at which point it can write the file instead. Alternatively, trying a different build hook earlier in the build process might also resolve the loop.",
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
