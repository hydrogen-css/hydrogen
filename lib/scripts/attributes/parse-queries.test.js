'use strict';

let { log_message } = require('../logging/log-message');
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
    let name = '1 - Single query';
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
      let queries = 'base(primary)';
      let file = 'path/to/test';
      let test = parse_queries(
        settings,
        property_model,
        property,
        attribute,
        queries,
        file
      );
      if (
        test &&
        test[0].prefix === 'base' &&
        test[0].modifiers.media === 'base' &&
        test[0].modifiers.theme === 'default' &&
        test[0].modifiers.mode === 'default' &&
        !test[0].modifiers.state &&
        !test[0].modifiers.selectors &&
        !test[0].modifiers.children &&
        !test[0].modifiers.id &&
        !test[0].modifiers.class &&
        test[0].values &&
        test[0].values[0] === 'primary'
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

function test2() {
  return new Promise((resolve, reject) => {
    let name = '2 - Multiple queries';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'background';
      let attribute =
        'data-h2-background="base(primary) desktop:hover(secondary)"';
      let queries = 'base(primary) desktop:hover(secondary)';
      let file = 'path/to/test';
      let test = parse_queries(
        settings,
        property_model,
        property,
        attribute,
        queries,
        file
      );
      if (
        test &&
        test[0].prefix === 'base' &&
        test[0].modifiers.media === 'base' &&
        test[0].modifiers.theme === 'default' &&
        test[0].modifiers.mode === 'default' &&
        !test[0].modifiers.state &&
        !test[0].modifiers.selectors &&
        !test[0].modifiers.children &&
        !test[0].modifiers.id &&
        !test[0].modifiers.class &&
        test[0].values &&
        test[0].values[0] === 'primary' &&
        test[1].prefix === 'desktop:hover' &&
        test[1].modifiers.media === 'desktop' &&
        test[1].modifiers.theme === 'default' &&
        test[1].modifiers.mode === 'default' &&
        test[1].modifiers.state === 'hover' &&
        !test[1].modifiers.selectors &&
        !test[1].modifiers.children &&
        !test[1].modifiers.id &&
        !test[1].modifiers.class &&
        test[1].values &&
        test[1].values[0] === 'secondary'
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

function test3() {
  return new Promise((resolve, reject) => {
    let name = '3 - Single invalid query';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="dark(primary)"';
      let queries = 'dark(primary)';
      let file = 'path/to/test';
      let test = parse_queries(
        settings,
        property_model,
        property,
        attribute,
        queries,
        file
      );
      if (test) {
        reject({ name: name });
      } else {
        resolve({ name: name });
      }
    } catch (error) {
      console.log(error);
      reject({ name: name });
    }
  });
}

function test4() {
  return new Promise((resolve, reject) => {
    let name = '4 - Valid query with invalid query';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="base(primary) hover(secondary)"';
      let queries = 'base(primary) hover(secondary)';
      let file = 'path/to/test';
      let test = parse_queries(
        settings,
        property_model,
        property,
        attribute,
        queries,
        file
      );
      if (
        test &&
        test[0].prefix === 'base' &&
        test[0].modifiers.media === 'base' &&
        test[0].modifiers.theme === 'default' &&
        test[0].modifiers.mode === 'default' &&
        !test[0].modifiers.state &&
        !test[0].modifiers.selectors &&
        !test[0].modifiers.children &&
        !test[0].modifiers.id &&
        !test[0].modifiers.class &&
        test[0].values &&
        test[0].values[0] === 'primary' &&
        !test[1]
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
              test: error.name,
            });
            results.push({
              name: error.name,
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
                  test: error.name,
                });
                results.push({
                  name: error.name,
                  passed: false,
                });
              })
              .then(() => {
                test4()
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
          });
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
