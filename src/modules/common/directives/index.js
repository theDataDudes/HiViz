'use strict';

module.exports = angular.module('app.common.directives', [])
  .directive('islandMap', require('./islandMap'))
  .directive('islandBarChart', require('./islandBarChart'));