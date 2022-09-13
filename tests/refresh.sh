#!/usr/bin/env bash

node lib/scripts/logs/log-tests-refresh-start.js
cd tests/test-commands
node ../../lib/scripts/logs/log-tests-refresh.js --test="Commands"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-core
node ../../lib/scripts/logs/log-tests-refresh.js --test="Core"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-defaults
node ../../lib/scripts/logs/log-tests-refresh.js --test="Default"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-errors
node ../../lib/scripts/logs/log-tests-refresh.js --test="Error"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-initialization
node ../../lib/scripts/logs/log-tests-refresh.js --test="Initialization"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-parsing
node ../../lib/scripts/logs/log-tests-refresh.js --test="Parsing"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-properties
node ../../lib/scripts/logs/log-tests-refresh.js --test="Property"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-settings
node ../../lib/scripts/logs/log-tests-refresh.js --test="Settings"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-stress
node ../../lib/scripts/logs/log-tests-refresh.js --test="Stress"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../../
node lib/scripts/logs/log-tests-refresh-success.js