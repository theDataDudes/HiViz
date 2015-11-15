'use strict';

module.exports = angular.module('app.common.directives', ['ngCrossfilter'])
  .directive('islandMap', require('./islandMap'))
  .directive('islandBarChart', require('./islandBarChart'));
