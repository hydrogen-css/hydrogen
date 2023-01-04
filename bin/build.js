#!/usr/bin/env node

const { hydrogen_build } = require('../lib/build');

try {
  hydrogen_build();
} catch (error) {
  if (error.step) {
    throw error.error;
  } else {
    throw error;
  }
}
