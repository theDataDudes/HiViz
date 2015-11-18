'use strict';
module.exports = angular.module('app.sidebar', [])
	.directive('sidebar', function () {
  		return {
  			scope : true,
  			templateUrl : 'views/sidebar.html'
  		};
	});

