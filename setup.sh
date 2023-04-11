#!/usr/bin/env bash

rm -rf cache
rm -rf node_modules
rm -rf package-lock.json
npm install --no-fund
npm link --no-fund --no-audit
cd docs
rm -rf _site
rm -rf node_modules
rm -rf package-lock.json
npm install --no-fund
npm link @hydrogen-css/hydrogen --no-fund --no-audit
cd ..
node lib/scripts/console-logging/log-setup-success/index.js