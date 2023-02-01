#!/usr/bin/env node

const { hydrogen_init } = require('../lib/init');

try {
  hydrogen_init();
} catch (error) {
  return false;
}
