'use strict';
module.exports = angular.module('app.sidebar', [])
	.directive('sidebar', function () {
		return {
			scope : true,
			controller : 'sidebarController',
			controllerAs : 'sidebarctrl',
			templateUrl : 'views/sidebar.html'
		};
	})
	.controller('sidebarController', require('./controller'));
