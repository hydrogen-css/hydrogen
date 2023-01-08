const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    key: 'commands',
    parent: 'installation',
    order: 2,
  },
  title: 'Commands',
  title_long: 'Running commands',
  subtitle: "Learn about Hydrogen's CLI tool and how to use it to build CSS.",
  main: [
    {
      type: 'title',
      label: 'Initializing a project',
      id: 'initialization',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "You might have been introduced to this command on the <a href='/en/docs/installation' title='Learn about installing Hydrogen on your project.'>installation page</a>, but let's dive into what the initialization script does for you in detail. You'll only ever need to run this script once when you first install Hydrogen on your project.",
            "When run, it will prompt you to enter both an input and output directory. The input directory is where Hydrogen will look for your markup to scan. While you're only prompted for a single directory at first, you can add as many directories to this array as you want after Hydrogen has been initialized. The output directory is where Hydrogen will put its final CSS file, and any variable files you've requested. If you've <a href='/en/docs/configuration#debugging' title='Learn about enabling debug mode to help solve compiling errors.'>enabled debugging</a>, this directory will also be where Hydrogen places its log files.",
            "The initialization script then creates a <code>hydrogen.config.json</code> file in the directory you've run the script. This file contains <a href='/en/docs/configuration' title='Learn about configuring Hydrogen to meet your needs.'>everything you'll need to configure Hydrogen</a>, and includes helpful defaults you can start with.",
          ],
        },
        {
          type: 'code',
          file: 'terminal',
          lines: ['npx h2-init'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Running a build',
      id: 'build',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "The build script is what you'll use most when developing with Hydrogen. When executed, it runs the following to build your CSS:",
          ],
        },
        {
          type: 'list',
          style: 'ordered',
          items: [
            'Check to see if your configuration file is missing anything',
            "Create CSS/Sass variable files for you if you've configured them",
            'Scrape your markup for Hydrogen attributes',
            "Assemble custom CSS based on the attributes you've used",
            "Run the resulting CSS through <a href='https://github.com/postcss/autoprefixer' title='Learn about Autoprefixer and its helpful additions for maintaining browser support.' target='_blank' rel='noreferrer'>Autoprefixer</a> and a very <a href='https://github.com/cssnano/cssnano' title='Learn about how Hydrogen uses PostCSS and CSSnano to minify its output.' target='_blank' rel='noreferrer'>light minification</a>",
            'Create the final Hydrogen file',
          ],
        },
        {
          type: 'copy',
          items: [
            "The build script will also log any potential errors, typos, or warnings it finds to your console, so keep an eye out for them. If you need more robust debugging, you can <a href='/en/docs/setup/configuration#debugging' title='Learn about enabling debug mode to help solve compiling errors.'>enable log files in your configuration file using the debug setting</a>.",
          ],
        },
        {
          type: 'code',
          file: 'terminal',
          lines: ['npx h2-build'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Compiling on the fly',
      id: 'watch',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "The watch command will automatically watch the directories you've defined in your input configuration for changes. When it detects a change, it will rerun Hydrogen's build script for you on the fly, so that changes are automatically compiled as you work.",
          ],
        },
        {
          type: 'code',
          file: 'terminal',
          lines: ['npx h2-watch'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Flags',
      id: 'flags',
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
