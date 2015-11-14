'use strict';

module.exports = angular.module('app.common.directives', [])
  .controller('barGraphController', require('./controller'))
  .directive('islandMap', require('./islandMap'))
  .directive('islandBarChart', require('./islandBarChart'));
