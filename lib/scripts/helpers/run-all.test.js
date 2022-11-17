let { log_message } = require('../logs/log-message');

function log_test_success(data) {
  log_message({
    type: 'success',
    step: 'All tests passed',
    function: data.function_name,
  });
}

function log_test_failure(data) {
  log_message({
    type: 'failure',
    step: 'Test failed',
    function: data.function_name,
  });
}

module.exports.test = function test() {
  let test_results = [];
  require('./calculate-line-height.test')
    .test()
    .then((result) => {
      test_results = test_results.concat({
        name: result.function_name,
        passed: true,
      });
      log_test_success(result);
    })
    .catch((error) => {
      test_results = test_results.concat({
        name: error.function_name,
        passed: false,
      });
      log_test_failure(error);
    })
    .then(() => {
      require('./delete-logs.test')
        .test()
        .then((result) => {
          test_results = test_results.concat({
            name: result.function_name,
            passed: true,
          });
          log_test_success(result);
        })
        .catch((error) => {
          test_results = test_results.concat({
            name: error.function_name,
            passed: false,
          });
          log_test_failure(error);
        })
        .then(() => {
          require('./generate-date-time.test')
            .test()
            .then((result) => {
              test_results = test_results.concat({
                name: result.function_name,
                passed: true,
              });
              log_test_success(result);
            })
            .catch((error) => {
              test_results = test_results.concat({
                name: error.function_name,
                passed: false,
              });
              log_test_failure(error);
            })
            .then(() => {
              require('./parse-input.test')
                .test()
                .then((result) => {
                  test_results = test_results.concat({
                    name: result.function_name,
                    passed: true,
                  });
                  log_test_success(result);
                })
                .catch((error) => {
                  test_results = test_results.concat({
                    name: error.function_name,
                    passed: false,
                  });
                  log_test_failure(error);
                })
                .then(() => {
                  require('./parse-output.test')
                    .test()
                    .then((result) => {
                      test_results = test_results.concat({
                        name: result.function_name,
                        passed: true,
                      });
                      log_test_success(result);
                    })
                    .catch((error) => {
                      test_results = test_results.concat({
                        name: error.function_name,
                        passed: false,
                      });
                      log_test_failure(error);
                    })
                    .then(() => {
                      require('../properties/parse-property.test')
                        .test()
                        .then((result) => {
                          test_results = test_results.concat({
                            name: result.function_name,
                            passed: true,
                          });
                          log_test_success(result);
                        })
                        .catch((error) => {
                          test_results = test_results.concat({
                            name: error.function_name,
                            passed: false,
                          });
                          log_test_failure(error);
                        })

                        .then(() => {
                          require('../settings/load-configuration.test')
                            .test()
                            .then((result) => {
                              test_results = test_results.concat({
                                name: result.function_name,
                                passed: true,
                              });
                              log_test_success(result);
                            })
                            .catch((error) => {
                              test_results = test_results.concat({
                                name: error.function_name,
                                passed: false,
                              });
                              log_test_failure(error);
                            })
                            .then(() => {
                              process.chdir('./tests/test-attributes');
                              require('../../../tests/test-attributes/run.test')
                                .test()
                                .then((result) => {
                                  test_results = test_results.concat({
                                    name: result.function_name,
                                    passed: true,
                                  });
                                  log_test_success(result);
                                })
                                .catch((error) => {
                                  test_results = test_results.concat({
                                    name: error.function_name,
                                    passed: false,
                                  });
                                  log_test_failure(error);
                                })
                                // Don't forget to change directories if adding a test
                                .then(() => {
                                  let test_count = 0;
                                  let errors = [];
                                  test_results.forEach((result) => {
                                    test_count = test_count + 1;
                                    if (result.passed === false) {
                                      errors = errors.concat(result.name);
                                    }
                                  });
                                  log_message({
                                    type: 'system',
                                    step: 'Tests have completed...',
                                  });
                                  log_message({
                                    type: 'info',
                                    step: 'Total tests run: ' + test_count,
                                  });
                                  log_message({
                                    type: 'success',
                                    step:
                                      'Total passes: ' +
                                      (test_count - errors.length),
                                  });
                                  log_message({
                                    type: 'error',
                                    step: 'Total errors: ' + errors.length,
                                    test_errors: errors,
                                  });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};
