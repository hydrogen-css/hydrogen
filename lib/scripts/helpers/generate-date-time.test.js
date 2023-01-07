'use strict';

let { log_message } = require('../logging/log-message');
let { generate_date_time } = require('./generate-date-time');

/*
  Test list
  - The function returns a string
*/

function test1() {
  return new Promise((resolve, reject) => {
    let name = '1 - Returns date/time string';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
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
    let test = generate_date_time({ settings: settings });
    if (test) {
      if (typeof test != 'string') {
        reject({
          name: name,
        });
      }
      resolve({ name: name });
    } else {
      reject({
        name: name,
      });
    }
  });
}

function test() {
  return new Promise((resolve, reject) => {
    let name = 'generate_date_time';
    let results = [];
    console.log('');
    log_message({
      type: 'system',
      step: 'Starting test...',
      function: name,
    });
    test1()
      .then((result) => {
        log_message({
          type: 'success',
          step: 'Test passed',
          test: result.name,
        });
        results.push({
          name: result.name,
          passed: true,
        });
      })
      .catch((error) => {
        log_message({
          type: 'failure',
          step: 'Test failed',
          test: result.name,
        });
        results.push({
          name: result.name,
          passed: false,
        });
      })
      .then(() => {
        resolve({ name: name, results: results });
      });
  });
}

function runTest() {
  let name = 'generate_date_time';
  test()
    .then((result) => {
      let results = result.results;
      let count = 0;
      let errors = [];
      results.forEach((result) => {
        count = count + 1;
        if (result.passed === false) {
          errors = errors.concat(result.name);
        }
      });
      log_message({
        type: 'system',
        step: 'Tests have completed...',
        function: name,
      });
      log_message({
        type: 'info',
        step: 'Total tests run: ' + count,
      });
      log_message({
        type: 'success',
        step: 'Total passes: ' + (count - errors.length),
      });
      log_message({
        type: 'error',
        step: 'Total errors: ' + errors.length,
        test_errors: errors,
      });
    })
    .catch((error) => {
      log_message({
        type: 'error',
        step: 'Running tests',
        function: name,
        error: error,
      });
    });
}

module.exports = {
  test,
  runTest,
};
