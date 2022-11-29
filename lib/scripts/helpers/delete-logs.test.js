'use strict';

let { log_message } = require('../logs/log-message');
let { delete_logs } = require('./delete-logs');

var fs = require('fs');

/*
  Test list
  - The function correctly recursively deletes a folder
  - The function correctly returns without action if the user hasn't called it
  - The function fails properly when the settings object is invalid
*/

function test1() {
  return new Promise((resolve, reject) => {
    let name = '1 - Successful deletion';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let settings = {
      output: {
        parsed: {
          string: 'cache',
        },
      },
      logging: {
        clean: true,
        warnings: {
          count: 0,
        },
        errors: {
          count: 0,
        },
      },
    };
    try {
      // Create a cache
      if (!fs.existsSync('cache')) {
        fs.mkdirSync('cache');
      }
      // Create a folder to be deleted
      if (!fs.existsSync('cache/hydrogen-logs')) {
        fs.mkdirSync('cache/hydrogen-logs');
        fs.writeFileSync('cache/hydrogen-logs/test.txt', '123');
      }
      // Run the test
      delete_logs({ settings: settings })
        .then((result) => {
          // Check to see if the folder was deleted
          if (!fs.existsSync('cache/hydrogen-logs')) {
            resolve({ name: name });
          } else {
            reject({ name: name });
          }
        })
        .catch((error) => {
          reject({ name: name });
        });
    } catch (error) {
      console.log(error);
      reject({ name: name });
    }
  });
}

function test2() {
  return new Promise((resolve, reject) => {
    let name = '2 - Uncalled execution';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let settings = {
      output: {
        parsed: {
          string: 'cache',
        },
      },
      logging: {
        clean: false,
        warnings: {
          count: 0,
        },
        errors: {
          count: 0,
        },
      },
    };
    try {
      // Create a cache
      if (!fs.existsSync('cache')) {
        fs.mkdirSync('cache');
      }
      // Create a folder to be deleted
      if (!fs.existsSync('cache/hydrogen-logs')) {
        fs.mkdirSync('cache/hydrogen-logs');
        fs.writeFileSync('cache/hydrogen-logs/test.txt', '123');
      }
      // Run the test
      delete_logs({ settings: settings })
        .then((result) => {
          // Check to see if the folder was deleted
          if (fs.existsSync('cache/hydrogen-logs')) {
            resolve({ name: name });
          } else {
            reject({ name: name });
          }
        })
        .catch((error) => {
          reject({ name: name });
        });
    } catch (error) {
      console.log(error);
      reject({ name: name });
    }
  });
}

function test3() {
  return new Promise((resolve, reject) => {
    let name = '3 - Invalid settings';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let settings = {
      output: {
        parsed: {},
      },
      logging: {
        clean: true,
        warnings: {
          count: 0,
        },
        errors: {
          count: 0,
        },
      },
    };
    try {
      // Create a cache
      if (!fs.existsSync('cache')) {
        fs.mkdirSync('cache');
      }
      // Create a folder to be deleted
      if (!fs.existsSync('cache/hydrogen-logs')) {
        fs.mkdirSync('cache/hydrogen-logs');
        fs.writeFileSync('cache/hydrogen-logs/test.txt', '123');
      }
      // Run the test
      delete_logs({ settings: settings })
        .then((result) => {
          reject({ name: name });
        })
        .catch((error) => {
          resolve({ name: name });
        });
    } catch (error) {
      console.log(error);
      reject({ name: name });
    }
  });
}

function test() {
  return new Promise((resolve, reject) => {
    let name = 'delete_logs';
    let results = [];
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
        test2()
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
            test3()
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
  let name = 'delete_logs';
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
