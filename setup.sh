#!/usr/bin/env bash

rm -rf cache
rm -rf node_modules
rm -rf package-lock.json
npm install --no-fund
cd docs
rm -rf _site
rm -rf node_modules
rm -rf package-lock.json
npm install --no-fund
cd ../test
rm -rf styles
mkdir styles
rm -rf node_modules
rm -rf package-lock.json
npm install --no-fund
cd ..
node lib/scripts/console-logging/log-setup-success/index.js