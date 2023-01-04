'use strict';
const { log_message } = require('./scripts/logs/log-message');

function grandparent(arg) {
  try {
    console.log('running grandparent with arg:', arg);
    parent(arg);
    console.log('this should only appear if arg is 1');
  } catch (error) {
    console.error(error);
  }
}

function parent(arg) {
  try {
    console.log('running parent with arg:', arg);
    child(arg);
  } catch (error) {
    throw error;
  }
}

function child(arg) {
  try {
    console.log('running child with arg:', arg);
    if (arg === 1) {
      return true;
    } else {
      throw new Error("child failed because arg wasn't 1");
    }
  } catch (error) {
    throw error;
  }
}

function finally_test() {
  try {
    console.log('Starting level 1');
    try {
      if (1 != 2) {
        throw new Error('Level 1 test throw');
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      console.log('Starting level 2');
      try {
        if (1 != 2) {
          throw new Error('Level 2 test throw');
        }
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        console.log('Level 2 complete');
      }
    }
  } catch (error) {
    if (error) {
      console.log('There were errors');
    }
  }
}

function nested_3() {
  try {
    if (1 != 2) {
      throw new Error('nested_3 failed');
    }
  } catch (error) {
    throw error;
  }
}

function nested_2() {
  try {
    if (1 != 2) {
      throw new Error('nested_2 failed');
    }
  } catch (error) {
    throw error;
  }
}

function nested_1() {
  try {
    if (1 != 2) {
      throw new Error('nested_1 failed');
    }
  } catch (error) {
    throw error;
  }
}

function nested_finally_test() {
  try {
    let errors = [];
    try {
      nested_1();
    } catch (error) {
      errors.push(error);
    } finally {
      try {
        nested_2();
      } catch (error) {
        errors.push(error);
      } finally {
        try {
          nested_3();
        } catch (error) {
          errors.push(error);
        } finally {
          if (errors.length > 0) {
            let last = errors[0];
            errors.forEach((error, index) => {
              if (index === errors.length - 1) {
                last = error;
              } else {
                log_message({
                  type: 'error',
                  step: 'Validation test',
                  error: error,
                });
              }
            });
            throw last;
          } else {
            console.log('no errors!');
            return true;
          }
        }
      }
    }
  } catch (error) {
    throw {
      step: 'validation test',
      error: error,
    };
  }
}

function finally_test_2() {
  try {
    nested_finally_test();
  } catch (error) {
    if (error) {
      log_message({
        type: 'error',
        step: error.step,
        error: error.error,
      });
    }
  }
}

module.exports = {
  grandparent,
  finally_test,
  finally_test_2,
};
