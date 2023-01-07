'use strict';

/**
 * @typedef {import('../../data/property-model-definition').PropertyModel} PropertyModel
 * @typedef {import('../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../data/property-model-definition').Attribute} Attribute
 * @typedef {import('../../data/property-model-definition').Query} Query
 * @typedef {import('../../data/property-model-definition').Modifiers} Modifiers
 */

let settings_model_test = require('../../data/settings-model-test');

let { log_message } = require('../logging/log-message');
let { parse_options } = require('./parse-options');

/*
  Test list
  - Test if a comma separated list is returned as an array of the correct items
  - Test that a single value is returned as an array with a single item
*/

function test1() {
  return new Promise((resolve, reject) => {
    let name = '1 - Valid comma separated list';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    try {
      // Run the test
      let test = parse_options(
        settings_model_test,
        'data-h2-color="base(primary.30, secondary)"',
        'base(primary.30, secondary)',
        'path/to/test/file',
        'primary.30, secondary',
        ','
      );
      if (test && test[0] === 'primary.30' && test[1] === 'secondary') {
        resolve({ name: name });
      } else {
        reject({ name: name });
      }
    } catch (error) {
      console.log(error);
      reject({ name: name });
    }
  });
}

function test2() {
  return new Promise((resolve, reject) => {
    let name = '2 - Valid single option';
    log_message({
      type: 'system',
      step: 'Running test...',
      test: name,
    });
    try {
      // Run the test
      let test = parse_options(
        settings_model_test,
        'data-h2-color="base(primary.30)"',
        'base(primary.30)',
        'path/to/test/file',
        'primary.30',
        ','
      );
      if (test && test[0] === 'primary.30') {
        resolve({ name: name });
      } else {
        reject({ name: name });
      }
    } catch (error) {
      console.log(error);
      reject({ name: name });
    }
  });
}

function test() {
  return new Promise((resolve, reject) => {
    let name = 'parse_options';
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
            resolve({ name: name, results: results });
          });
      });
  });
}

function runTest() {
  let name = 'parse_options';
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
