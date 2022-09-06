#!/usr/bin/env bash

cd tests/test-settings
node env/modify-settings-fail.js
npx h2-build