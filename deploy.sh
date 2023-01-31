#!/usr/bin/env bash

npm install --no-fund
npm link --no-fund --no-audit
cd docs
npm install --no-fund
npm link @hydrogen-css/hydrogen --no-fund --no-audit
cd ..
node lib/scripts/logging/setup/success.js
cd docs
npm run build