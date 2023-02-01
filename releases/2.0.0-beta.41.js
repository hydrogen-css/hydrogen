// Hydrogen data models
let Release = require('../lib/data/release-model-definition');
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.0-beta.41',
  date: new Date('2023-01-31'),
  author: 'Josh Beveridge',
  optimizations: [
    {
      breaking: true,
      changes: {
        en: [
          'Removes the <code>method</code> setting from the dark <code>mode</code> configuration in favor of a more global <code>mode.method</code> setting. This will apply the same method to all future modes to help avoid potential conflicts between application methodologies.',
        ],
      },
    },
    {
      breaking: true,
      changes: {
        en: [
          "Updates the following settings' keys to help make the purpose of the setting more explicit:",
          '<code>modes.dark.auto_apply_styles</code> > <code>modes.dark.auto_apply_styles</code>',
          '<code>modes.dark.auto_apply_styles_modifiers</code> > <code>modes.dark.swap_default_modifiers</code>',
          '<code>processing.reset_styles</code> > <code>processing.include_reset_css</code>',
          '<code>processing.var_export</code> > <code>processing.export_variable_file</code>',
          '<code>processing.prefixing</code> > <code>processing.browser_prefix_css</code>',
          '<code>processing.minification</code> > <code>processing.minify_css</code>',
          '<code>logging.logs</code> > <code>logging.generate_logs</code>',
          '<code>logging.timers</code> > <code>logging.show_timers</code>',
          '<code>logging.verbose</code> > <code>logging.verbose_console_output</code>',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug with configured properties that conflicted with values containing the configured key. Matches now look for preceding dash (-) and underscore (_) characters to account for this.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where timers and console output called before settings had been parsed ignored CLI flags.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug with the init script that caused an error if the input or output directories were specified inside directories that didn't yet exist.",
        ],
      },
    },
  ],
};
