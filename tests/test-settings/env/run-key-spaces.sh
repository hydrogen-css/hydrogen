#!/usr/bin/env bash

cd tests/test-settings
node env/modify-settings-key-spaces.js
npx h2-build