'use strict';

module.exports = angular.module('app.common.directives', ['ngCrossfilter',
  require('./sidebarNumbers').name])
  .directive('islandMap', require('./islandMap'));

