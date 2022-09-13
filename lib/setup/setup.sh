#!/usr/bin/env bash

rm -rf node_modules
rm -rf package-lock.json
npm install --no-fund
node lib/scripts/logs/log-setup-project.js
npm link --no-fund --no-audit
echo ''
cd docs
node ../lib/scripts/logs/log-setup-documentation.js
rm -rf _site
rm -rf node_modules
rm -rf package-lock.json
rm -rf hydrogen.config.json
npm install --no-fund
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
node ../lib/setup/config-documentation.js
cd ..
tests/setup.sh
node lib/scripts/logs/log-setup-success.js