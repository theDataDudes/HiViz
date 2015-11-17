'use strict';

module.exports = angular.module('app.common.directives.sidebarNumbers', ['ngCrossfilter'])
  .directive('odoTotal', require('./total'))
  .directive('odoShopping', require('./shopping'))
  .directive('odoLodging', require('./lodging'))
  .directive('odoTransportation', require('./transportation'))
  .directive('odoFood', require('./food'))
  .directive('odoEntertainment', require('./entertainment'))
  .directive('odoOther', require('./other'));