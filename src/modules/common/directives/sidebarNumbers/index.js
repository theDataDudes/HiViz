'use strict';

module.exports = angular.module('app.common.directives.sidebarNumbers', ['ngCrossfilter'])
  .directive('odometer', require('./total'));