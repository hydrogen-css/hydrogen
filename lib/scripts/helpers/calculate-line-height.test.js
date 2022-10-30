'use strict';

let { log_message } = require('../logs/log-message');
let { calculate_line_height } = require('./calculate-line-height');

/*
  Test list
  - The function returns a number
  - The function fails properly when the font_size argument is missing or not a number
  - The function fails properly when the base_line_height argument is missing or not a number
*/

function test1() {
  return new Promise((resolve, reject) => {
    let test_name = '1 - valid arguments';
    let settings = {
      logging: {
        warnings: {
          count: 0,
        },
        errors: {
          count: 0,
        },
      },
    };
    let font_size = 4;
    let base_line_height = 1.4;
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    let test = calculate_line_height({
      settings: settings,
      font_size: font_size,
      base_line_height: base_line_height,
    });
    if (test) {
      if (typeof test != 'number') {
        reject({ test_name: test_name + ': the result was not a number.' });
      } else {
        resolve({ test_name: test_name });
      }
    } else {
      reject({ test_name: test_name + ': result was false.' });
    }
  });
}

function test2() {
  return new Promise((resolve, reject) => {
    let test_name = '2 - invalid "font_size"';
    let settings = {
      logging: {
        warnings: {
          count: 0,
        },
        errors: {
          count: 0,
        },
      },
    };
    let font_size = 'string';
    let base_line_height = 1.4;
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    let test = calculate_line_height({
      settings: settings,
      font_size: font_size,
      base_line_height: base_line_height,
    });
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
    let test_name = '3 - invalid "base_line_height"';
    let settings = {
      logging: {
        warnings: {
          count: 0,
        },
        errors: {
          count: 0,
        },
      },
    };
    let font_size = 4;
    let base_line_height = 'string';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    let test = calculate_line_height({
      settings: settings,
      font_size: font_size,
      base_line_height: base_line_height,
    });
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
    let name = 'calculate_line_height';
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
