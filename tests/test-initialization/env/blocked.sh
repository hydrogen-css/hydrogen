#!/usr/bin/env bash

cd tests/test-initialization
rm -rf hydrogen.config.json
touch hydrogen.config.json
npx h2-init