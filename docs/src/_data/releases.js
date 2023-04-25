// Hydrogen
'use strict';

// Data models

// Data imports
let releases = require('@hydrogen-css/hydrogen/releases');

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

module.exports = {
  history: releases.releases(),
  latest: releases.stable(),
  stable: releases.stable(),
  beta: releases.beta(),
  featured: releases.featured(),
  rss: releases.rss(),
};
