#!/usr/bin/env bash

cd tests/test-settings
node env/modify-settings-output.js
npx h2-build