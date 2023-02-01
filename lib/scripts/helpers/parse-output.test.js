'use strict';

let { log_message } = require('../logging/log-message');
let { parse_output } = require('./parse-output');

/*
  Test list
  - The function returns an object with an array, a string, and a glob value
  - The function fails properly when the settings.output argument is missing or not an array
  - The function fails properly when the settings.config.directory argument is missing or not a string
*/

function test1() {
  return new Promise((resolve, reject) => {
    let name = '1 - Returns expected values';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let settings = {
      output: 'test/path',
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
    let test = parse_output({ settings: settings });
    if (test) {
      if (typeof test != 'object') {
        reject({ name: name });
      }
      if (!test.array || !Array.isArray(test.array)) {
        reject({ name: name });
      }
      if (!test.string || typeof test.string != 'string') {
        reject({ name: name });
      }
      if (!test.glob || typeof test.string != 'string') {
        reject({ name: name });
      }
      resolve({ name: name });
    } else {
      reject({ name: name });
    }
  });
}

function test2() {
  return new Promise((resolve, reject) => {
    let name = '2 - Invalid settings output';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let settings = {
      output: ['bad/path'],
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
    let test = parse_output({ settings: settings });
    if (test) {
      reject({ name: name });
    } else {
      resolve({ name: name });
    }
  });
}

function test3() {
  return new Promise((resolve, reject) => {
    let name = '3 - Invalid config directory';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let settings = {
      output: 'test/path',
      logging: {
        warnings: {
          count: 0,
        },
        errors: {
          count: 0,
        },
      },
    };
    let test = parse_output({ settings: settings });
    if (test) {
      reject({ name: name });
    } else {
      resolve({ name: name });
    }
  });
}

function test() {
  return new Promise((resolve, reject) => {
    let name = 'parse_output';
    let results = [];
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
        test2(name)
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
            test3(name)
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
      });
  });
}

function runTest() {
  let name = 'parse_output';
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
