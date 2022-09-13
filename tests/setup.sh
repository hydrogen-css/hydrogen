#!/usr/bin/env bash

cd tests
node ../lib/scripts/logs/log-setup-tests.js
cd test-commands
node ../../lib/scripts/logs/log-tests-initialization.js --test="Commands"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-core
node ../../lib/scripts/logs/log-tests-initialization.js --test="Core"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-defaults
node ../../lib/scripts/logs/log-tests-initialization.js --test="Default"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-errors
node ../../lib/scripts/logs/log-tests-initialization.js --test="Error"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-initialization
node ../../lib/scripts/logs/log-tests-initialization.js --test="Initialization"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-parsing
node ../../lib/scripts/logs/log-tests-initialization.js --test="Parsing"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-properties
node ../../lib/scripts/logs/log-tests-initialization.js --test="Property"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-settings
node ../../lib/scripts/logs/log-tests-initialization.js --test="Settings"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-stress
node ../../lib/scripts/logs/log-tests-initialization.js --test="Stress"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../../