#!/usr/bin/env bash

cd tests/test-settings
node env/modify-settings-unmatched-typography-key.js
npx h2-build