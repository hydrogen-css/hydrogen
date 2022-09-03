// Hydrogen: Process CSS
'use strict';

// Vendor dependencies
var autoprefixer = require('autoprefixer'); // This needs to stay
var colors = require('colors');
var cssnano = require('cssnano');
var cssnano_default = require('cssnano-preset-default');
var fs = require('fs');
var postcss = require('postcss');
var path = require('path');

// Hydrogen dependencies
var { getUserOutput } = require('./generate-paths');
var { log_command, log_info } = require('./logs');
var { log_timer } = require('./log-timer');

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
 * @param {object} settings the user's settings
 * @param {string} command build | watch
 * @param {number} total_build_timer_start_time the value of the timer started at the beginning of the build
 * @param {array} debug_data all debug data collected during the build
 * @returns prefixed, minified CSS
 */
function process_hydrogen(
  settings,
  command,
  total_build_timer_start_time,
  debug_data
) {
  try {
    const postcss_timer_start_time = process.hrtime.bigint();
    // Get the user output directory as a string
    var userOutput = getUserOutput(settings, 'string');
    // Delete any existing hydrogen.css files
    if (fs.existsSync(path.join(userOutput + '/hydrogen.css')) == true) {
      fs.unlinkSync(path.join(userOutput + '/hydrogen.css'));
    }
    // Load the raw CSS synchronously
    var rawCSS = fs.readFileSync(path.join(userOutput + '/hydrogen.raw.css'));
    try {
      // Determine the plugins to be used ======================================
      var plugin_array = [];
      var timer_label = '';
      if (
        settings.build.prefixing === true &&
        settings.build.minification === false
      ) {
        plugin_array = [autoprefixer];
        timer_label = 'Autoprefixer';
      } else if (
        settings.build.prefixing === false &&
        settings.build.minification === true
      ) {
        plugin_array = [
          cssnano({
            preset,
          }),
        ];
        timer_label = 'CSSnano';
      } else if (
        settings.build.prefixing === true &&
        settings.build.minification === true
      ) {
        plugin_array = [
          cssnano({
            preset,
            plugins: [autoprefixer],
          }),
        ];
        timer_label = 'Autoprefixer and CSSnano';
      }
      // Run PostCSS ===========================================================
      postcss(plugin_array)
        .process(rawCSS, {
          from: path.join(userOutput + '/hydrogen.raw.css'),
          to: path.join(userOutput + '/hydrogen.css'),
        })
        .then((result) => {
          result.messages.forEach(function (m, index) {
            if (m.type === 'warning' || m.type === 'error') {
              // console.log('attribute'.bgRed, m.node.parent);
              var selector_string = m.node.parent.selector.toString();
              var selector_css = m.node.parent.selector + '{';
              m.node.parent.nodes.forEach(function (n, index) {
                selector_css = selector_css + n.prop + ':' + n.value + ';';
              });
              selector_css = selector_css + '}';
              log_info(
                'error',
                'Invalid CSS',
                'Processing CSSnano',
                selector_string,
                selector_css,
                m.node.prop + ':' + m.node.value + ';',
                [path.resolve(userOutput + '/hydrogen.css')],
                "This syntax error was found during CSSnano's compression of Hydrogen's final CSS output. It's likely that this was caused by an invalid value being passed to a calc function. Check the error details above for details."
              );
            }
          });
          fs.writeFileSync(path.join(userOutput + '/hydrogen.css'), result.css);
          if (result.map) {
            fs.writeFileSync(
              path.join(userOutput + '/hydrogen.css.map'),
              result.map.toString()
            );
          }
          if (
            fs.existsSync(path.join(userOutput + '/hydrogen.raw.css')) == true
          ) {
            fs.unlinkSync(path.join(userOutput + '/hydrogen.raw.css'));
          }
          const postcss_timer_end_time = process.hrtime.bigint();
          if (
            settings.build.prefixing === true ||
            settings.build.minification === true
          ) {
            log_timer(
              settings,
              timer_label,
              postcss_timer_start_time,
              postcss_timer_end_time
            );
          }
          // End total build timer
          const total_build_timer_end_time = process.hrtime.bigint();
          log_timer(
            settings,
            'Total build',
            total_build_timer_start_time,
            total_build_timer_end_time
          );
          // Log that debug logs were created if debug is set
          if (debug_data.enabled === true) {
            log_info(
              'alert',
              'Log generation',
              'Wrap-up',
              null,
              null,
              null,
              [
                path.resolve(
                  getUserOutput(settings, 'string') + '/hydrogen-logs'
                ),
              ],
              'Hydrogen has generated output logs and retained a pre-processed CSS file for debugging purposes.'
            );
          }
          // Log success
          log_info(
            'success',
            'CSS build',
            'Wrap-up',
            null,
            null,
            null,
            [getUserOutput(settings, 'string')],
            'Hydrogen successfully built a CSS file in your output directory.'
          );
          if (command === 'watch') {
            log_command('watching');
          }
          return true;
        });
    } catch (error) {
      // Catch any errors ======================================================
      log_info(
        'error',
        'Unknown error',
        'Processing CSS',
        null,
        null,
        null,
        [path.resolve(userOutput + '/hydrogen.raw.css')],
        error
      );
      return false;
    }
  } catch (error) {
    // Catch any errors ========================================================
    log_info(
      'error',
      'Unknown error',
      'Processing CSS',
      null,
      null,
      null,
      [path.resolve(userOutput + '/hydrogen.raw.css')],
      error
    );
    return false;
  }
}

module.exports = {
  process_hydrogen,
};
