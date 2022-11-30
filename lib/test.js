'use strict';

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

module.exports = {
  grandparent,
};
