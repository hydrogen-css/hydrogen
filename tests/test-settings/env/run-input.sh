#!/usr/bin/env bash

cd tests/test-settings
node env/modify-settings-input.js
npx h2-build