'use strict';
module.exports = angular.module('app.common.filters', [])
.filter('region', require('./regionFilter'))
.filter('year', require('./yearFilter'));