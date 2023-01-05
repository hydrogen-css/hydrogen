'use strict';

let { log_message } = require('./scripts/logging/log-message');
let { hydrogen_build } = require('./build');
const { get_settings_data } = require('./data/settings-model');
let { run_queue } = require('../tests/run-queue');
var fs = require('fs');
var path = require('path');

/*
  Test list
  - Valid settings in root return a compiled CSS file
  - Valid settings in parent return a compiled CSS file
  - Can't find settings throws an error
  - Invalid settings throw an error
  - Missing input throws an error
*/

let test_group = 'Build script tests';
let test_1_name = '1 - Valid build in root';
let test_2_name = '2 - Valid build in parent dir';
let test_3_name = '3 - Missing config';
let test_4_name = '4 - Invalid config';
let test_5_name = "5 - Input dir doesn't exist";

function test_1() {
  let test = test_1_name;
  try {
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test,
    });
    // Clean any existing cache
    if (fs.existsSync('cache')) {
      fs.rmSync('cache', { recursive: true, force: true });
    }
    // Create a cache, including input/output
    fs.mkdirSync('cache');
    fs.mkdirSync('cache/input');
    fs.mkdirSync('cache/output');
    // Create test input
    let input = String.raw`
      <html data-h2>
        <div data-h2-background-color="base(primary)"></div>
      </html>
    `;
    fs.writeFileSync('cache/input/index.html', input);
    // Get the default settings data
    let settings = get_settings_data();
    // Manipulate the settings for this environment
    settings.input = ['input'];
    settings.output = 'output';
    settings.modes['dark'].method = 'toggle';
    settings.processing.minification = true;
    settings.processing.var_export = true;
    // Write the configuration file
    fs.writeFileSync(
      'cache/hydrogen.config.json',
      JSON.stringify(settings, null, 2)
    );
    // Run Hydrogen
    try {
      process.chdir('cache');
      let results = hydrogen_build();
      process.chdir('..');
      fs.existsSync('cache/output/hydrogen.css');
      fs.existsSync('cache/output/hydrogen.vars.css');
      if (results.settings_data.logging.warnings.count > 0) {
        throw new Error(
          'Hydrogen had unexpected warnings during the test build.'
        );
      }
      if (results.settings_data.logging.errors.count > 0) {
        throw new Error(
          'Hydrogen had unexpected errors during the test build.'
        );
      }
      return {
        test: test,
        status: true,
      };
    } catch (error) {
      throw error;
    } finally {
      // Clean cache
      if (fs.existsSync('cache')) {
        fs.rmSync('cache', { recursive: true, force: true });
      }
    }
  } catch (error) {
    if (error.step) {
      log_message({
        type: 'error',
        step: error.step,
        error: error.error,
      });
    } else {
      log_message({
        type: 'error',
        step: test,
        error: error,
      });
    }
    throw {
      test: test,
      status: false,
    };
  }
}

function test_2() {
  let test = test_2_name;
  try {
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test,
    });
    // Clean any existing cache
    if (fs.existsSync('cache')) {
      fs.rmSync('cache', { recursive: true, force: true });
    }
    // Create a cache, including input/output
    fs.mkdirSync('cache');
    fs.mkdirSync('cache/child');
    fs.mkdirSync('cache/child/input');
    fs.mkdirSync('cache/child/output');
    // Create test input
    let input = String.raw`
      <html data-h2>
        <div data-h2-background-color="base(primary)"></div>
      </html>
    `;
    fs.writeFileSync('cache/child/input/index.html', input);
    // Get the default settings data
    let settings = get_settings_data();
    // Manipulate the settings for this environment
    settings.input = ['child/input'];
    settings.output = 'child/output';
    settings.modes['dark'].method = 'toggle';
    settings.processing.minification = true;
    settings.processing.var_export = true;
    // Write the configuration file
    fs.writeFileSync(
      'cache/hydrogen.config.json',
      JSON.stringify(settings, null, 2)
    );
    // Run Hydrogen
    try {
      process.chdir('cache/child');
      let results = hydrogen_build();
      process.chdir('../..');
      fs.existsSync('cache/child/output/hydrogen.css');
      fs.existsSync('cache/child/output/hydrogen.vars.css');
      if (results.settings_data.logging.warnings.count > 0) {
        throw new Error(
          'Hydrogen had unexpected warnings during the test build.'
        );
      }
      if (results.settings_data.logging.errors.count > 0) {
        throw new Error(
          'Hydrogen had unexpected errors during the test build.'
        );
      }
      return {
        test: test,
        status: true,
      };
    } catch (error) {
      throw error;
    } finally {
      // Clean cache
      if (fs.existsSync('cache')) {
        fs.rmSync('cache', { recursive: true, force: true });
      }
    }
  } catch (error) {
    if (error.step) {
      log_message({
        type: 'error',
        step: error.step,
        error: error.error,
      });
    } else {
      log_message({
        type: 'error',
        step: test,
        error: error,
      });
    }
    throw {
      test: test,
      status: false,
    };
  }
}

