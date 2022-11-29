'use strict';

let { log_message } = require('../logs/log-message');
let { build_attribute_selectors } = require('./build-attribute-selectors');

const { settings_test_data } = require('../../data/settings-model-test');
const {
  attribute_test_data,
  query_test_standard_data,
  query_test_selectors_data,
  query_test_children_data,
  query_test_id_data,
  query_test_class_data,
} = require('../../data/property-model-test');

/*
  Test list
  - Proper assembly with standard values
  - Proper assembly with selectors
  - Proper assembly with children
  - Proper assembly with deprecated ID
  - Proper assembly with deprecated class
  - Bad data
*/

function test1() {
  return new Promise((resolve, reject) => {
    let name = '1 - Without selector modifiers';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = attribute_test_data();
      let query = query_test_standard_data();
      build_attribute_selectors(settings, {}, {}, property, attribute, query)
        .then((result) => {
          if (query.selectors[0] === '[data-h2-background*="base(primary)"]') {
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
    let name = '2 - With selectors';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = attribute_test_data();
      let query = query_test_selectors_data();
      build_attribute_selectors(settings, {}, {}, property, attribute, query)
        .then((result) => {
          if (
            query.selectors[0] ===
            '[data-h2-background*="base:selectors[.testClass, #testID](primary)"].testClass#testID'
          ) {
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
    let name = '3 - With children';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = attribute_test_data();
      let query = query_test_children_data();
      build_attribute_selectors(settings, {}, {}, property, attribute, query)
        .then((result) => {
          if (
            query.selectors[0] ===
              '[data-h2-background*="base:children[p, >div *](primary)"] p:not([data-h2-background])' &&
            query.selectors[1] ===
              '[data-h2-background*="base:children[p, >div *](primary)"] >div *:not([data-h2-background])'
          ) {
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

function test4() {
  return new Promise((resolve, reject) => {
    let name = '4 - With ID';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = attribute_test_data();
      let query = query_test_id_data();
      build_attribute_selectors(settings, {}, {}, property, attribute, query)
        .then((result) => {
          if (
            query.selectors[0] ===
            '[data-h2-background*="base:id[testID](primary)"]#testID'
          ) {
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

function test5() {
  return new Promise((resolve, reject) => {
    let name = '5 - With class';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = attribute_test_data();
      let query = query_test_class_data();
      build_attribute_selectors(settings, {}, {}, property, attribute, query)
        .then((result) => {
          if (
            query.selectors[0] ===
            '[data-h2-background*="base:class[testClass, testOtherClass](primary)"].testClass.testOtherClass'
          ) {
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

function test() {
  return new Promise((resolve, reject) => {
    let name = 'build_attribute_selectors';
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
                    test5()
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
  });
}

function runTest() {
  let name = 'build_attribute_selectors';
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
