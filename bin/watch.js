#!/usr/bin/env node

const { hydrogen_watch } = require('../lib/watch');

try {
  hydrogen_watch();
} catch (error) {
  return false;
}
