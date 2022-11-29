'use strict';

let { log_message } = require('../logs/log-message');
let { parse_queries } = require('./parse-queries');

const { settings_test_data } = require('../../data/settings-model-test');
const { property_model_test_data } = require('../../data/property-model-test');

/*
  Test list
  - Single query
  - Multiple queries
  - Single invalid query
  - Valid query with invalid query
*/

function test1() {
  return new Promise((resolve, reject) => {
    let name = '1 - Simple prefix, one option';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="base(primary)"';
      let query = 'base(primary)';
      let file = 'path/to/test';
      let test = parse_queries(
        settings,
        property_model,
        property,
        attribute,
        query,
        file
      );
      if (
        test &&
        test.prefix === 'base' &&
        test.modifiers.media === 'base' &&
        test.modifiers.theme === 'default' &&
        test.modifiers.mode === 'default' &&
        !test.modifiers.state &&
        !test.modifiers.selectors &&
        !test.modifiers.children &&
        !test.modifiers.id &&
        !test.modifiers.class &&
        test.values &&
        test.values[0] === 'primary'
      ) {
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
    let name = 'parse_queries';
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
          test: error.name,
        });
        results.push({
          name: error.name,
          passed: false,
        });
      })
      .then(() => {
        resolve({ name: name, results: results });
      });
  });
}

function runTest() {
  let name = 'parse_queries';
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
