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
    let test_name = '1 - valid arguments';
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
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
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
            resolve({ test_name: test_name });
          } else {
            reject({ test_name: test_name });
          }
        })
        .catch((error) => {
          reject({ test_name: test_name });
        });
    } catch (error) {
      console.log(error);
      reject({ test_name: test_name });
    }
  });
}

function test2() {
  return new Promise((resolve, reject) => {
    let test_name = '2 - not called';
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
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
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
            resolve({ test_name: test_name });
          } else {
            reject({ test_name: test_name });
          }
        })
        .catch((error) => {
          reject({ test_name: test_name });
        });
    } catch (error) {
      console.log(error);
      reject({ test_name: test_name });
    }
  });
}

function test3() {
  return new Promise((resolve, reject) => {
    let test_name = '3 - invalid "settings"';
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
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
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
          reject({ test_name: test_name });
        })
        .catch((error) => {
          resolve({ test_name: test_name });
        });
    } catch (error) {
      console.log(error);
      reject({ test_name: test_name });
    }
  });
}

function test() {
  return new Promise((resolve, reject) => {
    let name = 'delete_logs';
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
        });
        test2()
          .then((result) => {
            log_message({
              type: 'success',
              step: 'Test passed',
            });
            test3()
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
          })
          .catch((error) => {
            reject({ function_name: name, test_name: error.test_name });
          });
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
