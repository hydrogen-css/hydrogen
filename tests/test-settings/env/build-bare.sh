#!/usr/bin/env bash

cd tests/test-settings
node env/modify-settings-bare.js
npx h2-build