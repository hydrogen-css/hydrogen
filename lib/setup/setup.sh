#!/usr/bin/env bash

rm -rf node_modules
rm -rf package-lock.json
npm install --no-fund
node lib/scripts/logs/setup/project.js
npm link --no-fund --no-audit
echo ''
cd docs
node ../lib/scripts/logs/setup/documentation.js
rm -rf _site
rm -rf node_modules
rm -rf package-lock.json
rm -rf hydrogen.config.json
npm install --no-fund
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
node settings.js
cd ..
lib/setup/tests-setup.sh
node lib/scripts/logs/setup/success.js