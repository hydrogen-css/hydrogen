// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/config-data').ParsedConfig} ParsedConfig
 */

// Data imports

// Local functions

// Helper functions
const { log_message } = require('../../console-logging/log-message');

// Vendor imports
var fs = require('fs');
var path = require('path');
var browserslist = require('browserslist');
var { transform, browserslistToTargets } = require('lightningcss');

// Call this once per build.
let targets = browserslistToTargets(browserslist('last 1 version and not dead'));

// Script ==========================================================================================

/**
 * Processes Hydrogen's output to ensure it's prefixed and minified
 * @param {ParsedConfig} config the user's settings
 * @param {string} css the compiled raw CSS
 * @returns {any} A prefixed, minified CSS file
 */
function process_hydrogen(config, css) {
  try {
    // Start the processor timer
    const postcss_timer_start_time = process.hrtime.bigint();
    // Delete any existing hydrogen.css files
    if (fs.existsSync(path.join(config.output.parsed.string + '/hydrogen.css')) == true) {
      fs.unlinkSync(path.join(config.output.parsed.string + '/hydrogen.css'));
    }
    // 2.0.4: Determine the Lightning CSS settings to be used
    let lightning_config = {};
    let timer_label = '';
    if (config.processing.browser_prefix_css === true && config.processing.minify_css === false) {
      // 2.0.4: Only run the prefixer
      lightning_config = {
        filename: path.join(config.output.parsed.string + '/hydrogen.css'),
        code: Buffer.from(css),
        minify: false,
        sourceMap: true,
        errorRecovery: config.processing.error_recovery,
        targets,
      };
      timer_label = 'prefixed';
    } else if (
      config.processing.browser_prefix_css === false &&
      config.processing.minify_css === true
    ) {
      // 2.0.4: Only run the minifier
      lightning_config = {
        filename: path.join(config.output.parsed.string + '/hydrogen.css'),
        code: Buffer.from(css),
        minify: true,
        sourceMap: true,
        errorRecovery: config.processing.error_recovery,
      };
      timer_label = 'minified';
    } else if (
      config.processing.browser_prefix_css === true &&
      config.processing.minify_css === true
    ) {
      // 2.0.4: Run both the prefixer and the minifier
      lightning_config = {
        filename: path.join(config.output.parsed.string + '/hydrogen.css'),
        code: Buffer.from(css),
        minify: true,
        sourceMap: true,
        errorRecovery: config.processing.error_recovery,
        targets,
      };
      timer_label = 'prefixed and minified';
    }
    // 2.0.4: Run Lightning CSS with the configured settings
    try {
      if (
        config.processing.browser_prefix_css === false &&
        config.processing.minify_css === false
      ) {
        // In the event prefixing and minification are both disabled, return the CSS string as is
        return css;
      } else {
        let { code, map, warnings } = transform(lightning_config);
        // If there are warnings, log them
        if (warnings) {
          warnings.forEach((warn) => {
            log_message({
              type: 'warning',
              step: 'Processing Lightning CSS',
              message: warn.message,
              error: warn,
              buffers: {
                bottom: true,
              },
            });
          });
        }
        // Log that Hydrogen is done processing the raw CSS
        if (config.logging.verbose_console_output === true) {
          log_message({
            type: 'system',
            step: 'CSS ' + timer_label,
            times: {
              start: postcss_timer_start_time,
              end: process.hrtime.bigint(),
            },
          });
        }
        return code;
      }
    } catch (error) {
      throw error;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Processing Lightning CSS',
        error: error,
      };
    }
  }
}

module.exports = {
  process_hydrogen,
};
