'use strict';

let { log_message } = require('../logs/log-message');
let { parse_output } = require('./parse-output');

/*
  Test list
  - The function returns an object with an array, a string, and a glob value
  - The function fails properly when the settings.output argument is missing or not an array
  - The function fails properly when the settings.config.directory argument is missing or not a string
*/

function test1() {
  return new Promise((resolve, reject) => {
    let test_name = '1 - valid arguments';
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
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    let test = parse_output({ settings: settings });
    if (test) {
      if (typeof test != 'object') {
        reject({
          test_name: test_name + ': result was not an object.',
        });
      }
      if (!test.array || !Array.isArray(test.array)) {
        reject({
          test_name:
            test_name +
            ": result's \"array\" value wasn't returned or wasn't an array.",
        });
      }
      if (!test.string || typeof test.string != 'string') {
        reject({
          test_name:
            test_name +
            ": result's \"string\" value wasn't returned or wasn't a string.",
        });
      }
      if (!test.glob || typeof test.string != 'string') {
        reject({
          test_name:
            test_name +
            ": result's \"glob\" value wasn't returned or wasn't a string.",
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

function test2() {
  return new Promise((resolve, reject) => {
    let test_name = '2 - invalid "settings.output"';
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
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    let test = parse_output({ settings: settings });
    if (test) {
      reject({
        test_name:
          test_name +
          ": result wasn't false when the function should have errored.",
      });
    } else {
      resolve({ test_name: test_name });
    }
  });
}

function test3() {
  return new Promise((resolve, reject) => {
    let test_name = '3 - invalid "settings.config.directory"';
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
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    let test = parse_output({ settings: settings });
    if (test) {
      reject({
        test_name:
          test_name +
          ": result wasn't false when the function should have errored.",
      });
    } else {
      resolve({ test_name: test_name });
    }
  });
}

function test() {
  return new Promise((resolve, reject) => {
    let name = 'parse_output';
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
        test2(name).then((result) => {
          log_message({
            type: 'success',
            step: 'Test passed',
          });
          test3(name).then((result) => {
            log_message({
              type: 'success',
              step: 'Test passed',
            });
            resolve({ function_name: name });
          });
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
