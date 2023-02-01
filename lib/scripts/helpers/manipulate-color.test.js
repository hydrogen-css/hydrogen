'use strict';

let { log_message } = require('../logging/log-message');
let { manipulate_color } = require('./manipulate-color');

let { settings_model_test } = require('../../data/settings-model-test');

/*
  Test list
  - Accepts and processes an RGB color using a correct modifier key
  - Accepts and processed an RGBA color using a correct modifier key
  - Accepts and processes a HEX color using a correct modifier key
  - Rejects an incorrect modifier key
  - Rejects an invalid color
*/

function test1() {
  return new Promise((resolve, reject) => {
    let name = '1 - Valid RGB';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let color = 'rgb(50, 50, 100)';
    let key = 'lighter';
    let test = manipulate_color(settings_model_test, color, key);
    if (test === 'rgb(150, 150, 180)') {
      resolve({ name: name });
    } else {
      reject({ name: name });
    }
  });
}

function test2() {
  return new Promise((resolve, reject) => {
    let name = '2 - Valid RGBA';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let color = 'rgba(100, 100, 150, .5)';
    let key = 'lightest';
    let test = manipulate_color(settings_model_test, color, key);
    if (test === 'rgba(215, 215, 230, 0.5)') {
      resolve({ name: name });
    } else {
      reject({ name: name });
    }
  });
}

function test3() {
  return new Promise((resolve, reject) => {
    let name = '3 - Valid HEX';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let color = '#FF0000';
    let key = 'darkest';
    let test = manipulate_color(settings_model_test, color, key);
    if (test === 'rgb(64, 0, 0)') {
      resolve({ name: name });
    } else {
      reject({ name: name });
    }
  });
}

function test4() {
  return new Promise((resolve, reject) => {
    let name = '4 - Invalid modifier key';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let color = '#FF0000';
    let key = 'invalid';
    let test = manipulate_color(settings_model_test, color, key);
    if (test === 'rgb(64, 0, 0)') {
      reject({ name: name });
    } else {
      resolve({ name: name });
    }
  });
}

function test5() {
  return new Promise((resolve, reject) => {
    let name = '5 - Invalid color';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    let color = 'invalid';
    let key = 'darkest';
    let test = manipulate_color(settings_model_test, color, key);
    if (test === 'rgb(64, 0, 0)') {
      reject({ name: name });
    } else {
      resolve({ name: name });
    }
  });
}

function test() {
  return new Promise((resolve, reject) => {
    let name = 'manipulate_color';
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
                test4(name)
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
                    test5(name)
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
      });
  });
}

function runTest() {
  let name = 'manipulate_color';
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
