#!/usr/bin/env node

const { hydrogen_build } = require('../lib/build');

try {
  hydrogen_build();
} catch (error) {
  return false;
}
