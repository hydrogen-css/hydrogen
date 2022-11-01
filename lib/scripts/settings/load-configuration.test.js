'use strict';

let settings_data = require('../../data/settings-model');

let { log_message } = require('../logs/log-message');
let { load_configuration } = require('./load-configuration');

var fs = require('fs');

/*
  Test list
  - The function returns a Promise containing the settings object
  - The function fails properly when the config option is pointing to an invalid location
  - The function fails properly when the config option is omitted
*/

function test1() {
  return new Promise((resolve, reject) => {
    let test_name = '1 - valid arguments';
    let temp_logging = {
      logging: {
        warnings: {
          count: 0,
        },
        errors: {
          count: 0,
        },
      },
    };
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    try {
      // Create a cache
      if (!fs.existsSync('cache')) {
        fs.mkdirSync('cache');
      }
      // Create a configuration file
      if (!fs.existsSync('cache/hydrogen.config.json')) {
        fs.writeFileSync(
          'cache/hydrogen.config.json',
          JSON.stringify(settings_data)
        );
      }
      // Run the test
      load_configuration({ h2_config_path: 'cache' }, temp_logging)
        .then((result) => {
          if (typeof result === 'object' && result.input && result.output) {
            resolve({ test_name: test_name });
            // Clean the cache
            if (!fs.existsSync('cache/hydrogen.config.json')) {
              fs.rmSync('cache/hydrogen.config.json');
            }
          } else {
            reject({
              test_name: test_name + ': the result was not a settings object.',
            });
            // Clean the cache
            if (!fs.existsSync('cache/hydrogen.config.json')) {
              fs.rmSync('cache/hydrogen.config.json');
            }
          }
        })
        .catch((error) => {
          log_message(error);
          reject({
            test_name: test_name + ': the Promise was rejected.',
          });
          // Clean the cache
          if (!fs.existsSync('cache/hydrogen.config.json')) {
            fs.rmSync('cache/hydrogen.config.json');
          }
        });
    } catch (error) {
      console.log(error);
      reject({ test_name: test_name });
    }
  });
}

function test2() {
  return new Promise((resolve, reject) => {
    let test_name = '2 - invalid "path"';
    let temp_logging = {
      logging: {
        warnings: {
          count: 0,
        },
        errors: {
          count: 0,
        },
      },
    };
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    load_configuration({ config: 'does/not/exist' }, temp_logging)
      .then((result) => {
        reject({
          test_name:
            test_name + ': the function resolved the Promise incorrectly.',
        });
      })
      .catch((error) => {
        log_message(error);
        resolve({ test_name: test_name });
      });
  });
}

function test3() {
  return new Promise((resolve, reject) => {
    let test_name = '3 - omitted "path"';
    let temp_logging = {
      logging: {
        warnings: {
          count: 0,
        },
        errors: {
          count: 0,
        },
      },
    };
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    load_configuration({}, temp_logging)
      .then((result) => {
        reject({
          test_name:
            test_name + ': the function resolved the Promise incorrectly.',
        });
      })
      .catch((error) => {
        log_message(error);
        resolve({ test_name: test_name });
      });
  });
}

function test() {
  return new Promise((resolve, reject) => {
    let name = 'load_configuration';
    log_message({
      type: 'system',
      step: 'Starting test...',
      function: name,
    });
    test1(name)
      .then((result) => {
        log_message({
          type: 'success',
          step: 'Test passed',
        });
        test2(name)
          .then((result) => {
            log_message({
              type: 'success',
              step: 'Test passed',
            });
            test3(name)
              .then((result) => {
                log_message({
                  type: 'success',
                  step: 'Test passed',
                });
                resolve({ function_name: name });
              })
              .catch((error) => {
                reject({ function_name: name, test_name: error.test_name });
              });
          })
          .catch((error) => {
            reject({ function_name: name, test_name: error.test_name });
          });
      })
      .catch((error) => {
        reject({ function_name: name, test_name: error.test_name });
      });
  });
}

function runTest() {
  test()
    .then((result) => {
      log_message({
        type: 'success',
        step: 'All tests passed',
        function: result.function_name,
      });
    })
    .catch((error) => {
      log_message({
        type: 'failure',
        step: 'Test failed',
        function: error.function_name,
        test: error.test_name,
      });
    });
}

module.exports = {
  test,
  runTest,
};
