#!/usr/bin/env bash

cd tests/test-properties
node ../log-test-refresh.js --test="Property test"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
cd ../test-parsing
node ../log-test-refresh.js --test="Parser test"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
cd ../test-initialization
node ../log-test-refresh.js --test="Initialization test"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
cd ../test-commands
node ../log-test-refresh.js --test="Commands test"
rm -rf package-lock.json
rm -rf node_modules
rm -rf hydrogen.config.json
cd ../../
tests/build.sh