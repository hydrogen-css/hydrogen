// Watch the config files for changes.
function watchConfig(defaults, config, env) {
  if (env == 'dev') {
    watch('./lib/stage/hydrogen.config.json', series(devWatchSeries));
  } else if (env == 'prod') {
    watch(['./hydrogen.config.json'], series(watchSeries));
  }
  var watchMarkupArray = [];
  function getWatchUserMarkup() {
    if (Array.isArray(config.folders.markup) == true) {
      config.folders.markup.forEach(function(path, index, array) {
        watchMarkupArray = watchMarkupArray.concat('./' + path + '/**/*');
      });
    } else {
      watchMarkupArray = watchMarkupArray.concat('./' + config.folders.markup + '/**/*');
    }
  }
  getWatchUserMarkup();
  // console.log(watchMarkupArray);
  watch(watchMarkupArray, series(devWatchCleanSeries));
}

module.exports = watchConfig;