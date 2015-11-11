'use strict';
module.exports = angular.module('app.common.services', [])
.service('apiService', require('./apiService'))
.service('relationalService', require('./relationalService'));