'use strict';
var _ = require('lodash');

// using lodash to merge obects from these three sub-modules
_.assign(module.exports,
  require('./no-stdin'),
  require('./optional-stdin'),
  require('./required-stdin')
);
