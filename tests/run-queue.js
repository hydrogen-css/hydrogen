'use strict';

let { log_message } = require('../lib/scripts/logging/log-message');

function run_queue(test, test_queue) {
  try {
    log_message({
      type: 'system',
      step: 'Running test group...',
      test: test,
      buffers: {
        top: false,
      },
    });
    let results = test_queue();
    let count = 0;
    let errors = [];
    results.forEach((result) => {
      count = count + 1;
      if (result.status === false) {
        errors = errors.concat(result.test);
      }
    });
    log_message({
      type: 'system',
      step: 'Tests have completed...',
      test: test,
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
      buffers: {
        bottom: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  run_queue,
};
