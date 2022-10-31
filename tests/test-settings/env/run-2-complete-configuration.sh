#!/usr/bin/env bash

cd tests/test-settings
node env/settings-2-complete-configuration.js
npx h2-build
echo 'Expected result:'
echo 'warnings: 0'
echo 'errors:   0'
echo 'timers:   false'
echo 'logs:     true'