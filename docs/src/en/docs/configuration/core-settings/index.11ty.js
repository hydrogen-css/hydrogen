let data = {
  layout: 'docs.11ty.js',
  navigation: {
    order: 6,
    key: 'core-settings',
    parent: 'configuration',
    pagination: true,
  },
  title: 'Core settings',
  title_long: 'Core build settings',
  subtitle:
    "Understand how to configure Hydrogen's build settings, including output controls and debugging.",
  main: [
    {
      type: 'title',
      label: 'The configuration file',
      id: 'config',
    },
    {
      type: 'copy',
      items: [
        "All of Hydrogen's settings can be configured inside of the <code>hydrogen.config.json</code> file generated during the installation process. This file contains a handful of basic development settings and helpful default style configurations that you can change, add to, or remove to produce a look and feel that matches your brand.",
        "Hydrogen's configuration follows a similar theory to a <strong>design token</strong> approach, where standardizing design decisions inside of the config allows you to leverage them across the whole project in a consistent, easily-updated way. ",
        'Each time you run <code>npx h2-build</code> or <code>npx h2-watch</code>, Hydrogen will first validate your configuration file to ensure it has everything it needs for a successful build. If something is missing or improperly formatted, Hydrogen will let you know in the console output. ',
      ],
    },
    {
      type: 'title',
      label: 'Core settings',
      id: 'core',
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Input and output',
          id: 'input-output',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "The <code>input</code> setting accepts an <code>array</code> of paths to the files you'd like Hydrogen to process. You can point to as many paths as you'd like, but be sure to include everywhere you use Hydrogen attributes.",
                'The <code>output</code> setting accepts a single path to the location you would like the CSS file to be placed after a successful build. This location will also be where log files are generated if you enable them.',
              ],
            },
            {
              type: 'code',
              file: 'hydrogen.config.json',
              language: 'json',
              count: 5,
              lines: [
                '"input": [',
                '  "path/to/first/input/folder",',
                '  "path/to/second/input/folder"',
                '],',
                '"output": "path/to/output/folder"',
              ],
            },
          ],
        },
        {
          type: 'title',
          label: 'Process settings',
          id: 'processing',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "The <code>include_reset_css</code> setting tells Hydrogen whether or not to include basic reset CSS in its output. If Hydrogen is interfering with your project's existing CSS, disabling this might resolve the issue.",
                'The <code>browser_prefix_css</code> setting enables/disables whether AutoPrefixer is run on the final CSS output. AutoPrefixer provides helpful CSS browser prefixes to ensure compatibility across browsers.',
                'The <code>minify_css</code> setting enables/disables whether CSSnano is run on the final CSS output. CSSnano compresses the final output using a series of basic rules to ensure the output file size is as small as possible.',
                "The <code>export_variable_file</code> setting tells Hydrogen whether or not you want a CSS variable file exported to the output folder. Hydrogen's output includes these variables, however, if you want to use the variables on a page that doesn't include Hydrogen, this file can be helpful.",
              ],
            },
            {
              type: 'code',
              file: 'hydrogen.config.json',
              language: 'json',
              count: 6,
              lines: [
                '"processing": {',
                '  "include_reset_css": true',
                '  "browser_prefix_css": true',
                '  "minify_css": true',
                '  "export_variable_file": false',
                '}',
              ],
            },
          ],
        },
        {
          type: 'title',
          label: 'Log settings',
          id: 'logging',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                'The <code>generate_logs</code> setting tells Hydrogen whether to generate a series of debug files in the output directory. This is especially helpful for developing new Hydrogen features, but can also shed light on unexpected build errors.',
                "The <code>verbose_console_output</code> setting will increase/decrease the volume of information provided in Hydrogen's console output.",
              ],
            },
            {
              type: 'code',
              file: 'hydrogen.config.json',
              language: 'json',
              count: 4,
              lines: [
                '"logging": {',
                '  "generate_logs": false',
                '  "verbose_console_output": true',
                '}',
              ],
            },
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
