'use strict';

const { create_test_config } = require('../../lib/setup/create-test-config');

function modify_settings(settings) {
  try {
    settings.input = ['input'];
    settings.output = 'output';
    settings.modes['dark'].method = 'toggle';
    settings.processing.minification = true;
    return settings;
  } catch (error) {
    throw error;
  }
}

function create_settings(optional_path) {
  try {
    create_test_config('Basics test', modify_settings, optional_path);
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create_settings,
};
