'use strict';
module.exports = angular.module('app.service', [])
.service('apiService', require('./services'))
.filter('year', require('./yearFilter'));