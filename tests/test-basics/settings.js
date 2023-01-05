'use strict';

const { get_settings_data } = require('../../lib/data/settings-model');
var fs = require('fs');

function create_settings() {
  try {
    // Delete existing settings
    if (fs.existsSync('hydrogen.config.json')) {
      fs.rmSync('hydrogen.config.json', { force: true });
    }
    // Get the default settings data
    let settings = get_settings_data();
    // Manipulate the settings for this environment
    settings.input = ['input'];
    settings.output = 'output';
    settings.modes['dark'].method = 'toggle';
    settings.processing.minification = true;
    // Write the configuration file
    fs.writeFileSync('hydrogen.config.json', JSON.stringify(settings, null, 2));
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create_settings,
};
