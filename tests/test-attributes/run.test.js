'use strict';

const { create_settings } = require('./settings');
const { log_message } = require('../../lib/scripts/logs/log-message');
const { hydrogen_build } = require('../../lib/build');

var fs = require('fs');
var path = require('path');

function test() {
  return new Promise((resolve, reject) => {
    let test_meta = {
      function_name: 'Attribute parser test',
    };
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_meta.function_name,
    });
    try {
      let results = [
        '[data-h2-background-color*="base(yellow)"]{background-color: yellow;}',
        '[data-h2-background-color*="base(pink)"]{background-color: pink;}',
        '[data-h2-background-color*="base(primary)"]{background-color: rgba(var(--h2-color-primary), 1);}',
        '[data-h2-background-color*="base(green)"]{background-color: green;}',
        '[data-h2-background-color*="base(black)"]{background-color: rgba(var(--h2-color-black), 1);}',
        '[data-h2-background-color*="base:children[>div](red)"] >div:not([data-h2-background-color]){background-color: red;}',
        '[data-h2*="dark"] [data-h2-background-color*="base:dark(white)"]{background-color: rgba(var(--h2-color-white), 1);}',
        '[data-h2-background-color*="p-tablet(blue)"]{background-color: blue;}',
        '[data-h2-background-color*="p-tablet(cyan)"]{background-color: cyan;}',
        '[data-h2-background-color*="p-tablet(black)"]{background-color: rgba(var(--h2-color-black), 1);}}',
        '[data-h2-background-color*="desktop(primary)"]{background-color: rgba(var(--h2-color-primary), 1);}',
        '[data-h2-background-color*="desktop(purple)"]{background-color: purple;}}',
      ];
      create_settings()
        .then((result) => {
          hydrogen_build()
            .then((result) => {
              fs.readFile(
                path.resolve(process.cwd(), 'output/hydrogen.css'),
                (error, file_data) => {
                  let test_data = file_data.toString();
                  if (error) {
                    console.log(error);
                    reject(test_meta);
                  } else {
                    let test = {
                      pass: true,
                      error: '',
                    };
                    results.forEach((string) => {
                      if (test_data.includes(string) === false) {
                        test.pass = false;
                        test.error = string;
                      }
                    });
                    if (test.pass === false) {
                      log_message({
                        type: 'error',
                        step: test_meta.function_name,
                        error: new Error(
                          "Couldn't find the following result:",
                          test.error
                        ),
                      });
                      reject(test_meta);
                    } else {
                      resolve(test_meta);
                    }
                  }
                }
              );
            })
            .catch((error) => {
              console.log(error);
              reject(test_meta);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(test_meta);
        });
    } catch (error) {
      console.log(error);
      reject(test_meta);
    }
  });
}

function run_test() {
  test()
    .then((result) => {
      log_message({
        type: 'success',
        step: 'Test passed',
        function: result.function_name,
      });
    })
    .catch((error) => {
      log_message({
        type: 'failure',
        step: 'Test failed',
        function: error.function_name,
      });
    });
}

module.exports = {
  test,
  run_test,
};
