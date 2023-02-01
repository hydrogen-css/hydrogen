#!/usr/bin/env bash

cd tests/test-settings
node env/settings-1-minimum-configuration.js
npx h2-build
echo 'Expected result:'
echo 'warnings: 0'
echo 'errors:   0'
echo 'timers:   true'
echo 'logs:     false'