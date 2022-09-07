#!/usr/bin/env bash

cd tests/test-settings
node env/modify-settings-minimum.js
npx h2-build