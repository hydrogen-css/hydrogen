#!/usr/bin/env bash

cd tests/test-settings
node env/modify-settings-build.js
npx h2-build