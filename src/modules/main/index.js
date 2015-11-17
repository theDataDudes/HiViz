'use strict';

module.exports = angular.module('app.main', [])
.config( ($stateProvider, $urlRouterProvider) => {
    // for unmatched urls redirect to default view

    $stateProvider
      .state('default', {
        url : '/',
        templateUrl : 'views/default.html',
	      controller : 'sidebarController'
      })
      .state('graph', {
        url : '/graph',
        templateUrl : 'views/graph.html',
        controller : 'GraphCtrl',
        controllerAs : 'graph'
      })
      .state('about', {
        url : '/about',
        templateUrl : 'views/about.html'
      });


    $urlRouterProvider.otherwise('/');
  });