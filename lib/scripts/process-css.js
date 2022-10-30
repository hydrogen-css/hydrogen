// Hydrogen: Process CSS
'use strict';

// Hydrogen type imports
let Settings = require('../data/settings-model-definition');
/** @typedef {import('../data/settings-model-definition').Settings} Settings */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../scripts/logs/log-message');
const { log_timer } = require('../scripts/logs/log-timer');
// Vendor imports
var autoprefixer = require('autoprefixer'); // This needs to stay
var colors = require('colors');
var cssnano = require('cssnano');
var cssnano_default = require('cssnano-preset-default');
var fs = require('fs');
var postcss = require('postcss');
var path = require('path');

// CSSnano preset
const preset = cssnano_default({
  cssDeclarationSorter: false,
  colormin: false,
  convertValues: false,
  discardOverridden: false,
  mergeLonghand: false,
  mergeRules: false,
  orderedValues: false,
  reduceInitial: false,
  reduceTransforms: false,
  svgo: false,
  uniqueSelectors: false,
});

/**
 * Processes Hydrogen's output to ensure it's prefixed and minified
 * @param {Settings} settings the user's settings
 * @returns {Promise} A prefixed, minified CSS file
 */
function process_hydrogen(settings) {
  return new Promise((resolve, reject) => {
    // Log that Hydrogen is exporting variables
    log_message({
      type: 'system',
      step: 'Processing CSS...',
    });
    const postcss_timer_start_time = process.hrtime.bigint();
    // Delete any existing hydrogen.css files
    if (
      fs.existsSync(
        path.join(settings.output.parsed.string + '/hydrogen.css')
      ) == true
    ) {
      fs.unlinkSync(path.join(settings.output.parsed.string + '/hydrogen.css'));
    }
    // Load the raw CSS synchronously
    let rawCSS = fs.readFileSync(
      path.join(settings.output.parsed.string + '/hydrogen.raw.css')
    );
    // Determine the plugins to be used
    let plugin_array = [];
    let timer_label = '';
    if (
      settings.processing.prefixing === true &&
      settings.processing.minification === false
    ) {
      plugin_array = [autoprefixer];
      timer_label = 'Autoprefixer';
    } else if (
      settings.processing.prefixing === false &&
      settings.processing.minification === true
    ) {
      plugin_array = [
        cssnano({
          preset,
        }),
      ];
      timer_label = 'CSSnano';
    } else if (
      settings.processing.prefixing === true &&
      settings.processing.minification === true
    ) {
      plugin_array = [
        cssnano({
          preset,
          plugins: [autoprefixer],
        }),
      ];
      timer_label = 'Autoprefixer, CSSnano';
    }
    // Run PostCSS
    postcss(plugin_array)
      .process(rawCSS, {
        from: path.join(settings.output.parsed.string + '/hydrogen.raw.css'),
        to: path.join(settings.output.parsed.string + '/hydrogen.css'),
      })
      .then((result) => {
        result.messages.forEach(function (m, index) {
          if (m.type === 'warning' || m.type === 'error') {
            var selector_css = m.node.parent.selector + '{';
            m.node.parent.nodes.forEach(function (n, index) {
              selector_css = selector_css + n.prop + ':' + n.value + ';';
            });
            selector_css = selector_css + '}';
            log_message({
              type: 'error',
              settings: settings,
              step: 'Processing CSSnano',
              message:
                "This syntax error was found during CSSnano's compression of Hydrogen's final CSS output.",
              selector: selector_css,
              css: m.node.prop + ':' + m.node.value + ';',
              files: [
                path.resolve(settings.output.parsed.string + '/hydrogen.css'),
              ],
            });
          }
        });
        const postcss_timer_end_time = process.hrtime.bigint();
        if (
          settings.processing.prefixing === true ||
          settings.processing.minification === true
        ) {
          log_timer({
            settings: settings,
            step: timer_label,
            times: {
              start: postcss_timer_start_time,
              end: postcss_timer_end_time,
            },
          });
        }
        resolve(result);
      })
      .catch((error) => {
        reject();
      });
  }).catch((error) => {
    reject();
  });
}

module.exports = {
  process_hydrogen,
};
