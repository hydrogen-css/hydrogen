'use strict';

const { create_test_config } = require('../../lib/setup/create-test-config');

function modify_settings(settings) {
  return new Promise((resolve, reject) => {
    try {
      settings.input = ['input'];
      settings.output = 'output';
      settings.modes['dark'].method = 'toggle';
      settings.processing.minify_css = false;
      resolve(settings);
    } catch (error) {
      console.log(error);
      reject();
    }
  });
}

function create_settings(optional_path) {
  return new Promise((resolve, reject) => {
    try {
      create_test_config(
        'Attribute parser test',
        modify_settings,
        optional_path
      )
        .then((result) => {
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    } catch (error) {
      console.log(error);
      reject();
    }
  });
}

module.exports = {
  create_settings,
};
