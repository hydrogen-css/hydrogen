#!/usr/bin/env bash

cd tests/test-settings
node env/modify-settings-key-periods.js
npx h2-build