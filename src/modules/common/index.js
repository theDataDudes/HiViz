'use strict';

module.exports = angular.module('app.common', [
  require('./services').name,
  require('./filters').name,
  require('./factories').name
]);