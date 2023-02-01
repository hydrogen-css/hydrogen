#!/usr/bin/env bash

cd tests/test-settings
node env/modify-settings-duplicate-gradient-modifier-keys.js
npx h2-build