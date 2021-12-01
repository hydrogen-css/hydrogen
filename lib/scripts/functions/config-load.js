'use strict';

const fs = require('fs');

function loadH2Defaults(env) {
  var defaults;
  if (env == 'dev') {
    defaults = JSON.parse(fs.readFileSync('./lib/hydrogen.default.json'));
  } else if (env == 'prod') {
    defaults = JSON.parse(
      fs.readFileSync(
        './node_modules/@hydrogen-design-system/hydrogen.css/lib/hydrogen.default.json'
      )
    );
  }
  return defaults;
}

function loadH2Config(env) {
  var config;
  if (env == 'dev') {
    config = JSON.parse(fs.readFileSync('./lib/stage/hydrogen.config.json'));
  } else if (env == 'prod') {
    config = JSON.parse(fs.readFileSync('./hydrogen.config.json'));
  }
  return config;
}

/**
 * Checks the environment variable and passes back the local root source path or the node modules source path.
 * @param {string} env Either 'dev' or 'prod'
 * @returns {string} ./ or ./node_modules/@hydrogen-design-system/hydrogen.css/
 */
function getH2SourcePath(env) {
  try {
    var src = '';
    if (env != '' && env != null && env != undefined) {
      if (env == 'dev') {
        src = src + './';
        return src;
      } else if (env == 'prod') {
        src = src + './node_modules/@hydrogen-design-system/hydrogen.css/';
        return src;
      }
    } else {
      throw "You're trying to create a source path variable without specifying an env value.";
    }
  } catch (ex) {
    console.error('H2', '[ERROR]'.red, ' ', ex);
    return false;
  }
}
/**
 * Checks the environment variable and passes back the local stage path or the root path.
 * @param {string} env Either 'dev' or 'prod'
 * @returns {string} ./lib/stage/ or ./
 */
function getH2DestinationPath(env) {
  try {
    var path = '';
    if (env != '' && env != null && env != undefined) {
      if (env == 'dev') {
        path = path + './lib/stage/';
        return path;
      } else if (env == 'prod') {
        path = path + './';
        return path;
      }
    } else {
      throw "You're trying to create a destination path variable without specifying an env value.";
    }
  } catch (ex) {
    console.error('H2', '[ERROR]'.red, ' ', ex);
    return false;
  }
}

var dirWarning = false;

/**
 * Gets the user's configured output directory and checks for deprecated syntax.
 * @param {string} env Either 'dev' or 'prod'
 * @returns {string} The user's configured output directory
 */
function getH2OutputDirectory(env) {
  try {
    var config = loadH2Config(env);
    var outputDir = '';
    if (config.output) {
      // They're using the new input/output syntax.
      if (Array.isArray(config.output) == true) {
        throw "You've tried to specify multiple output directories. Hydrogen only supports a single output directory.";
      } else {
        outputDir = outputDir + config.output;
        return outputDir;
      }
    } else if (config.folders.styles) {
      // They're using the deprecated syntax.
      if (dirWarning == false) {
        console.log(
          'H2',
          '[WARNING]'.yellow,
          " You're using deprecated syntax for your folder definitions. Please migrate to the input/output configuration."
        );
      }
      dirWarning = true;
      if (Array.isArray(config.folders.styles) == true) {
        throw "You've tried to specify multiple style directories. Hydrogen only supports a single style directory.";
      } else {
        outputDir = outputDir + config.folders.styles;
        return outputDir;
      }
    } else {
      // They haven't defined an output directory at all.
      throw "You haven't defined an output directory in your Hydrogen configuration file.";
    }
  } catch (ex) {
    console.error('H2', '[ERROR]'.red, ' ', ex);
    return false;
  }
}

module.exports = {
  loadH2Defaults,
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
};
