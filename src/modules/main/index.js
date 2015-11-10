'use strict';

module.exports = angular.module('hivisApp.main', [])
.config( ($stateProvider, $urlRouterProvider) => {
    // for unmatched urls redirect to default view

    $stateProvider
      .state('default', {
        url : '/',
        templateUrl : 'views/default.html'
      })
      .state('about', {
        url : '/about',
        templateUrl : 'views/about.html'
      });

    $urlRouterProvider.otherwise('/');
  });