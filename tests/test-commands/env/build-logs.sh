#!/usr/bin/env bash

cd tests/test-commands
node env/modify-settings.js
npx h2-build --logs