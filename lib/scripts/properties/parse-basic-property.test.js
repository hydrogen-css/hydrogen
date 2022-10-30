'use strict';

let Properties = require('../../data/property-model-definition');
/**
 * @typedef {import('../../data/property-model-definition').Property} Property
 * @typedef {import('../../data/property-model-definition').Instance} Instance
 * @typedef {import('../../data/property-model-definition').Value} Value
 */

let settings_data = require('../../data/settings-model');
let property_data = require('../../data/property-model');

let { log_message } = require('../logs/log-message');
let { parse_basic_property } = require('./parse-basic-property');

/*
  Test list
  - The function correctly returns a valid CSS string when passed a standard attribute
  - The function correctly returns a valid CSS string when passed an attribute using space multipliers
*/

function test1() {
  return new Promise((resolve, reject) => {
    let test_name = '1 - valid arguments, basic prop';
    let settings = settings_data;
    let property = 'font-weight';
    /** @type {Property} */
    let prop_data;
    property_data.properties.forEach((prop) => {
      if (prop.id === 'font-weight') {
        prop_data = prop;
      }
    });
    /** @type {Instance} */
    let prop_instance = {
      attribute: 'data-h2-font-weight="base(700)"',
      files: ['test/path'],
      values: [],
    };
    /** @type {Value} */
    let prop_value = {
      modifiers: {
        selectors: [],
        children: [],
        class: '',
        id: '',
        media: 'base',
        state: '',
      },
      options: ['700'],
      prefix: 'base',
      query: 'base(700)',
      selectors: ['[data-h2-font-weight*="base(700)"]'],
    };
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    try {
      // Run the test
      let test = parse_basic_property(
        settings,
        property,
        prop_data,
        prop_instance,
        prop_value
      );
      if (test[0] === '[data-h2-font-weight*="base(700)"]{font-weight: 700;}') {
        resolve({ test_name: test_name });
      } else {
        reject({ test_name: test_name });
      }
    } catch (error) {
      console.log(error);
      reject({ test_name: test_name });
    }
  });
}

function test2() {
  return new Promise((resolve, reject) => {
    let test_name = '2 - valid arguments, space prop';
    let settings = settings_data;
    let property = 'height';
    /** @type {Property} */
    let prop_data;
    property_data.properties.forEach((prop) => {
      if (prop.id === 'height') {
        prop_data = prop;
      }
    });
    /** @type {Instance} */
    let prop_instance = {
      attribute: 'data-h2-height="base(x2)"',
      files: ['test/path'],
      values: [],
    };
    /** @type {Value} */
    let prop_value = {
      modifiers: {
        selectors: [],
        children: [],
        class: '',
        id: '',
        media: 'base',
        state: '',
      },
      options: ['x2'],
      prefix: 'base',
      query: 'base(x2)',
      selectors: ['[data-h2-height*="base(x2)"]'],
    };
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test_name,
    });
    try {
      // Run the test
      let test = parse_basic_property(
        settings,
        property,
        prop_data,
        prop_instance,
        prop_value
      );
      if (
        test[0] ===
        '[data-h2-height*="base(x2)"]{height: calc((2 * var(--h2-base-whitespace)) * 1rem);}'
      ) {
        resolve({ test_name: test_name });
      } else {
        reject({ test_name: test_name });
      }
    } catch (error) {
      console.log(error);
      reject({ test_name: test_name });
    }
  });
}

function test() {
  return new Promise((resolve, reject) => {
    let name = 'parse_basic_property';
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
        });
        test2()
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
