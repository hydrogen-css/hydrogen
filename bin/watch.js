#!/usr/bin/env node

const { hydrogen_watch } = require('../lib/watch');

hydrogen_watch().catch((error) => {
  console.log(error);
  return false;
});
