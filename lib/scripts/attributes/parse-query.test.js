'use strict';

let { log_message } = require('../logging/log-message');
let { parse_query } = require('./parse-query');

const { settings_test_data } = require('../../data/settings-model-test');
const { property_model_test_data } = require('../../data/property-model-test');

/*
  Test list
  - Simple prefix, one option
  - Simple prefix, multiple options, standard property
  - Simple prefix, multiple options, custom property
  - Complex prefix, custom property
  - Bad media data
  - Simple prefix, multiple options, compatibility property
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
      let test = parse_query(
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

function test2() {
  return new Promise((resolve, reject) => {
    let name = '2 - Simple prefix, multiple options, standard property';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="base(primary, secondary)"';
      let query = 'base(primary, secondary)';
      let file = 'path/to/test';
      let test = parse_query(
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
        test.values[0] === 'primary, secondary'
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
    let name = '3 - Simple prefix, multiple options, custom property';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'overlay';
      let attribute = 'data-h2-overlay="base(primary, secondary)"';
      let query = 'base(primary, secondary)';
      let file = 'path/to/test';
      let test = parse_query(
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
        test.values[0] === 'primary' &&
        test.values[1] === 'secondary'
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

function test4() {
  return new Promise((resolve, reject) => {
    let name = '4 - Complex prefix, custom property';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'overlay';
      let attribute =
        'data-h2-overlay="base:theme:dark:children[>p, div *]:hover(primary, secondary)"';
      let query =
        'base:theme:dark:children[>p, div *]:hover(primary, secondary)';
      let file = 'path/to/test';
      let test = parse_query(
        settings,
        property_model,
        property,
        attribute,
        query,
        file
      );
      if (
        test &&
        test.prefix === 'base:theme:dark:children[>p, div *]:hover' &&
        test.modifiers.media === 'base' &&
        test.modifiers.theme === 'theme' &&
        test.modifiers.mode === 'dark' &&
        test.modifiers.state === 'hover' &&
        !test.modifiers.selectors &&
        Array.isArray(test.modifiers.children) &&
        test.modifiers.children[0] === '>p' &&
        test.modifiers.children[1] === 'div *' &&
        !test.modifiers.id &&
        !test.modifiers.class &&
        test.values &&
        test.values[0] === 'primary' &&
        test.values[1] === 'secondary'
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

function test5() {
  return new Promise((resolve, reject) => {
    let name = '5 - Invalid media, custom property';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'overlay';
      let attribute =
        'data-h2-overlay="theme:dark:children[>p, div *]:hover(primary, secondary)"';
      let query = 'theme:dark:children[>p, div *]:hover(primary, secondary)';
      let file = 'path/to/test';
      let test = parse_query(
        settings,
        property_model,
        property,
        attribute,
        query,
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

function test6() {
  return new Promise((resolve, reject) => {
    let name = '6 - Simple prefix, multiple options, compatibility property';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property_model = property_model_test_data();
      let property = 'padding';
      let attribute = 'data-h2-padding="base(0, 0, x3, 40px)"';
      let query = 'base(0, 0, x3, 40px)';
      let file = 'path/to/test';
      let test = parse_query(
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
        test.values[0] === '0 0 x3 40px'
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
    let name = 'parse_query';
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
                        test6()
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
  });
}

function runTest() {
  let name = 'parse_query';
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
