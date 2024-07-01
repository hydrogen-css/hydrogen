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
              file: 'app.css',
              language: 'css',
              count: 8,
              lines: [
                '/* Tailwind */',
                'class="my-0 mx-1.5 bg-white text-base text-black dark:bg-black dark:text-white"',
                '',
                '/* Hydrogen */',
                'data-h2-margin="base(0px x1.5)"',
                'data-h2-background="base(white)"',
                'data-h2-font-size="base(body)"',
                'data-h2-color="base(black)"',
              ],
            },
          ],
        },
        {
          type: 'copy',
          items: [
            'This verbosity has its downsides; mainly, a less concise character count. In practice this means that your file sizes are likely to be slightly larger in comparison.',
            "Data attributes, however, aren't limited by the same syntax constraints that the class attribute is, meaning Hydrogen attributes can provide features such as selector and child element targeting in ways that leverage the syntax you already know.",
            'Beyond legibility and code clarity, custom data attributes allow for Hydrogen styles to be explicitly scoped to the framework, meaning they are far less likely to conflict with other frameworks, tools, or custom CSS.',
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
            "Importing Hydrogen's <code>build</code> script and calling it each time the framework is built",
            "Importing Hydrogen's <code>watch</code> script and running it in parallel with your build script (this is particularly helpful during development)",
            'Selective disabling Hydrogen from writing a CSS file and instead passing its output to your framework to handle instead',
          ],
        },
        {
          type: 'copy',
          items: [
            "Adding Hydrogen to your production build or one-off development build commands is generally easy, however things tend to get more complicated if your framework offers a watch mode or hot-reloading. If you're having trouble, try running Hydrogen's <code>watch</code> script on the initial build, at which point it will automatically rebuild when changes are detected.",
            "If your integration is causing an infinite loop, this is likely due to your framework detecting Hydrgen's CSS file being written. In this situation, depending on your framework, you might be able to disable the file writing and pass Hydrogen's processed CSS to the framework directly, at which point it can write the file instead. Alternatively, trying a different build hook earlier in the build process might also resolve the loop.",
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
