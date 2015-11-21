'use strict';

module.exports = angular.module('app.main', [])
.config( ($stateProvider, $urlRouterProvider, $locationProvider) => {
  // for unmatched urls redirect to default view

    $stateProvider
      .state('default', {
        url : '/',
        templateUrl : 'views/default.html'
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

    $locationProvider.html5Mode({
      enabled : true,
      requireBase : false
    });

    $urlRouterProvider.otherwise('/');
  });