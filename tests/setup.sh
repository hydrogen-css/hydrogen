#!/usr/bin/env bash

node tests/log-project-setup.js
rm -rf node_modules
rm -rf package-lock.json
npm install
npm link
tests/refresh.sh