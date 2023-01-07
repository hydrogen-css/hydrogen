#!/usr/bin/env bash

node lib/scripts/logging/setup/project.js
rm -rf node_modules
rm -rf package-lock.json
npm install --no-fund
npm link --no-fund --no-audit
echo ''
node lib/scripts/logging/setup/documentation.js
cd docs
rm -rf _site
rm -rf node_modules
rm -rf package-lock.json
npm install --no-fund
npm link @hydrogen-css/hydrogen --no-fund --no-audit
cd ..
node lib/scripts/logging/setup/success.js