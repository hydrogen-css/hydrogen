"use strict";

const fs = require('fs');

function loadUserConfig() {
  // Check to see if the user has a config file and load it.
  if (fs.existsSync('./hydrogen.config.json') == false) {
    console.error('[ERROR] Hydrogen: you do not have a hydrogen.config.json file in your project root. Please create one to continue.'.red);
    return false;
  } else {
    // Import the user's JSON config file.
    var config = JSON.parse(fs.readFileSync('./hydrogen.config.json'));
    // Check to see if the folders are properly created first.
    if (config.folders == null || config.folders == undefined || config.folders == "" || config.folders.styles == null || config.folders.styles == undefined || config.folders.styles == "") {
      console.error('[ERROR] Hydrogen: please ensure you define a style path in your configuration file before continuing.'.red);
      return false;
    } else if (config.folders == null || config.folders == undefined || config.folders == "" || config.folders.markup == null || config.folders.markup == undefined || config.folders.markup == "") {
      console.error('[ERROR] Hydrogen: please ensure you define a markup path in your configuration file before continuing.'.red);
      return false;
    } else {
      return config;
    }
  }
}

module.exports = loadUserConfig;