function test_3() {
  let test = test_3_name;
  try {
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test,
    });
    // Clean any existing cache
    if (fs.existsSync('cache')) {
      fs.rmSync('cache', { recursive: true, force: true });
    }
    // Create a cache, including input/output
    fs.mkdirSync('cache');
    fs.mkdirSync('cache/input');
    fs.mkdirSync('cache/output');
    // Create test input
    let input = String.raw`
      <html data-h2>
        <div data-h2-background-color="base(primary)"></div>
      </html>
    `;
    fs.writeFileSync('cache/input/index.html', input);
    // Run Hydrogen
    try {
      process.chdir('cache');
      let results = hydrogen_build();
      process.chdir('..');
      fs.existsSync('cache/output/hydrogen.css');
      fs.existsSync('cache/output/hydrogen.vars.css');
      if (results.settings_data.logging.warnings.count > 0) {
        throw new Error(
          'Hydrogen had unexpected warnings during the test build.'
        );
      }
      if (results.settings_data.logging.errors.count > 0) {
        throw new Error(
          'Hydrogen had unexpected errors during the test build.'
        );
      }
      return {
        test: test,
        status: false,
      };
    } catch (error) {
      throw error;
    } finally {
      // Clean cache
      if (fs.existsSync('cache')) {
        fs.rmSync('cache', { recursive: true, force: true });
      }
    }
  } catch (error) {
    if (error.step) {
      log_message({
        type: 'error',
        step: error.step,
        error: error.error,
      });
    } else {
      log_message({
        type: 'error',
        step: test,
        error: error,
      });
    }
    throw {
      test: test,
      status: true,
    };
  }
}

function test_4() {
  let test = test_4_name;
  try {
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test,
    });
    // Clean any existing cache
    if (fs.existsSync('cache')) {
      fs.rmSync('cache', { recursive: true, force: true });
    }
    // Create a cache, including input/output
    fs.mkdirSync('cache');
    fs.mkdirSync('cache/input');
    fs.mkdirSync('cache/output');
    // Create test input
    let input = String.raw`
      <html data-h2>
        <div data-h2-background-color="base(primary)"></div>
      </html>
    `;
    fs.writeFileSync('cache/input/index.html', input);
    // Get the default settings data
    let settings = get_settings_data();
    // Manipulate the settings for this environment
    settings.input = ['input'];
    settings.output = 'output';
    settings.modes['dark'].method = 'toggle';
    settings.processing.minification = 'false';
    settings.processing.var_export = true;
    // Write the configuration file
    fs.writeFileSync(
      'cache/hydrogen.config.json',
      JSON.stringify(settings, null, 2)
    );
    // Run Hydrogen
    try {
      process.chdir('cache');
      let results = hydrogen_build();
      process.chdir('..');
      fs.existsSync('cache/output/hydrogen.css');
      fs.existsSync('cache/output/hydrogen.vars.css');
      if (results.settings_data.logging.warnings.count > 0) {
        throw new Error(
          'Hydrogen had unexpected warnings during the test build.'
        );
      }
      if (results.settings_data.logging.errors.count > 0) {
        throw new Error(
          'Hydrogen had unexpected errors during the test build.'
        );
      }
      return {
        test: test,
        status: false,
      };
    } catch (error) {
      throw error;
    } finally {
      // Clean cache
      if (fs.existsSync('cache')) {
        fs.rmSync('cache', { recursive: true, force: true });
      }
    }
  } catch (error) {
    if (error.step) {
      log_message({
        type: 'error',
        step: error.step,
        error: error.error,
      });
    } else {
      log_message({
        type: 'error',
        step: test,
        error: error,
      });
    }
    throw {
      test: test,
      status: true,
    };
  }
}

