'use strict';

let { log_message } = require('../logging/log-message');
let { calculate_line_height } = require('./calculate-line-height');

/*
  Test list
  - The function returns a number
  - The function fails properly when the font_size argument is missing or not a number
  - The function fails properly when the base_line_height argument is missing or not a number
*/

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

function test1() {
  return new Promise((resolve, reject) => {
    let name = '1 - Returns number';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let font_size = 4;
    let base_line_height = 1.4;
    let test = calculate_line_height({
      settings: settings,
      font_size: font_size,
      base_line_height: base_line_height,
    });
    if (test) {
      if (typeof test != 'number') {
        reject({ name: name });
      } else {
        resolve({ name: name });
      }
    } else {
      reject({ name: name });
    }
  });
}

function test2() {
  return new Promise((resolve, reject) => {
    let name = '2 - Invalid font size';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let font_size = 'string';
    let base_line_height = 1.4;
    let test = calculate_line_height({
      settings: settings,
      font_size: font_size,
      base_line_height: base_line_height,
    });
    if (test) {
      reject({ name: name });
    } else {
      resolve({ name: name });
    }
  });
}

function test3() {
  return new Promise((resolve, reject) => {
    let name = '3 - Invalid base line height';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let font_size = 4;
    let base_line_height = 'string';
    let test = calculate_line_height({
      settings: settings,
      font_size: font_size,
      base_line_height: base_line_height,
    });
    if (test) {
      reject({ name: name });
    } else {
      resolve({ name: name });
    }
  });
}

function test() {
  return new Promise((resolve, reject) => {
    let name = 'calculate_line_height';
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
  let name = 'calculate_line_height';
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
