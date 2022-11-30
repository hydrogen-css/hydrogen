'use strict';

let { log_message } = require('../logs/log-message');
let { validate_attribute_css } = require('./validate-attribute-css');

const { settings_test_data } = require('../../data/settings-model-test');
const {
  property_model_test_data,
  attribute_test_data,
  query_test_standard_data,
} = require('../../data/property-model-test');

/*
  Test list
  - Single CSS value
  - Multiple CSS values
  - Invalid value
  - Valid value with invalid value
*/

function test1() {
  return new Promise((resolve, reject) => {
    let name = '1 - Single CSS value';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'background';
      let attribute = attribute_test_data();
      let query = query_test_standard_data();
      let css = [
        '[data-h2-background*="base(primary)"]{background: var(--h2-color-primary)}',
      ];
      validate_attribute_css(
        settings,
        {},
        property_model,
        property,
        attribute,
        query,
        css
      )
        .then((result) => {
          resolve({ name: name });
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
    let name = '2 - Multiple CSS values';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'background';
      let attribute = attribute_test_data();
      let query = query_test_standard_data();
      let css = [
        '[data-h2-background*="base(primary)"]{background: var(--h2-color-primary)}',
        '[data-h2-background*="base(primary)"]>div{background: var(--h2-color-primary)}',
      ];
      validate_attribute_css(
        settings,
        {},
        property_model,
        property,
        attribute,
        query,
        css
      )
        .then((result) => {
          resolve({ name: name });
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
    let name = '3 - Invalid CSS';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'background';
      let attribute = attribute_test_data();
      let query = query_test_standard_data();
      let css = ['[data-h2-background*="base(primary)"]{background: invalid}'];
      validate_attribute_css(
        settings,
        {},
        property_model,
        property,
        attribute,
        query,
        css
      )
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

function test4() {
  return new Promise((resolve, reject) => {
    let name = '4 - Valid CSS with invalid CSS';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'background';
      let attribute = attribute_test_data();
      let query = query_test_standard_data();
      let css = [
        '[data-h2-background*="base(primary)"]{background: blue}',
        '[data-h2-background*="base(primary)"]>div{background: invalid}',
      ];
      validate_attribute_css(
        settings,
        {},
        property_model,
        property,
        attribute,
        query,
        css
      )
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
    let name = 'validate_attribute_css';
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
  let name = 'validate_attribute_css';
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
