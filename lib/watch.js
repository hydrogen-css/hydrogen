// Hydrogen: Watch script
'use strict';

// Hydrogen type imports
let Settings = require('./data/settings-model-definition');
/** @typedef {import('./data/settings-model-definition').Settings} Settings */
// Hydrogen data imports
// Hydrogen function imports
const {
  hydrogen_success,
  hydrogen_core,
  hydrogen_full,
} = require('./scripts/processes');
const { log_message } = require('./scripts/logs/log-message');
// Vendor imports
const chokidar = require('chokidar');

/**
 * Runs a Chokidar watcher and builds Hydrogen when changes are detected
 * @returns {Promise} an assembled Hydrogen CSS file
 */
function hydrogen_watch() {
  return new Promise((resolve, reject) => {
    hydrogen_full()
      .then((result) => {
        hydrogen_success(result.settings).then(() => {
          // Store settings and media from the result
          let settings = result.settings;
          let media = result.media;
          let watch_list = [settings.config.path];
          settings.input.parsed.array.forEach(function (input) {
            watch_list = watch_list.concat(input);
          });
          const watcher = chokidar.watch(watch_list, {
            ignored: [
              'hydrogen.css',
              'hydrogen.raw.css',
              'hydrogen.vars.css',
              '**/hydrogen-logs/**',
            ],
            persistent: true,
          });
          log_message({
            type: 'system',
            step: 'Watching for changes...',
          });
          watcher.on('ready', function (event, path) {
            watcher.on('all', function (event, path) {
              if (path === settings.config.path) {
                hydrogen_full().then((new_result) => {
                  hydrogen_success(settings).then(() => {
                    settings = new_result.settings;
                    media = new_result.media;
                    resolve();
                  });
                });
              } else {
                // Log that the script has started
                console.log('');
                log_message({
                  type: 'system',
                  step: 'Starting the build...',
                });
                // Initiate the total build timer
                const timer_start_total_build = process.hrtime.bigint();
                hydrogen_core({
                  settings: settings,
                  media: media,
                  timer: timer_start_total_build,
                }).then(() => {
                  hydrogen_success(settings).then(() => {
                    log_message({
                      type: 'system',
                      step: 'Watching for changes...',
                    });
                    resolve();
                  });
                });
              }
            });
          });
          resolve();
        });
      })
      .catch((error) => {
        log_message(error);
        reject();
      });
  });
}

module.exports = {
  hydrogen_watch,
};
