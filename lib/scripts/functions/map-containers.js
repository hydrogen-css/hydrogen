// Hydrogen.css / Container Map Generation

// =============================================================================

"use strict";

// Requirements
const { src, dest } = require('gulp');
var footer = require('gulp-footer');

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// =============================================================================

// Exporting Variables Based on User Config ------------------------------------

// Generate a list of Sass variables from the config files.
function createContainerSassVariables(env) {
  // Load the config files, along with the defaults.
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Set the string and prefix it with a helpful comment.
  var containerVariables = "// Containers\n";
  // Set an empty variable for the config to be populated based on whether the user has set their own settings.
  var containerConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (
    config.containers != null &&
    config.containers != undefined &&
    config.containers.length > 0
  ) {
    containerConfig = config.containers;
  } else {
    containerConfig = defaults.containers;
  }
  // TBD Deprecated Legacy Defaults
  containerVariables = containerVariables.concat('$h2-container-width-full: none;\n')
  // Loop through each config option and build the list.
  containerConfig.forEach(function (containers) {
    var containerVariable =
      "$h2-container-width-" +
      containers.key +
      ": " +
      containers.maxWidth +
      ";\n";
    containerVariables = containerVariables.concat(containerVariable);
  });
  // Return the variable set.
  return containerVariables;
}

// Set the variables in the variable file.
function setContainerSassVariables(env) {
  // Load the user's config file.
  var config = loadH2Config(env);
  // Fetch the variable list.
  var containerVars = createContainerSassVariables(env);
  // Add the generated variables to the Sass file.
  if (env == "dev") {
    return src(
      "./lib/stage/" + config.folders.styles + "/hydrogen-variables.scss"
    )
      .pipe(footer(containerVars))
      .pipe(dest("./lib/stage/" + config.folders.styles));
  } else if (env == "prod") {
    return src("./" + config.folders.styles + "/hydrogen-variables.scss")
      .pipe(footer(containerVars))
      .pipe(dest("./" + config.folders.styles));
  }
}

// Exporting a Sass Map Based on User Config -----------------------------------

// Generate the map.
function loadContainerMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var containerMapStringStart = '$h2-map-containers: ("full": "none",';
  var containerMapStringContent = '';
  var containerMapStringEnd = ');';
  var containerConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.containers != null && config.containers != undefined && config.containers.length > 0) {
    containerConfig = config.containers;
  } else {
    containerConfig = defaults.containers;
  }
  // Loop through each option and build the map.
  containerConfig.forEach(function(containers) {
    var containersString = '"' + containers.key + '": "' + containers.maxWidth + '",';
    containerMapStringContent = containerMapStringContent.concat(containersString);
  });
  // Assemble the map.
  var containerMap = containerMapStringStart + containerMapStringContent + containerMapStringEnd;
  // Return the map.
  return containerMap;
}

// Set the map.
function setContainerMap(env) {
  var config = loadH2Config(env);
  var containerMap = '';
  containerMap = loadContainerMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-containers.scss')
      .pipe(footer(containerMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-containers.scss')
      .pipe(footer(containerMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = {
  setContainerSassVariables,
  setContainerMap
}