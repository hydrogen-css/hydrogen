// Hydrogen: Process CSS
'use strict';

// Hydrogen type imports
let Settings = require('../data/settings-model-definition');
/**
 * @typedef {import('../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../scripts/logs/log-message');
const { log_timer } = require('../scripts/logs/log-timer');
const { write_variable_file } = require('./build-variables');
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
 * @param {"build" | "watch"} command The command invoking Hydrogen
 * @param {number} timer_start_total_build the value of the timer started at the beginning of the build
 * @returns {boolean} A prefixed, minified CSS file
 */
function process_hydrogen(settings, command, timer_start_total_build) {
  try {
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
    try {
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
              // console.log('attribute'.bgRed, m.node.parent);
              // var selector_string = m.node.parent.selector.toString();
              var selector_css = m.node.parent.selector + '{';
              m.node.parent.nodes.forEach(function (n, index) {
                selector_css = selector_css + n.prop + ':' + n.value + ';';
              });
              selector_css = selector_css + '}';
              log_message({
                type: 'error',
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
          // Generate a CSS variable file if the user has enabled them
          if (settings.processing.var_export === true) {
            // Log that Hydrogen is exporting variables
            log_message({
              type: 'system',
              step: 'Exporting variables...',
            });
            // Export the variables
            write_variable_file(settings);
          }
          // Log that final CSS export has started
          log_message({
            type: 'system',
            step: 'Exporting CSS...',
          });
          // Write the final CSS file
          fs.writeFileSync(
            path.join(settings.output.parsed.string + '/hydrogen.css'),
            result.css
          );
          if (result.map) {
            fs.writeFileSync(
              path.join(settings.output.parsed.string + '/hydrogen.css.map'),
              result.map.toString()
            );
          }
          // Delete the unprocessed CSS
          if (
            fs.existsSync(
              path.join(settings.output.parsed.string + '/hydrogen.raw.css')
            ) == true
          ) {
            fs.unlinkSync(
              path.join(settings.output.parsed.string + '/hydrogen.raw.css')
            );
          }
          // End total build timer
          const timer_end_total_build = process.hrtime.bigint();
          log_timer({
            settings: settings,
            step: 'Total build',
            times: {
              start: timer_start_total_build,
              end: timer_end_total_build,
            },
          });
          // Log that debug logs were created if debug is set
          if (settings.logging.logs) {
            log_message({
              type: 'info',
              step: 'Log generation',
              message:
                'Hydrogen has generated output logs and retained a pre-processed CSS file for debugging purposes.',
              files: [
                path.resolve(settings.output.parsed.string + '/hydrogen-logs'),
              ],
            });
          }
          // Log success
          if (settings.processing.var_export === true) {
            log_message({
              type: 'success',
              message:
                'Hydrogen successfully built its CSS file and exported a CSS variables file to your output directory.',
              files: [
                settings.output.parsed.string + '/hydrogen.css',
                settings.output.parsed.string + '/hydrogen.vars.css',
              ],
            });
          } else {
            log_message({
              type: 'success',
              message:
                'Hydrogen successfully built its CSS file to your output directory.',
              files: [settings.output.parsed.string + '/hydrogen.css'],
            });
          }
          if (command === 'watch') {
            log_message({
              type: 'system',
              step: 'Watching for changes...',
            });
          }
          return true;
        });
    } catch (error) {
      log_message({
        type: 'error',
        message: error,
        step: 'PostCSS processing',
        files: [
          path.resolve(settings.output.parsed.string + '/hydrogen.raw.css'),
        ],
      });
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'PostCSS processing',
      files: [
        path.resolve(settings.output.parsed.string + '/hydrogen.raw.css'),
      ],
    });
    return false;
  }
}

module.exports = {
  process_hydrogen,
};
