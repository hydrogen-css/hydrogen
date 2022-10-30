// Hydrogen tests: Seed test settings
'use strict';

// Hydrogen data models
let Settings = require('../../../lib/data/settings-model-definition');
/** @typedef {import('../../../lib/data/settings-model-definition').Settings} Settings */

// Hydrogen data imports

// Hydrogen function imports
const {
  build_development_config,
} = require('../../../lib/setup/build-settings');

// Vendor imports

// Scripts

/**
 * Modifies the settings object for the test
 * @param {Settings} settings
 * @returns {Settings}
 */
function modify_settings(settings) {
  delete settings.info;
  delete settings.logging;
  delete settings.processing;
  delete settings.media;
  delete settings.modes;
  settings.input = ['input'];
  settings.output = 'output';
  let default_theme = {
    key: 'default',
    typography: [
      {
        query_key: 'base',
        size: '100%',
        type_scale: '1.2',
        line_height: '1.4',
      },
    ],
  };
  settings.themes = [default_theme];
  return settings;
}

build_development_config('Settings test', modify_settings);
