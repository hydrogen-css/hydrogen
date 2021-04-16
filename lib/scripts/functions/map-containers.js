"use strict";

// Loaded in the event we need to console.log.
var colors = require('colors');

function loadContainerMap(defaults, config) {
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
    var containersString = '"' + containers.name + '": "' + containers.maxWidth + '",';
    containerMapStringContent = containerMapStringContent.concat(containersString);
  });
  // Assemble the map.
  var containerMap = containerMapStringStart + containerMapStringContent + containerMapStringEnd;
  // Return the map.
  return containerMap;
}

// Export the map function for use.
module.exports = loadContainerMap;