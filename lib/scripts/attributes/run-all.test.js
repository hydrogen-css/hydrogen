// Run all attribute tests
'use strict';

let { log_message } = require('../logs/log-message');

function test() {
  return new Promise((resolve, reject) => {
    let group = 'Bulk helper functions';
    let bulk_results = [];
    require('./calculate-line-height.test')
      .test()
      .then((result) => {
        let name = result.name;
        let results = result.results;
        log_message({
          type: 'success',
          step: group,
          function: name,
        });
        results.forEach((result) => {
          bulk_results.push({
            function: name,
            test: result.name,
            passed: result.passed,
          });
        });
      })
      .then(() => {
        require('./delete-logs.test')
          .test()
          .then((result) => {
            let name = result.name;
            let results = result.results;
            log_message({
              type: 'success',
              step: group,
              function: name,
            });
            results.forEach((result) => {
              bulk_results.push({
                function: name,
                test: result.name,
                passed: result.passed,
              });
            });
          })
          .then(() => {
            require('./generate-date-time.test')
              .test()
              .then((result) => {
                let name = result.name;
                let results = result.results;
                log_message({
                  type: 'success',
                  step: group,
                  function: name,
                });
                results.forEach((result) => {
                  bulk_results.push({
                    function: name,
                    test: result.name,
                    passed: result.passed,
                  });
                });
              })
              .then(() => {
                require('./manipulate-color.test')
                  .test()
                  .then((result) => {
                    let name = result.name;
                    let results = result.results;
                    log_message({
                      type: 'success',
                      step: group,
                      function: name,
                    });
                    results.forEach((result) => {
                      bulk_results.push({
                        function: name,
                        test: result.name,
                        passed: result.passed,
                      });
                    });
                  })
                  .then(() => {
                    require('./parse-input.test')
                      .test()
                      .then((result) => {
                        let name = result.name;
                        let results = result.results;
                        log_message({
                          type: 'success',
                          step: group,
                          function: name,
                        });
                        results.forEach((result) => {
                          bulk_results.push({
                            function: name,
                            test: result.name,
                            passed: result.passed,
                          });
                        });
                      })
                      .then(() => {
                        require('./parse-output.test')
                          .test()
                          .then((result) => {
                            let name = result.name;
                            let results = result.results;
                            log_message({
                              type: 'success',
                              step: group,
                              function: name,
                            });
                            results.forEach((result) => {
                              bulk_results.push({
                                function: name,
                                test: result.name,
                                passed: result.passed,
                              });
                            });
                            resolve({ name: group, results: bulk_results });
                          });
                      });
                  });
              });
          });
      });
  });
}

function runTest() {
  let name = 'Bulk helper functions';
  let bulk_results = [];
  test()
    .then((result) => {
      let name = result.name;
      let results = result.results;
      log_message({
        type: 'success',
        step: group,
        function: name,
      });
      results.forEach((result) => {
        bulk_results.push({
          function: name,
          test: result.name,
          passed: result.passed,
        });
      });
    })
    .then(() => {
      let count = 0;
      let errors = [];
      bulk_results.forEach((result) => {
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
    });
}

module.exports = {
  test,
  runTest,
};
