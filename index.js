// Hydrogen

// Data models
/**
 * @typedef {import('./lib/data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('./lib/data/media-array-data').MediaArray} MediaArray
 * @typedef {import('./lib/data/media-array-data').QueryData} QueryData
 */

/**
 * Runs a single instance of Hydrogen's build script
 * @returns {{config: ParsedConfig, media_array: QueryData[], css: string}} an assembled Hydrogen CSS file
 */
const { hydrogen_build } = require('./lib/build');

/**
 * Runs a Chokidar watcher and builds Hydrogen when changes are detected.
 *
 * @returns {{config: ParsedConfig, media_array: QueryData[], css: string}}
 */
const { hydrogen_watch } = require('./lib/watch');

module.exports = {
  hydrogen_build,
  hydrogen_watch,
};
