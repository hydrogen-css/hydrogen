// Init and imports
'use strict';
const {
  build_development_config,
} = require('../../../lib/setup/build-settings');

// Construct the settings
function modify_settings(settings) {
  settings.input = ['input'];
  settings.output = 'output';
  let theme = {
    key: 'theme',
    colors: [
      {
        key: 'myColor',
        default: {
          color: 'red',
          modifiers: [],
        },
      },
    ],
    shadows: [
      {
        key: 'testShadow',
        default: {
          shadow: '1px 1px 1px black',
        },
        dark: {
          shadow: '1px 1px 1px white',
        },
      },
    ],
  };
  settings.themes = settings.themes.concat(theme);
  return settings;
}

// Build the config
build_development_config('Control test', modify_settings);
