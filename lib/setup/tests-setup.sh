#!/usr/bin/env bash

cd tests
node ../lib/scripts/logs/tests/test-env-setup.js
cd test-commands
node ../../lib/scripts/logs/tests/test-setup.js --test="commands"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-control
node ../../lib/scripts/logs/tests/test-setup.js --test="control"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-defaults
node ../../lib/scripts/logs/tests/test-setup.js --test="default"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-errors
node ../../lib/scripts/logs/tests/test-setup.js --test="error"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-initialization
node ../../lib/scripts/logs/tests/test-setup.js --test="init"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-parsing
node ../../lib/scripts/logs/tests/test-setup.js --test="parsing"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-properties
node ../../lib/scripts/logs/tests/test-setup.js --test="property"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-settings
node ../../lib/scripts/logs/tests/test-setup.js --test="settings"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../test-stress
node ../../lib/scripts/logs/tests/test-setup.js --test="stress"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
npm install --no-fund --no-audit
npm link @hydrogen-css/hydrogen --no-fund --no-audit
echo ''
cd ../../