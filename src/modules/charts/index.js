'use strict';
module.exports = angular.module('app.charts', [])
  .directive('d3Charts', function () {
    return {
      scope : true,
      controller : 'chartController',
      controllerAs : 'chartctrl',
      templateUrl : 'views/chart.html'
    };
  })
  .controller('chartController', require('./controller'));