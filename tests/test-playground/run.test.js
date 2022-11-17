'use strict';

const { create_settings } = require('./settings');
const { log_message } = require('../../lib/scripts/logs/log-message');
const { hydrogen_build } = require('../../lib/build');

var fs = require('fs');
var path = require('path');

function test() {
  return new Promise((resolve, reject) => {
    let test_meta = {
      function_name: 'Playground test',
    };
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_meta.function_name,
    });
    try {
      create_settings()
        .then((result) => {
          hydrogen_build()
            .then((result) => {
              resolve(test_meta);
            })
            .catch((error) => {
              console.log(error);
              reject(test_meta);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(test_meta);
        });
    } catch (error) {
      console.log(error);
      reject(test_meta);
    }
  });
}

function run_test() {
  test()
    .then((result) => {
      log_message({
        type: 'success',
        step: 'Test passed',
        function: result.function_name,
      });
    })
    .catch((error) => {
      log_message({
        type: 'failure',
        step: 'Test failed',
        function: error.function_name,
      });
    });
}

module.exports = {
  test,
  run_test,
};
