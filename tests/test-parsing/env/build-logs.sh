#!/usr/bin/env bash

cd tests/test-parsing
node env/modify-settings.js
npx h2-build --logs