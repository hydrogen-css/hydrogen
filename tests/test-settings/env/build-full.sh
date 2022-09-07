#!/usr/bin/env bash

cd tests/test-settings
node env/modify-settings-full.js
npx h2-build