'use strict';

module.exports = angular.module('app.common', [
  require('./services').name,
  require('./directives').name,
	require('./controllers').name
]);