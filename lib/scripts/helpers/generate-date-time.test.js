'use strict';

let { log_message } = require('../logs/log-message');
let { generate_date_time } = require('./generate-date-time');

/*
  Test list
  - The function returns a string
*/

function test1() {
  return new Promise((resolve, reject) => {
    let test_name = '1 - valid arguments';
    let settings = {
      input: ['first/test/path', 'second/test/path'],
      config: {
        directory: 'path/to/config/folder',
      },
      logging: {
        warnings: {
          count: 0,
        },
        errors: {
          count: 0,
        },
      },
    };
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    let test = generate_date_time({ settings: settings });
    if (test) {
      if (typeof test != 'string') {
        reject({
          test_name: test_name + ': result was not a string.',
        });
      }
      resolve({ test_name: test_name });
    } else {
      reject({
        test_name: test_name + ': result was false.',
      });
    }
  });
}

function test() {
  return new Promise((resolve, reject) => {
    let name = 'generate_date_time';
    console.log('');
    log_message({
      type: 'system',
      step: 'Starting test...',
      function: name,
    });
    test1(name)
      .then((result) => {
        log_message({
          type: 'success',
          step: 'Test passed',
        });
        resolve({ function_name: name });
      })
      .catch((error) => {
        reject({ function_name: name, test_name: error.test_name });
      });
  });
}

function runTest() {
  test()
    .then((result) => {
      log_message({
        type: 'success',
        step: 'All tests passed',
        function: result.function_name,
      });
    })
    .catch((error) => {
      log_message({
        type: 'failure',
        step: 'Test failed',
        function: error.function_name,
        test: error.test_name,
      });
    });
}

module.exports = {
  test,
  runTest,
};