function test_5() {
  let test = test_5_name;
  try {
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test,
    });
    // Clean any existing cache
    if (fs.existsSync('cache')) {
      fs.rmSync('cache', { recursive: true, force: true });
    }
    // Create a cache, including input/output
    fs.mkdirSync('cache');
    fs.mkdirSync('cache/output');
    // Get the default settings data
    let settings = get_settings_data();
    // Manipulate the settings for this environment
    settings.input = ['input'];
    settings.output = 'output';
    settings.modes['dark'].method = 'toggle';
    settings.processing.minification = true;
    settings.processing.var_export = true;
    // Write the configuration file
    fs.writeFileSync(
      'cache/hydrogen.config.json',
      JSON.stringify(settings, null, 2)
    );
    // Run Hydrogen
    try {
      process.chdir('cache');
      let results = hydrogen_build();
      process.chdir('..');
      fs.existsSync('cache/output/hydrogen.css');
      fs.existsSync('cache/output/hydrogen.vars.css');
      if (results.settings_data.logging.warnings.count > 0) {
        throw new Error(
          'Hydrogen had unexpected warnings during the test build.'
        );
      }
      if (results.settings_data.logging.errors.count > 0) {
        throw new Error(
          'Hydrogen had unexpected errors during the test build.'
        );
      }
      return {
        test: test,
        status: false,
      };
    } catch (error) {
      throw error;
    } finally {
      // Clean cache
      if (fs.existsSync('cache')) {
        fs.rmSync('cache', { recursive: true, force: true });
      }
    }
  } catch (error) {
    if (error.step) {
      log_message({
        type: 'error',
        step: error.step,
        error: error.error,
      });
    } else {
      log_message({
        type: 'error',
        step: test,
        error: error,
      });
    }
    throw {
      test: test,
      status: true,
    };
  }
}

function test_queue() {
  try {
    let results = [];
    try {
      let test_1_results = test_1();
      log_message({
        type: 'success',
        step: 'Test passed',
        test: test_1_results.test,
      });
      results.push(test_1_results);
    } catch (error) {
      log_message({
        type: 'failure',
        step: 'Test failed',
        test: error.test,
      });
      results.push(error);
    } finally {
      try {
        let test_2_results = test_2();
        log_message({
          type: 'success',
          step: 'Test passed',
          test: test_2_results.test,
        });
        results.push(test_2_results);
      } catch (error) {
        log_message({
          type: 'failure',
          step: 'Test failed',
          test: error.test,
        });
        results.push(error);
      } finally {
        try {
          let test_3_results = test_3();
          log_message({
            type: 'failure',
            step: 'Test failed',
            test: test_3_results.test,
          });
          results.push(test_3_results);
        } catch (error) {
          log_message({
            type: 'success',
            step: 'Test passed',
            test: error.test,
          });
          results.push(error);
        } finally {
          try {
            let test_4_results = test_4();
            log_message({
              type: 'failure',
              step: 'Test failed',
              test: test_4_results.test,
            });
            results.push(test_4_results);
          } catch (error) {
            log_message({
              type: 'success',
              step: 'Test passed',
              test: error.test,
            });
            results.push(error);
          } finally {
            try {
              let test_5_results = test_5();
              log_message({
                type: 'failure',
                step: 'Test failed',
                test: test_5_results.test,
              });
              results.push(test_5_results);
            } catch (error) {
              log_message({
                type: 'success',
                step: 'Test passed',
                test: error.test,
              });
              results.push(error);
            } finally {
              return results;
            }
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
}

function run_tests() {
  run_queue(test_group, test_queue);
}

module.exports = {
  test_queue,
  run_tests,
};
