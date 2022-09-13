#!/usr/bin/env bash

cd docs
node ../lib/scripts/logs/log-docs-refresh.js
rm -rf _site
rm -rf node_modules
rm -rf package-lock.json
rm -rf hydrogen.config.json
npm install --no-fund
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
node ../lib/setup/config-documentation.js