'use strict';

let { log_message } = require('../logging/log-message');
let { parse_prefix } = require('./parse-prefix');

const { settings_test_data } = require('../../data/settings-model-test');

/*
  Test list
  - Simple media construction
  - Theme construction
  - Dark mode construction
  - All modes construction
  - State construction
  - Selectors construction
  - Children construction
  - ID construction
  - Class construction
  - Complex construction
  - No prefix
  - Prefix without media
*/

function test1() {
  return new Promise((resolve, reject) => {
    let name = '1 - Media construction';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="base(primary)"';
      let query = 'base(primary)';
      let prefix = 'base';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
        file
      );
      if (
        test.media === 'base' &&
        test.theme === 'default' &&
        test.mode === 'default' &&
        !test.state &&
        !test.selectors &&
        !test.children &&
        !test.id &&
        !test.class
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
    let name = '2 - Theme construction';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="base:theme(primary)"';
      let query = 'base:theme(primary)';
      let prefix = 'base:theme';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
        file
      );
      if (
        test.media === 'base' &&
        test.theme === 'theme' &&
        test.mode === 'default' &&
        !test.state &&
        !test.selectors &&
        !test.children &&
        !test.id &&
        !test.class
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
    let name = '3 - Dark mode construction';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="base:dark(primary)"';
      let query = 'base:dark(primary)';
      let prefix = 'base:dark';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
        file
      );
      if (
        test.media === 'base' &&
        test.theme === 'default' &&
        test.mode === 'dark' &&
        !test.state &&
        !test.selectors &&
        !test.children &&
        !test.id &&
        !test.class
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
    let name = '4 - All modes construction';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="base:all(primary)"';
      let query = 'base:all(primary)';
      let prefix = 'base:all';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
        file
      );
      if (
        test.media === 'base' &&
        test.theme === 'default' &&
        test.mode === 'all' &&
        !test.state &&
        !test.selectors &&
        !test.children &&
        !test.id &&
        !test.class
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
    let name = '5 - State construction';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="base:hover(primary)"';
      let query = 'base:hover(primary)';
      let prefix = 'base:hover';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
        file
      );
      if (
        test.media === 'base' &&
        test.theme === 'default' &&
        test.mode === 'default' &&
        test.state === 'hover' &&
        !test.selectors &&
        !test.children &&
        !test.id &&
        !test.class
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

function test6() {
  return new Promise((resolve, reject) => {
    let name = '6 - Selectors construction';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute =
        'data-h2-background="base:selectors[.testClass](primary)"';
      let query = 'base:selectors[.testClass](primary)';
      let prefix = 'base:selectors[.testClass]';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
        file
      );
      if (
        test.media === 'base' &&
        test.theme === 'default' &&
        test.mode === 'default' &&
        !test.state &&
        Array.isArray(test.selectors) &&
        test.selectors[0] === '.testClass' &&
        !test.children &&
        !test.id &&
        !test.class
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

function test7() {
  return new Promise((resolve, reject) => {
    let name = '7 - Children construction';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="base:children[>p, div](primary)"';
      let query = 'base:children[>p, div](primary)';
      let prefix = 'base:children[>p, div]';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
        file
      );
      if (
        test.media === 'base' &&
        test.theme === 'default' &&
        test.mode === 'default' &&
        !test.state &&
        !test.selectors &&
        Array.isArray(test.children) &&
        test.children[0] === '>p' &&
        test.children[1] === 'div' &&
        !test.id &&
        !test.class
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

function test8() {
  return new Promise((resolve, reject) => {
    let name = '8 - ID construction';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="base:id[testID](primary)"';
      let query = 'base:id[testID](primary)';
      let prefix = 'base:id[testID]';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
        file
      );
      if (
        test.media === 'base' &&
        test.theme === 'default' &&
        test.mode === 'default' &&
        !test.state &&
        !test.selectors &&
        !test.children &&
        Array.isArray(test.id) &&
        test.id[0] === 'testID' &&
        !test.class
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

function test9() {
  return new Promise((resolve, reject) => {
    let name = '9 - Class construction';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="base:class[testClass](primary)"';
      let query = 'base:class[testClass](primary)';
      let prefix = 'base:class[testClass]';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
        file
      );
      if (
        test.media === 'base' &&
        test.theme === 'default' &&
        test.mode === 'default' &&
        !test.state &&
        !test.selectors &&
        !test.children &&
        !test.id &&
        Array.isArray(test.class) &&
        test.class[0] === 'testClass'
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

function test10() {
  return new Promise((resolve, reject) => {
    let name = '10 - Complex construction';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute =
        'data-h2-background="base:theme:dark:selectors[#testID]:hover(primary)"';
      let query = 'base:theme:dark:selectors[#testID]:hover(primary)';
      let prefix = 'base:theme:dark:selectors[#testID]:hover';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
        file
      );
      if (
        test.media === 'base' &&
        test.theme === 'theme' &&
        test.mode === 'dark' &&
        test.state === 'hover' &&
        Array.isArray(test.selectors) &&
        test.selectors[0] === '#testID' &&
        !test.children &&
        !test.id &&
        !test.class
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

function test11() {
  return new Promise((resolve, reject) => {
    let name = '11 - No prefix';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="(primary)"';
      let query = '(primary)';
      let prefix = '';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
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

function test12() {
  return new Promise((resolve, reject) => {
    let name = '12 - Prefix without media';
    try {
      log_message({
        type: 'system',
        step: 'Running test...',
        test: name,
      });
      let settings = settings_test_data();
      let property = 'background';
      let attribute = 'data-h2-background="theme:dark(primary)"';
      let query = 'theme:dark(primary)';
      let prefix = 'theme:dark';
      let file = 'path/to/test';
      let test = parse_prefix(
        settings,
        property,
        attribute,
        query,
        prefix,
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

function test() {
  return new Promise((resolve, reject) => {
    let name = 'parse_prefix';
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
                            test7()
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
                                test8()
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
                                    test9()
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
                                        test10()
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
                                            test11()
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
                                                test12()
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
                                                    resolve({
                                                      name: name,
                                                      results: results,
                                                    });
                                                  });
                                              });
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  });
}

function runTest() {
  let name = 'parse_prefix';
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
