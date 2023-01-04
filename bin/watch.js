#!/usr/bin/env node

const { hydrogen_watch } = require('../lib/watch');

try {
  hydrogen_watch();
} catch (error) {
  if (error.step) {
    throw error.error;
  } else {
    throw error;
  }
}
